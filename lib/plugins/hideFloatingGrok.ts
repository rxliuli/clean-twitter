import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideFloatingGrok(): BasePlugin {
  return {
    name: 'hideFloatingGrok',
    description: 'Hide floating Grok button',
    init() {
      hideElement([
        // bottom-right floating Grok drawer (above the Chat drawer)
        '[data-testid="GrokDrawer"]',
      ])
    },
  }
}
