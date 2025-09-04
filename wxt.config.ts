import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [tailwindcss()] as any,
    resolve: {
      alias: {
        '@': __dirname,
      },
    },
  }),
  modules: ['@wxt-dev/module-react'],
  webExt: {
    disabled: true,
  },
  manifest: {
    name: 'Clean Twitter',
    permissions: ['storage'],
  },
})
