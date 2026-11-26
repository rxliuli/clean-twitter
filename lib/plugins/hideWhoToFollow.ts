import { hideElement, hideVirtualListItem } from '../css'
import type { BasePlugin } from './plugin'

export function hideWhoToFollow(): BasePlugin {
  return {
    name: 'hideWhoToFollow',
    description: 'Hide Who to Follow',
    init() {
      const nextSelector =
        ' + [data-testid="cellInnerDiv"]:has([data-testid$="-follow"])'
      const selector =
        '[data-testid="cellInnerDiv"]:has(h2):not(:has(img[src^="https://pbs.twimg.com/profile_images/"]))'
      hideElement([
        selector,
        selector + nextSelector.repeat(1),
        selector + nextSelector.repeat(2),
        selector + nextSelector.repeat(3),
        '[data-testid="cellInnerDiv"]:has([href^="/i/connect_people"])',
        '[data-testid="cellInnerDiv"]:has([href^="/i/connect_people"])' +
          nextSelector,
        // New X Relay frontend: Who to follow card in right sidebar
        'aside section:has(a[href^="/i/connect_people"])',
      ])
      hideVirtualListItem([
        'li[data-index]:has(a[href^="/i/connect_people"]):not(:has(article))',
      ])
    },
  }
}
