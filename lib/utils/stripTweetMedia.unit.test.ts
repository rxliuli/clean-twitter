import { describe, expect, it } from 'vitest'
import HomeTimeline from './assets/HomeTimeline.json'
import HomeLatestTimeline from './assets/HomeLatestTimeline.json'
import { stripHomeTimelineMedia } from './stripTweetMedia'

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v))
}

function collectTweets(data: any): any[] {
  const out: any[] = []
  const visit = (result: any) => {
    if (!result) return
    const tweet = result.tweet ?? result
    if (!tweet || typeof tweet !== 'object') return
    out.push(tweet)
    if (tweet.quoted_status_result?.result) visit(tweet.quoted_status_result.result)
    if (tweet.legacy?.retweeted_status_result?.result) {
      visit(tweet.legacy.retweeted_status_result.result)
    }
  }
  const instructions = data?.data?.home?.home_timeline_urt?.instructions ?? []
  for (const instr of instructions) {
    for (const entry of instr?.entries ?? []) {
      if (entry.content?.entryType === 'TimelineTimelineItem') {
        visit(entry.content.itemContent?.tweet_results?.result)
      } else if (entry.content?.entryType === 'TimelineTimelineModule') {
        for (const item of entry.content?.items ?? []) {
          visit(item?.item?.itemContent?.tweet_results?.result)
        }
      }
    }
  }
  return out
}

describe('stripHomeTimelineMedia', () => {
  it('removes entities.media, extended_entities, and media cards from every tweet', () => {
    const fixture = clone(HomeTimeline)

    const before = collectTweets(fixture)
    expect(before.length).toBeGreaterThan(0)
    expect(
      before.some((t) => t.legacy?.entities?.media || t.legacy?.extended_entities),
    ).toBe(true)
    expect(
      before.some((t) => t.card && !t.card.legacy?.name?.startsWith('poll')),
    ).toBe(true)

    const result = stripHomeTimelineMedia(fixture)
    expect(result).toBe(fixture)

    const after = collectTweets(fixture)
    expect(after.length).toBe(before.length)
    for (const tweet of after) {
      expect(tweet.legacy?.entities?.media).toBeUndefined()
      expect(tweet.legacy?.extended_entities).toBeUndefined()
      if (tweet.card) {
        expect(tweet.card.legacy?.name).toMatch(/^poll/)
      }
      expect(tweet.article).toBeUndefined()
    }
  })

  it('preserves non-media content (text, urls, user mentions)', () => {
    const fixture = clone(HomeTimeline)
    const firstTextTweet = collectTweets(fixture).find(
      (t) => t.legacy?.full_text && !t.legacy?.entities?.media,
    )
    expect(firstTextTweet).toBeDefined()
    const originalText = firstTextTweet!.legacy.full_text
    const originalUrls = firstTextTweet!.legacy.entities?.urls

    stripHomeTimelineMedia(fixture)

    const afterTweets = collectTweets(fixture)
    const sameTweet = afterTweets.find(
      (t) => t.legacy?.full_text === originalText,
    )
    expect(sameTweet).toBeDefined()
    expect(sameTweet!.legacy.entities.urls).toEqual(originalUrls)
    expect(sameTweet!.legacy.entities.hashtags).toBeDefined()
    expect(sameTweet!.legacy.entities.user_mentions).toBeDefined()
  })

  it('strips media from the Following tab (HomeLatestTimeline) too', () => {
    const fixture = clone(HomeLatestTimeline)
    const before = collectTweets(fixture)
    expect(before.length).toBeGreaterThan(0)
    expect(
      before.some((t) => t.legacy?.entities?.media || t.legacy?.extended_entities),
    ).toBe(true)

    stripHomeTimelineMedia(fixture)

    const after = collectTweets(fixture)
    expect(after.length).toBe(before.length)
    for (const tweet of after) {
      expect(tweet.legacy?.entities?.media).toBeUndefined()
      expect(tweet.legacy?.extended_entities).toBeUndefined()
      expect(tweet.article).toBeUndefined()
      if (tweet.card) {
        expect(tweet.card.legacy?.name).toMatch(/^poll/)
      }
    }
  })

  it('is a no-op on unrelated payloads', () => {
    expect(stripHomeTimelineMedia({} as any)).toEqual({})
    expect(stripHomeTimelineMedia({ data: {} } as any)).toEqual({ data: {} })
  })
})
