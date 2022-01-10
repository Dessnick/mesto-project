const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const loginInput = popupProfileEdit.querySelector('#login-input');
const aboutInput = popupProfileEdit.querySelector('#about-input');

const likeActiveSelector = 'photo-card__like-button_active';

const popupButtons = {
  avatarButton: document.querySelector('.profile__button_type_avatar'),
  editButton: document.querySelector('.profile__button_type_edit'),
  addButton: document.querySelector('.profile__button_type_add'),
};

const buttonTextLoading = {
  placeAdd: 'Добавляем...',
  cardDelete: 'Удаляем...',
  saving: 'Сохраняем...',
};

const popupClassList = {
  popupOpened: 'popup_opened',
  buttonClose: '.popup__button_type_close',
  buttonSubmit: '.popup__button_type_submit',
  popupForm: '.popup__form',
  popupItem: '.popup__item',
  popupImage: '.popup__image',
  popupImageCaption: '.popup__image-caption',
};

const userInfoClassList = {
  profileName: '.profile__name',
  profileAbout: '.profile__caption',
  profileAvatar: '.profile__avatar',
};

const cardClassList = {};

export {
  popupClassList,
  userInfoClassList,
  loginInput,
  aboutInput,
  likeActiveSelector,
  popupButtons,
  buttonTextLoading,
};
