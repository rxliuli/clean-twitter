export interface BasePlugin {
  name: string
  description: string
  default: boolean
  init?(): void
  observer?(): void
}
