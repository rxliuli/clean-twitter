import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavAds(): BasePlugin {
  return {
    name: 'hideNavAds',
    description: 'Ads',
    init() {
      hideElement(['[href^="https://ads.x.com"]'])
    },
  }
}
