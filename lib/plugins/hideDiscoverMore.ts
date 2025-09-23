import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideDiscoverMore(): BasePlugin {
  return {
    name: 'hideDiscoverMore',
    description: 'Hide Discover More',
    // observer() {
    //   _hideDiscoverMore()
    // },
    init() {
      hideElement([
        `section div[data-testid=cellInnerDiv]:has(h2[role="heading"] + div)`,
        `section div[data-testid=cellInnerDiv]:has(h2[role="heading"] + div) ~ div`,
      ])
    },
  }
}
