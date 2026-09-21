# conform-IT — site vitrine

Site public de [conform-IT](https://www.conform-it.fr) (formation en ligne à la conformité : RGPD, IA, cybersécurité…).
Site statique généré avec **Astro 7** et **Tailwind CSS 4**, en TypeScript, sans framework JS côté client
(JavaScript vanilla inline uniquement là où c'est nécessaire).

## Ce que montre ce dépôt

- **Contenu éditorial en Markdown** : le blog (≈ 67 articles) vit dans [`src/content/blog/*.md`](src/content/blog),
  une *content collection* Astro dont le frontmatter est validé par un schéma Zod
  ([`src/content.config.ts`](src/content.config.ts)) : titre, description, date, catégorie, `noindex`, image…
  Un article mal renseigné fait échouer le build.
- **Pages « produit » en `.astro` + données typées** : les pages du catalogue, des offres et des pré-diagnostics ne sont
  *pas* en Markdown. Elles s'appuient sur des sources de vérité TypeScript
  ([`src/data/themes.ts`](src/data/themes.ts), [`src/data/prediagnostics.ts`](src/data/prediagnostics.ts)).
- **SEO technique** : sitemap généré, JSON-LD schema.org par type de page, `robots` piloté par variable d'environnement,
  pagination du blog en `noindex` (hors page 1), plus de 100 redirections 301 conservées depuis l'ancien site
  ([`public/.htaccess`](public/.htaccess)).
- **Accessibilité** : cible RGAA 4.1 (respect de `prefers-reduced-motion`, animations avec pause, navigation clavier).
- **Écoconception** : polices système, aucun cookie, images optimisées, DOM allégé (pagination) — mesures EcoIndex.
- **CMS local** : petit éditeur d'articles Markdown dans [`admin/`](admin) (Node, usage local uniquement).

## Démarrer

Prérequis : Node ≥ 22.12.

```bash
npm install
npm run dev          # serveur de développement
npm run build        # site de préproduction dans dist/ (noindex)
npm run build:prod   # build de production dans prod/ (indexation activée)
```

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement Astro |
| `npm run build` | Build vers `dist/`, non indexable |
| `npm run build:prod` | Build vers `prod/` avec `PUBLIC_ENABLE_INDEXING=true` |
| `npm run admin` | CMS local d'articles sur http://localhost:4400 |

## Déploiement

Le déploiement est **manuel**, il n'est pas automatisé : `npm run build:prod` produit le dossier `prod/`, dont le
contenu est transféré sur l'hébergement (alwaysdata, Apache, fichiers statiques). Il n'y a pas de pipeline CI/CD
dans ce dépôt.

Docker ne sert qu'à faire tourner le **CMS local** ([`Dockerfile`](Dockerfile), [`docker-compose.yml`](docker-compose.yml)),
pas à déployer le site.

## Structure

```
src/
  content/blog/   articles en Markdown (content collection)
  pages/          routes Astro (43 pages .astro)
  components/     composants Astro
  data/           thématiques et pré-diagnostics (TypeScript)
  layouts/        BaseLayout (meta, SEO, JSON-LD)
  styles/         global.css (Tailwind + styles transverses)
public/           images, badges, .htaccess (redirections)
admin/            CMS local d'édition des articles
```

## Historique

Ce dépôt démarre à la version 3 du site (refonte de l'été 2026). Les versions précédentes (site Publii, puis Astro v1
et v2) n'ont pas été versionnées avec git ; l'historique de ce dépôt ne remonte donc pas au-delà.
