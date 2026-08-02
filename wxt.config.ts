import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type UserManifest } from 'wxt'

export default defineConfig({
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': __dirname,
      },
    },
  }),
  modules: ['@wxt-dev/module-react', '@extport/wxt'],
  extport: {
    extension: 'ext_CECOPdH35ZpP6JI6wuWc',
    analytics: true,
    safari: {
      appCategory: 'public.app-category.productivity',
      bundleIdentifier: 'com.rxliuli.Cleaner-for-X',
      developmentTeam: 'N2X78TUUFG',
      issuerId: '48f39427-c063-4e33-98d2-31de80aad0be',
      keyId: '8N27UWG9RG',
    },
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
