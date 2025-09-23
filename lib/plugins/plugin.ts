import { Config } from '../config'

export interface BasePlugin {
  name: keyof Config
  description: string
  init(): void | (() => void) | PromiseLike<void | (() => void)>
  observer?(): void
}
