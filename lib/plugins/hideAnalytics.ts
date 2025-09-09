import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideAnalytics(): BasePlugin {
  return {
    name: 'hideAnalytics',
    description: 'Hide Analytics',
    default: false,
    init() {
      hideElement([
        // tweet actions
        'div:has(> [href*="/status/"][href$="/analytics"]):not([data-testid="Dropdown"])',
        // desktop action dropdown menu
        '[data-testid="Dropdown"] > [data-testid="tweetEngagements"]',
      ])
    },
  }
}
