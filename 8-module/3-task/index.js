export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let isContains = false;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.name == product.name) {
        isContains = true;
        this.cartItems[i].count++; 
      }
    }

    if (!isContains) {
      let cartItem = {
        product: product, 
        count: 1
      };

      this.cartItems.push(cartItem);
      this.onProductUpdate(cartItem);
    }
    
  }

  updateProductCount(productId, amount) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id == productId) {
        this.cartItems[i].count += amount;

        if (this.cartItems[i].count == 0) {
          this.cartItems.splice(i, 1);
        } else {
          this.onProductUpdate(this.cartItems[i]);
        }
      }
    }
  }

  isEmpty() {
    return this.cartItems.length > 0 ? false : true;
  }

  getTotalCount() {
    let result = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      result += this.cartItems[i].count;
    }

    return result;
  }

  getTotalPrice() {
    let result = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      result += this.cartItems[i].product.price * this.cartItems[i].count;
    }

    return result;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    
    this.cartIcon.update(this);
  }
}

