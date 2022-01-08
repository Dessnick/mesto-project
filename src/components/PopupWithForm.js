import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupClassList, popupSelector, handleFormSubmit) {
    super(popupClassList, popupSelector);
    this._popupForm = this._popup.querySelector(popupClassList.popupForm);
    this._inputList = this._popupForm.querySelectorAll(popupClassList.popupItem);
    this._buttonSubmit = this._popupForm.querySelector(popupClassList.buttonSubmit);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true, 'Сохраняем...');
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading, buttonText = 'Сохранить') {
    this._buttonSubmit.textContent = buttonText;
  }
}
