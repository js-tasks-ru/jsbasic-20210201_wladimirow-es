export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement("div");
    this.steps = steps;
    this.value = value;
    this.render();
  }

  render() {
    this.elem.classList.add("slider");

    const sliderThumb = document.createElement("div");
    sliderThumb.classList.add("slider__thumb");
    sliderThumb.style.left = '50%';

    const sliderValue = document.createElement("span");
    sliderValue.classList.add("slider__value");
    sliderValue.innerText = this.value;

    const sliderProgress = document.createElement("div");
    sliderProgress.classList.add("slider__progress");
    sliderProgress.style.width = '50%';

    const sliderSteps = document.createElement("div");
    sliderSteps.classList.add("slider__steps");

    for (let i = 0; i < this.steps; i++) {
      const sliderStep = document.createElement("span");
      if (i == this.value) {
        sliderStep.classList.add("slider__step-active");
      }
      sliderSteps.append(sliderStep);      
    }

    sliderThumb.append(sliderValue);
    this.elem.append(sliderThumb);
    this.elem.append(sliderProgress);
    this.elem.append(sliderSteps);

    this.events();
  }

  events() {
    this.elem.addEventListener("click", (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let segments = this.steps - 1;
      let leftRelative = (left / this.elem.offsetWidth);
      let value = Math.round(leftRelative * segments);
      this.value = value;
      let valuePercent = value / segments * 100;
      

      const sliderValue = this.elem.querySelector(".slider__value");
      sliderValue.innerText = value;


      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');
      thumb.style.left = `${valuePercent}%`;
      progress.style.width = `${valuePercent}%`;

      this.removeActiveClass();
      const pickedItem = this.elem.querySelector(".slider__steps").children[value];
      pickedItem.classList.add("slider__step-active");

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      }))
    })
  }

  removeActiveClass() {
    const goalItem = this.elem.querySelector(".slider__step-active");
    goalItem.classList.remove("slider__step-active");
  }
}
