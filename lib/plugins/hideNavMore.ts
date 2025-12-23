import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavMore(): BasePlugin {
  return {
    name: 'hideNavMore',
    description: 'More',
    init() {
      hideElement([
        // sidebar - More menu button
        '[data-testid="AppTabBar_More_Menu"]',
      ])
    },
  }
}
