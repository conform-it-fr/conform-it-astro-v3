let articles = [];
let currentSlug = null;
let pendingImagePath = null;

const $ = (id) => document.getElementById(id);

async function api(path, options) {
  const res = await fetch(path, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
  return data;
}

function sortForDisplay(list) {
  return [...list].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return (b.pubDate || "").localeCompare(a.pubDate || "");
  });
}

async function loadArticles() {
  articles = await api("/api/articles");
  renderCategoryFilter();
  renderTable();
}

function renderCategoryFilter() {
  const select = $("filter-category");
  const current = select.value;
  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))].sort();
  select.innerHTML = '<option value="">Toutes les catégories</option>' +
    categories.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
  select.value = current;

  const formSelect = $("f-category-select");
  const currentFormValue = formSelect.value;
  formSelect.innerHTML = '<option value="">— Aucune —</option>' +
    categories.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("") +
    '<option value="__new__">+ Nouvelle catégorie…</option>';
  if ([...formSelect.options].some((o) => o.value === currentFormValue)) {
    formSelect.value = currentFormValue;
  }
}

function setCategoryValue(cat) {
  const select = $("f-category-select");
  const newInput = $("f-category-new");
  const hidden = $("f-category");

  if (!cat) {
    select.value = "";
    newInput.value = "";
    newInput.classList.add("hidden");
  } else if ([...select.options].some((o) => o.value === cat)) {
    select.value = cat;
    newInput.value = "";
    newInput.classList.add("hidden");
  } else {
    select.value = "__new__";
    newInput.value = cat;
    newInput.classList.remove("hidden");
  }
  hidden.value = cat || "";
}

