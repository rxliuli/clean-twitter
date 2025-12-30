import { Checkbox } from './ui/checkbox'
import { Info, ExternalLink } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip'

interface PluginOptionProps {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  tooltip?: string
  screenshotUrl?: string
}

export function PluginOption({
  id,
  label,
  checked,
  onCheckedChange,
  tooltip,
  screenshotUrl,
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
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="inline-flex">
              <Info className="h-3 w-3 text-muted-foreground cursor-help" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-[250px] text-left">
            <div className="space-y-2">
              <p className="text-xs leading-relaxed">{tooltip}</p>
              {screenshotUrl && (
                <a
                  href={screenshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>View screenshot</span>
                </a>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
