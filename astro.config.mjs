import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-micro.vercel.app",
  integrations: [
    tailwind(), 
    sitemap(), 
    mdx(), 
    pagefind({
      indexing: {
        excludeSelector: [
          'nav', 
          'footer', 
          '.exclude-from-search'
        ]
      },
      ui: {
        resetStyles: true
      },
      build: {
        verbose: false,
        sourcemap: false
      }
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
