import Browser from 'webextension-polyfill'
import hijackXHR from './injectHijackXHR?script&module'

if (
  (await Browser.storage.sync.get('hideBlockTweet')).hideBlockTweet ??
  true
) {
  const script = document.createElement('script')
  script.src = Browser.runtime.getURL(hijackXHR)
  script.type = 'module'
  document.head.prepend(script)
}

import('./loader')
