import { AsyncArray } from '@liuli-util/async'
import { BasePlugin } from './plugin'
import { TweetInfo, initIndexeddb } from '../utils/initIndexeddb'
import { t } from '../../constants/i18n'
import Browser from 'webextension-polyfill'

async function hideTweet(elements: HTMLElement[]) {
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
}

function parseQuotesLink(quotesLink: string): {
  link: string
  tweetId: string
  username: string
} {
  const u = new URL(quotesLink)
  const tweetId = u.pathname.split('/')[3]
  const username = u.pathname.split('/')[1]
  const link = quotesLink.slice(0, quotesLink.lastIndexOf('/'))
  return { link, tweetId, username }
}

async function createBlockPR(tweet: TweetInfo & { link: string }) {
  const token = await Browser.storage.local.get('refreshToken')
  if (!token.refreshToken) {
    // globalThis.open(
    //   oAuthApp.getWebFlowAuthorizationUrl({
    //     scopes: ['public_repo'],
    //     state: JSON.stringify(tweet),
    //     redirectUrl: RedirectURL,
    //   }).url,
    //   '_blank',
    // )
    return
  }
}

async function addBlockButton() {
  if (document.getElementById('block-and-report')) {
    return
  }
  const menu = document.querySelector('[role="menu"]')
  if (!menu) {
    return
  }
  const blockButton = menu.querySelector(
    '[role="menuitem"]:has(path[d="M12 3.75c-4.55 0-8.25 3.69-8.25 8.25 0 1.92.66 3.68 1.75 5.08L17.09 5.5C15.68 4.4 13.92 3.75 12 3.75zm6.5 3.17L6.92 18.5c1.4 1.1 3.16 1.75 5.08 1.75 4.56 0 8.25-3.69 8.25-8.25 0-1.92-.65-3.68-1.75-5.08zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12z"])',
  )
  if (!blockButton) {
    return
  }
  const newNode = blockButton.cloneNode() as HTMLElement
  newNode.textContent = 'Block and report'
  newNode.id = 'block-and-report'

  newNode.addEventListener('click', async () => {
    const quotesLink = (
      menu.querySelector(
        '[role="menuitem"][data-testid="tweetEngagements"]',
      ) as HTMLAnchorElement
    ).href
    const db = await initIndexeddb()
    const parsed = parseQuotesLink(quotesLink)
    const tweet = await db.get('tweet', parsed.tweetId)
    if (!tweet) {
      throw new Error('not found tweet')
    }
    console.log('click', parsed, tweet)
    await createBlockPR({
      ...tweet,
      link: parsed.link,
    })
    // await blockUser(tweet.userId)
    menu.parentElement!.remove()
  })
  menu.insertBefore(newNode, menu.firstChild)
}

export function hideBlockTweet(): BasePlugin {
  return {
    name: 'hideBlockTweet',
    description: t('plugin.hideBlockTweet.name'),
    default: true,
    async observer() {
      if (!/^\/.*\/status\/.*/.test(location.pathname)) {
        return
      }
      const elements = [
        ...document.querySelectorAll('[data-testid="cellInnerDiv"]'),
      ] as HTMLElement[]
      if (elements.length === 0) {
        return
      }
      await Promise.all([hideTweet(elements)])
    },
  }
}
