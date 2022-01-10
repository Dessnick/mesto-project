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
