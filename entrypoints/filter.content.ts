import { eventMessager } from '@/lib/event-message'
import { textMode } from '@/lib/plugins/textMode'
import { stripHomeTimelineMedia } from '@/lib/utils/stripTweetMedia'
import { once } from '@liuli-util/async'
import { interceptFetch, interceptXHR, Vista } from '@rxliuli/vista'

export default defineContentScript({
  matches: ['*://x.com/*'],
  runAt: 'document_start',
  world: 'MAIN',

  main() {
    // console.log('filter content script started')
    const vista = new Vista([interceptFetch, interceptXHR])
    let textModeEnabled: boolean | null = null
    const getConfig = once(() => eventMessager.sendMessage('getConfig'))
    vista.use(async (c, next) => {
      await next()
      const url = new URL(c.req.url)
      if (
        !url.pathname.endsWith('/HomeTimeline') &&
        !url.pathname.endsWith('/HomeLatestTimeline')
      ) {
        return
      }
      if (textModeEnabled === null) {
        const config = await getConfig()
        textModeEnabled = config[textMode().name]
      }
      if (!textModeEnabled) {
        console.log('text mode is disabled, stop intercepting')
        vista.destroy()
        return
      }
      // console.log('intercepted HomeTimeline')
      const json = await c.res.clone().json()
      // console.log('original json', structuredClone(json))
      stripHomeTimelineMedia(json)
      // console.log('stripped json', structuredClone(json))
      c.res = new Response(JSON.stringify(json), c.res)
    })
    vista.intercept()
  },
})
