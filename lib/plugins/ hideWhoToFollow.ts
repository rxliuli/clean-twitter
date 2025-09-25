import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideWhoToFollow(): BasePlugin {
  return {
    name: 'hideWhoToFollow',
    description: 'Hide Who to Follow',
    init() {
      const nextSelector = ' + div[data-testid="cellInnerDiv"]'
      const selector =
        '[data-testid="cellInnerDiv"]:has(h2 [data-testid="caret"])'
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
