import { setOnClickCardDeleteButton, popupWithImage } from '../pages/index.js';
import {api} from './Api.js';
export {popupImage};

const popupShowImage = document.querySelector('.popup_type_show-image');
const popupImage = popupShowImage.querySelector('.popup__image');
const photoFeed = document.querySelector('.photo-feed__list');

function onClicklikeToggle(evt, cardData, elementLikeCounter) {
  const cardId = cardData._id;

  if (evt.target.classList.contains('photo-card__like-button_active')) {
    api. 
    deleteLikeData(cardId)
      .then((res) => {
        evt.target.classList.toggle('photo-card__like-button_active');

        const likesCount = res.likes.length;
        elementLikeCounter.textContent = likesCount > 0 ? likesCount : '';
      })
      .catch(api.getErrorResponse);
  } else {
    api.
    pushLikeData(cardId)
      .then((res) => {
        elementLikeCounter.textContent = res.likes.length;
        evt.target.classList.toggle('photo-card__like-button_active');
      })
      .catch(api.getErrorResponse);
  }
}

function addPhotoCard(inputData) {
  const card = new Card(inputData, {
    selector: '#card-template',
    handleCardClick: () => {
      popupImage.open();
    }
  });
  const cardElement = card.generate();
  photoFeed.prepend(cardElement);
}

export default class Card {
   constructor(inputData, { selector, handleCardClick }) {
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
    this._handleCardClick = handleCardClick;
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
      popupWithImage.open(this._src);
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

export { addPhotoCard };
