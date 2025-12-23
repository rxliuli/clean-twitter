import { hideElementOnDesktop, hideElementOnMobile } from '../css'
import { BasePlugin } from './plugin'

export function hideActionAnalytics(): BasePlugin {
  return {
    name: 'hideActionAnalytics',
    description: 'Hide Analytics',
    init() {
      hideElementOnDesktop([
        // tweet actions
        '[data-testid="cellInnerDiv"] div:has(> [href*="/status/"][href$="/analytics"]):not([data-testid="Dropdown"])',
        // desktop action dropdown menu
        '[data-testid="Dropdown"] > [data-testid="analytics"]',
        // desktop profile analytics link
        '[data-testid="analytics-preview"]',
      ])
      hideElementOnMobile([
        // tweet actions
        '[data-testid="cellInnerDiv"] [role="group"] > div:has(> [href*="/status/"][href$="/analytics"])',
        // mobile action dropdown menu
        '[data-testid="sheetDialog"] > [data-testid="analytics"]',
      ])
    },
  }
}
