export default class FormValidator {
  constructor(selectors, popupForm) {
    this._selectors = selectors;
    this._popupForm = popupForm;

    this._inputList = Array.from(this._popupForm.querySelectorAll(this._selectors.inputSelector));
    this._buttonSubmit = this._popupForm.querySelector(this._selectors.submitButtonSelector);
  }

  _selectErrorElement(inputElement) {
    return this._popupForm.querySelector(`.${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._selectErrorElement(inputElement);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.classList.add(this._selectors.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._selectErrorElement(inputElement);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      let errorMessage = inputElement.validationMessage;
      if (!inputElement.value.length) {
        errorMessage = 'Вы пропустили это поле.';
      }

      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonSubmit.classList.add(this._selectors.inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.classList.remove(this._selectors.inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    }
  }

  _setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButtonState();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._popupForm.addEventListener('reset', () => {
      this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
