import { hideElement, hideElementOnDesktop, hideElementOnMobile } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavPremium(): BasePlugin {
  return {
    name: 'hideNavPremium',
    description: 'Premium',
    init() {
      hideElement([
        '[data-testid="premium-hub-tab"]',
        '[href="/i/premium"]',
        '[href="/i/premium_sign_up"]',
        '[href="/i/verified-orgs-signup"]',
        '[href="/i/premium_tier_switch"]',
        'aside:has(>[href^="/i/premium_sign_up"])',
        'aside [role="complementary"]:has(a[href^="/i/premium_sign_up"])',
        'aside section:has(a[href^="/i/premium_sign_up"])',
      ])
    },
  }
}
