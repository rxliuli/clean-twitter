import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideLists(): BasePlugin {
  return {
    name: 'hideLists',
    description: 'Hide Lists',
    init() {
      hideElement([
        // desktop navigation
        '[role="navigation"] > a[href$="/lists"]',
        // desktop dropdown menu
        '[data-testid="Dropdown"] > [href="/i/lists/add_member"]',
        '[data-testid="Dropdown"] > [href$="/lists"]',
        // mobile
        'a[href="/i/lists/add_member"]',
        'a[href$="/lists"]',
      ])
    },
  }
}
