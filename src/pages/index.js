import './index.css';
import { resetValidation, enableValidation } from '../components/validate.js';
import { openPopup, closePopup } from '../components/modal.js';
import { renderCards, addPhotoCard } from '../components/card.js';
import {
  promisesData,
  pushProfileData,
  pushCardData,
  deleteCard,
  updateProfileAvatar,
} from '../components/api.js';

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');
const profileAvatar = document.querySelector('.profile__avatar');
const avatarButton = document.querySelector('.profile__button_type_avatar');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const formProfileEdit = popupProfileEdit.querySelector('.form-profile-edit');
const formPlaceAdd = popupPlaceAdd.querySelector('.form-place-add');
const formAvatarEdit = popupAvatarEdit.querySelector('.form-avatar-edit');
const saveButtonPlaceAdd = formPlaceAdd.querySelector('.popup__button_type_submit');
const saveProfileEdit = formProfileEdit.querySelector('.popup__button_type_submit');
const saveAvatarEdit = formAvatarEdit.querySelector('.popup__button_type_submit');
const loginInput = popupProfileEdit.querySelector('#login-input');
const aboutInput = popupProfileEdit.querySelector('#about-input');
const avatarLinkInput = popupAvatarEdit.querySelector('#avatar-link-input');
const placeNameInput = popupPlaceAdd.querySelector('#place-name-input');
const imageLinkInput = popupPlaceAdd.querySelector('#image-link-input');

const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
};

let userInfo;

function setSubmitPopupProfileEdit(evt) {
  evt.preventDefault();
  saveProfileEdit.textContent = 'Сохраняем...';

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
    .catch((err) => console.log(err))
    .finally(() => (saveProfileEdit.textContent = 'Сохранить'));
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

  pushCardData(cardData)
    .then((res) => {
      addPhotoCard([res, userInfo]);
      formPlaceAdd.reset();
      closePopup(popupPlaceAdd);
    })
    .catch((err) => console.log(err))
    .finally(() => (saveButtonPlaceAdd.textContent = 'Создать'));
}

function setSubmitPopupAvatarEdit(evt) {
  evt.preventDefault();
  saveAvatarEdit.textContent = 'Сохраняем...';

  updateProfileAvatar(avatarLinkInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
      formAvatarEdit.reset();
      closePopup(popupAvatarEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => (saveAvatarEdit.textContent = 'Сохранить'));
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
  Promise.all(promisesData).then(([userData, cards]) => {
    userInfo = userData;
    renderProfileInfo(userData.name, userData.about, userData.avatar);
    renderCards(cards, userData);
  });
}

popupProfileEdit.addEventListener('submit', setSubmitPopupProfileEdit);
popupPlaceAdd.addEventListener('submit', setSubmitPopupPlaceAdd);
popupAvatarEdit.addEventListener('submit', setSubmitPopupAvatarEdit);

editButton.addEventListener('click', setOnCLickEditButton);
addButton.addEventListener('click', setOnClickAddButton);
avatarButton.addEventListener('click', setOnClickEditAvatar);
handleCloseButton();

renderPage();
enableValidation(validationSelectors);
