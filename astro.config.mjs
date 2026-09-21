// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Pages utilitaires sans valeur de résultat de recherche (confirmation post-formulaire) :
// exclues du sitemap. Elles sont aussi en noindex sur la page elle-même.
const SITEMAP_EXCLUDED_PATHS = ['/merci/'];

// lastmod par article : on lit pubDate directement dans le frontmatter Markdown
// (le contenu n'est pas modifié après publication, donc pubDate sert de dernière modification).
const BLOG_DIR = path.resolve('./src/content/blog');
const articleLastmod = new Map();
// Articles en `noindex: true` dans leur frontmatter : exclus du sitemap (comme le <meta robots> de la page).
const noindexPaths = new Set();
for (const file of fs.readdirSync(BLOG_DIR)) {
  if (!file.endsWith('.md')) continue;
  const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
  const slug = file.replace(/\.md$/, '');
  const match = content.match(/^pubDate:\s*(.+)$/m);
  if (match) {
    articleLastmod.set(`/articles/${slug}/`, new Date(match[1].trim()));
  }
  if (/^noindex:\s*true\s*$/m.test(content)) {
    noindexPaths.add(`/articles/${slug}/`);
  }
}
// Pour le reste du site (pages statiques), on utilise la date de génération du build.
const buildDate = new Date();

// Pages de pagination 2, 3… (`/articles/2/`, `/articles/categorie/xxx/2/`) : en `noindex` sur la page,
// donc exclues du sitemap. Les pages 1 (`/articles/`, `/articles/categorie/xxx/`) restent indexées.
const PAGINATION_PATH_RE = /\/articles\/(categorie\/[^/]+\/)?\d+\/$/;

export default defineConfig({
  site: 'https://www.conform-it.fr',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return (
          !SITEMAP_EXCLUDED_PATHS.includes(path) &&
          !noindexPaths.has(path) &&
          !PAGINATION_PATH_RE.test(path)
        );
      },
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        item.lastmod = (articleLastmod.get(pathname) ?? buildDate).toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
  // Les redirections des anciennes URLs Publii sont gérées par de vraies 301 HTTP
  // dans public/.htaccess (voir Section A du plan de mise en production).
});