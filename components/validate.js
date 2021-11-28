function showInputError(popupForm, inputElement, errorMessage) {
  const errorElement = popupForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__item_type_error');
  errorElement.classList.add('popup__item-error_active');
  errorElement.textContent = errorMessage;
}

function hideInputError(popupForm, inputElement) {
  const errorElement = popupForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__item_type_error');
  errorElement.classList.remove('popup__item-error_active');
  errorElement.textContent = '';
}

function checkInputValidity(popupForm, inputElement) {
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.validationMessage;
    if (!inputElement.value.length) {
      errorMessage = 'Вы пропустили это поле.';
    }

    showInputError(popupForm, inputElement, errorMessage);
  } else {
    hideInputError(popupForm, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  }
}

function setInputEventListeners(popupForm) {
  const inputList = Array.from(popupForm.querySelectorAll('.popup__item'));
  const buttonSubmit = popupForm.querySelector('.popup__button_type_submit');

  toggleButtonState(inputList, buttonSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popupForm, inputElement);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
}

export default function enableValidation() {
  const popupFormList = Array.from(document.querySelectorAll('.popup__form'));
  popupFormList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__input-container'));
    fieldsetList.forEach((fieldsetElement) => {
      setInputEventListeners(fieldsetElement);
    });
  });
}
