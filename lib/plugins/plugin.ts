import { Config } from '../config'

export interface BasePlugin {
  name: keyof Config
  description: string
  default: boolean
  init(): void
  observer?(): void
}
