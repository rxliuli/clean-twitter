import { useEffect, useState } from 'react'
import Browser from 'webextension-polyfill'
import { getLanguage, langs, t } from './constants/i18n'
import { Lang } from './constants/langs'

function useBrowserStorage<T extends object>(
  type: 'sync' | 'local',
  keys: (keyof T)[],
  defaultValue: T,
): [T, (value: Partial<T>) => Promise<void>] {
  const [v, set] = useState(defaultValue)
  useEffect(() => {
    const get = async () => {
      const result = (await Browser.storage[type].get(keys)) as T
      set({ ...result, ...defaultValue })
    }
    get()
  }, [])
  return [
    v,
    async (newV) => {
      set({ ...v, ...newV })
      await Browser.storage[type].set(newV)
    },
  ]
}

function App() {
  const [config, setConfig] = useBrowserStorage(
    'sync',
    ['hideHomeTabs', 'hideBlueBadge', 'language'],
    {
      hideHomeTabs: false,
      hideBlueBadge: false,
      language: getLanguage(),
    },
  )
  return (
    <form className="min-w-[600px] space-y-4 p-4">
      <header>
        <h2 className={'flex-grow text-lg font-bold'}>配置</h2>
      </header>
      <div className="flex items-center space-x-2">
        <label htmlFor="language" className="font-bold">
          {t('form.language')}:{' '}
        </label>
        <select
          id="language"
          onChange={(ev) => setConfig({ language: ev.target.value as Lang })}
          className="rounded bg-white px-2 text-black dark:bg-black dark:text-white outline-none"
        >
          {langs.map((it) => (
            <option
              key={it.value}
              selected={it.value === config.language}
              value={it.value}
            >
              {it.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="hideHomeTabs" className="font-bold">
          {t('form.hideHomeTabs')}:{' '}
        </label>
        <input
          type="checkbox"
          id="hideHomeTabs"
          checked={config.hideHomeTabs}
          onChange={(ev) => setConfig({ hideHomeTabs: ev.target.checked })}
          className="border border-gray-300 rounded-md p-2"
        ></input>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="hideBlueBadge" className="font-bold">
          {t('form.hideBlueBadge')}:{' '}
        </label>
        <input
          type="checkbox"
          id="hideBlueBadge"
          checked={config.hideBlueBadge}
          onChange={(ev) => setConfig({ hideBlueBadge: ev.target.checked })}
          className="border border-gray-300 rounded-md p-2"
        ></input>
      </div>
    </form>
  )
}

export default App
