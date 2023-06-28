import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { i18nextDtsGen } from '@liuli-util/rollup-plugin-i18next-dts-gen'
import { cp, readFile, writeFile, rm, access } from 'fs/promises'
import path from 'path'

const pathExists = (path: string) =>
  access(path)
    .then(() => true)
    .catch(() => false)

function buildFirefox(): Plugin {
  let command: string
  return {
    name: 'build-firefox',
    enforce: 'post',
    config(_, env) {
      command = env.command
    },
    async closeBundle() {
      if (command !== 'build') {
        return
      }
      const distFirefox = path.resolve('dist-firefox')
      if (await pathExists(distFirefox)) {
        await rm(distFirefox, {
          recursive: true,
          force: true,
        })
      }
      await cp(path.resolve('dist'), distFirefox, {
        recursive: true,
        force: true,
      })
      const json = JSON.parse(
        await readFile(path.resolve(distFirefox, 'manifest.json'), 'utf-8'),
      )
      await writeFile(
        path.resolve(distFirefox, 'manifest.json'),
        JSON.stringify(
          {
            ...json,
            browser_specific_settings: {
              gecko: {
                id: 'clean-twttier@rxliuli.com',
                strict_min_version: '109.0',
              },
            },
          },
          null,
          2,
        ),
      )
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    i18nextDtsGen({
      dirs: ['src/i18n'],
    }) as any,
    buildFirefox(),
  ],
  base: './',
  build: {
    target: 'esnext',
    minify: false,
    cssMinify: false,
  },
})
