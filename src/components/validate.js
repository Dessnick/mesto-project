function selectErrorElement(popupForm, inputElement) {
  return popupForm.querySelector(`.${inputElement.id}-error`);
}

function showInputError(popupForm, inputElement, errorMessage, selectors) {
  const errorElement = selectErrorElement(popupForm, inputElement);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.classList.add(selectors.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(popupForm, inputElement, selectors) {
  const errorElement = selectErrorElement(popupForm, inputElement);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(popupForm, inputElement, selectors) {
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.validationMessage;
    if (!inputElement.value.length) {
      errorMessage = 'Вы пропустили это поле.';
    }

    showInputError(popupForm, inputElement, errorMessage, selectors);
  } else {
    hideInputError(popupForm, inputElement, selectors);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, selectors) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonSubmit = formElement.querySelector(selectors.submitButtonSelector);

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    toggleButtonState(inputList, buttonSubmit, selectors);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonSubmit, selectors);
    });
  });
}

function resetValidation(inputList, popupForm, selectors) {
  inputList.forEach((inputElement) => {
    hideInputError(popupForm, inputElement, selectors);
  });

  const buttonSubmit = popupForm.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit, selectors);
}

function enableValidation(selectors) {
  const popupFormList = Array.from(document.querySelectorAll(selectors.formSelector));
  popupFormList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
}

export { resetValidation, enableValidation };