function handleCategorySelectChange() {
  const select = $("f-category-select");
  const newInput = $("f-category-new");
  const hidden = $("f-category");

  if (select.value === "__new__") {
    newInput.classList.remove("hidden");
    newInput.value = "";
    newInput.focus();
    hidden.value = "";
  } else {
    newInput.classList.add("hidden");
    newInput.value = "";
    hidden.value = select.value;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Icône œil (article visible → cliquer pour masquer) / œil barré (article masqué → cliquer pour afficher).
function eyeIcon(hidden) {
  return hidden
    ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 18 18"/><path d="M10.6 10.6a3 3 0 0 0 4.2 4.2"/><path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c6.5 0 10 8 10 8a13.3 13.3 0 0 1-2.2 3.1M6.6 6.6C3.6 8.3 2 12 2 12s3.5 8 10 8a10.9 10.9 0 0 0 5.4-1.4"/></svg>'
    : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-8 10-8 10 8 10 8-3.5 8-10 8-10-8-10-8Z"/><circle cx="12" cy="12" r="3"/></svg>';
}

const TITLE_SUFFIX = " - conform-IT";

function setCounter(id, text, { over, warn } = {}) {
  const el = $(id);
  if (!el) return;
  el.textContent = text;
  el.classList.toggle("over", Boolean(over));
  el.classList.toggle("warn", Boolean(warn) && !over);
}

// Compteurs de caractères SEO : longueur du <title> rendu, et longueur de la meta description effective.
function refreshCounters() {
  const title = $("f-title").value.trim();
  const seo = $("f-seo-title").value.trim();
  const desc = $("f-description").value.trim();
  const meta = $("f-meta-description").value.trim();

  const fullTitleLen = (seo || title).length + TITLE_SUFFIX.length;
  setCounter(
    "f-seo-title-count",
    `« title » rendu : ${fullTitleLen} caractères (idéal ≤ 60)`,
    { over: fullTitleLen > 60, warn: fullTitleLen > 0 && fullTitleLen < 25 }
  );

  setCounter(
    "f-description-count",
    meta
      ? `${desc.length} caractères — extrait de la liste (la meta dédiée ci-dessous est utilisée pour le SEO)`
      : `${desc.length} caractères — sert aussi de meta description (idéal 150-160)`,
    { over: !meta && desc.length > 160, warn: !meta && desc.length > 0 && desc.length < 110 }
  );

  setCounter(
    "f-meta-description-count",
    meta ? `${meta.length} caractères (idéal 150-160)` : "Vide → le résumé ci-dessus est utilisé",
    { over: meta.length > 160, warn: meta.length > 0 && meta.length < 110 }
  );
}

function renderTable() {
  const search = $("filter-search").value.trim().toLowerCase();
  const category = $("filter-category").value;

  let list = sortForDisplay(articles);
  if (search) list = list.filter((a) => a.title.toLowerCase().includes(search));
  if (category) list = list.filter((a) => a.category === category);

  $("count").textContent = `${list.length} article${list.length > 1 ? "s" : ""}`;

  const tbody = $("article-rows");
  tbody.innerHTML = "";

  const draggable = !search && !category;

  list.forEach((a) => {
    const tr = document.createElement("tr");
    tr.className = "article-row";
    tr.dataset.slug = a.slug;
    tr.draggable = draggable;

    const dateLabel = a.pubDate ? new Date(a.pubDate).toLocaleDateString("fr-FR") : "";
    const img = a.image ? `<img class="thumb" src="/content-images/${encodeURIComponent(a.image.split("/").pop())}" alt="" />` : `<div class="thumb"></div>`;

    tr.innerHTML = `
      <td class="drag-handle" title="${draggable ? "Glisser pour réordonner" : ""}">${draggable ? "⠿" : ""}</td>
      <td>${img}</td>
      <td>${escapeHtml(a.title)}${a.order !== undefined ? `<span class="pill" title="Ordre manuel"> #${a.order}</span>` : ""}</td>
      <td>${a.category ? `<span class="pill">${escapeHtml(a.category)}</span>` : ""}</td>
      <td>${dateLabel}</td>
      <td>
        ${a.featured ? '<span class="pill featured-flag">Featured</span>' : ""}
        ${a.hidden ? '<span class="pill hidden-flag">Masqué</span>' : ""}
        ${a.noindex ? '<span class="pill noindex-flag">noindex</span>' : ""}
      </td>
      <td class="row-actions">
        <button class="btn-icon" data-toggle-hidden="${a.slug}" title="${a.hidden ? "Rendre l'article visible" : "Masquer l'article"}" aria-label="${a.hidden ? "Rendre l'article visible" : "Masquer l'article"}">${eyeIcon(a.hidden)}</button>
        <button class="btn-icon" data-open="${a.slug}" title="Modifier" aria-label="Modifier">✏️</button>
      </td>
    `;

    tr.addEventListener("click", (e) => {
      if (e.target.closest("[data-open]") || e.target.closest("[data-toggle-hidden]")) return;
      openEdit(a.slug);
    });
    tr.querySelector("[data-open]").addEventListener("click", () => openEdit(a.slug));
    tr.querySelector("[data-toggle-hidden]").addEventListener("click", async (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      btn.disabled = true;
      try {
        await api(`/api/articles/${a.slug}/toggle-hidden`, { method: "POST", headers: jsonHeaders() });
        await loadArticles();
      } catch (err) {
        alert(err.message);
        btn.disabled = false;
      }
    });

    if (draggable) {
      tr.addEventListener("dragstart", () => tr.classList.add("dragging"));
      tr.addEventListener("dragend", () => {
        tr.classList.remove("dragging");
        persistOrder();
      });
    }

    tbody.appendChild(tr);
  });

  if (draggable) {
    tbody.addEventListener("dragover", (e) => {
      e.preventDefault();
      const dragging = tbody.querySelector(".dragging");
      const after = getRowAfter(tbody, e.clientY);
      if (!dragging) return;
      if (after == null) tbody.appendChild(dragging);
      else tbody.insertBefore(dragging, after);
    });
  }
}

function getRowAfter(container, y) {
  const rows = [...container.querySelectorAll(".article-row:not(.dragging)")];
  return rows.reduce(
    (closest, row) => {
      const box = row.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) return { offset, element: row };
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}

async function persistOrder() {
  const order = [...document.querySelectorAll("#article-rows .article-row")].map((r) => r.dataset.slug);
  await api("/api/reorder", { method: "POST", headers: jsonHeaders(), body: JSON.stringify({ order }) });
  await loadArticles();
}

function jsonHeaders() {
  return { "Content-Type": "application/json" };
}

function showList() {
  $("view-list").classList.remove("hidden");
  $("view-form").classList.add("hidden");
}

function showForm() {
  $("view-list").classList.add("hidden");
  $("view-form").classList.remove("hidden");
}

function resetForm() {
  currentSlug = null;
  pendingImagePath = null;
  $("article-form").reset();
  $("f-slug").value = "";
  $("f-slug-preview").textContent = "";
  $("f-seo-title").value = "";
  $("f-meta-description").value = "";
  $("f-noindex").checked = false;
  $("f-image").value = "";
  $("image-preview").classList.add("hidden");
  setCategoryValue("");
  $("btn-delete").classList.add("hidden");
  $("form-error").textContent = "";
  $("f-pubdate").value = new Date().toISOString().slice(0, 10);
  refreshCounters();
}

function openNew() {
  resetForm();
  $("form-title").textContent = "Nouvel article";
  showForm();
  $("f-title").focus();
}

async function openEdit(slug) {
  const article = await api(`/api/articles/${slug}`);
  resetForm();
  currentSlug = slug;
  $("form-title").textContent = "Modifier l'article";
  $("f-slug").value = slug;
  $("f-slug-preview").textContent = `URL : /articles/${slug}/ (fixe, ne change pas après création)`;
  $("f-title").value = article.title || "";
  $("f-seo-title").value = article.seoTitle || "";
  $("f-description").value = article.description || "";
  $("f-meta-description").value = article.metaDescription || "";
  $("f-noindex").checked = Boolean(article.noindex);
  setCategoryValue(article.category || "");
  $("f-pubdate").value = article.pubDate || "";
  $("f-order").value = article.order !== undefined ? article.order : "";
  $("f-featured").checked = Boolean(article.featured);
  $("f-hidden").checked = Boolean(article.hidden);
  $("f-image").value = article.image || "";
  $("f-image-alt").value = article.imageAlt || "";
  $("f-body").value = article.body || "";
  if (article.image) {
    $("image-preview-img").src = `/content-images/${article.image.split("/").pop()}`;
    $("image-preview").classList.remove("hidden");
  }
  $("btn-delete").classList.remove("hidden");
  refreshCounters();
  showForm();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleImageUpload() {
  const fileInput = $("f-image-file");
  const file = fileInput.files[0];
  if (!file) return;

  const title = $("f-title").value.trim();
  const slugBase = currentSlug || title || "article";
  const dataBase64 = await fileToBase64(file);

  const result = await api("/api/upload-image", {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ slug: slugBase, filename: file.name, dataBase64 }),
  });

  $("f-image").value = result.path;
  $("image-preview-img").src = URL.createObjectURL(file);
  $("image-preview").classList.remove("hidden");
}

async function handleSubmit(e) {
  e.preventDefault();
  $("form-error").textContent = "";

  const payload = {
    title: $("f-title").value.trim(),
    seoTitle: $("f-seo-title").value.trim(),
    description: $("f-description").value.trim(),
    metaDescription: $("f-meta-description").value.trim(),
    category: $("f-category").value.trim(),
    pubDate: $("f-pubdate").value,
    order: $("f-order").value,
    featured: $("f-featured").checked,
    hidden: $("f-hidden").checked,
    noindex: $("f-noindex").checked,
    image: $("f-image").value,
    imageAlt: $("f-image-alt").value.trim(),
    body: $("f-body").value,
  };

  try {
    if (currentSlug) {
      await api(`/api/articles/${currentSlug}`, { method: "PUT", headers: jsonHeaders(), body: JSON.stringify(payload) });
    } else {
      await api("/api/articles", { method: "POST", headers: jsonHeaders(), body: JSON.stringify(payload) });
    }
    await loadArticles();
    showList();
  } catch (err) {
    $("form-error").textContent = err.message;
  }
}

async function handleDelete() {
  if (!currentSlug) return;
  if (!confirm(`Supprimer définitivement "${$("f-title").value}" ?\n\nL'article sera déplacé dans .deleted-articles/ (récupérable manuellement), pas supprimé du disque.`)) return;
  await api(`/api/articles/${currentSlug}`, { method: "DELETE" });
  await loadArticles();
  showList();
}

async function runBuild(target, label) {
  const statusEl = $("build-status");
  const buttons = [$("btn-build-dist"), $("btn-build-prod")];
  buttons.forEach((b) => (b.disabled = true));
  statusEl.classList.remove("hidden", "success", "error");
  statusEl.classList.add("running");
  statusEl.textContent = `⏳ Génération en cours (${label})...`;

  try {
    const result = await api("/api/build", { method: "POST", headers: jsonHeaders(), body: JSON.stringify({ target }) });
    statusEl.classList.remove("running");
    statusEl.classList.add("success");
    const time = new Date().toLocaleTimeString("fr-FR");
    statusEl.textContent = `✅ Site généré dans ${target}/ à ${time}.`;
  } catch (err) {
    statusEl.classList.remove("running");
    statusEl.classList.add("error");
    statusEl.textContent = `❌ Échec de la génération (${label}) : ${err.message}`;
  } finally {
    buttons.forEach((b) => (b.disabled = false));
  }
}

$("btn-build-dist").addEventListener("click", () => runBuild("dist", "aperçu"));
$("btn-build-prod").addEventListener("click", () => runBuild("prod", "publication"));

$("btn-new").addEventListener("click", openNew);
$("btn-back").addEventListener("click", showList);
$("btn-delete").addEventListener("click", handleDelete);
$("article-form").addEventListener("submit", handleSubmit);
$("f-image-file").addEventListener("change", handleImageUpload);
$("filter-search").addEventListener("input", renderTable);
$("filter-category").addEventListener("change", renderTable);
$("f-category-select").addEventListener("change", handleCategorySelectChange);
$("f-category-new").addEventListener("input", (e) => { $("f-category").value = e.target.value.trim(); });
$("f-title").addEventListener("input", () => {
  if (!currentSlug) $("f-slug-preview").textContent = "L'URL sera générée automatiquement à l'enregistrement.";
});

["f-title", "f-seo-title", "f-description", "f-meta-description"].forEach((id) => {
  $(id).addEventListener("input", refreshCounters);
});

loadArticles();
