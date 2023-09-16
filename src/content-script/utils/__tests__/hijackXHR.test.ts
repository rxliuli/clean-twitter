import { expect, it } from 'vitest'
import { parseTwitterResponserInfo, parseTwitterTimeline } from '../hijackXHR'
import tweetDetail from './assets/tweetDetail.json'
import timeline from './assets/timeline.json'
import { TweetInfo } from '../initIndexeddb'

it('parseTwitterResponserInfo', () => {
  const r = parseTwitterResponserInfo(tweetDetail)
  expect(r).deep.eq([
    {
      full_text: '@aoi_nishimata この構ってちゃんポーズが可愛すぎて尊い',
      description:
        '漫画・アニメ・声優・レイヤー大好き\n無言フォロー大歓迎‼\n推し🧸👑🍏🐼🪭🧸🍼🍖⚡💎💫🍮🀄🔥🐷🍑🐓🥧💊💙',
      name: 'ゼロ🧸👑🍏🐼🪭🧸🍼🍖⚡💎💫🍮🀄🔥🐷🍑🐓',
      screen_name: '3GXAt2etoYJ9ivO',
      isPorn: true,
      field: 'full_text',
      restId: '1698911099025068275',
      id: '1698911099025068275',
      avatar:
        'https://pbs.twimg.com/profile_images/1492003043818500098/fXLoMYqR_normal.jpg',
    },
    {
      full_text: '@3GXAt2etoYJ9ivO 視線を感じます🤣',
      description:
        '【Japanese Illustrator】Disney & STARWARS Art・伊勢丹.三越.高島屋個展・JAあきたこまち米袋・SHUFFLE!・俺たちに翼はない・それは舞い散る桜のように・月に寄りそう乙女の作法【お仕事依頼はTwitterDM or work@jokertype.com 】 猫18匹と同居🐱',
      name: '西又 葵［Aoi Nishimata］',
      screen_name: 'aoi_nishimata',
      isPorn: false,
      field: 'full_text',
      restId: '1698915213247173085',
      id: '1698915213247173085',
      avatar:
        'https://pbs.twimg.com/profile_images/1416775971135496194/Fl9Jzfa4_normal.jpg',
    },
  ] as TweetInfo[])
})

it('parseTimeline', () => {
  const r = parseTwitterTimeline(timeline)
  console.log(r)
})
