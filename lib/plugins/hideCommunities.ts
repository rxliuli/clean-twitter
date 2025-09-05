import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideCommunities(): BasePlugin {
  return {
    name: 'hideCommunities',
    description: 'Hide Communities',
    default: false,
    init() {
      hideElement(['[role="navigation"] > a[href$="/communities"]'])
    },
  }
}
