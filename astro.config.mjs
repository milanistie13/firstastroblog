import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// Temporarily comment out Pagefind
// import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-micro.vercel.app",
  integrations: [
    tailwind(), 
    sitemap(), 
    mdx(), 
    // Comment out Pagefind integration
    // pagefind({
    //   indexing: {
    //     excludeSelector: [
    //       'nav', 
    //       'footer', 
    //       '.exclude-from-search'
    //     ]
    //   },
    //   ui: {
    //     resetStyles: true
    //   }
    // })
  ],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
