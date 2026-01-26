import { insertCSS } from '../css'
import { BasePlugin } from './plugin'

export function textMode(): BasePlugin {
  const baseSelector = `body:has([d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"])  [data-testid="cellInnerDiv"]`
  const selectors = [
    '[data-testid="tweetPhoto"]',
    '[data-testid="videoComponent"]',
    '[data-testid="card.layoutLarge.media"]',
    '[data-testid="article-cover-image"]',
  ]
  return {
    name: 'textMode',
    description: 'Text mode in Home',
    init() {
      insertCSS(`
        ${selectors.map((s) => `${baseSelector} ${s}::before`).join(', ')} {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.99);
        transition: all 0.4s ease;
        z-index: 99999;
        pointer-events: none;
    }

    html[style$="color-scheme: light;"] ${selectors.map((s) => `${baseSelector} ${s}::before`).join(', ')} {
        background: rgba(255, 255, 255, 0.99);
    }

    ${selectors.map((s) => `${baseSelector} ${s}:hover::before`).join(', ')} {
        opacity: 0;
    }
      `)
    },
  }
}
