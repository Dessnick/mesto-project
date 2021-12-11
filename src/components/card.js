import { openPopup } from './modal.js';
import { getErrorResponse, pushLikeData, deleteLikeData } from './api.js';
import { setOnClickCardDeleteButton } from '../pages/index.js';

const popupShowImage = document.querySelector('.popup_type_show-image');
const popupImage = popupShowImage.querySelector('.popup__image');
const photoFeed = document.querySelector('.photo-feed__list');
const popupImageCaption = popupShowImage.querySelector('.popup__image-caption');

function displayImage(inputData) {
  popupImage.src = inputData.link;
  popupImage.alt = inputData.name;

  popupImageCaption.textContent = inputData.name;
}

// function userIsOwner(cardData, userData) {
//   if (cardData.owner._id !== userData._id) {
//     return false;
//   }
//   return true;
// }

// function showLikesData(cardData, userData, elementLikeButton, elementLikeCounter) {
//   const ownerLikes = cardData.likes.filter((item) => item._id === userData._id);

//   if (ownerLikes.length > 0) {
//     elementLikeButton.classList.toggle('photo-card__like-button_active');
//   }
//   elementLikeCounter.textContent = !cardData.likes.length ? '' : cardData.likes.length;
// }

function onClicklikeToggle(evt, cardData, elementLikeCounter) {
  const cardId = cardData._id;

  if (evt.target.classList.contains('photo-card__like-button_active')) {
    deleteLikeData(cardId)
      .then((res) => {
        evt.target.classList.toggle('photo-card__like-button_active');

        const likesCount = res.likes.length;
        elementLikeCounter.textContent = likesCount > 0 ? likesCount : '';
      })
      .catch(getErrorResponse);
  } else {
    pushLikeData(cardId)
      .then((res) => {
        elementLikeCounter.textContent = res.likes.length;
        evt.target.classList.toggle('photo-card__like-button_active');
      })
      .catch(getErrorResponse);
  }
}

// function createPhotoCard(inputData) {
//   const [cardData, userData] = inputData;

//   const photoCardTemplate = document.querySelector('#card-template').content;
//   const photoCardElement = photoCardTemplate.querySelector('.photo-feed__item').cloneNode(true);

//   const elementImage = photoCardElement.querySelector('.photo-card__image');
//   elementImage.src = cardData.link;
//   elementImage.alt = cardData.name;
//   photoCardElement.setAttribute('card-id', cardData._id);

//   elementImage.addEventListener('click', () => {
//     openPopup(popupShowImage);
//     displayImage(cardData);
//   });

//   photoCardElement.querySelector('.photo-card__title').textContent = cardData.name;

//   const elementLikeButton = photoCardElement.querySelector('.photo-card__like-button');
//   const elementLikeCounter = photoCardElement.querySelector('.photo-card__like-counter');
//   showLikesData(cardData, userData, elementLikeButton, elementLikeCounter);

//   elementLikeButton.addEventListener('click', (evt) =>
//     onClicklikeToggle(evt, cardData, elementLikeCounter),
//   );

//   const elementDeleteButton = photoCardElement.querySelector('.photo-card__delete-button');
//   if (userIsOwner(cardData, userData)) {
//     elementDeleteButton.addEventListener('click', (evt) => setOnClickCardDeleteButton(evt));
//   } else {
//     elementDeleteButton.parentNode.removeChild(elementDeleteButton);
//   }

//   return photoCardElement;
// }

function addPhotoCard(inputData) {
  console.log(inputData);
  const card = new Card(inputData, '#card-template');
  const cardElement = card.generate();
  photoFeed.prepend(cardElement);
  // photoFeed.prepend(createPhotoCard(inputData));
}

function renderCards(cards, userData) {
  cards.forEach((element) => {
    const cardData = {
      _id: element._id,
      name: element.name,
      link: element.link,
      likes: element.likes,
      owner: element.owner,
    };
    const inputData = [cardData, userData];
    const card = new Card(inputData, '#card-template');
    const cardElement = card.generate();
    photoFeed.append(cardElement);
    // photoFeed.append(createPhotoCard(inputData));
  });
}

class Card {
   constructor(inputData, selector) {
    const [cardData, userData] = inputData;
    this._selector = selector;
    this._src = cardData.link;
    this._name = cardData.name;
    this._cardId = cardData._id;
    this._cardData = cardData;
    this._userData = userData;
    this._cardOwner = cardData.owner;
    this._userId = userData._id;
    this._cardLikes = cardData.likes;
   }
   
   _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.photo-feed__item')
      .cloneNode(true);
    return cardElement;
   }

   generate() {
    this._element = this._getElement();
    this._elementImage = this._element.querySelector('.photo-card__image');
    this._elementLikeButton = this._element.querySelector('.photo-card__like-button');
    this._elementLikeCounter = this._element.querySelector('.photo-card__like-counter');
    this._elementDeleteButton = this._element.querySelector('.photo-card__delete-button');
    this._setEventListeners();
    this._showLikesData();
    this._element.setAttribute('card-id', this._cardId);
    this._elementImage.src = this._src;
    this._elementImage.alt = this._name;
    this._element.querySelector('.photo-card__title').textContent = this._name;
    return this._element;
   }

   _showLikesData() {
    const ownerLikes = this._cardLikes.filter((item) => item._id === this._userId);
    if (ownerLikes.length > 0) {
      this._elementLikeButton.classList.toggle('photo-card__like-button_active');
    }
    this._elementLikeCounter.textContent = !this._cardLikes.length ? '' : this._cardLikes.length;
   }

   _userIsOwner() {
    if (this._cardOwner._id !== this._userId) {
      return false;
    }
    return true;
   }

   _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      openPopup(popupShowImage);
      displayImage(this._cardData);
    })
    this._elementLikeButton.addEventListener('click', (evt) =>
      onClicklikeToggle(evt, this._cardData, this._elementLikeCounter),
    );
    if (this._userIsOwner()) {
      this._elementDeleteButton.addEventListener('click', (evt) => setOnClickCardDeleteButton(evt));
    } else {
      this._elementDeleteButton.parentNode.removeChild(this._elementDeleteButton);
    }
   } 
}

export { addPhotoCard, renderCards };
