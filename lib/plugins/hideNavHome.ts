import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavHome(): BasePlugin {
  return {
    name: 'hideNavHome',
    description: 'Home',
    init() {
      hideElement([
        // sidebar
        '[role="navigation"] > a[href="/home"]',
        // mobile
        'div:has( > a[href="/home"])',
      ])
    },
  }
}
