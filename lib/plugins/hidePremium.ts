import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hidePremium(): BasePlugin {
  return {
    name: 'hidePremium',
    description: 'Hide Premium',
    default: false,
    init() {
      hideElement([
        // timeline
        'div[data-testid="cellInnerDiv"]:has([href="/i/premium_sign_up?referring_page=timeline_prompt"])',
        '* > [href="/i/verified-choose"]',
        '* > [href="/i/premium"]',
        'div[data-testid="cellInnerDiv"]:has([data-testid="inlinePrompt-primaryAction"] [href="https://pro.x.com"])',
        // tweet action
        '[href*="/status/"][href$="/quick_promote_web/targeting"]',
        // desktop dropdown menu
        '[data-testid="Dropdown"] > [data-testid="subscribe"]',
        // sidebar
        '[role="navigation"] > [href="/i/premium_sign_up"]',
        '[role="navigation"] > [href="/i/verified-orgs-signup"]',
        // sidebar mobile
        'div:has( > a[href="/i/premium_sign_up"])',
        'div:has( > a[href="/i/verified-orgs-signup"])',
        'div:has( > a[href="/i/monetization"])',
        // profile
        '[data-testid="UserName"] [href="/i/premium_sign_up"]',
        '[data-testid="cellInnerDiv"]:has(a[href="/i/premium_sign_up?tier=premium_plus&referring_page=timeline_prompt"])',
        // right panel
        'div:has(> div > [aria-label="Upgrade to Premium+"])',
        'div:has(> [aria-label="Renew your Premium subscription"])',
        'a[href^="https://ads.x.com/"]',
        '[data-testid="cellInnerDiv"]:has(img[src^="https://ton.twitter.com/onboarding/subscriptions/announcement_ad_rev_share_"])',
        '* > [href="/i/account_analytics"]',
      ])
    },
  }
}
