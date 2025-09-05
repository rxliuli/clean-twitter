import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideGrok(): BasePlugin {
  return {
    name: 'hideGrok',
    description: 'Hide Grok',
    default: false,
    init() {
      hideElement([
        // sidebar
        '[role="navigation"] > a[href="/i/grok"]',
        // tweet action
        'button[aria-label="Grok actions"]',
      ])
    },
  }
}
