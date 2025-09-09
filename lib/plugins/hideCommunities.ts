import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideCommunities(): BasePlugin {
  return {
    name: 'hideCommunities',
    description: 'Hide Communities',
    default: false,
    init() {
      hideElement([
        // desktop
        '[role="navigation"] > a[href$="/communities"]',
        // desktop dropdown menu
        '[data-testid="Dropdown"] > [href^="/i/communitynotes/noterequest/"]',
        // mobile
        'div:has( > a[href$="/communities"])',
      ])
    },
  }
}
