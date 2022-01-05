import Popup from './Popup.js';
import { popupImage } from './card.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(image) {
    super.open();
    popupImage.src = image;
  }

  close() {
    super.close();
    popupImage.src = '';
  }
}