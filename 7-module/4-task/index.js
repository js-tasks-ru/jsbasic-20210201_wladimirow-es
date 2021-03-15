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
    sliderThumb.style.left = '0%';

    const sliderValue = document.createElement("span");
    sliderValue.classList.add("slider__value");
    sliderValue.innerText = this.value;

    const sliderProgress = document.createElement("div");
    sliderProgress.classList.add("slider__progress");
    sliderProgress.style.width = '0%';

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
      let valuePercent = value / segments * 100;
      this.value = value;
      this.refreshValue();

      const thumb = this.elem.querySelector('.slider__thumb');
      const progress = this.elem.querySelector('.slider__progress');
      thumb.style.left = `${valuePercent}%`;
      progress.style.width = `${valuePercent}%`;

      this.removeActiveClass();
      const pickedItem = this.elem.querySelector(".slider__steps").children[value];
      pickedItem.classList.add("slider__step-active");

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      }));
    });

    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector('.slider__progress');
    thumb.ondragstart = () => false;
    let value = this.value;
    let segments = this.steps - 1;

    thumb.addEventListener("pointerdown", () => {
      this.elem.classList.add("slider_dragging");
      
      function onMouseMove(event) {
        const slider = document.querySelector(".slider")
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;
        
        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;
        
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        
        let approximateValue = leftRelative * segments;
        value = Math.round(approximateValue);
        
        
      }
      document.addEventListener('pointermove', onMouseMove);

      document.addEventListener('pointerup', () => {
        this.value = value;
        this.refreshValue();
        
        document.removeEventListener('pointermove', onMouseMove);
        
        this.elem.classList.remove("slider_dragging");
        this.elem.dispatchEvent(new CustomEvent('slider-change', { 
          detail: this.value, 
          bubbles: true 
        }));
      });
    });
  }

  refreshValue () {
    const sliderValue = this.elem.querySelector(".slider__value");
        sliderValue.innerText = this.value;
  }

  removeActiveClass() {
    const goalItem = this.elem.querySelector(".slider__step-active");
    goalItem.classList.remove("slider__step-active");
  }
}
