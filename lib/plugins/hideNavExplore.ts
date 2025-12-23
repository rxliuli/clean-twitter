import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavExplore(): BasePlugin {
  return {
    name: 'hideNavExplore',
    description: 'Explore',
    init() {
      hideElement([
        // sidebar
        '[role="navigation"] > a[href="/explore"]',
        // mobile
        'div:has( > a[href="/explore"])',
      ])
    },
  }
}
