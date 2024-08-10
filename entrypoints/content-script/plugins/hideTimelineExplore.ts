import { t } from '../../constants/i18n'
import { addCSS, cleanCSS, generateHideCSS, hasCSS } from '../../utils/css'
import { BasePlugin } from './plugin'

function hideSearchExplore() {
  if (location.pathname !== '/explore') {
    cleanCSS('hideTimelineExplore')
    return
  }
  if (hasCSS('hideTimelineExplore')) {
    return
  }
  addCSS(
    generateHideCSS(
      `[aria-label="${t('symbol.TimelineExplore')}"]`,
      `[role="tablist"]:has(> [role="presentation"])`,
    ),
    'hideTimelineExplore',
  )
  addCSS(
    `
    @media (max-width: 500px) {
      header[role="banner"] > * {
        height: 54px !important;
      }
    }
  `,
    'hideTimelineExplore',
  )
}

export function hideTimelineExplore(): BasePlugin {
  return {
    name: 'hideTimelineExplore',
    description: t('plugin.hideTimelineExplore.name'),
    default: false,
    init: hideSearchExplore,
    observer: hideSearchExplore,
  }
}
