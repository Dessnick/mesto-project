import './index.css';
import { resetValidation, enableValidation } from '../components/validate.js';
// import FormValidator from '../components/FormValidator.js';
import { openPopup, closePopup } from '../components/modal.js';
import { renderCards, addPhotoCard } from '../components/card.js';
import {
  promisesData,
  getErrorResponse,
  pushProfileData,
  deleteCard,
  updateProfileAvatar,
  api,
} from '../components/api.js';

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfileEdit.querySelector('.form-profile-edit');
const saveButtonProfileEdit = formProfileEdit.querySelector('.popup__button_type_submit');
const loginInput = popupProfileEdit.querySelector('#login-input');
const aboutInput = popupProfileEdit.querySelector('#about-input');

const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const formPlaceAdd = popupPlaceAdd.querySelector('.form-place-add');
const saveButtonPlaceAdd = formPlaceAdd.querySelector('.popup__button_type_submit');
const placeNameInput = popupPlaceAdd.querySelector('#place-name-input');
const imageLinkInput = popupPlaceAdd.querySelector('#image-link-input');

const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');
const formAvatarEdit = popupAvatarEdit.querySelector('.form-avatar-edit');
const saveButtonAvatarEdit = formAvatarEdit.querySelector('.popup__button_type_submit');
const avatarLinkInput = popupAvatarEdit.querySelector('#avatar-link-input');

const popupCardDelete = document.querySelector('.popup_type_card-delete');
const saveButtonCardDelete = popupCardDelete.querySelector('.popup__button_type_submit');

const profileAvatar = document.querySelector('.profile__avatar');
const avatarButton = document.querySelector('.profile__button_type_avatar');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');

const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
};

let userInfo;
let cardToDelete;
let cardIdToDelete;

function setSubmitPopupProfileEdit(evt) {
  evt.preventDefault();
  saveButtonProfileEdit.textContent = 'Сохраняем...';

  const loginValue = loginInput.value;
  const aboutValue = aboutInput.value;

  if (!loginValue || !aboutValue) {
    return;
  }

  pushProfileData({ name: loginValue, about: aboutValue })
    .then((res) => {
      profileName.textContent = res.name;
      profileCaption.textContent = res.about;

      formProfileEdit.reset();
      closePopup(popupProfileEdit);
    })
    .catch(getErrorResponse)
    .finally(() => (saveButtonProfileEdit.textContent = 'Сохранить'));
}

function setSubmitPopupPlaceAdd(evt) {
  evt.preventDefault();
  saveButtonPlaceAdd.textContent = 'Добавляем...';

  const cardData = {
    name: placeNameInput.value,
    link: imageLinkInput.value,
  };

  if (!cardData.name || !cardData.link) {
    return;
  }

  api
    .pushCardData(cardData)
    .then((res) => {
      addPhotoCard([res, userInfo]);
      formPlaceAdd.reset();
      closePopup(popupPlaceAdd);
    })
    .catch(getErrorResponse)
    .finally(() => (saveButtonPlaceAdd.textContent = 'Создать'));
}

function setSubmitPopupAvatarEdit(evt) {
  evt.preventDefault();
  saveButtonAvatarEdit.textContent = 'Сохраняем...';

  updateProfileAvatar(avatarLinkInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
      formAvatarEdit.reset();
      closePopup(popupAvatarEdit);
    })
    .catch(getErrorResponse)
    .finally(() => (saveButtonAvatarEdit.textContent = 'Сохранить'));
}

function setSubmitPopupCardDelete(evt) {
  evt.preventDefault();
  saveButtonCardDelete.textContent = 'Удаляем...';

  deleteCard(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closePopup(popupCardDelete);
    })
    .catch(getErrorResponse)
    .finally(() => (saveButtonCardDelete.textContent = 'Да'));
}

function loadProfileInfo() {
  loginInput.value = profileName.textContent;
  aboutInput.value = profileCaption.textContent;
}

function loadProfileAvatar() {
  avatarLinkInput.value = profileAvatar.currentSrc;
}

function setOnCLickEditButton() {
  loadProfileInfo();
  const inputList = Array.from(formProfileEdit.querySelectorAll('.popup__item'));

  resetValidation(inputList, formProfileEdit, validationSelectors);
  openPopup(popupProfileEdit);
}

function setOnClickAddButton() {
  const inputList = Array.from(formPlaceAdd.querySelectorAll('.popup__item'));

  resetValidation(inputList, formPlaceAdd, validationSelectors);
  openPopup(popupPlaceAdd);
}

function setOnClickEditAvatar() {
  loadProfileAvatar();
  const inputList = Array.from(formAvatarEdit.querySelectorAll('.popup__item'));

  resetValidation(inputList, formAvatarEdit, validationSelectors);
  openPopup(popupAvatarEdit);
}

export function setOnClickCardDeleteButton(evt) {
  openPopup(popupCardDelete);

  cardToDelete = evt.target.closest('.photo-feed__item');
  cardIdToDelete = cardToDelete.getAttribute('card-id');
}

function handleCloseButton() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__button_type_close')) {
        closePopup(popupElement);
      }
    });
  });
}

function renderProfileInfo(login, about, avatar) {
  profileName.textContent = login;
  profileCaption.textContent = about;
  profileAvatar.src = avatar;
}

function renderPage() {
  Promise.all(promisesData)
    .then(([userData, cards]) => {
      userInfo = userData;
      renderProfileInfo(userData.name, userData.about, userData.avatar);
      renderCards(cards, userData);
    })
    .catch(getErrorResponse);
}

popupProfileEdit.addEventListener('submit', setSubmitPopupProfileEdit);
popupPlaceAdd.addEventListener('submit', setSubmitPopupPlaceAdd);
popupAvatarEdit.addEventListener('submit', setSubmitPopupAvatarEdit);
popupCardDelete.addEventListener('submit', setSubmitPopupCardDelete);

editButton.addEventListener('click', setOnCLickEditButton);
addButton.addEventListener('click', setOnClickAddButton);
avatarButton.addEventListener('click', setOnClickEditAvatar);
handleCloseButton();

renderPage();
enableValidation(validationSelectors);
