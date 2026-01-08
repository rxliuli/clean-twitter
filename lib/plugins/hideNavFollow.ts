import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavFollow(): BasePlugin {
  return {
    name: 'hideNavFollow',
    description: 'Follow',
    init() {
      hideElement(['[href="/i/connect_people"]', '[href="/i/follow_people"]'])
    },
  }
}
