import {
  cleanCSS,
  hasCSS,
  hideElement,
  generateHideCSS,
  insertCSS,
} from '../css'
import { BasePlugin } from './plugin'

function hideSearchExplore() {
  if (location.pathname !== '/explore') {
    cleanCSS('hideTimelineExplore')
    return
  }
  if (hasCSS('hideTimelineExplore')) {
    return
  }
  hideElement([
    '[aria-label="Timeline: Explore"]',
    '[role="tablist"]:has(> [role="presentation"])',
  ])
  insertCSS(
    `
    @media (max-width: 500px) {
      header[role="banner"] > * {
        height: 54px !important;
      }
    }
  `,
  )
}

export function hideTimelineExplore(): BasePlugin {
  return {
    name: 'hideTimelineExplore',
    description: 'Hide Timeline Explore',
    init: hideSearchExplore,
    observer: hideSearchExplore,
  }
}
