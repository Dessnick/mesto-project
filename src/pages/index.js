import './index.css';

import {
  popupForms,
  photoFeed,
  aboutInput,
  loginInput,
  likeActiveSelector,
  popupClassList,
  userInfoClassList,
  popupButtons,
  buttonTextLoading,
  cardClassList,
  validationSelectors,
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';

let cardToDelete;
let cardIdToDelete;

const userInfo = new UserInfo(userInfoClassList);

function setOnCLickEditButton() {
  const userData = userInfo.getUserInfo();
  loginInput.value = userData.name;
  aboutInput.value = userData.about;

  popupWithProfile.open();
}

function setOnClickAddButton() {
  popupWithPlaceAdd.open();
}

function setOnClickEditAvatar() {
  popupWithAvatar.open();
}

//создаем объект для попапа аватара
const popupWithAvatar = new PopupWithForm(
  '.popup_type_avatar-edit',
  popupClassList,
  buttonTextLoading.saving,
  (inputValues) => {
    api
      .updateProfileAvatar(inputValues['avatar-link'])
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithAvatar.close();
      })
      .catch(api.getErrorResponse)
      .finally(() => popupWithAvatar.renderLoading());
  },
);
popupWithAvatar.setEventListeners();

//создаем объект для попапа профиля
const popupWithProfile = new PopupWithForm(
  '.popup_type_profile-edit',
  popupClassList,
  buttonTextLoading.saving,
  (inputValues) => {
    api
      .pushProfileData(inputValues)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithProfile.close();
      })
      .catch(api.getErrorResponse)
      .finally(() => popupWithProfile.renderLoading());
  },
);
popupWithProfile.setEventListeners();

//создаем объект для попапа удаления карточки
const popupWithCardDelete = new PopupWithForm(
  '.popup_type_card-delete',
  popupClassList,
  buttonTextLoading.cardDelete,
  (inputValues) => {
    api
      .deleteCard(cardIdToDelete)
      .then(() => {
        cardToDelete.remove();
        popupWithCardDelete.close();
      })
      .catch(api.getErrorResponse)
      .finally(() => popupWithCardDelete.renderLoading('Да'));
  },
);
popupWithCardDelete.setEventListeners();

//создаем объект для попапа с картинкой
const popupWithImage = new PopupWithImage('.popup_type_show-image', popupClassList);
popupWithImage.setEventListeners();

function handleCardClick(data) {
  popupWithImage.open(data);
}

function handleCardDeleteButton(evt) {
  popupWithCardDelete.open();
  cardToDelete = evt.target.closest('.photo-feed__item');
  cardIdToDelete = cardToDelete.getAttribute('card-id');
}

function handleLikeToggle(evt, cardData, elementLikeCounter) {
  const cardId = cardData._id;

  if (evt.target.classList.contains(likeActiveSelector)) {
    api
      .deleteLikeData(cardId)
      .then((res) => {
        evt.target.classList.toggle(likeActiveSelector);

        const likesCount = res.likes.length;
        elementLikeCounter.textContent = likesCount > 0 ? likesCount : '';
      })
      .catch(api.getErrorResponse);
  } else {
    api
      .pushLikeData(cardId)
      .then((res) => {
        elementLikeCounter.textContent = res.likes.length;
        evt.target.classList.toggle(likeActiveSelector);
      })
      .catch(api.getErrorResponse);
  }
}

//Рефакторинг отрисовки карточек
function createCard(inputData) {
  const card = new Card(inputData, {
    cardSelector: '#card-template',
    cardClassList,
    handleCardClick: handleCardClick,
    handleCardDeleteButton: handleCardDeleteButton,
    handleLikeToggle: handleLikeToggle,
  });
  return card.generate();
}

const cardsList = new Section(
  {
    renderer: ([item, userData]) => {
      cardsList.addItem(createCard([item, userData]));
    },
  },
  '.photo-feed__list',
);

function addPhotoCard(inputData) {
  const cardElement = createCard(inputData);
  photoFeed.prepend(cardElement);
}

//создаем объект для попапа добавления места
const popupWithPlaceAdd = new PopupWithForm(
  '.popup_type_place-add',
  popupClassList,
  buttonTextLoading.placeAdd,
  (inputValues) => {
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
        popupWithPlaceAdd.close();
      })
      .catch(api.getErrorResponse)
      .finally(() => popupWithPlaceAdd.renderLoading('Создать'));
  },
);
popupWithPlaceAdd.setEventListeners();

popupButtons.editButton.addEventListener('click', setOnCLickEditButton);
popupButtons.addButton.addEventListener('click', setOnClickAddButton);
popupButtons.avatarButton.addEventListener('click', setOnClickEditAvatar);

// подключаем валидацию форм
const formsArr = Array.from(popupForms);
formsArr.forEach((form) => {
  const formValidation = new FormValidator(validationSelectors, form);
  formValidation.enableValidation();
});

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: '516b48a6-c50b-43c5-aac7-85b1d4cfb698',
    'Content-Type': 'application/json',
  },
});

const promisesData = [api.getProfile(), api.getCards()];

function renderPage() {
  Promise.all(promisesData)
    .then(([userData, cards]) => {
      userInfo.setUserInfo(userData);
      cardsList.renderCards([userData, cards]);
    })
    .catch(api.getErrorResponse);
}

renderPage();
