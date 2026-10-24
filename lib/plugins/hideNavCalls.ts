import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavCalls(): BasePlugin {
  return {
    name: 'hideNavCalls',
    description: 'Calls',
    init() {
      hideElement([
        // sidebar
        '[role="navigation"] > a[href="/i/calls"]',
        // sidebar mobile / legacy markup
        '[href="/i/calls"]',
      ])
    },
  }
}
