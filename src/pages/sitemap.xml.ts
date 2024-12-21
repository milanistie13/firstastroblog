import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://shopperqueries.com';

// Recursive function to find all blog post files
function findBlogPosts(dir: string): { id: string, date: Date }[] {
  const posts: { id: string, date: Date }[] = [];

  function traverseDirectory(currentPath: string) {
    const files = fs.readdirSync(currentPath);
    
    files.forEach(file => {
      const fullPath = path.join(currentPath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        posts.push({
          id: path.relative(dir, fullPath),
          date: stat.mtime
        });
      }
    });
  }

  traverseDirectory(dir);
  
  return posts.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export const GET: APIRoute = () => {
  // Get all blog posts
  const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
  const posts = findBlogPosts(blogDir);
  
  // Predefined categories and tags
  const categories = ['Review', 'Tips', 'Guide'];
  const tags = ['Reference', 'Example', 'Test', 'Blob', 'Tutorial'];

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
  <url>
    <loc>${SITE_URL}/tags</loc>
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
    <loc>${SITE_URL}/blog/${post.id.replace(/\.(md|mdx)$/, '').replace(/\\index$/, '')}</loc>
    <lastmod>${post.date.toISOString().split('T')[0]}</lastmod>
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
