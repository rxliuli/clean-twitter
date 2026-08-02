import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavBookmarks(): BasePlugin {
  return {
    name: 'hideNavBookmarks',
    description: 'Bookmarks',
    init() {
      hideElement([
        // sidebar
        '[role="navigation"] > a[href="/i/bookmarks"]',
        // sidebar mobile
        'div:has( > a[href="/i/bookmarks"])',
      ])
    },
  }
}
