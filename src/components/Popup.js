export default class Popup {
  constructor(popupSelector, popupClassList) {
    this._popupOpened = popupClassList.popupOpened;
    this._popup = document.querySelector(popupSelector);
    this._popupButtonClose = this._popup.querySelector(popupClassList.buttonClose);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._popupOpened);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._popupOpened);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleButtonClose() {
    this.close();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains(this._popupOpened)) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
    this._popupButtonClose.addEventListener('click', this._handleButtonClose.bind(this));
  }
}
