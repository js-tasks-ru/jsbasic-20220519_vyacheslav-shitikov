export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.container = null;
    this.elem = this.createSlider();
    this.steps = steps;
    this.value = value;
    this.getSegments();
    this.valueChange();
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    this.spans = this.sliderSteps.querySelectorAll('span');
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.spans[value].classList.add('slider__step-active');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderValue.innerHTML = value;
    this.progress = this.elem.querySelector('.slider__progress');
    this.progress.style.width = `${value}%`;
  }

  createSlider() {
    const slider = document.createElement('div');
    slider.classList.add('slider');
    slider.innerHTML = `
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
    
        <!--Заполненная часть слайдера-->
        <div class="slider__progress"></div>
    
        <!--Шаги слайдера-->
        <div class="slider__steps"></div>
  `;
    return slider;
  }
  getSegments() {
    const sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      const span = document.createElement('span');
      sliderSteps.append(span);
    }
  }
  valueChange() {
    const sliderSteps = this.elem.querySelector('.slider__steps');
    const spans = sliderSteps.querySelectorAll('span');
    const progress = this.elem.querySelector('.slider__progress');
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let leftPercents = value / segments * 100;

      this.thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      for (let span of spans) {
        spans[value].classList.add('slider__step-active');
        if (span.classList.contains('slider__step-active')) {
          span.classList.remove('slider__step-active');
        }
      }
      const newEvent = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      })
      this.elem.dispatchEvent(newEvent);

      this.sliderValue.innerHTML = value;
    });
  }
  
 }
