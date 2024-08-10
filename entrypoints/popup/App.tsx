import { useState } from 'react'
import { useMount } from 'react-use'
import i18next from 'i18next'
import {
  Config,
  defaultConfig,
  getConfig,
  setConfig,
} from '../constants/config'
import { initI18n, langs, t } from '../constants/i18n'
import { Lang } from '../constants/langs'
import { plugins } from '../content-script/plugins'

function useConfig(): [Config, (value: Partial<Config>) => Promise<void>] {
  const [v, set] = useState<Config>(defaultConfig)
  useMount(async () => {
    const result = await getConfig()
    await initI18n()
    await i18next.changeLanguage(result.language)
    set(result)
  })
  return [
    v,
    async (newV) => {
      set({ ...v, ...newV })
      await setConfig(newV)
    },
  ]
}

export function App() {
  const [config, setConfig] = useConfig()
  return (
    <form className="min-w-[400px] space-y-4 p-4">
      <header>
        <h2 className={'flex-grow text-lg font-bold'}>{t('config.title')}</h2>
      </header>
      <div className="flex items-center space-x-2">
        <label htmlFor="language" className="font-bold">
          {t('config.language')}:{' '}
        </label>
        <select
          id="language"
          value={config.language}
          onChange={async (ev) => {
            await setConfig({ language: ev.target.value as Lang })
            location.reload()
          }}
          className="rounded bg-white px-2 text-black dark:bg-black dark:text-white outline-none"
        >
          {langs.map((it) => (
            <option key={it.value} value={it.value}>
              {it.label}
            </option>
          ))}
        </select>
      </div>
      {plugins().map((it) => (
        <div className="flex items-center space-x-2" key={it.name}>
          <input
            type="checkbox"
            id={it.name}
            checked={(config as any)[it.name] as boolean}
            onChange={(ev) => setConfig({ [it.name]: ev.target.checked })}
            className="border border-gray-300 rounded-md p-2"
          ></input>
          <label htmlFor={it.name} className="font-bold">
            {it.description}
          </label>
        </div>
      ))}
    </form>
  )
}
