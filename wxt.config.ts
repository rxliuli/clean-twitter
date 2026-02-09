import tailwindcss from '@tailwindcss/vite'
import { defineConfig, UserManifest } from 'wxt'

export default defineConfig({
  vite: () => ({
    plugins: [tailwindcss()] as any,
    resolve: {
      alias: {
        '@': __dirname,
      },
    },
  }),
  modules: ['@wxt-dev/module-react', 'wxt-module-safari-xcode'],
  safariXcode: {
    appCategory: 'public.app-category.productivity',
    bundleIdentifier: 'com.rxliuli.Cleaner-for-X',
    developmentTeam: 'N2X78TUUFG',
  },
  webExt: {
    disabled: true,
  },
  manifestVersion: 3,
  manifest: (env) => {
    const manifest: UserManifest = {
      name: 'Clean Twitter',
      description:
        'Clean up some annoying elements on Twitter and make your Twitter experience cleaner',
      permissions: ['storage'],
      author: {
        email: 'rxliuli@gmail.com',
      },
      homepage_url: 'https://store.rxliuli.com/extensions/clean-twitter/',
    }
    if (env.browser === 'firefox') {
      manifest.browser_specific_settings = {
        gecko: {
          // Might as well go with the flow.
          id: 'clean-twttier@rxliuli.com',
        },
      }
      // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/author
      // @ts-expect-error
      manifest.author = 'rxliuli'
    }
    if (env.browser === 'safari') {
      manifest.name = 'Clean for Twitter'
    }
    return manifest
  },
})
