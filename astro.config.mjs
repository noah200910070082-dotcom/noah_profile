import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://noahxu.org',
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  }
});
