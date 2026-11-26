import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideFloatingGrok(): BasePlugin {
  return {
    name: 'hideFloatingGrok',
    description: 'Hide floating Grok button',
    init() {
      hideElement([
        // Classic X: bottom-right floating Grok drawer (above the Chat drawer)
        '[data-testid="GrokDrawer"]',
        // New X Relay frontend: floating Grok button/drawer container (leaves Chat untouched)
        'div.fixed > div:has(> button svg[data-icon="icon-logo-grok"])',
      ])
    },
  }
}
