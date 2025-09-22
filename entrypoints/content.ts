import { getConfig } from '@/lib/config'
import { cleanCSS } from '@/lib/css'
import { plugins } from '@/lib/plugins'

export default defineContentScript({
  matches: ['https://x.com/**'],
  async main(ctx) {
    let config = await getConfig()

    const effects: (() => void)[] = []
    const activePlugins = () => {
      cleanCSS()
      effects.forEach((it) => it())
      effects.length = 0
      // init
      plugins
        .filter((it) => config[it.name])
        .forEach(async (it) => {
          const r = await it.init()
          if (r instanceof Function) {
            effects.push(r)
          }
        })
    }

    // observer
    ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
      plugins.filter((it) => config[it.name]).forEach((it) => it.observer?.())
    })

    activePlugins()

    browser.storage.sync.onChanged.addListener(async (changes) => {
      if (changes.config) {
        config = changes.config.newValue
        activePlugins()
      }
    })
  },
})
