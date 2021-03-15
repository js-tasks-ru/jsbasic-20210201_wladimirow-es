import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement("div");
    this.elem.classList.add("modal");
    this.render();
  }

  render() {
    const overlayModal = document.createElement("div");
    overlayModal.classList.add("modal__overlay");
    this.elem.append(overlayModal);

    const innerModal = document.createElement("div");
    innerModal.classList.add("modal__inner");

    const headerModal = document.createElement("div");
    headerModal.classList.add("modal__header");

    const btnCloseModal = document.createElement("button");
    btnCloseModal.classList.add("modal__close");
    btnCloseModal.setAttribute("type", "button");

    btnCloseModal.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    });

    const imgCloseModal = document.createElement("img");
    imgCloseModal.setAttribute("src", "/assets/images/icons/cross-icon.svg");
    imgCloseModal.setAttribute("alt", "close-icon");
    
    const titleModal = document.createElement("h3");
    titleModal.classList.add("modal__title");

    const bodyModal = document.createElement("div");
    bodyModal.classList.add("modal__body");

    btnCloseModal.append(imgCloseModal);
    headerModal.append(btnCloseModal);
    headerModal.append(titleModal);
    innerModal.append(headerModal);
    innerModal.append(bodyModal);

    this.elem.append(innerModal);
  }
  
  setTitle(newModalTitle) {
    const titleModal = this.elem.querySelector(".modal__title");
    titleModal.innerText = newModalTitle;
  }

  setBody(newContentElemModal) {
    const bodyModal = this.elem.querySelector(".modal__body");

    const oldContent = bodyModal.children;
    for (const item of oldContent) {
      item.remove();
    }

    bodyModal.append(newContentElemModal);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
  }
}
