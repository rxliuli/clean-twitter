import { wait } from '@liuli-util/async'
import { BasePlugin } from './plugin'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" style="width: 30px; height: 30px;" xml:space="preserve" viewBox="0 0 248 204" data-clean-twitter="restore-logo">
<path fill="#1d9bf0" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"/>
</svg>`

export function restoreLogo(): BasePlugin {
  return {
    name: 'restoreLogo',
    default: false,
    description: 'Restore logo',
    init: async () => {
      const selector =
        'svg:has(path[d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"])'
      await wait(() => !!document.querySelector(selector))
      const $logos = document.querySelectorAll(selector)
      const effects: (() => void)[] = []
      $logos.forEach((it) => {
        const original = it.outerHTML
        it.outerHTML = svg
        effects.push(() => {
          document.querySelector(
            'svg[data-clean-twitter="restore-logo"]',
          )!.outerHTML = original
        })
      })

      const $ico = document.querySelector(`head>link[rel="shortcut icon"]`)
      if ($ico) {
        const original = ($ico as HTMLAnchorElement).href
        ;($ico as HTMLAnchorElement).href =
          '//abs.twimg.com/favicons/twitter.ico'
        effects.push(() => {
          ;($ico as HTMLAnchorElement).href = original
        })
      }
      return () => {
        effects.forEach((effect) => effect())
      }
    },
  }
}
