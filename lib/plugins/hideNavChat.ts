import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavChat(): BasePlugin {
  return {
    name: 'hideNavChat',
    description: 'Chat',
    init() {
      hideElement(['[href="/i/chat"]'])
    },
  }
}
