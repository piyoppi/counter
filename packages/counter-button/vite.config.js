import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
  plugins: [svelte({compilerOptions: {customElement: true}})],
  build: {
    lib: {
      entry: path.resolve(path.dirname(new URL(import.meta.url).pathname), 'src/main.js'),
      name: '@piyoppi/counter-button',
      fileName: (format) => `counter-button.${format}.js`
    },
  }
})
