import { DBSchema, IDBPDatabase, openDB } from 'idb'

export interface TweetInfo {
  id: string // 唯一 id，目前与 restId 相同
  full_text: string // 全部的文本
  description: string // 个人简介
  name: string // 名称
  screen_name: string // 用户名
  userId: string // 用户 id
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
  block: {
    key: string
    value: {
      id: string
      username: string
    }
    indexes: {
      username: string
    }
  }
}

export const initIndexeddb = async (): Promise<IDBPDatabase<AllDBSchema>> =>
  await openDB<AllDBSchema>('clean-twitter-database', 1, {
    upgrade(db) {
      const names = db.objectStoreNames
      if (!names.contains('config')) {
        db.createObjectStore('config', {
          keyPath: 'key',
        })
      }
      if (!names.contains('tweet')) {
        db.createObjectStore('tweet', {
          keyPath: 'id',
        })
      }
      if (!names.contains('block')) {
        const store = db.createObjectStore('block', {
          keyPath: 'id',
        })
        store.createIndex('username', 'username')
      }
    },
  })
