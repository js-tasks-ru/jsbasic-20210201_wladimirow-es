import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    const carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);

    const ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);

    const stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').append(stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let response = await fetch('products.json');
    let products = await response.json();

    this.productsGrid = new ProductsGrid(products);
    document.querySelector('[data-products-grid-holder').innerHTML = '';
    document.querySelector('[data-products-grid-holder').append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    this.addEvents();
  }

  addEvents() {
    document.body.addEventListener('product-add', (event) => {
      this.cart.addProduct(event.detail);
    });

    document.body.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.body.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    const nutsCheckbox = document.querySelector('#nuts-checkbox');
    nutsCheckbox.addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked
      });
    });

    const vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');
    vegeterianCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked
      });
    });
  }
}
