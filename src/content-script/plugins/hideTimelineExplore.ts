import { t } from '../../constants/i18n'
import { addCSS, generateHideCSS } from '../../utils/css'
import { BasePlugin } from './plugin'

export function hideTimelineExplore(): BasePlugin {
  return {
    name: 'hideTimelineExplore',
    description: t('plugin.hideTimelineExplore.name'),
    default: true,
    init() {
      addCSS(
        generateHideCSS(
          `[aria-label="${t('symbol.HomeTimeline')}"] [aria-label="${t(
            'symbol.TimelineExplore',
          )}"]`,
          `[role="tablist"]:has(> [role="presentation"])`,
        ),
      )
    },
  }
}
