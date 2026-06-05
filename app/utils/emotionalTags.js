export function parseEmotionalTags(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function collectAllTags(products = []) {
  const tagSet = new Set();
  for (const product of products) {
    for (const tag of parseEmotionalTags(product.emotionalTags)) {
      tagSet.add(tag);
    }
  }
  return [...tagSet].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function normalizeTag(tag) {
  return String(tag).trim().toLowerCase();
}

export function productHasTag(product, tag) {
  const needle = normalizeTag(tag);
  return parseEmotionalTags(product.emotionalTags).some((t) => normalizeTag(t) === needle);
}

export function filterProductsByTags(products = [], selectedTags = []) {
  if (!selectedTags.length) return products;
  return products.filter((product) =>
    selectedTags.every((tag) => productHasTag(product, tag))
  );
}

export function filterProductsBySearch(products = [], query = "") {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) => {
    const haystack = [
      product.name,
      product.mindHealNo,
      product.shortDescription,
      ...parseEmotionalTags(product.emotionalTags),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterProducts(products = [], { searchQuery = "", selectedTags = [] } = {}) {
  let result = products;
  if (selectedTags.length) {
    result = filterProductsByTags(result, selectedTags);
  }
  if (searchQuery.trim()) {
    result = filterProductsBySearch(result, searchQuery);
  }
  return result;
}
