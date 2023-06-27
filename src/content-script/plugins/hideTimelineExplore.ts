import { t } from '../../constants/i18n'
import { addCSS, generateHideCSS } from '../../utils/css'
import { BasePlugin } from './plugin'

export function hideTimelineExplore(): BasePlugin {
  return {
    name: 'hideTimelineExplore',
    description: t('symbol.TimelineExplore'),
    default: true,
    init() {
      console.log(
        'selector',
        generateHideCSS(
          `[aria-label="${t('symbol.HomeTimeline')}"] [aria-label="${t(
            'symbol.TimelineExplore',
          )}"]`,
          `[role="tablist"]:has(> [role="presentation"])`,
        ),
      )
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
