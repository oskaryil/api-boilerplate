export default class Cart {
  constructor(oldCart) {
    // Set the totalprice to the previous one or to 0
    this.totalPrice = oldCart.totalPrice || 0;
    // Set the totalQty to the previous one or to 0c
    this.totalQty = oldCart.totalQty || 0;
    // Set the items to old or empty object
    this.items = oldCart.items || {};
  }

  add(item, id) {
    let storedItem = this.items[id];
    if (storedItem) {
      storedItem = this.items[id] = { item, qty: 0, price: 0 };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.price;
  }

  generateArray() {
    const arr = [];
    Object.keys(this.items).reduce((acc, id) => arr.push(this.items[id]));
    return arr;
  }
}
