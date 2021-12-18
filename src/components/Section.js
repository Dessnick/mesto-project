export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._rendere = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderCards() {
    this._container.innetHTML = '';
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.append(element);
  }
}