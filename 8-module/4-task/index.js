import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!!product) {
      const item = this.cartItems.find(item => item.product.id === product.id);
      if (!item) {
        this.cartItems.push({
          product: product,
          count: 1
        });
      } else {
        item.count++;
      }
    }

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (!item) {
      return;     
    }
    if (amount === 1) {
      item.count++;
    } else if (amount === -1) {
      item.count--;
    }
    if (item.count === 0) {
      const index = this.cartItems.indexOf(item);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    }
    if (document.body.classList.contains('is-modal-open')) {
      this.onProductUpdate(productId);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    let price = 0;
    for (let cartItem of this.cartItems) {
      price += cartItem.product.price * cartItem.count;
    }
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modalWindow = new Modal();
    modalWindow.setTitle("Your order");

    const div = document.createElement('div');
    this.cartItems.map((item) => {
      div.append(this.renderProduct(item.product, item.count));
    });
    div.append(this.renderOrderForm());

    modalWindow.setBody(div);
    modalWindow.open();

    let clickCount = (event) => {
      if (!event.target.closest("button")) {
        return;
      }
      if (event.target.closest("button").className.includes("plus")) {
        const productId = event.target.closest("[data-product-id]").getAttribute("data-product-id");
        this.updateProductCount(productId, 1);
      }
      if (event.target.closest("button").className.includes("minus")) {
        const productId = event.target.closest("[data-product-id]").getAttribute("data-product-id");
        this.updateProductCount(productId, -1);
      }
    }
    modalWindow.elem.addEventListener('click', clickCount);
    let form = document.querySelector('.cart-form');
    form.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });

  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    
    if (document.body.classList.contains('is-modal-open')) {
      if (this.isEmpty()) {
        document.body.classList.remove("is-modal-open");
        document.querySelector(".modal").remove();
        return;
      }
      let modalBody = document.querySelector('.modal');
      let price = this.getTotalPrice();

      let productCount = modalBody.querySelector(`[data-product-id="${cartItem}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${cartItem}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      let sumPriceProduct = this.cartItems.filter(item => item.product.id == cartItem);

      if (sumPriceProduct.length > 0) {
        productCount.innerHTML = sumPriceProduct[0].count;
        productPrice.innerHTML = `€${
          (sumPriceProduct[0].product.price * sumPriceProduct[0].count).toFixed(2)
        }`;
        infoPrice.innerHTML = `€${price.toFixed(2)}`;
      }

      console.log(this.cartItems);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    document.querySelector('.cart-buttons__button').classList.add('is-loading');
    let form = document.querySelector('.cart-form');
    const formData = new FormData(form);
    const promise = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST',
    })
    promise
      .then(() => {
        document.querySelector('.modal__title').innerHTML = 'Success!';
        this.cartItems = [];
        document.querySelector('.modal__body').innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`
      })
      .catch(() => {
        alert('error');
      })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

