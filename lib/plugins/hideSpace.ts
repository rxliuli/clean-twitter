import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideSpace(): BasePlugin {
  return {
    name: 'hideSpace',
    description: 'Hide Spaces',
    init() {
      hideElement([
        '[data-testid="cellInnerDiv"]:has([data-testid="notification"] [d="M12 22.25c-4.99 0-9.18-3.393-10.39-7.994l1.93-.512c.99 3.746 4.4 6.506 8.46 6.506s7.47-2.76 8.46-6.506l1.93.512c-1.21 4.601-5.4 7.994-10.39 7.994zm0-20.5c-3.87 0-7 3.134-7 7v2.75c0 3.866 3.13 7 7 7s7-3.134 7-7V8.75c0-3.866-3.13-7-7-7zm-2.25 9.5c0 .414-.34.75-.75.75s-.75-.336-.75-.75V9c0-.414.34-.75.75-.75s.75.336.75.75v2.25zm3 1c0 .414-.34.75-.75.75s-.75-.336-.75-.75V8c0-.414.34-.75.75-.75s.75.336.75.75v4.25zm3-1c0 .414-.34.75-.75.75s-.75-.336-.75-.75V9c0-.414.34-.75.75-.75s.75.336.75.75v2.25z"])',
      ])
    },
  }
}
