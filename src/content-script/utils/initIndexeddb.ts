import { DBSchema, IDBPDatabase, openDB } from 'idb'
import { once } from '@liuli-util/async'

export interface TweetInfo {
  id: string // 唯一 id，目前与 restId 相同
  full_text: string // 全部的文本
  description: string // 个人简介
  name: string // 名称
  screen_name: string // 用户名
  isPorn: boolean // 是否为色情
  field: string // 色情字段
  restId: string // tweet id
  avatar: string // 头像
  lang: string
}

export interface AllDBSchema extends DBSchema {
  config: {
    key: string
    value: {
      key: string
      value: any
    }
    indexes: {
      key: string
    }
  }
  tweet: {
    key: string
    value: TweetInfo
  }
}

export const initIndexeddb = once(
  async (): Promise<IDBPDatabase<AllDBSchema>> =>
    await openDB<AllDBSchema>('clean-twitter', 10, {
      upgrade(db) {
        const names = db.objectStoreNames
        if (!names.contains('config')) {
          db.createObjectStore('config', {
            keyPath: 'key',
          })
        }
        if (!names.contains('tweet')) {
          const kvStorage = db.createObjectStore('tweet', {
            keyPath: 'id',
          })
        }
      },
    }),
)
