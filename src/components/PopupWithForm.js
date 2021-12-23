import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues () {
    this._inputList = this._popup.querySelectorAll('.popup__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._element = this._popup.querySelector('.popup__form');
    this._element.reset();
  }

  setEventListeners () {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      // отменим стандартное поведение
      evt.preventDefault();
      
      this._handleFormSubmit(this._getInputValues());
      // и сбросим её поля
      this._element.reset();

    })
  }
}