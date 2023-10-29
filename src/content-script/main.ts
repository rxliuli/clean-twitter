import Browser from 'webextension-polyfill'
import hijackXHR from './injectHijackXHR?script&module'
import { Config } from '../constants/config'

if (
  (await Browser.storage.sync.get('blockScamTweets' as keyof Config))
    .blockScamTweets ??
  true
) {
  const script = document.createElement('script')
  script.src = Browser.runtime.getURL(hijackXHR)
  script.type = 'module'
  document.head.prepend(script)
}

await import('./loader')
