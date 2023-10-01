import Browser from 'webextension-polyfill'
import { TweetInfo } from './utils/initIndexeddb'
import { oAuthApp } from '../constants/github'
import { createBlockIssue } from './plugins/hideBlockTweet'

function listenRefreshToken() {
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
          state: TweetInfo & { link: string }
        }
        const auth = await oAuthApp.createToken({
          code: data.code,
          state: JSON.stringify(data.state),
        })
        await Browser.storage.local.set({
          refreshToken: data.code,
          refreshState: JSON.stringify(data.state),
          accessToken: auth.authentication.token,
        })
        await createBlockIssue(data.state)
      }
    },
    false,
  )
}

listenRefreshToken()
