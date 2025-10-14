import { hideElement, hideElementOnDesktop, hideElementOnMobile } from '../css'
import { BasePlugin } from './plugin'

export function hideAnalytics(): BasePlugin {
  return {
    name: 'hideAnalytics',
    description: 'Hide Analytics',
    init() {
      hideElementOnDesktop([
        // tweet actions
        'div:has(> [href*="/status/"][href$="/analytics"]):not([data-testid="Dropdown"])',
        // desktop action dropdown menu
        '[data-testid="Dropdown"] > [data-testid="analytics"]',
        // desktop profile analytics link
        '[data-testid="analytics-preview"]',
      ])
      hideElementOnMobile([
        // tweet actions
        '[role="group"] > div:has(> [href*="/status/"][href$="/analytics"])',
        // mobile action dropdown menu
        '[data-testid="sheetDialog"] > [data-testid="analytics"]'
      ])
    },
  }
}
