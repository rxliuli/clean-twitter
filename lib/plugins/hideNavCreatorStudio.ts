import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavCreatorStudio(): BasePlugin {
  return {
    name: 'hideNavCreatorStudio',
    description: 'Creator Studio',
    init() {
      hideElement(['[href="/i/jf/creators/studio"]'])
    },
  }
}
