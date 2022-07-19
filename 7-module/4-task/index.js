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
    this.dragDrop();
  }

  createSlider() {
    const slider = document.createElement('div');
    slider.classList.add('slider');
    slider.innerHTML = `
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
    
        <div class="slider__progress"></div>
  
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
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let leftPercents = value / segments * 100;

      this.thumb.style.left = `${leftPercents}%`;
      this.progress.style.width = `${leftPercents}%`;

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

  dragDrop() {
    this.thumb.ondragstart = () => false;

    this.thumb.addEventListener('pointerdown', () => {
      this.elem.classList.add('slider_dragging');
      const onMove = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
        let segments = this.steps - 1;
  
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }
  
        let leftPercents = leftRelative * 100;
        this.thumb.style.left = `${leftPercents}%`;
        this.progress.style.width =`${leftPercents}%`;
        let approximateValue = leftRelative * segments;
  
        this.value = Math.round(approximateValue);

      }
      this.elem.addEventListener('pointermove', onMove);

      this.thumb.addEventListener('pointerup', () => {
        this.elem.removeEventListener('pointermove', onMove);

        const eventDragDrop = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
        this.elem.dispatchEvent(eventDragDrop);
        
      });
    });

  }
  
  
 }
