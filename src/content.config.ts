import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    /** Titre pour le `<title>` / `og:title` si l'on veut se démarquer du titre éditorial (h1). Repli : `title`. */
    seoTitle: z.string().optional(),
    description: z.string(),
    /** Meta description dédiée (SEO / partages). Repli : `description` (qui sert aussi d'extrait sur la liste). */
    metaDescription: z.string().optional(),
    pubDate: z.coerce.date(),
    featured: z.boolean().default(false),
    hidden: z.boolean().default(false),
    /** `noindex, nofollow` sur la page + exclusion du sitemap. Indépendant de `hidden` (qui, lui, retire des listes). */
    noindex: z.boolean().default(false),
    order: z.number().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { blog };
