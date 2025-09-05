import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideAnalytics(): BasePlugin {
  return {
    name: 'hideAnalytics',
    description: 'Hide Analytics',
    default: false,
    init() {
      hideElement([
        'div:has(> [href*="/status/"][href$="/analytics"])'
      ])
    },
  }
}
