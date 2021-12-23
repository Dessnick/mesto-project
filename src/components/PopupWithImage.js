import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(data, selector) {
    super(selector);
    this._image = data.image;
  }

  open() {
    super.open();
    popupImage.src = this.image;
  }

  close() {
    super.close();
    popupImage.src = '';
  }
}