import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavAds(): BasePlugin {
  return {
    name: 'hideNavAds',
    description: 'Ads',
    init() {
      hideElement(['[href^="https://ads.x.com"]'])
    },
  }
}
