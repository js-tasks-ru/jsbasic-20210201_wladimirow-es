import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    let isContains = false;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.name == product.name) {
        isContains = true;
        this.cartItems[i].count++; 
      }
    }

    if (!isContains) {
      let cartItem = {
        product: product, 
        count: 1
      };

      this.cartItems.push(cartItem);
      this.onProductUpdate(cartItem);
    }
    
  }

  updateProductCount(productId, amount) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id == productId) {
        this.cartItems[i].count += amount;
        this.onProductUpdate(this.cartItems[i]);
        
        if (this.cartItems[i].count == 0) {
          this.cartItems.splice(i, 1);
        }
      }
    }
  }

  isEmpty() {
    return this.cartItems.length > 0 ? false : true;
  }

  getTotalCount() {
    let result = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      result += this.cartItems[i].count;
    }

    return result;
  }

  getTotalPrice() {
    let result = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      result += this.cartItems[i].product.price * this.cartItems[i].count;
    }

    return result;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    let modalBody = document.createElement("div");

    for (const cartItem of this.cartItems) {
      modalBody.append( this.renderProduct(cartItem.product, cartItem.count) );
    }

    modalBody.append( this.renderOrderForm() );
    this.modal.setBody(modalBody);
    this.modal.open();

    const plusMinusButtons = modalBody.querySelectorAll(".cart-counter__button");
    for (const plusMinusButton of plusMinusButtons) {
      plusMinusButton.addEventListener("click", (event) => {
        const curCartProduct = event.target.closest(".cart-product");

        if (plusMinusButton.classList.contains("cart-counter__button_minus")) {
          this.updateProductCount(curCartProduct.getAttribute("data-product-id"), -1);
        } else {
          this.updateProductCount(curCartProduct.getAttribute("data-product-id"), 1);
        }
      })
      
    }
    
    const cartForm = modalBody.querySelector(".cart-form");
    cartForm.addEventListener("submit", (event) => {
      this.onSubmit(event);
    })
  }

  onProductUpdate(cartItem) {
    if (document.querySelector(".is-modal-open")) {
      if (this.getTotalCount() < 1) {
        document.body.classList.remove("is-modal-open");
        document.querySelector(".modal").remove();
      } else {
        let products = document.querySelectorAll(".cart-product");
        for (const product of products) {
          if (product.getAttribute("data-product-id") == cartItem.product.id) {
            product.querySelector(".cart-counter__count").innerHTML = cartItem.count;
            product.querySelector(".cart-product__price").innerHTML = '€' + (cartItem.count * cartItem.product.price).toFixed(2);
            document.querySelector(".cart-buttons__info-price").innerHTML = '€' + this.getTotalPrice().toFixed(2);
          }
        }
      }
    }
    
    this.cartIcon.update(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector(`[type="submit"]`);
    submitBtn.classList.add("is-loading");

    let response = await  fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(event.target),
    })
    
    if (response.ok) {
      this.modal.setTitle('Success!');
      this.modal.setBody(createElement(
        `<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`
      ));
    
      this.cartItems = [];
    }
    
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

