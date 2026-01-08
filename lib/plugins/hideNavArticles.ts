import { hideElement } from '../css'
import { BasePlugin } from './plugin'

export function hideNavArticles(): BasePlugin {
  return {
    name: 'hideNavArticles',
    description: 'Articles',
    init() {
      hideElement(['[href="/compose/articles"]'])
    },
  }
}
