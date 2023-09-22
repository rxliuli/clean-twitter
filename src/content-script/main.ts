import Browser from 'webextension-polyfill'
import hijackXHR from './injectHijackXHR?script&module'

if (
  (await Browser.storage.local.get('hideBlockTweet')).hideBlockTweet ??
  true
) {
  const script = document.createElement('script')
  script.src = Browser.runtime.getURL(hijackXHR)
  script.type = 'module'
  document.head.prepend(script)
}

import('./loader')
