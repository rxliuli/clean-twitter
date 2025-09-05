import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideBookmarks(): BasePlugin {
  return {
    name: 'hideBookmarks',
    description: 'Hide Bookmarks',
    default: false,
    init() {
      hideElement([
        // sidebar
        '[role="navigation"] > a[href="/i/bookmarks"]',
        // tweet action
        'div:has(> [data-testid="bookmark"])',
      ])
    },
  }
}
