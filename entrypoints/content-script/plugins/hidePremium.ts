import { t } from '../../constants/i18n'
import { addCSS, generateHideCSS } from '../../utils/css'
import { BasePlugin } from './plugin'

export function hidePremium(): BasePlugin {
  return {
    name: 'hidePremium',
    description: t('plugin.hidePremium.name'),
    default: false,
    init() {
      addCSS(
        generateHideCSS(
          'div[data-testid="cellInnerDiv"]:has([href="/i/premium_sign_up?referring_page=timeline_prompt"])',
          '* > [href="/i/verified-choose"]',
          '* > [href="/i/grok"]',
          `[aria-label="${t(
            'symbol.Trending',
          )}"] > * > *:nth-child(3):not([aria-label="${t(
            'symbol.Trending',
          )}"] *:has(> [aria-label="${t('symbol.VerifiedAccount')}"]))`,
          'div[data-testid="cellInnerDiv"]:has([data-testid="inlinePrompt-primaryAction"] [href="https://pro.x.com"])',
          '[role="navigation"] > [href="/i/premium_sign_up"]',
          '[role="navigation"] > [href="/i/verified-orgs-signup"]',
          // 个人主页用户名旁边的升级按钮
          '[data-testid="UserName"] [href="/i/premium_sign_up"]',
          // 出现在 timeline 上的升级按钮
          '[data-testid="cellInnerDiv"]:has(a[href="/i/premium_sign_up?tier=premium_plus&referring_page=timeline_prompt"])',
          'a[href="/i/premium_sign_up"]',
          'a[href="/jobs"]',
          'a[href^="https://ads.x.com/"]',
          '[data-testid="cellInnerDiv"]:has(img[src^="https://ton.twitter.com/onboarding/subscriptions/announcement_ad_rev_share_"])',
        ),
      )
    },
  }
}
