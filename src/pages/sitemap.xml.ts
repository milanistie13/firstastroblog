import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

const SITE_URL = 'https://shopperqueries.com';

export const GET: APIRoute = async () => {
  // Get all blog posts
  const posts: CollectionEntry<'blog'>[] = await getCollection('blog');
  
  // Get all categories
  const categories: string[] = [...new Set(
    posts
      .map(post => post.data.category)
      .filter((category): category is string => category !== undefined)
  )];
  
  // Get all tags
  const tags: string[] = [...new Set(
    posts
      .flatMap(post => post.data.tags || [])
      .filter((tag): tag is string => tag !== undefined)
  )];

  // Generate sitemap XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${SITE_URL}/categories</loc>
    <priority>0.7</priority>
    <changefreq>weekly</changefreq>
  </url>
  ${categories.map(category => `
  <url>
    <loc>${SITE_URL}/categories/${category.toLowerCase().replace(/\s+/g, '-')}</loc>
    <priority>0.6</priority>
    <changefreq>weekly</changefreq>
  </url>`).join('')}
  ${tags.map(tag => `
  <url>
    <loc>${SITE_URL}/tags/${tag.toLowerCase()}</loc>
    <priority>0.5</priority>
    <changefreq>weekly</changefreq>
  </url>`).join('')}
  ${posts.map(post => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.data.date.toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
    <changefreq>weekly</changefreq>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};
