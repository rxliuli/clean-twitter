import { t } from '../../constants/i18n'
import { addCSS, generateHideCSS } from '../../utils/css'
import { BasePlugin } from './plugin'

/**
 * 隐藏 twitter 蓝标认证广告
 */
export function hideBlueBadge(): BasePlugin {
  return {
    name: 'hideBlueBadge',
    description: t('plugin.hideBlueBadge.name'),
    default: true,
    init() {
      addCSS(
        generateHideCSS(
          `[aria-label="${t('symbol.Trending')}"] *:has(> [aria-label="${t(
            'symbol.VerifiedAccount',
          )}"])`,
          `[role="dialog"] *:has(> [href="/i/twitter_blue_sign_up"])`,
        ),
      )
    },
  }
}
