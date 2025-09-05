import { getConfig } from '@/lib/config'
import { cleanCSS } from '@/lib/css'
import { plugins } from '@/lib/plugins'

export default defineContentScript({
  matches: ['https://x.com/**'],
  async main(ctx) {
    let config = await getConfig()

    const activePlugins = () => {
      cleanCSS()
      plugins.filter((it) => config[it.name]).forEach((it) => it.init())
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
