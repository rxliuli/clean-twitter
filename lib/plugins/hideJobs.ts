import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideJobs(): BasePlugin {
  return {
    name: 'hideJobs',
    description: 'Hide Jobs',
    default: false,
    init() {
      hideElement(['[role="navigation"] > a[href="/jobs"]'])
    },
  }
}
