import { t } from '../../constants/i18n'
import { addCSS } from '../../utils/css'
import { BasePlugin } from './plugin'

export function disableTransparency(): BasePlugin {
  return {
    name: 'disableTransparency',
    description: t('plugin.disableTransparency.name'),
    default: false,
    init() {
      addCSS(
        `
          [data-testid="BottomBar"], div:has( > [href="/compose/tweet"]) {
            opacity: 1 !important;
          }
      `,
        'disableTransparency',
      )
    },
  }
}
