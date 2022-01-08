// export default class Section {
//   constructor({ items, renderer }, containerSelector) {
//     this._items = items[1];
//     this._userData = items[0];
//     this._renderer = renderer;
//     this._container = document.querySelector(containerSelector);
//   }

//   renderCards() {
//     this._container.innerHTML = '';
//     this._items.forEach((item) => this._renderer([item, this._userData]));
//   }

//   addItem(element) {
//     this._container.append(element);
//   }
// }

export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards(items) {
    this._container.innerHTML = '';
    items[1].forEach((item) => this._renderer([item, items[0]]));
  }

  addItem(element) {
    this._container.append(element);
  }
}
