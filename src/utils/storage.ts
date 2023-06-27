import type { Storage } from 'webextension-polyfill'
import { EventEmitter } from 'eventemitter3'

function isBrowserExtension() {
  // @ts-expect-error
  if (typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined') {
    return true
  }
  // @ts-expect-error
  if (typeof browser !== 'undefined') {
    return true
  }
  return import.meta.env.VITE_IN_EXTENSION === 'true'
}

async function getStorage(
  type: 'sync' | 'local',
): Promise<Storage.StorageArea> {
  if (isBrowserExtension()) {
    const Browser = (await import('webextension-polyfill')).default
    return Browser.storage[type]
  }
  const Key = 'browser-extension-data'
  const em = new EventEmitter<{
    change(items: any): void
  }>()
  return {
    get(_keys) {
      const s = localStorage.getItem(Key)
      return s ? JSON.parse(s) : {}
    },
    async set(items) {
      const s = localStorage.getItem(Key)
      const data = s ? JSON.parse(s) : {}
      localStorage.setItem(Key, JSON.stringify({ ...data, ...items }))
    },
    async remove(keys) {
      const s = localStorage.getItem(Key)
      const data = s ? JSON.parse(s) : {}
      for (const key of keys) {
        delete data[key]
      }
      localStorage.setItem(Key, JSON.stringify(data))
    },
    async clear() {
      localStorage.removeItem(Key)
    },
    onChanged: {
      addListener(cb) {
        em.on('change', cb)
      },
      removeListener(cb) {
        em.off('change', cb)
      },
      hasListener(cb) {
        return em.listeners('change').includes(cb)
      },
      hasListeners() {
        return em.listeners('change').length > 0
      },
    },
  }
}

export const getSyncStorage = async () => await getStorage('sync')
