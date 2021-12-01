function handleKeyEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function handleOverlayPopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
}

function setCloseHandlers(popupForm) {
  document.addEventListener('keydown', handleKeyEsc);
  popupForm.addEventListener('click', handleOverlayPopup);
}

function removeCloseHandlers(popupForm) {
  document.removeEventListener('keydown', handleKeyEsc);
  popupForm.removeEventListener('click', handleOverlayPopup);
}

function openPopup(popupForm) {
  popupForm.classList.add('popup_opened');
  setCloseHandlers(popupForm);
}

function closePopup() {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
  removeCloseHandlers(popupForm);
}

export { openPopup, closePopup };
