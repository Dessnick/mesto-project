export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._popupButtonClose = this._popup.querySelector('.popup__button_type_close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('keydown', this._handleEscClose());
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('keydown', this._handleEscClose());
  }

  _handleEscClose() {
      if (evt.key === 'Escape') {
        this.close();
      }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
    this._popupButtonClose.addEventListener('click', this.close());
  }
}