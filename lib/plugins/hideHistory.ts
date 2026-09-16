import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavHistory(): BasePlugin {
  return {
    name: 'hideNavHistory',
    description: 'History',
    init() {
      hideElement([
        // sidebar
        '[role="navigation"] > a[href="/i/history"]',
        // sidebar mobile
        'div:has( > a[href="/i/history"])',
        // X used to expose bookmarks as a standalone nav item
        '[role="navigation"] > a[href="/i/bookmarks"]',
        'div:has( > a[href="/i/bookmarks"])',
      ])
    },
  }
}
