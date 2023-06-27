import { t } from '../../constants/i18n'
import { addCSS, generateHideCSS } from '../../utils/css'
import { BasePlugin } from './plugin'

/**
 * 隐藏主页的 Following Tab
 */
function hideSelectedFollowingTab() {
  addCSS(generateHideCSS('[role="tablist"]:has([href="/home"][role="tab"])'))
  addCSS(`
    @media (max-width: 500px) {
      header[role="banner"] > * {
        height: 54px !important;
      }
    }
  `)
}

function selectedFollowingTab() {
  if (window.location.pathname !== '/home') {
    // console.log('selectedFollowingTab ignore url')
    return
  }
  const tabs = [
    ...document.querySelectorAll('[href="/home"][role="tab"]'),
  ] as HTMLElement[]
  if (tabs.length === 2 && tabs[1].getAttribute('aria-selected') === 'false') {
    tabs[1].click()
  }
}

export function hideHomeTabs(): BasePlugin {
  return {
    name: 'hideHomeTabs',
    description: t('plugin.hideHomeTabs.name'),
    default: true,
    init() {
      hideSelectedFollowingTab()
    },
    observer() {
      selectedFollowingTab()
    },
  }
}
