import './index.css';
import FormValidator from '../components/FormValidator.js';
import { addPhotoCard } from '../components/Card.js';
import { promisesData, api } from '../components/Api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
export { popupWithImage };

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfileEdit.querySelector('.form-profile-edit');
const saveButtonProfileEdit = formProfileEdit.querySelector('.popup__button_type_submit');
const loginInput = popupProfileEdit.querySelector('#login-input');
const aboutInput = popupProfileEdit.querySelector('#about-input');

const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const formPlaceAdd = popupPlaceAdd.querySelector('.form-place-add');
const saveButtonPlaceAdd = formPlaceAdd.querySelector('.popup__button_type_submit');
// const placeNameInput = popupPlaceAdd.querySelector('#place-name-input');
// const imageLinkInput = popupPlaceAdd.querySelector('#image-link-input');

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

// function loadProfileInfo() {
//   loginInput.value = profileName.textContent;
//   aboutInput.value = profileCaption.textContent;
// }

// function loadProfileAvatar() {
//   avatarLinkInput.value = profileAvatar.currentSrc;
// }

function setOnCLickEditButton() {
  // loadProfileInfo();
  // const inputList = Array.from(formProfileEdit.querySelectorAll('.popup__item'));

  popupWithProfile.open();
}

function setOnClickAddButton() {
  // const inputList = Array.from(formPlaceAdd.querySelectorAll('.popup__item'));

  popupWithPlaceAdd.open();
}

function setOnClickEditAvatar() {
  // loadProfileAvatar();
  // const inputList = Array.from(formAvatarEdit.querySelectorAll('.popup__item'));

  popupWithAvatar.open();
}

export function setOnClickCardDeleteButton(evt) {
  popupWithCardDelete.open();
  cardToDelete = evt.target.closest('.photo-feed__item');
  cardIdToDelete = cardToDelete.getAttribute('card-id');
}

//Рефакторинг отрисовки карточек
function createCard([item, userData]) {
  const card = new Card([item, userData], {
    selector: '#card-template',
    handleCardClick: () => {
      popupImage.open();
    },
  });
  const cardElement = card.generate();
  return cardElement;
}

const cardList = new Section(
  {
    renderer: ([item, userData]) => {
      cardList.addItem(createCard([item, userData]));
    },
  },
  '.photo-feed__list',
);

function renderPage() {
  Promise.all(promisesData)
  .then(([userData, cards]) => {
    userInfo = userData;
    cardList.renderCards([userData, cards]);

  })
  .catch(api.getErrorResponse);
}

editButton.addEventListener('click', setOnCLickEditButton);
addButton.addEventListener('click', setOnClickAddButton);
avatarButton.addEventListener('click', setOnClickEditAvatar);

renderPage();

//создаем объект для попапа с картинкой
const popupWithImage = new PopupWithImage('.popup_type_show-image');
popupWithImage.setEventListeners();

//создаем объект для попапа добавления места
const popupWithPlaceAdd = new PopupWithForm('.popup_type_place-add', {
  handleFormSubmit: (inputValues) => {
    saveButtonPlaceAdd.textContent = 'Добавляем...';

    const cardData = {
      name: inputValues['place-name'],
      link: inputValues['image-link'],
    };

    if (!cardData.name || !cardData.link) {
      return;
    }

    api
      .pushCardData(cardData)
      .then((res) => {
        addPhotoCard([res, userInfo]);
      })
      .catch(api.getErrorResponse)
      .finally(() => (saveButtonPlaceAdd.textContent = 'Создать'));
  },
});
popupWithPlaceAdd.setEventListeners();

//создаем объект для попапа аватара
const popupWithAvatar = new PopupWithForm('.popup_type_avatar-edit', {
  handleFormSubmit: (inputValues) => {
    saveButtonAvatarEdit.textContent = 'Сохраняем...';
    const linkAvatar = inputValues['avatar-link'];
    api
      .updateProfileAvatar(linkAvatar)
      .then((res) => {
        profileAvatar.src = res.avatar;
      })
      .catch(api.getErrorResponse)
      .finally(() => (saveButtonAvatarEdit.textContent = 'Сохранить'));
  },
});
popupWithAvatar.setEventListeners();

const userWithInfo = new UserInfo({
  loginSelector: '.profile__name',
  aboutSelector: '.profile__caption',
});

userWithInfo.getUserInfo();

export function renderProfileInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileCaption.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
}

//создаем объект для попапа профиля
const popupWithProfile = new PopupWithForm('.popup_type_profile-edit', {
  handleFormSubmit: (inputValues) => {
    saveButtonProfileEdit.textContent = 'Сохраняем...';

    const loginValue = inputValues.login;
    const aboutValue = inputValues.about;

    if (!loginValue || !aboutValue) {
      return;
    }

    userWithInfo.setUserInfo({ name: loginValue, about: aboutValue }, saveButtonProfileEdit);
  },
});

popupWithProfile.setEventListeners();

//создаем объект для попапа удаления карточки
const popupWithCardDelete = new PopupWithForm('.popup_type_card-delete', {
  handleFormSubmit: (inputValues) => {
    saveButtonCardDelete.textContent = 'Удаляем...';
    api
      .deleteCard(cardIdToDelete)
      .then(() => {
        cardToDelete.remove();
      })
      .catch(api.getErrorResponse)
      .finally(() => (saveButtonCardDelete.textContent = 'Да'));
  },
});
popupWithCardDelete.setEventListeners();

// подключаем валидацию форм
const forms = Array.from(document.querySelectorAll('.popup__form'));
forms.forEach((form) => {
  const formValidation = new FormValidator(validationSelectors, form);
  formValidation.enableValidation();
});
