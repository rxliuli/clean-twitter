import { hideElement } from '../css'
import { BasePlugin } from './plugin'

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
      ])
    },
  }
}
