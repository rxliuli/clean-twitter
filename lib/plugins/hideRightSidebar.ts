import { hideElement, insertCSS } from '../css'
import { BasePlugin } from './plugin'

export function hideRightSidebar(): BasePlugin {
  return {
    name: 'hideRightSidebar',
    description: 'Hide right sidebar',
    init() {
      hideElement([
        '[aria-label="Trending"] > div > div:nth-child(1) ~ div',
        '[aria-label="Trending"] > div > div > div:nth-child(1) ~ div',
      ])
    },
  }
}
