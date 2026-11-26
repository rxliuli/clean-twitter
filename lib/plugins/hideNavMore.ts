import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavMore(): BasePlugin {
  return {
    name: 'hideNavMore',
    description: 'More',
    init() {
      hideElement([
        // sidebar - More menu button
        '[data-testid="AppTabBar_More_Menu"]',
        'nav > button:has(svg[data-icon="icon-more-dots-hor-circle"])',
      ])
    },
  }
}
