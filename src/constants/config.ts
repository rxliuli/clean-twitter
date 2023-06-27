import { plugins } from '../content-script/plugins'
import { getSyncStorage } from '../utils/storage'
import { Lang } from './langs'
import type { Storage } from 'webextension-polyfill'

export interface Config {
  language?: Lang // default: Display language
  hideBlueBadge?: boolean // default: true
  hideDiscoverMore?: boolean // default: true
  hideHomeTabs?: boolean // default: true
  hideRightSidebar?: boolean // default: false
  hideSearchAndExplore?: boolean // default: true
  hideOther?: boolean // default: true
}

export const defaultConfig = plugins().reduce(
  (acc, it) => ({ ...acc, [it.name]: it.default }),
  {
    language: navigator.language as Lang,
  } as any,
) as Config

export async function getConfig() {
  return {
    ...defaultConfig,
    ...(await (
      await getSyncStorage()
    ).get([...plugins().map((it) => it.name), 'language'])),
  } as Config
}

export async function setConfig(config: Partial<Config>) {
  await (await getSyncStorage()).set(config)
}

export async function onChange(
  cb: (changes: Storage.StorageAreaOnChangedChangesType) => void,
) {
  ;(await getSyncStorage()).onChanged.addListener(cb)
  return async () => (await getSyncStorage()).onChanged.removeListener(cb)
}
