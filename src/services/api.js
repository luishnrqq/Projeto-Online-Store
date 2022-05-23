export async function getCategories() {
  return fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((respFetch) => respFetch.json())
    .then((dadosJson) => dadosJson);
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query} `)
    .then((respFetch) => respFetch.json())
    .then((dadosJson) => dadosJson);
}
