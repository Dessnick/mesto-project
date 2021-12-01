import './index.css';
import { resetValidation, enableValidation } from '../components/validate.js';
import { openPopup, closePopup } from '../components/modal.js';
import { renderPage, addPhotoCard } from '../components/card.js';
import { initialCards } from '../components/initial_cards.js';

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const formProfileEdit = popupProfileEdit.querySelector('.form-profile-edit');
const formPlaceAdd = popupPlaceAdd.querySelector('.form-place-add');
const closeButtonList = Array.from(document.querySelectorAll('.popup__button_type_close'));
const loginInput = popupProfileEdit.querySelector('#login-input');
const aboutInput = popupProfileEdit.querySelector('#about-input');
const placeName = popupPlaceAdd.querySelector('#place-name-input');
const imageLink = popupPlaceAdd.querySelector('#image-link-input');

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

  const loginValue = loginInput.value;
  const aboutValue = aboutInput.value;

  if (!loginValue || !aboutValue) {
    return;
  }

  profileName.textContent = loginValue;
  profileCaption.textContent = aboutValue;

  formProfileEdit.reset();
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

  formPlaceAdd.reset();
  closePopup(popupPlaceAdd);
}

function loadProfileInfo() {
  loginInput.value = profileName.textContent;
  aboutInput.value = profileCaption.textContent;
}

function setOnCLickEditButton() {
  loadProfileInfo();
  const inputList = Array.from(formProfileEdit.querySelectorAll('.popup__item'));

  resetValidation(inputList, formProfileEdit, validationSelectors);
  openPopup(popupProfileEdit);
  enableValidation(validationSelectors);
}

function setOnClickAddButton() {
  const inputList = Array.from(formPlaceAdd.querySelectorAll('.popup__item'));

  resetValidation(inputList, formPlaceAdd, validationSelectors);
  openPopup(popupPlaceAdd);
  enableValidation(validationSelectors);
}

popupProfileEdit.addEventListener('submit', setSubmitPopupProfileEdit);
popupPlaceAdd.addEventListener('submit', setSubmitPopupPlaceAdd);

editButton.addEventListener('click', setOnCLickEditButton);
addButton.addEventListener('click', setOnClickAddButton);

closeButtonList.forEach((buttonElement) => {
  buttonElement.addEventListener('click', () => {
    closePopup(popupProfileEdit);
    closePopup(popupPlaceAdd);
  });
});

renderPage(initialCards);

enableValidation(validationSelectors);
