export default class ProductCard {
  constructor(card) {
    this.card = card;
    this.createCard();
    this.customEvent();
    this.elem.addEventListener('click', this.customEvent.bind(this));
  }
  createCard () {
    this.elem = document.createElement(`div`);
    this.elem.innerHTML = `
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.card.image}" class="card__image" alt="product">
          <span class="card__price">€${this.card.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.card.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }
  customEvent () {
    let button = this.elem.querySelector('.card__button');
    let event = new CustomEvent('product-add', {
      detail: this.card.id,
      bubbles: true
    });
    button.dispatchEvent(event);
  }
}