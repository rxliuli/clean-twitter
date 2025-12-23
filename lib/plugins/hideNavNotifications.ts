import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavNotifications(): BasePlugin {
  return {
    name: 'hideNavNotifications',
    description: 'Notifications',
    init() {
      hideElement([
        // sidebar
        '[role="navigation"] > a[href="/notifications"]',
        // mobile
        'div:has( > a[href="/notifications"])',
      ])
    },
  }
}
