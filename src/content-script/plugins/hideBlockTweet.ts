import { AsyncArray } from '@liuli-util/async'
import { BasePlugin } from './plugin'
import { initIndexeddb } from '../utils/initIndexeddb'

export function hideBlockTweet(): BasePlugin {
  return {
    name: 'hideBlockTweet',
    description: 'hideBlockTweet',
    default: true,
    async observer() {
      const elements = [
        ...document.querySelectorAll('[data-testid="cellInnerDiv"]'),
      ] as HTMLElement[]
      if (elements.length === 0) {
        return
      }
      const db = await initIndexeddb()
      const list = await AsyncArray.filter(elements, async (it) => {
        if (it.style.display) {
          return false
        }
        const avatar = it.querySelector(
          '[data-testid^="UserAvatar-Container-"]',
        ) as HTMLElement
        if (!avatar) {
          return false
        }
        const username = avatar.dataset.testid?.slice(
          'UserAvatar-Container-'.length,
        )
        const r = (await db.countFromIndex('block', 'username', username)) > 0
        // console.log('isBlock: ', username, r)
        return r
      })
      if (list.length === 0) {
        return
      }
      console.log('blockTweets: ', list)
      list.forEach((it) => (it.style.display = 'none'))
    },
  }
}
