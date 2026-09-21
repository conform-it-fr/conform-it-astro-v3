import http from "node:http";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import matter from "gray-matter";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const IMAGES_DIR = path.join(ROOT, "public/images/articles");
const TRASH_DIR = path.join(ROOT, ".deleted-articles");
const PUBLIC_DIR = path.join(__dirname, "public");
const PORT = process.env.PORT || 4400;

for (const dir of [BLOG_DIR, IMAGES_DIR, TRASH_DIR]) {
  if (!fsSync.existsSync(dir)) fsSync.mkdirSync(dir, { recursive: true });
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

const DIACRITICS_RE = new RegExp("[̀-ͯ]", "g");

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(DIACRITICS_RE, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function uniqueSlug(base) {
  let slug = base || "article";
  let n = 2;
  while (fsSync.existsSync(path.join(BLOG_DIR, `${slug}.md`))) {
    slug = `${base}-${n}`;
    n++;
  }
  return slug;
}

async function listArticles() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  const articles = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...data, pubDate: toDateString(data.pubDate) };
    })
  );
  return articles;
}

function toDateString(d) {
  if (!d) return "";
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d).slice(0, 10);
}

async function readArticle(slug) {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fsSync.existsSync(file)) return null;
  const raw = await fs.readFile(file, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...data, pubDate: toDateString(data.pubDate), body: content.trim() };
}

function buildFrontmatter(payload) {
  const data = {
    title: payload.title || "",
  };
  if (payload.seoTitle && payload.seoTitle.trim()) data.seoTitle = payload.seoTitle.trim();
  data.description = payload.description || "";
  if (payload.metaDescription && payload.metaDescription.trim()) {
    data.metaDescription = payload.metaDescription.trim();
  }
  data.pubDate = payload.pubDate || toDateString(new Date());
  data.featured = Boolean(payload.featured);
  data.hidden = Boolean(payload.hidden);
  if (payload.noindex) data.noindex = true;
  if (payload.order !== undefined && payload.order !== null && payload.order !== "") {
    data.order = Number(payload.order);
  }
  if (payload.category) data.category = payload.category;
  if (payload.image) data.image = payload.image;
  if (payload.imageAlt) data.imageAlt = payload.imageAlt;
  return data;
}

async function writeArticle(slug, payload) {
  const data = buildFrontmatter(payload);
  const body = (payload.body || "").trim() + "\n";
  const file = matter.stringify(body, data);
  await fs.writeFile(path.join(BLOG_DIR, `${slug}.md`), file, "utf-8");
}

async function sendJSON(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(body);
}

async function readJSONBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf-8");
  return raw ? JSON.parse(raw) : {};
}

async function serveStatic(req, res, pathname) {
  const rel = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.join(PUBLIC_DIR, rel);
  if (!filePath.startsWith(PUBLIC_DIR)) return sendJSON(res, 403, { error: "Forbidden" });
  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  } catch {
    sendJSON(res, 404, { error: "Not found" });
  }
}

