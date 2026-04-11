type AnyRecord = Record<string, any>

export function stripHomeTimelineMedia<T extends AnyRecord>(data: T): T {
  const instructions = data?.data?.home?.home_timeline_urt?.instructions
  if (!Array.isArray(instructions)) return data
  for (const instruction of instructions) {
    for (const entry of instruction?.entries ?? []) {
      const entryType = entry?.content?.entryType
      if (entryType === 'TimelineTimelineItem') {
        stripTweetResult(entry.content.itemContent?.tweet_results?.result)
      } else if (entryType === 'TimelineTimelineModule') {
        for (const item of entry.content?.items ?? []) {
          stripTweetResult(item?.item?.itemContent?.tweet_results?.result)
        }
      }
    }
  }
  return data
}

function stripTweetResult(result: AnyRecord | undefined): void {
  if (!result) return
  const tweet = result.tweet ?? result
  if (!tweet || typeof tweet !== 'object') return

  const legacy = tweet.legacy
  if (legacy) {
    if (legacy.entities && 'media' in legacy.entities) {
      delete legacy.entities.media
    }
    if ('extended_entities' in legacy) {
      delete legacy.extended_entities
    }
    if (legacy.retweeted_status_result?.result) {
      stripTweetResult(legacy.retweeted_status_result.result)
    }
  }

  if (tweet.card) {
    const name: string = tweet.card.legacy?.name ?? ''
    if (!name.startsWith('poll')) {
      delete tweet.card
    }
  }

  if (tweet.article) {
    delete tweet.article
  }

  if (tweet.quoted_status_result?.result) {
    stripTweetResult(tweet.quoted_status_result.result)
  }
}
