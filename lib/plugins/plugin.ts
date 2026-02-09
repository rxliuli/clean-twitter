export interface BasePlugin {
  name: string
  description: string
  init(): void | (() => void)
  observer?(): void | (() => void)
}
