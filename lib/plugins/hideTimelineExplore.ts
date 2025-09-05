import { cleanCSS, hasCSS, hideElement, generateHideCSS } from '../css'
import { BasePlugin } from './plugin'

function hideSearchExplore() {
  if (location.pathname !== '/explore') {
    cleanCSS('hideTimelineExplore')
    return
  }
  if (hasCSS('hideTimelineExplore')) {
    return
  }
  hideElement(
    generateHideCSS(
      `[aria-label="Timeline: Explore"]`,
      `[role="tablist"]:has(> [role="presentation"])`,
    ),
    'hideTimelineExplore',
  )
  hideElement(
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
    description: 'Hide Timeline Explore',
    default: false,
    init: hideSearchExplore,
    observer: hideSearchExplore,
  }
}
