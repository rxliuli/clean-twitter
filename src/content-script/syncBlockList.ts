import { AsyncArray } from '@liuli-util/async'
import { initIndexeddb } from './utils/initIndexeddb'
import Browser from 'webextension-polyfill'
import dayjs from 'dayjs'

const blockList =
  'https://github.com/daymade/Twitter-Block-Porn/raw/master/lists/all.json'

function oncePerDay<T extends (...args: any[]) => any>(
  fn: T,
  cacheKey: string,
): T {
  return async function (...args) {
    const today = dayjs().format('YYYY-MM-DD hh') // 获取 YYYY-MM-DD 格式的日期

    const cachedData = localStorage.getItem(cacheKey)
    if (cachedData) {
      return JSON.parse(cachedData).result
    }

    const result = await fn(...args)
    localStorage.setItem(cacheKey, JSON.stringify({ date: today, result }))
    return result
  } as T
}

export const syncBlockList = oncePerDay(async () => {
  const db = await initIndexeddb()
  const list = (await Browser.runtime.sendMessage({
    action: 'get',
    url: blockList,
  })) as {
    id_str: string
    screen_name: string
  }[]
  list.push({
    id_str: '625171725',
    screen_name: 'rihenara__doll',
  })
  const updateList = await AsyncArray.filter(
    list,
    async (it) => !(await db.getKey('block', it.id_str)),
  )
  console.log('updateList', updateList)
  if (updateList.length === 0) {
    return
  }
  await AsyncArray.forEach(updateList, async (it) => {
    await db.put('block', {
      id: it.id_str,
      username: it.screen_name,
    })
  })
}, 'syncBlockList')
