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
      // Add explicit configuration
      indexing: {
        // Optional: Customize indexing behavior
        excludeSelector: [
          // Exclude specific elements from indexing if needed
          'nav', 
          'footer', 
          '.exclude-from-search'
        ]
      },
      ui: {
        // Optional: Customize UI options
        resetStyles: true
      }
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
