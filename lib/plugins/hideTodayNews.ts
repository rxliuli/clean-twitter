import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideTodayNews(): BasePlugin {
  return {
    name: 'hideTodayNews',
    description: 'Hide Today News',
    init() {
      const nextSelector = ' + div[data-testid="cellInnerDiv"]'
      const selector =
        '[data-testid="cellInnerDiv"]:has(button a[href="/explore"])'
      hideElement([
        selector,
        selector + nextSelector.repeat(1),
        selector + nextSelector.repeat(2),
        selector + nextSelector.repeat(3),
        selector + nextSelector.repeat(4),
        selector + nextSelector.repeat(5),
      ])
    },
  }
}
