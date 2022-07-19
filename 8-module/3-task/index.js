export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    console.log(this.cartItems);
    console.log(this.getTotalPrice());
    
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
        this.cartItems.splice(index);
      }
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

