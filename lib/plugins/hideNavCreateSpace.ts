import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavCreateSpace(): BasePlugin {
  return {
    name: 'hideNavCreateSpace',
    description: 'Create your Space',
    init() {
      hideElement(['[href="/i/spaces/start"]'])
    },
  }
}
