import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement("div");
    this.render();
  }

  render() {
    this.elem.classList.add("products-grid");
    const productsGridInner = document.createElement("div");
    productsGridInner.classList.add("products-grid__inner");
    this.elem.append(productsGridInner);
    this.addProducts(this.products)
  }

  updateFilter(filters) {
    for (const key in filters) {
      if (Object.hasOwnProperty.call(filters, key)) {
        this.filters[key] = filters[key];
      }
    }
    
    let filteredProducts = this.products.filter((product) => {
      let isFiltered = true;

      if (this.filters['vegeterianOnly'] && !product['vegeterian']) {
        isFiltered = false;
      }
      if (this.filters['noNuts'] && product['nuts']) {
        isFiltered = false;
      }
      if (Object.hasOwnProperty.call(this.filters, ['maxSpiciness']) && product['spiciness'] > this.filters['maxSpiciness']) {
        isFiltered = false;
      }
      if (this.filters['category'] && product['category'] != this.filters['category']) {
        isFiltered = false;
      }
      
      if (isFiltered) {
        return product;
      }
    });
      
    this.addProducts(filteredProducts);
  }

  addProducts (products) {
    const productsGridInner = this.elem.querySelector(".products-grid__inner");
    productsGridInner.innerHTML = '';

    for (const product of products) {
      let productCard = new ProductCard(product);
      productsGridInner.append(productCard.elem);
    }
    this.elem.append(productsGridInner);
  }
}
