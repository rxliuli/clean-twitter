import { t } from '../../constants/i18n'
import { addCSS, generateHideCSS } from '../../utils/css'
import { BasePlugin } from './plugin'

export function hideCommunities(): BasePlugin {
  return {
    name: 'hideCommunities',
    description: t('plugin.hideCommunities.name'),
    default: false,
    init() {
      addCSS(generateHideCSS('[role="navigation"] > [href$="/communities"]'))
    },
  }
}
