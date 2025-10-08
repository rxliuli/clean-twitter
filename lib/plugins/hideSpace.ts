import { hideElementOnMobile, insertCSS, wrapCSSOnMobile } from '../css'
import { BasePlugin } from './plugin'

export function hideSpace(): BasePlugin {
  return {
    name: 'hideSpace',
    description: 'Hide Spaces',
    init() {
      hideElementOnMobile([
        '[aria-live="polite"]:has([data-testid="placementTracking"] [aria-label^="Space"] canvas)',
        '[data-testid="cellInnerDiv"]:has(a[href^="/i/spaces/"][href$="/peek"])',
      ])
      insertCSS(
        wrapCSSOnMobile(
          `[role="banner"] > div[style="height: 162px;"] { height: 106px !important; }`,
        ),
      )
    },
  }
}
