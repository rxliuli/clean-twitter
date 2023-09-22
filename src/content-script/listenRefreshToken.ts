import Browser from 'webextension-polyfill'
import { TweetInfo } from './utils/initIndexeddb'

function listenRefreshToken() {
  if (!['clean-twttier.rxliuli.com', 'localhost'].includes(location.hostname)) {
    return
  }

  window.addEventListener(
    'message',
    async (event) => {
      // We only accept messages from ourselves
      if (event.source !== window) {
        return
      }

      if (event.data.type === 'FROM_PAGE') {
        const data = event.data.data as {
          code: string
          state: TweetInfo & {
            url: string
          }
        }
        // 保存 refreshToken
        await Browser.runtime.sendMessage({
          method: 'getAccessToken',
          code: data.code,
        })
        // 创建 PR
        // const port = Browser.runtime.connect()
        // port.postMessage(event.data.text)
      }
    },
    false,
  )
}

listenRefreshToken()
