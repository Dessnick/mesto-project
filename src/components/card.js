import { openPopup } from './modal.js';
import { pushLikeData, deleteLikeData } from './api.js';
import { setOnClickCardDeleteButton } from '../pages/index.js';

const popupShowImage = document.querySelector('.popup_type_show-image');
const photoFeed = document.querySelector('.photo-feed__list');

function displayImage(inputData) {
  const popupImage = popupShowImage.querySelector('.popup__image');
  popupImage.src = inputData.link;
  popupImage.alt = inputData.name;

  const popupImageCaption = popupShowImage.querySelector('.popup__image-caption');
  popupImageCaption.textContent = inputData.name;
}

function userIsOwner(cardData, userData, elementLikeButton) {
  if (cardData.owner._id !== userData._id) {
    return false;
  }
  return true;
}

function showLikesData(cardData, userData, elementLikeButton, elementLikeCounter) {
  const ownerLikes = cardData.likes.filter((item) => item._id === userData._id);

  if (ownerLikes.length > 0) {
    elementLikeButton.classList.toggle('photo-card__like-button_active');
  }
  elementLikeCounter.textContent = !cardData.likes.length ? '' : cardData.likes.length;
}

function onClicklikeToggle(evt, cardData, elementLikeCounter) {
  const cardId = cardData._id;

  if (evt.target.classList.contains('photo-card__like-button_active')) {
    deleteLikeData(cardId).then((res) => {
      evt.target.classList.toggle('photo-card__like-button_active');

      const likesCount = res.likes.length;
      elementLikeCounter.textContent = likesCount > 0 ? likesCount : '';
    });
  } else {
    pushLikeData(cardId)
      .then((res) => {
        elementLikeCounter.textContent = res.likes.length;
        evt.target.classList.toggle('photo-card__like-button_active');
      })
      .catch((err) => console.log(err));
  }
}

function createPhotoCard(inputData) {
  const [cardData, userData] = inputData;

  const photoCardTemplate = document.querySelector('#card-template').content;
  const photoCardElement = photoCardTemplate.querySelector('.photo-feed__item').cloneNode(true);

  const elementImage = photoCardElement.querySelector('.photo-card__image');
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  photoCardElement.setAttribute('card-id', cardData._id);

  elementImage.addEventListener('click', () => {
    openPopup(popupShowImage);
    displayImage(cardData);
  });

  photoCardElement.querySelector('.photo-card__title').textContent = cardData.name;

  const elementLikeButton = photoCardElement.querySelector('.photo-card__like-button');
  const elementLikeCounter = photoCardElement.querySelector('.photo-card__like-counter');
  showLikesData(cardData, userData, elementLikeButton, elementLikeCounter);

  elementLikeButton.addEventListener('click', (evt) =>
    onClicklikeToggle(evt, cardData, elementLikeCounter),
  );

  const elementDeleteButton = photoCardElement.querySelector('.photo-card__delete-button');
  if (userIsOwner(cardData, userData, elementLikeButton)) {
    elementDeleteButton.addEventListener('click', (evt) => setOnClickCardDeleteButton(evt));
  } else {
    elementDeleteButton.parentNode.removeChild(elementDeleteButton);
  }

  return photoCardElement;
}

function addPhotoCard(inputData) {
  photoFeed.prepend(createPhotoCard(inputData));
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
    photoFeed.append(createPhotoCard(inputData));
  });
}

export { addPhotoCard, renderCards };
