// Implement a function which takes an array of Product and returns unique products sorted by price

type Product = {
  name: string;
  price: number;
};

function filterAndSortProducts(products: Product[]): Product[] {
  return [...returnedUniqueProduct(products).sort((a, b) => a.price - b.price)];
}

function returnedUniqueProduct(products: Product[]): Product[] {
  const uniqueProducts: Product[] = [];

  products.forEach((product) => {
    const findProduct = uniqueProducts.find(
      (uniqueProduct) =>
        uniqueProduct.name === product.name &&
        uniqueProduct.price === product.price
    );

    if (!findProduct) {
      uniqueProducts.push(product);
    }
  });

  return uniqueProducts;
}

module.exports = { filterAndSortProducts };
