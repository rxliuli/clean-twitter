import { loadPlugin } from './content-script/loadPlugin'

export default defineContentScript({
  matches: ['https://x.com/*'],
  async main() {
    await loadPlugin()
  },
})
