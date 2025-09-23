import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideAnalytics(): BasePlugin {
  return {
    name: 'hideAnalytics',
    description: 'Hide Analytics',
    init() {
      hideElement([
        // tweet actions
        'div:has(> [href*="/status/"][href$="/analytics"]):not([data-testid="Dropdown"])',
        // desktop action dropdown menu
        '[data-testid="Dropdown"] > [data-testid="tweetEngagements"]',
        // desktop profile analytics link
        '[data-testid="analytics-preview"]',
      ])
    },
  }
}
