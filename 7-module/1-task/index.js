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
  }

  createContainer() {
    return createElement(
      `
      <div class="container">
        <div class="ribbon">
          <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
          </button>

          <nav class="ribbon__inner">
            <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>
            <a href="#" class="ribbon__item" data-id="salads">Salads</a>
            <a href="#" class="ribbon__item" data-id="soups">Soups</a>
            <a href="#" class="ribbon__item" data-id="chicken-dishes">Chicken dishes</a>
            <a href="#" class="ribbon__item" data-id="beef-dishes">Beef dishes</a>
            <a href="#" class="ribbon__item" data-id="seafood-dishes">Seafood dishes</a>
            <a href="#" class="ribbon__item" data-id="vegetable-dishes">Vegetable dishes</a>
            <a href="#" class="ribbon__item" data-id="bits-and-bites">Bits and bites</a>
            <a href="#" class="ribbon__item" data-id="on-the-side ribbon__item_active">On the side</a>
          </nav>

          <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
          </button>
        </div>
      </div>`);
  }

  arrowSwipeLeft() {
    this.arrowLeft.onclick = () => {
      return this.containerItems.scrollBy(-350, 0);
    };
  }
  arrowSwipeRight() {
    this.arrowRight.onclick = () => {
      return this.containerItems.scrollBy(350, 0);
    };
  }

}
