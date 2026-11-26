import { hideElement, hideVirtualListItem } from '../css'
import type { BasePlugin } from './plugin'

export function hideAdvertisement(): BasePlugin {
  return {
    name: 'hideAdvertisement',
    description: 'Hide Advertisement',
    init() {
      hideElement([
        '[data-testid="cellInnerDiv"]:has(> div > div > [data-testid="placementTracking"])',
      ])
      // New X Relay frontend: promoted tweets are tagged `data-clean-twitter-ad="1"` via React fiber in MAIN world
      hideVirtualListItem(['li[data-index]:has([data-clean-twitter-ad="1"])'])
    },
  }
}
