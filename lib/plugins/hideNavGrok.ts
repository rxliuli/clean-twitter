import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavGrok(): BasePlugin {
  return {
    name: 'hideNavGrok',
    description: 'Grok',
    init() {
      hideElement([
        // sidebar
        '[role="navigation"] > a[href="/i/grok"]',
      ])
    },
  }
}
