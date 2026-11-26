import { getConfig } from '@/lib/config'
import { eventMessager } from '@/lib/event-message'

export default defineContentScript({
  matches: ['*://x.com/*'],
  runAt: 'document_start',
  world: 'ISOLATED',

  main() {
    let cachedConfig: Record<string, boolean> | null = null
    const loadConfig = async () => {
      cachedConfig = await getConfig()
      return cachedConfig
    }
    void loadConfig()

    browser.storage.sync.onChanged.addListener((changes) => {
      if (changes.config) {
        void loadConfig()
      }
    })

    eventMessager.onMessage('getConfig', () => cachedConfig ?? loadConfig())
  },
})
