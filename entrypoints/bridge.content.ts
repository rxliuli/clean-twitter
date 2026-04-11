import { getConfig } from '@/lib/config'
import { eventMessager } from '@/lib/event-message'

export default defineContentScript({
  matches: ['*://x.com/*'],
  runAt: 'document_start',
  world: 'ISOLATED',

  main() {
    eventMessager.onMessage('getConfig', getConfig)
  },
})
