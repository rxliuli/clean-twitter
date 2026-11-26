import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideRightSidebar(): BasePlugin {
  return {
    name: 'hideRightSidebar',
    description: 'Hide right sidebar',
    init() {
      hideElement([
        '[data-testid="sidebarColumn"] [aria-label][tabindex="0"] > div > div:nth-child(n+2)',
        // New X Relay frontend: keep Search input (nth-child(1)) and hide cards below it
        'aside:not([data-testid="sidebarColumn"] aside) > div > div:nth-child(2) > :nth-child(n+2)',
      ])
    },
  }
}
