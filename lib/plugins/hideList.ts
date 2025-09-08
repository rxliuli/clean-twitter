import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideLists(): BasePlugin {
  return {
    name: 'hideLists',
    description: 'Hide Lists',
    default: false,
    init() {
      hideElement([
        // desktop
        '[role="navigation"] > a[href$="/lists"]',
        // mobile
        'div:has( > a[href$="/lists"])',
      ])
    },
  }
}
