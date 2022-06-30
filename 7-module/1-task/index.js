import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createContainer();
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.containerItems = this.elem.querySelector('.ribbon__inner');
    this.arrowSwipeLeft();
    this.arrowSwipeRight();
    this.containerItems.addEventListener('scroll', () => this.arrowHide());
    this.initEvent();
  }

  createContainer() {
    return createElement(
      `<div class="ribbon">
          <button class="ribbon__arrow ribbon__arrow_left">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
          </button>
        
          <nav class="ribbon__inner">
            ${this.categories.map(item => {
              return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
            }).join('')}
          </nav>

          <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
          </button>
        </div>`);
  }

  arrowSwipeLeft() {
    this.arrowLeft.onclick = () => {
      this.containerItems.scrollBy(-350, 0);
    };
  }
  arrowSwipeRight() {
    this.arrowRight.onclick = () => {
      this.containerItems.scrollBy(350, 0);
    };
  }
  arrowHide() {
    let scrollLeftData = this.containerItems.scrollLeft;

    let scrollWidth = this.containerItems.scrollWidth;
    let scrollLeft = this.containerItems.scrollLeft;
    let clientWidth = this.containerItems.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeftData === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    };

    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    };
  }

  initEvent() {
    let links = this.containerItems.querySelectorAll('.ribbon__item');
    links.forEach(btn => {
      btn.addEventListener('click', (e) => {
        btn.preventDefault;
        links.forEach(link => {
          if (e.target === link) {
            link.classList.add('ribbon__item_active');
          } else {
            link.classList.remove('ribbon__item_active');
          }
        });
        this.dispatchEvent(e.target.dataset.id);
      });
    });
  }
  
  dispatchEvent(categoryId) {
    const event = new CustomEvent('ribbon-select', {
      detail: categoryId,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }

}
