import { Checkbox } from './ui/checkbox'
import { Info } from 'lucide-react'

interface PluginOptionProps {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  tooltip?: string
}

export function PluginOption({
  id,
  label,
  checked,
  onCheckedChange,
  tooltip,
}: PluginOptionProps) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2 flex-1">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
      {tooltip && (
        <div className="group relative">
          <Info className="h-3 w-3 text-muted-foreground cursor-help" />
          <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-popover text-popover-foreground text-xs rounded-md shadow-md border z-10">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  )
}
