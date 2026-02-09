import { getConfig } from '@/lib/config'
import { cleanCSS } from '@/lib/css'
import { plugins } from '@/lib/plugins'

export default defineContentScript({
  matches: ['https://x.com/**'],
  async main() {
    let config = await getConfig()

    const effects: (() => void)[] = []
    const activePlugins = () => {
      cleanCSS()
      effects.forEach((it) => it())
      effects.length = 0
      // init
      plugins
        .filter((it) => config[it.name])
        .forEach((it) => {
          const r = it.init()
          if (typeof r === 'function') {
            effects.push(r)
          }
        })
    }

    // observer
    new MutationObserver(() => {
      requestAnimationFrame(() => {
        plugins
          .filter((it) => config[it.name] && it.observer)
          .forEach((it) => {
            const r = it.observer!()
            if (typeof r === 'function') {
              effects.push(r)
            }
          })
      })
    }).observe(document.body, {
      childList: true,
      subtree: true,
    })

    activePlugins()

    browser.storage.sync.onChanged.addListener(async (changes) => {
      if (changes.config) {
        config = changes.config.newValue as Record<string, boolean>
        activePlugins()
      }
    })
  },
})
