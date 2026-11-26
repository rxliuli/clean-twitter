import { eventMessager } from '@/lib/event-message'
import { textMode } from '@/lib/plugins/textMode'
import { stripHomeTimelineMedia } from '@/lib/utils/stripTweetMedia'
import { interceptFetch, interceptXHR, Vista } from '@rxliuli/vista'

const AD_ATTR = 'data-clean-twitter-ad'

function isPromotedArticleViaFiber(article: Element): boolean {
  const fiberKey = Object.keys(article).find((k) => k.startsWith('__reactFiber$'))
  if (!fiberKey) return false
  let cur = (article as any)[fiberKey]
  for (let i = 0; i < 20 && cur; i++) {
    const p = cur.memoizedProps
    if (p && (p.promotion || p.promotedMetadata || p.tweet?.promoted_metadata)) {
      return true
    }
    cur = cur.return
  }
  return false
}

function scanPromotedArticles() {
  for (const article of document.querySelectorAll('article')) {
    if (article.getAttribute('data-testid') === 'tweet') continue
    if (article.parentElement?.closest('article')) continue
    if (article.hasAttribute(AD_ATTR)) continue
    if (isPromotedArticleViaFiber(article)) {
      article.setAttribute(AD_ATTR, '1')
    }
  }
}

export default defineContentScript({
  matches: ['*://x.com/*'],
  runAt: 'document_start',
  world: 'MAIN',

  main() {
    // 1. Tag New X promoted tweets in MAIN world so `hideAdvertisement` CSS can toggle cleanly
    let adScanScheduled = false
    const scheduleAdScan = () => {
      if (adScanScheduled) return
      adScanScheduled = true
      requestAnimationFrame(() => {
        adScanScheduled = false
        scanPromotedArticles()
      })
    }
    const startAdObserver = () => {
      if (!document.body) return
      new MutationObserver(scheduleAdScan).observe(document.body, {
        childList: true,
        subtree: true,
      })
      scheduleAdScan()
      // Catch SSR hydration shortly after React attaches __reactFiber
      setTimeout(scheduleAdScan, 150)
      setTimeout(scheduleAdScan, 600)
    }
    if (document.body) {
      startAdObserver()
    } else {
      document.addEventListener('DOMContentLoaded', startAdObserver, { once: true })
    }

    // 2. Intercept HomeTimeline / HomeLatestTimeline (Classic & New X) for textMode
    // Keep the interceptor alive so toggling textMode in the popup takes effect immediately
    // on subsequent tab switches / pagination without requiring a hard reload.
    const vista = new Vista([interceptFetch, interceptXHR])
    const textModeKey = textMode().name
    vista.use(async (c, next) => {
      await next()
      let pathname: string
      try {
        pathname = new URL(c.req.url, location.href).pathname
      } catch {
        return
      }
      const isHomeTimeline = /\/Home(?:Latest)?Timeline(?:Query)?$/i.test(pathname)
      const onHomePage = location.pathname === '/home' || location.pathname === '/'
      const isHomeTweetRefetch =
        onHomePage && /\/TweetResultByRestId(?:Query)?$/i.test(pathname)
      if (!isHomeTimeline && !isHomeTweetRefetch) {
        return
      }
      let enabled = false
      try {
        const config = await eventMessager.sendMessage('getConfig')
        enabled = Boolean(config?.[textModeKey])
      } catch {
        return
      }
      if (!enabled) {
        return
      }
      try {
        const json = await c.res.clone().json()
        stripHomeTimelineMedia(json)
        const headers = new Headers(c.res.headers)
        headers.delete('content-length')
        headers.delete('content-encoding')
        c.res = new Response(JSON.stringify(json), {
          status: c.res.status,
          statusText: c.res.statusText,
          headers,
        })
      } catch {
        // Non-JSON or aborted response: pass through unmodified
      }
    })
    vista.intercept()
  },
})
