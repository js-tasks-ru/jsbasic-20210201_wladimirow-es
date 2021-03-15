import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render() {
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");
    
    const carouselArrowRight = document.createElement("div");
    carouselArrowRight.classList.add("carousel__arrow");
    carouselArrowRight.classList.add("carousel__arrow_right");
    const imgArrowRight = document.createElement("img");
    imgArrowRight.setAttribute("src", "/assets/images/icons/angle-icon.svg");
    imgArrowRight.setAttribute("alt", "icon");
    carouselArrowRight.append(imgArrowRight);

    const carouselArrowLeft = document.createElement("div");
    carouselArrowLeft.classList.add("carousel__arrow");
    carouselArrowLeft.classList.add("carousel__arrow_left");
    const imgArrowLeft = document.createElement("img");
    imgArrowLeft.setAttribute("src", "/assets/images/icons/angle-left-icon.svg");
    imgArrowLeft.setAttribute("alt", "icon");
    carouselArrowLeft.append(imgArrowLeft);
    
    carousel.append(carouselArrowLeft);
    carousel.append(carouselArrowRight);

    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel__inner");

    for (const slide of this.slides) {
      const carouselSlide = document.createElement("div");
      carouselSlide.classList.add("carousel__slide");
      carouselSlide.setAttribute("data-id", slide.id);

      const imgFood = document.createElement("img");
      imgFood.setAttribute("src", "/assets/images/carousel/" + slide.image);
      imgFood.setAttribute("alt", "slide");
      imgFood.classList.add("carousel__img");
      carouselSlide.append(imgFood);

      const carouselCaption = document.createElement("div");
      carouselCaption.classList.add("carousel__caption");

      const carouselPrice = document.createElement("span");
      carouselPrice.classList.add("carousel__price");
      carouselPrice.innerText = "€" + slide.price.toFixed(2);
      carouselCaption.append(carouselPrice);

      const carouselTitle = document.createElement("div");
      carouselTitle.classList.add("carousel__title");
      carouselTitle.innerText = slide.name;
      carouselCaption.append(carouselTitle);

      const carouselButton = document.createElement("button");
      carouselButton.setAttribute("type", "button");
      carouselButton.classList.add("carousel__button");

      const imgPlucIcon = document.createElement("img");
      imgPlucIcon.setAttribute("src", "/assets/images/icons/plus-icon.svg");
      imgPlucIcon.setAttribute("alt", "icon");
      carouselButton.append(imgPlucIcon);

      carouselCaption.append(carouselButton);
      carouselSlide.append(carouselCaption);

      carouselInner.append(carouselSlide);
      this.createEvent(carouselButton, slide.id);
    }
    carousel.append(carouselInner);
    this.elem = carousel;
    this.addArrowClickEvents();
  }

  addArrowClickEvents() {
    let currentPosition = 0;
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const rightArrow = this.elem.querySelector('.carousel__arrow_right');
    const leftArrow = this.elem.querySelector('.carousel__arrow_left');
    
    leftArrow.style.display = 'none';

    rightArrow.addEventListener('click', () => {
      const offset = this.elem.querySelector('.carousel__slide').offsetWidth;
      const maxPosition = -offset * (this.elem.querySelectorAll('.carousel__slide').length - 1);
      currentPosition -= offset;
      carouselInner.style.transform = 'translateX(' + currentPosition + 'px)';
      
      leftArrow.style.display = '';
      if (currentPosition == maxPosition) {
        rightArrow.style.display = 'none';
      }
    });

    leftArrow.addEventListener('click', () => {
      const offset = this.elem.querySelector('.carousel__slide').offsetWidth;
      const maxPosition = -offset * (this.elem.querySelectorAll('.carousel__slide').length - 1);
      currentPosition += offset;
      carouselInner.style.transform = 'translateX(' + currentPosition + 'px)';

      rightArrow.style.display = '';
      if (currentPosition == 0) {
        leftArrow.style.display = 'none';
      }
    });
  }

  createEvent(carouselButton, id) {
    carouselButton.addEventListener('click', () => {
      this.elem.dispatchEvent(new CustomEvent("product-add", {
        detail: id,
        bubbles: true,
      }));
    });
  }
}
