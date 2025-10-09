import { hideElement, insertCSS } from '../css'
import { BasePlugin } from './plugin'

export function hideRightSidebar(): BasePlugin {
  return {
    name: 'hideRightSidebar',
    description: 'Hide right sidebar',
    init() {
      hideElement([
        '[data-testid="sidebarColumn"] [aria-label][tabindex="0"] > div > div:nth-child(n+2)',
      ])
    },
  }
}
