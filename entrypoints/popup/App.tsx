import { useState } from 'react'
import { useAsync } from 'react-use'
import { Config, getConfig, setConfig } from '../../lib/config'
import { plugins } from '@/lib/plugins'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

function useConfig(): {
  config: Config
  set: (value: Partial<Config>) => Promise<void>
  loading: boolean
} {
  const [v, setV] = useState<Config>({})
  const state = useAsync(async () => {
    const result = await getConfig()
    setV(result)
  })
  return {
    config: v || {},
    set: async (newV) => {
      const config = { ...v, ...newV }
      setV(config)
      await setConfig(config)
    },
    loading: state.loading,
  }
}
export function App() {
  const { config, set, loading } = useConfig()

  // 计算已选中的插件数量
  const enabledPlugins = plugins.filter(
    (plugin) => config[plugin.name] ?? false,
  )
  const isAllSelected = enabledPlugins.length === plugins.length
  const isPartialSelected =
    enabledPlugins.length > 0 && enabledPlugins.length < plugins.length

  // 全选/取消全选功能
  const handleSelectAll = () => {
    const newConfig: Partial<Config> = {}
    plugins.forEach((plugin) => {
      newConfig[plugin.name] = !isAllSelected
    })
    set(newConfig)
  }

  return (
    <div className="min-w-[240px] space-y-4 p-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Clean Twitter</h2>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              window.open('https://discord.gg/gFhKUthc88', '_blank')
            }
            title="Join our Discord"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-blue-500"
            >
              <path
                d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </div>
      </header>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {/* 全选/取消全选 */}
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Checkbox
              id="select-all"
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              className={
                isPartialSelected ? 'data-[state=checked]:bg-primary/50' : ''
              }
            />
            <label htmlFor="select-all" className="font-medium text-sm">
              {isAllSelected ? 'Deselect All' : 'Select All'} (
              {enabledPlugins.length}/{plugins.length})
            </label>
          </div>

          {/* 插件列表 */}
          <div className="space-y-3">
            {plugins.map((plugin) => (
              <div className="flex items-center space-x-3" key={plugin.name}>
                <Checkbox
                  id={plugin.name}
                  checked={config[plugin.name] ?? false}
                  onCheckedChange={(checked) => set({ [plugin.name]: checked })}
                />
                <label
                  htmlFor={plugin.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {plugin.description}
                </label>
              </div>
            ))}
          </div>

          {/* 其他扩展链接 */}
          <div className="pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => window.open('https://store.rxliuli.com/', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm">Our other extensions</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
