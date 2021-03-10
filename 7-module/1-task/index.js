import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement("div");
    this.render();
  }

  render() {
    this.elem.classList.add("ribbon");

    const ribbonArrowLeft = document.createElement("button");
    ribbonArrowLeft.classList.add("ribbon__arrow", "ribbon__arrow_left", "ribbon__arrow_visible")

    const imgIconLeft = document.createElement("img");
    imgIconLeft.setAttribute("src", "/assets/images/icons/angle-icon.svg");
    imgIconLeft.setAttribute("alt", "icon");
    ribbonArrowLeft.append(imgIconLeft);
    this.elem.append(ribbonArrowLeft);

    const ribbonInner = document.createElement("nav");
    ribbonInner.classList.add("ribbon__inner");

    for (const category of this.categories) {
      const linkCategory = document.createElement("a");
      linkCategory.setAttribute("href", "#");
      linkCategory.classList.add("ribbon__item");
      linkCategory.setAttribute("data-id", category.id);
      linkCategory.innerText = category.name;

      linkCategory.addEventListener("click", (event) => {
        event.preventDefault();
        this.removeActiveClass();
        linkCategory.classList.add("ribbon__item_active")
        this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
          detail: category.id,
          bubbles: true,
        }));
      })

      ribbonInner.append(linkCategory);
    }
    this.elem.append(ribbonInner);
    
    const ribbonArrowRight = document.createElement("button");
    ribbonArrowRight.classList.add("ribbon__arrow", "ribbon__arrow_right", "ribbon__arrow_visible")
    
    const imgIconRight = document.createElement("img");
    imgIconRight.setAttribute("src", "/assets/images/icons/angle-icon.svg");
    imgIconRight.setAttribute("alt", "icon");
    ribbonArrowRight.append(imgIconRight);
    this.elem.append(ribbonArrowRight);

    this.events(ribbonArrowRight, ribbonArrowLeft);
  }

  events(ribbonArrowRight, ribbonArrowLeft) {
      const ribbonInner = this.elem.querySelector(".ribbon__inner");
      ribbonInner.children[0].classList.add("ribbon__item_active");

      ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
      ribbonArrowLeft.addEventListener("click", () => {
        ribbonInner.scrollBy(-350, 0);
      })

      ribbonArrowRight.addEventListener("click", () => {
        ribbonInner.scrollBy(350, 0);
      })

      ribbonInner.addEventListener("scroll", () => {
        if (ribbonInner.scrollLeft == 0) {
          ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
        } else {
          ribbonArrowLeft.classList.add("ribbon__arrow_visible");
        }
              
        let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - document.documentElement.clientWidth;
        if (scrollRight < 1) {
          ribbonArrowRight.classList.remove("ribbon__arrow_visible");
        } else {
          ribbonArrowRight.classList.add("ribbon__arrow_visible");
        }
      })
    
  }

  removeActiveClass() {
    const ribbonItems = document.querySelectorAll(".ribbon__item");
    for (const ribbonItem of ribbonItems) {
      ribbonItem.classList.remove("ribbon__item_active");
    }
  }
}
