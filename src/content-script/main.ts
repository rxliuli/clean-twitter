import Browser from 'webextension-polyfill'
import hijackXHR from './injectHijackXHR?script&module'

const script = document.createElement('script')
script.src = Browser.runtime.getURL(hijackXHR)
script.type = 'module'
document.head.prepend(script)

import('./loader')
