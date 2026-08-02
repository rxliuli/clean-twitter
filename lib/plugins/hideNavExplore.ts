import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

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
