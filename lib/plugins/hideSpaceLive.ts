import {
  hideElement,
  hideElementOnMobile,
  insertCSS,
  wrapCSSOnMobile,
} from '../css'
import type { BasePlugin } from './plugin'

export function hideSpaceLive(): BasePlugin {
  return {
    name: 'hideSpaceLive',
    description: 'Hide Space Live',
    init() {
      hideElementOnMobile([
        'nav:has([data-testid="placementTracking"] [data-testid="pill-contents-container"])',
      ])
      const getHeight = (sel: string) => {
        const el = document.querySelector(sel)
        if (!el) {
          return
        }
        return Number.parseInt(getComputedStyle(el).height)
      }
      const bannerDivSel =
        ':has([data-testid="placementTracking"] [data-testid="pill-contents-container"]) [role="banner"] > div'
      const navHeight = getHeight('[data-testid="TopNavBar"] + div') ?? 56
      const bannerDivHeight = getHeight(bannerDivSel) ?? 162
      const currentHeight = bannerDivHeight - navHeight
      insertCSS(
        wrapCSSOnMobile(
          `${bannerDivSel} { height: ${currentHeight}px !important; }`,
        ),
      )
    },
  }
}
