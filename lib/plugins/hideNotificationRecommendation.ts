import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNotificationRecommendation(): BasePlugin {
  return {
    name: 'hideNotificationRecommendation',
    description: 'Hide Notification Recommendation',
    init() {
      hideElement([
        '[data-testid="cellInnerDiv"]:has([data-testid="notification"] svg path[d^="M22.99 11.295"])',
      ])
    },
  }
}
