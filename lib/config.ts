import { plugins } from './plugins'
import { BasePlugin } from './plugins/plugin'
import { hideNavChat } from './plugins/hideNavChat'
import { hideNavGrok } from './plugins/hideNavGrok'
import { hideNavBookmarks } from './plugins/hideBookmarks'
import { hideNavProfile } from './plugins/hideNavProfile'
import { hideNavMore } from './plugins/hideNavMore'
import { hideActionGrok } from './plugins/hideActionGrok'
import { hideActionAnalytics } from './plugins/hideActionAnalytics'
import { hideActionBookmarks } from './plugins/hideActionBookmarks'
import { textMode } from './plugins/textMode'

const disabledByDefault = new Set(
  [
    hideNavChat(),
    hideNavGrok(),
    hideNavBookmarks(),
    hideNavProfile(),
    hideNavMore(),
    hideActionGrok(),
    hideActionAnalytics(),
    hideActionBookmarks(),
    textMode(),
  ].map((it) => it.name),
)

const enabledPlugins: BasePlugin[] = plugins.filter(
  (it) => !disabledByDefault.has(it.name),
)

export const DEFAULT_CONFIG: Record<string, boolean> = enabledPlugins.reduce(
  (config, plugin) => {
    config[plugin.name] = true
    return config
  },
  {} as Record<string, boolean>,
)

export async function getConfig() {
  const stored =
    (
      await browser.storage.sync.get<{
        config: Record<string, boolean>
      }>('config')
    ).config ?? {}
  return {
    ...DEFAULT_CONFIG,
    ...stored,
  }
}

export async function setConfig(config: Partial<Record<string, boolean>>) {
  await browser.storage.sync.set({ config })
}
