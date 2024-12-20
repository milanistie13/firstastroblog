import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://shopperqueries.com",
  integrations: [
    tailwind(), 
    sitemap({
      filter: (page) => 
        !page.includes('/drafts/') && 
        !page.includes('/private/') && 
        !page.includes('/admin/'),
      serialize: (item) => {
        // Add custom priority and change frequency for different page types
        if (item.url.includes('/blog/')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/categories/') || item.url.includes('/tags/')) {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.8;
          item.changefreq = 'daily';
        }
        return item;
      }
    }), 
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
