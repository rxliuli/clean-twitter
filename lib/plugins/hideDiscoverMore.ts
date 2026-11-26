import { hideElement, hideVirtualListItem } from '../css'
import type { BasePlugin } from './plugin'

export function hideDiscoverMore(): BasePlugin {
  return {
    name: 'hideDiscoverMore',
    description: 'Hide Discover More',
    init() {
      hideElement([
        `section div[data-testid=cellInnerDiv]:has(h2[role="heading"] + div)`,
        `section div[data-testid=cellInnerDiv]:has(h2[role="heading"] + div) ~ div`,
      ])
      // New X Relay frontend: "Discover more" heading sits inside a virtualized li[data-index]
      // outside any <article>, followed by recommended tweet li[data-index] siblings.
      hideVirtualListItem([
        'section ul > li[data-index]:has(h2):not(:has(article h2))',
        'section ul > li[data-index]:has(h2):not(:has(article h2)) ~ li[data-index]',
      ])
    },
  }
}
