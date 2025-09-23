import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideJobs(): BasePlugin {
  return {
    name: 'hideJobs',
    description: 'Hide Jobs',
    init() {
      hideElement([
        // sidebar desktop
        '[role="navigation"] > a[href="/jobs"]'
        // sidebar mobile
        , 'div:has( > a[href="/jobs"])'
      ])
    },
  }
}
