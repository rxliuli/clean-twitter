import { ContentScriptContext } from '#imports'
import { Config } from '../config'

export interface BasePlugin {
  name: keyof Config
  description: string
  init(ctx: ContentScriptContext): void | (() => void)
  observer?(): void | (() => void)
}
