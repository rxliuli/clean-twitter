import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { i18nextDtsGen } from '@liuli-util/rollup-plugin-i18next-dts-gen'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    i18nextDtsGen({
      dirs: ['src/i18n'],
    }) as any,
  ],
})
