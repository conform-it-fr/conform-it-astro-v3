// Slug URL à partir d'un libellé libre (ex. catégorie d'article « Accessibilité RGAA » → « accessibilite-rgaa »).
// Même logique que admin/server.mjs (sans la troncature à 80 caractères).
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
