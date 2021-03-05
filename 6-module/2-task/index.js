import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement("div");
    this.elem.classList.add("card");
    this.product = product;

    this.render();
  }

  render() {
    const cardTop = document.createElement("div");
    cardTop.classList.add("card__top");

    const imgTop = document.createElement("img");
    imgTop.classList.add("card__image");
    imgTop.setAttribute("alt", "product");
    imgTop.setAttribute("src", "/assets/images/products/" + this.product.image);
    
    const span = document.createElement("span");
    span.classList.add("card__price");
    span.innerText = "€" + this.product.price.toFixed(2);
  
    cardTop.append(imgTop);
    cardTop.append(span);
    this.elem.append(cardTop);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card__body");

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card__title");
    cardTitle.innerText = this.product.name;

    const cardButton = document.createElement("button");
    cardButton.classList.add("card__button");
    cardButton.setAttribute("type", "button");

    const imgBody = document.createElement("img");
    imgBody.setAttribute("alt", "icon");
    imgBody.setAttribute("src", "/assets/images/icons/plus-icon.svg");
    
    cardButton.append(imgBody);
    cardBody.append(cardButton);
    cardBody.append(cardTitle);
    this.elem.append(cardBody);

    this.createEvent(cardButton);
  }

  createEvent(cardButton) {
    cardButton.addEventListener('click', () => {
      this.elem.dispatchEvent(new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true,
      }))
    });
    
  }

  
}