async function serveImage(req, res, pathname) {
  const filename = decodeURIComponent(pathname.replace("/content-images/", ""));
  const filePath = path.join(IMAGES_DIR, filename);
  if (!filePath.startsWith(IMAGES_DIR)) return sendJSON(res, 403, { error: "Forbidden" });
  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  } catch {
    sendJSON(res, 404, { error: "Not found" });
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const { pathname } = url;

  try {
    if (pathname.startsWith("/content-images/")) return serveImage(req, res, pathname);

    if (pathname === "/api/articles" && req.method === "GET") {
      const articles = await listArticles();
      return sendJSON(res, 200, articles);
    }

    if (pathname === "/api/categories" && req.method === "GET") {
      const articles = await listArticles();
      const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))].sort();
      return sendJSON(res, 200, categories);
    }

    if (pathname === "/api/articles" && req.method === "POST") {
      const payload = await readJSONBody(req);
      if (!payload.title) return sendJSON(res, 400, { error: "Le titre est obligatoire." });
      const slug = uniqueSlug(slugify(payload.title));
      await writeArticle(slug, payload);
      return sendJSON(res, 201, { slug });
    }

    const articleMatch = pathname.match(/^\/api\/articles\/([^/]+)$/);
    if (articleMatch && req.method === "GET") {
      const article = await readArticle(articleMatch[1]);
      if (!article) return sendJSON(res, 404, { error: "Article introuvable." });
      return sendJSON(res, 200, article);
    }

    if (articleMatch && req.method === "PUT") {
      const slug = articleMatch[1];
      if (!fsSync.existsSync(path.join(BLOG_DIR, `${slug}.md`))) {
        return sendJSON(res, 404, { error: "Article introuvable." });
      }
      const payload = await readJSONBody(req);
      if (!payload.title) return sendJSON(res, 400, { error: "Le titre est obligatoire." });
      await writeArticle(slug, payload);
      return sendJSON(res, 200, { slug });
    }

    if (articleMatch && req.method === "DELETE") {
      const slug = articleMatch[1];
      const file = path.join(BLOG_DIR, `${slug}.md`);
      if (!fsSync.existsSync(file)) return sendJSON(res, 404, { error: "Article introuvable." });
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      await fs.rename(file, path.join(TRASH_DIR, `${slug}--${stamp}.md`));
      return sendJSON(res, 200, { ok: true });
    }

    const toggleHiddenMatch = pathname.match(/^\/api\/articles\/([^/]+)\/toggle-hidden$/);
    if (toggleHiddenMatch && req.method === "POST") {
      const slug = toggleHiddenMatch[1];
      const article = await readArticle(slug);
      if (!article) return sendJSON(res, 404, { error: "Article introuvable." });
      const { slug: _slug, body, ...data } = article;
      data.hidden = !data.hidden;
      await writeArticle(slug, { ...data, body });
      return sendJSON(res, 200, { slug, hidden: data.hidden });
    }

    if (pathname === "/api/reorder" && req.method === "POST") {
      const payload = await readJSONBody(req);
      const order = payload.order || [];
      for (let i = 0; i < order.length; i++) {
        const article = await readArticle(order[i]);
        if (article) {
          const { slug, body, ...data } = article;
          data.order = i + 1;
          await writeArticle(slug, { ...data, body });
        }
      }
      return sendJSON(res, 200, { ok: true });
    }

    if (pathname === "/api/upload-image" && req.method === "POST") {
      const payload = await readJSONBody(req);
      const { slug, filename, dataBase64 } = payload;
      if (!slug || !filename || !dataBase64) {
        return sendJSON(res, 400, { error: "Paramètres manquants." });
      }
      const inputBuffer = Buffer.from(dataBase64, "base64");
      const isSvg = path.extname(filename).toLowerCase() === ".svg";

      let outName, outBuffer;
      if (isSvg) {
        // SVG : gardé tel quel (vectoriel, déjà léger).
        outName = `${slugify(slug)}.svg`;
        outBuffer = inputBuffer;
      } else {
        // Tout le reste : redimensionné à 1200 px de large max + WebP q75 (EcoIndex).
        outName = `${slugify(slug)}.webp`;
        try {
          outBuffer = await sharp(inputBuffer)
            .rotate()
            .resize(1200, null, { withoutEnlargement: true })
            .webp({ quality: 75 })
            .toBuffer();
        } catch {
          return sendJSON(res, 400, { error: "Image illisible ou format non pris en charge." });
        }
      }

      await fs.writeFile(path.join(IMAGES_DIR, outName), outBuffer);
      return sendJSON(res, 200, {
        path: `/images/articles/${outName}`,
        bytes: outBuffer.length,
      });
    }

    if (pathname === "/api/build" && req.method === "POST") {
      const payload = await readJSONBody(req);
      const target = payload.target === "dist" ? "dist" : "prod";
      const env = { ...process.env };
      const args = ["astro", "build", "--outDir", target];
      if (target === "prod") env.PUBLIC_ENABLE_INDEXING = "true";
      try {
        const { stdout } = await execFileAsync("npx", args, { cwd: ROOT, env });
        return sendJSON(res, 200, { ok: true, target, output: stdout.slice(-4000) });
      } catch (err) {
        return sendJSON(res, 500, {
          ok: false,
          target,
          error: "Le build a échoué.",
          output: String(err.stdout || err.message || err).slice(-4000),
        });
      }
    }

    return serveStatic(req, res, pathname);
  } catch (err) {
    console.error(err);
    return sendJSON(res, 500, { error: String(err.message || err) });
  }
});

server.listen(PORT, () => {
  console.log(`Admin blog conform-IT : http://localhost:${PORT}`);
});
