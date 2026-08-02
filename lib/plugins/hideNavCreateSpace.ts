import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavCreateSpace(): BasePlugin {
  return {
    name: 'hideNavCreateSpace',
    description: 'Create your Space',
    init() {
      hideElement(['[href="/i/spaces/start"]'])
    },
  }
}
