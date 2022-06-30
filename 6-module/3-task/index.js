export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.container = null;
    this.init();
    this.initEvents();
  }

  get elem() {
    return this.container;
  }

  init() {
    this.container = this.createContainer();
  }

  createContainer() {
    const container = document.createElement('div');
    container.className = 'carousel';

    let content = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
    `;

    this.slides.forEach(slide => {
      content += `
      <div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€ ${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button" data-id="${slide.id}">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `;
    });

    content += '</div>';
    container.innerHTML = content;

    return container;
  }

  initEvents() {
    const arrowLeft = this.container.querySelector('.carousel__arrow_left');
    const arrowRight = this.container.querySelector('.carousel__arrow_right');
    const containerSlides = this.container.querySelector('.carousel__inner');
    const slidesCount = this.slides.length;

    let count = 0;
    let currentIndex = 0;

    arrowLeft.style.display = 'none';

    arrowRight.addEventListener('click', function() {
      const widthSlide = containerSlides.offsetWidth;
      count += widthSlide;
      currentIndex++;
      containerSlides.style.transform = `translateX(-${count}px)`;
      if (currentIndex >= slidesCount - 1) {
        arrowRight.style.display = 'none';
      }
      arrowLeft.style.display = 'flex';
    });


    arrowLeft.addEventListener('click', function() {
      const widthSlide = containerSlides.offsetWidth;
      count -= widthSlide;
      currentIndex--;
      containerSlides.style.transform = `translateX(-${count}px)`;
      if (currentIndex <= 0) {
        arrowLeft.style.display = 'none';
      }
      arrowRight.style.display = 'flex';
    });

    this.elem.querySelectorAll('.carousel__button').forEach(btn => {
      btn.addEventListener('click', () => {
        this.dispatchEvent(btn.dataset.id);
      });
    });
  }

  dispatchEvent(id) {
    const event = new CustomEvent('product-add', {
      detail: id,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
    console.log(this.elem);
  }
}