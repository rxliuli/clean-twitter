import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideSearchExplore(): BasePlugin {
  return {
    name: 'hideSearchExplore',
    description: 'Hide Search Explore',
    init() {
      hideElement([
        ':has([href="/settings/explore"]) [aria-labelledby^="accessible-list-"]',
        ':has([href="/settings/explore"]) [data-testid="ScrollSnap-List"]',
      ])
    },
  }
}
