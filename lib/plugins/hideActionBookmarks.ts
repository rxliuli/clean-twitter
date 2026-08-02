import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideActionBookmarks(): BasePlugin {
  return {
    name: 'hideActionBookmarks',
    description: 'Hide Bookmarks',
    init() {
      hideElement([
        '[data-testid="cellInnerDiv"] div:has(> [data-testid="bookmark"])',
      ])
    },
  }
}
