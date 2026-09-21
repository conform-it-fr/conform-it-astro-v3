import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

// Tri d'affichage : `order` (croissant) prioritaire, puis date décroissante.
export function sortPosts(a: Post, b: Post): number {
  const oa = a.data.order;
  const ob = b.data.order;
  if (oa !== undefined && ob !== undefined) return oa - ob;
  if (oa !== undefined) return -1;
  if (ob !== undefined) return 1;
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

// Articles publiés (hors `hidden`), triés pour l'affichage.
export async function getVisiblePosts(): Promise<Post[]> {
  return (await getCollection("blog", (p) => !p.data.hidden)).sort(sortPosts);
}

// Catégories distinctes, triées alphabétiquement, avec le nombre d'articles.
export function categoriesWithCount(posts: Post[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) {
    if (p.data.category) counts.set(p.data.category, (counts.get(p.data.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export const ARTICLES_PER_PAGE = 18;
