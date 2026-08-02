import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideNavArticles(): BasePlugin {
  return {
    name: 'hideNavArticles',
    description: 'Articles',
    init() {
      hideElement(['[href="/compose/articles"]'])
    },
  }
}
