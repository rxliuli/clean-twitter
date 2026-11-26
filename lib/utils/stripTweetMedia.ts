type AnyRecord = Record<string, any>

function findInstructionsArrays(node: unknown, out: AnyRecord[][] = [], depth = 0): AnyRecord[][] {
  if (!node || typeof node !== 'object' || depth > 8) return out
  if (Array.isArray(node)) {
    for (const item of node) findInstructionsArrays(item, out, depth + 1)
    return out
  }
  const rec = node as AnyRecord
  if (Array.isArray(rec.instructions)) {
    out.push(rec.instructions)
  }
  for (const val of Object.values(rec)) {
    if (val && typeof val === 'object') {
      findInstructionsArrays(val, out, depth + 1)
    }
  }
  return out
}

function stripTimelineEntry(entry: AnyRecord | undefined, visited: WeakSet<object>): void {
  const content = entry?.content
  const entryType = content?.entryType ?? content?.__typename
  if (entryType === 'TimelineTimelineItem') {
    const itemContent = content.itemContent ?? content.content
    stripTweetResult(itemContent?.tweet_results?.result ?? itemContent?.tweet_result?.result, visited)
  } else if (entryType === 'TimelineTimelineModule') {
    for (const item of content?.items ?? []) {
      const itemContent = item?.item?.itemContent ?? item?.item?.content
      stripTweetResult(itemContent?.tweet_results?.result ?? itemContent?.tweet_result?.result, visited)
    }
  }
}

export function stripHomeTimelineMedia<T extends AnyRecord>(data: T): T {
  const visited = new WeakSet<object>()
  const instructionLists = findInstructionsArrays(data?.data)
  for (const instructions of instructionLists) {
    for (const instruction of instructions) {
      if (instruction?.entry) {
        stripTimelineEntry(instruction.entry, visited)
      }
      for (const entry of instruction?.entries ?? []) {
        stripTimelineEntry(entry, visited)
      }
    }
  }

  // Also support single-tweet responses (e.g. New X `TweetResultByRestId` prefetches on /home)
  const singleResult =
    data?.data?.tweet_result_by_rest_id?.result ?? data?.data?.tweetResult?.result
  if (singleResult) {
    stripTweetResult(singleResult, visited)
  }

  return data
}

function isPollCard(card: AnyRecord | undefined): boolean {
  if (!card || typeof card !== 'object') return false
  const name: string = card.legacy?.name ?? card.name ?? card.result?.legacy?.name ?? ''
  return typeof name === 'string' && name.startsWith('poll')
}

function stripNestedTweetFields(obj: AnyRecord, visited: WeakSet<object>): void {
  for (const [key, val] of Object.entries(obj)) {
    if (!val || typeof val !== 'object') continue
    if (/(?:quoted|retweet|repost)/i.test(key)) {
      const inner = (val as AnyRecord).result ?? val
      stripTweetResult(inner, visited)
    }
  }
}

function stripTweetResult(result: AnyRecord | undefined, visited = new WeakSet<object>()): void {
  if (!result || typeof result !== 'object') return
  if (visited.has(result)) return
  visited.add(result)

  const tweet = result.tweet ?? result
  if (!tweet || typeof tweet !== 'object') return
  if (tweet !== result) {
    if (visited.has(tweet)) return
    visited.add(tweet)
  }

  const isRelayTweet =
    'media_entities2' in tweet ||
    'details' in tweet ||
    'card_results' in tweet ||
    'article_results' in tweet

  // Classic X fields (and New X `legacy.retweeted_status_results` plural repost container)
  const legacy = tweet.legacy
  if (legacy && typeof legacy === 'object') {
    if (legacy.entities && 'media' in legacy.entities) {
      delete legacy.entities.media
    }
    if ('extended_entities' in legacy) {
      delete legacy.extended_entities
    }
    stripNestedTweetFields(legacy, visited)
  }

  // New X Relay fields: keep `media_entities2` as an empty array so Relay doesn't treat the field as missing
  if (Array.isArray(tweet.media_entities2)) {
    tweet.media_entities2 = []
  }
  if (tweet.details && typeof tweet.details === 'object' && Array.isArray(tweet.details.media_entities2)) {
    tweet.details.media_entities2 = []
  }
  if (tweet.note_tweet?.note_tweet_results?.result?.media) {
    tweet.note_tweet.note_tweet_results.result.media = { inline_media: [] }
  }

  if (tweet.card && !isPollCard(tweet.card)) {
    if (isRelayTweet) {
      tweet.card = null
    } else {
      delete tweet.card
    }
  }
  if (tweet.card_results && !isPollCard(tweet.card_results)) {
    if (isRelayTweet) {
      tweet.card_results = null
    } else {
      delete tweet.card_results
    }
  }

  if (tweet.article) {
    if (isRelayTweet) {
      tweet.article = null
    } else {
      delete tweet.article
    }
  }
  if (tweet.article_results) {
    if (isRelayTweet) {
      tweet.article_results = null
    } else {
      delete tweet.article_results
    }
  }

  // Recursively strip any nested quote/repost tweet results regardless of Classic vs Relay field name
  stripNestedTweetFields(tweet, visited)
}
