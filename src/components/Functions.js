export const saveProductsCart = (productsCart) => localStorage
  .setItem('addProductCart', JSON.stringify(productsCart));

export const addProducts = (product) => {
  if (product) {
    const saveProducts = JSON.parse(localStorage.getItem('addProductCart'));
    if (saveProducts) {
      saveProductsCart([...saveProducts, product]);
    } else {
      saveProductsCart([product]);
    }
  }
};

export const getProducts = () => {
  const saveProducts = JSON.parse(localStorage.getItem('addProductCart'));
  return saveProducts;
};

export const removeProduct = (removeId, upDate) => {
  const saveProducts = JSON.parse(localStorage.getItem('addProductCart'));
  const novaListaProduts = saveProducts.filter((prod) => removeId !== prod.ProductsId);
  console.log(removeId);
  saveProductsCart(novaListaProduts);
  upDate();
};
