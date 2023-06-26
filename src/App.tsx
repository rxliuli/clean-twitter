import { useEffect, useState } from 'react'
import Browser from 'webextension-polyfill'
import { getLanguage } from './constants/i18n'

function useBrowserStorage<T extends object>(
  type: 'sync' | 'local',
  keys: (keyof T)[],
  defaultValue: T,
): [T, (value: Partial<T>) => Promise<void>] {
  const [v, set] = useState(defaultValue)
  useEffect(() => {
    const get = async () => {
      const result = (await Browser.storage[type].get(keys)) as T
      set({
        ...result,
        ...defaultValue,
      })
    }
    get()
  }, [])
  return [
    defaultValue,
    async (newV) => {
      set({
        ...v,
        newV,
      })
      await Browser.storage[type].set(newV)
    },
  ]
}

function App() {
  const [v, setV] = useBrowserStorage(
    'sync',
    ['selectedFollowingTab', 'hideDiscoverMore', 'language'],
    {
      selectedFollowingTab: true,
      hideDiscoverMore: true,
      language: getLanguage(),
    },
  )
  return <div>{JSON.stringify(v, null, 2)}</div>
}

export default App
