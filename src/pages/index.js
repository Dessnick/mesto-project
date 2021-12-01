import './index.css';
import { resetValidation, enableValidation } from '../components/validate.js';
import { openPopup, closePopup } from '../components/modal.js';
import { renderPage, createPhotoCard } from '../components/card.js';
import { initialCards } from '../components/initial_cards.js';

const popupProfileEdit = document.querySelector('.profile-edit');
const popupPlaceAdd = document.querySelector('.place-add');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const closeButtonList = Array.from(document.querySelectorAll('.popup__button_type_close'));
const loginInput = popupProfileEdit.querySelector('#login-input');
const jobInput = popupProfileEdit.querySelector('#about-input');
const placeName = popupPlaceAdd.querySelector('#place-name');
const imageLink = popupPlaceAdd.querySelector('#image-link');

const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
};

function setSubmitPopupProfileEdit(evt) {
  evt.preventDefault();

  if (!loginInput.value || !jobInput.value) {
    return;
  }

  profileName.textContent = loginInput;
  profileCaption.textContent = jobInput;

  popupProfileEdit.reset();
  closePopup(popupProfileEdit);
}

function setSubmitPopupPlaceAdd(evt) {
  evt.preventDefault();

  const inputData = {
    placeNameInput: placeName.value,
    imageLinkInput: imageLink.value,
  };

  if (!inputData.placeNameInput || !inputData.imageLinkInput) {
    return;
  }

  addPhotoCard(inputData);

  popupPlaceAdd.reset();
  closePopup(popupPlaceAdd);
}

function setOnCLickEditButton() {
  const inputList = Array.from(document.querySelectorAll('.profile-edit .popup__item'));

  resetValidation(inputList, popupProfileEdit, validationSelectors);
  openPopup(popupProfileEdit);
  // loadProfileInfo();
  enableValidation();
}

function setOnClickAddButton() {
  const inputList = Array.from(document.querySelectorAll('.place-add .popup__item'));

  resetValidation(inputList, popupProfileEdit, validationSelectors);
  openPopup(popupPlaceAdd);
  enableValidation();
}

popupProfileEdit.addEventListener('submit', setSubmitPopupProfileEdit);
popupPlaceAdd.addEventListener('submit', setSubmitPopupPlaceAdd);

editButton.addEventListener('click', setOnCLickEditButton);
addButton.addEventListener('click', setOnClickAddButton);

closeButtonList.forEach((buttonElement) => {
  buttonElement.addEventListener('click', () => {
    closePopup(popupForm);
  });
});

// function loadProfileInfo() {
//   const profileName = document.querySelector('.profile__name');
//   const profileAbout = document.querySelector('.profile__caption');
//   popupProfileEdit.querySelector('#login-input').value = profileName.textContent;
//   popupProfileEdit.querySelector('#about-input').value = profileAbout.textContent;
// }

renderPage(initialCards);

enableValidation(validationSelectors);
