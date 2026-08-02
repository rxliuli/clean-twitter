import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavChat(): BasePlugin {
  return {
    name: 'hideNavChat',
    description: 'Chat',
    init() {
      hideElement(['[href="/i/chat"]'])
    },
  }
}
