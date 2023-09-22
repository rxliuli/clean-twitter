import { AsyncArray } from '@liuli-util/async'
import { TweetInfo, initIndexeddb } from './initIndexeddb'
import { get, pick } from 'lodash-es'

// excute once
const words = (function () {
  const keywordsString = ''
  const words = keywordsString.split('|')
  return words
})()

const blockUserIds = new Set<string>()

// GPT 给出的关键词，我啥也不知道
export function isPornography(str: string) {
  return words.some((s) => str.includes(s))
}

export function parseTwitterResponseResult(result: any): TweetInfo {
  const full_text = result.legacy.full_text
  const lang = result.legacy.lang
  const following = result.core.user_results.result.legacy.following
  const description = result.core.user_results.result.legacy.description
  const name = result.core.user_results.result.legacy.name
  const screen_name = result.core.user_results.result.legacy.screen_name
  const avatar = result.core.user_results.result.legacy.profile_image_url_https
  const restId = result.rest_id
  const userId = result.core.user_results.result.rest_id

  let isPorn = false
  let field = ''
  if (isPornography(full_text)) {
    isPorn = true
    field = 'full_text'
  } else if (isPornography(description)) {
    isPorn = true
    field = 'description'
  } else if (isPornography(name)) {
    isPorn = true
    field = 'name'
  } else if (isPornography(screen_name)) {
    isPorn = true
    field = 'screen_name'
  }

  // whitelist
  const whiteList = localStorage.getItem('twitter_responser_whitelist')
    ? JSON.parse(localStorage.getItem('twitter_responser_whitelist')!)
    : []
  const matchedWhiteList = whiteList.some(
    (item: any) => item.screen_name === screen_name,
  )
  if (matchedWhiteList) {
    isPorn = false
  }

  // `user` who you are `following`
  if (following) {
    isPorn = false
  }

  const tweet: TweetInfo = {
    id: restId,
    full_text,
    description,
    name,
    screen_name,
    userId,
    isPorn,
    field,
    restId,
    avatar,
    lang,
  }

  return tweet
}

export function parseTwitterResponserInfo(response: any): TweetInfo[] {
  const entries = response.data.threaded_conversation_with_injections_v2
    .instructions[0].entries as any[]
  const conversationEntries = entries.filter((entry: any) =>
    entry.entryId.includes('conversationthread-'),
  )
  return (
    conversationEntries
      .flatMap((entry: any) =>
        entry.content.items
          .filter((it: any) => it.item.itemContent.cursorType !== 'ShowMore')
          .map((it: any) => it.item.itemContent.tweet_results.result),
      )
      // "TweetWithVisibilityResults" | "Tweet"
      .filter((it) => it.__typename === 'Tweet')
      .map((result: any) => {
        return parseTwitterResponseResult(result)
      })
  )
}

async function updateDatabase(tweets: TweetInfo[]) {
  const db = await initIndexeddb()
  const tweetStore = db.transaction('tweet', 'readwrite').objectStore('tweet')
  await AsyncArray.forEach(tweets, async (it) => {
    await tweetStore.put(it)
  })
}

function get_cookie(cname: string) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; ++i) {
    const c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

async function blockUser(id: string) {
  // https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/post-blocks-create
  const p = new URLSearchParams([['user_id', id]])
  await fetch('https://twitter.com/i/api/1.1/blocks/create.json', {
    headers: {
      authorization:
        'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
      'content-type': 'application/x-www-form-urlencoded',
      'X-Csrf-Token': get_cookie('ct0'),
      'x-twitter-active-user': 'yes',
      'x-twitter-auth-type': 'OAuth2Session',
    },
    body: p.toString(),
    method: 'POST',
  })
}

async function handleTweetDetail(responseBody: any) {
  const tweets = parseTwitterResponserInfo(responseBody)
  const db = await initIndexeddb()
  const blockList = await AsyncArray.filter(
    tweets.map((it) => pick(it, 'userId', 'screen_name')),
    async (it) => {
      const blockUser = await db
        .transaction('block', 'readonly')
        .objectStore('block')
        .get(it.userId)
      return !!blockUser
    },
  )
  await updateDatabase(parseTwitterResponserInfo(responseBody))
  if (blockList.length === 0) {
    return
  }
  console.log('blockList: ', blockList)
  await AsyncArray.forEach(blockList, async (it) => {
    blockUser(it.userId)
  })
}

export function parseTwitterTimeline(responseBody: any): TweetInfo[] {
  return (
    responseBody.data.user.result.timeline_v2.timeline.instructions.find(
      (it: any) => it.type === 'TimelineAddEntries',
    ).entries as any[]
  )
    .map((it) => get(it, 'content.itemContent.tweet_results.result'))
    .filter((it: any) => it && it.__typename === 'Tweet')
    .map(parseTwitterResponseResult)
}

async function handleTimeline(responseBody: any) {
  // console.log('handleTimeline', responseBody)
  await updateDatabase(parseTwitterTimeline(responseBody))
}

function hookXHR(options: { after(xhr: XMLHttpRequest): string | void }) {
  const send = XMLHttpRequest.prototype.send

  XMLHttpRequest.prototype.send = function () {
    this.addEventListener('readystatechange', () => {
      if (this.readyState === 4) {
        const r = options.after(this)
        if (!r) {
          return
        }
        Object.defineProperty(this, 'responseText', {
          value: r,
          writable: true,
        })
        Object.defineProperty(this, 'response', {
          value: r,
          writable: true,
        })
      }
    })

    return send.apply(this, arguments as any)
  }
}

export async function initBlockUserIds() {
  const db = await initIndexeddb()
  const keys = await db.getAllKeys('block')
  keys.forEach((it) => blockUserIds.add(it))
}

export function filterTweets(
  response: any,
  isBlock: (tweet: TweetInfo) => boolean,
) {
  const entries = response.data.threaded_conversation_with_injections_v2
    .instructions[0].entries as any[]
  entries
    .filter((entry: any) => entry.entryId.includes('conversationthread-'))
    .forEach((entry) => {
      entry.content.items = entry.content.items.filter((it: any) => {
        if (it.item.itemContent.cursorType === 'ShowMore') {
          return true
        }
        const result = it.item.itemContent.tweet_results.result
        if (result.__typename !== 'Tweet') {
          return true
        }
        const tweet = parseTwitterResponseResult(result)
        // console.log('isBlock', tweet.screen_name, isBlock(tweet))
        return !isBlock(tweet)
      })
    })
  return response
}

export async function hijackXHR() {
  console.log('hijackXHR')
  hookXHR({
    after(xhr) {
      if (
        /https:\/\/twitter.com\/i\/api\/graphql\/.*\/TweetDetail/.test(
          xhr.responseURL,
        )
      ) {
        if (xhr.responseType != 'blob') {
          const response = JSON.parse(xhr.responseText)
          // only hijack TweetDetail API
          handleTweetDetail(response)
        }
      }
    },
  })
}
