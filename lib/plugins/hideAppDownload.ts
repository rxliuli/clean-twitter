import { hideElement } from '../css'
import type { BasePlugin } from './plugin'

export function hideAppDownload(): BasePlugin {
  return {
    name: 'hideAppDownload',
    description: 'Hide App Download',
    init() {
      hideElement([
        'div:has(> a[href^="https://apps.apple.com/app/apple-store/id333903271"])',
      ])
    },
  }
}