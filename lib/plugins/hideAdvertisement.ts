import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideAdvertisement(): BasePlugin {
  return {
    name: 'hideAdvertisement',
    description: 'Hide Advertisement',
    init() {
      hideElement([
        '[data-testid="cellInnerDiv"]:has(> div > div > [data-testid="placementTracking"])',
      ])
    },
  }
}
