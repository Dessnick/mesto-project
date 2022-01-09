import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupClassList) {
    super(popupSelector, popupClassList);
    this._image = this._popup.querySelector(popupClassList.popupImage);
    this._imageCaption = this._popup.querySelector(popupClassList.popupImageCaption);
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._imageCaption = data.name;
    super.open();
  }

  // close() {
  //   super.close();
  // }
}
