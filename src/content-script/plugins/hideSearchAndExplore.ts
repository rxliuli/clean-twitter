import { t } from '../../constants/i18n'
import { addCSS, generateHideCSS } from '../../utils/css'
import { BasePlugin } from './plugin'

export function hideSearchAndExplore(): BasePlugin {
  return {
    name: 'hideSearchAndExplore',
    description: t('plugin.hideSearchAndExplore.name'),
    default: true,
    init() {
      addCSS(generateHideCSS(`[aria-label="${t('symbol.SearchAndExplore')}"]`))
    },
  }
}
