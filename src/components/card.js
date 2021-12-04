import { openPopup } from './modal.js';

const popupShowImage = document.querySelector('.popup_type_show-image');
const photoFeed = document.querySelector('.photo-feed__list');

function displayImage(inputData) {
  const popupImage = popupShowImage.querySelector('.popup__image');
  popupImage.src = inputData.link;
  popupImage.alt = inputData.name;

  const popupImageCaption = popupShowImage.querySelector('.popup__image-caption');
  popupImageCaption.textContent = inputData.name;
}

function userIsOwner(cardData, userData) {
  if (cardData.owner._id !== userData._id) {
    return false;
  }
  return true;
}

function createPhotoCard(inputData) {
  const [cardData, userData] = inputData;

  const photoCardTemplate = document.querySelector('#card-template').content;
  const photoCardElement = photoCardTemplate.querySelector('.photo-feed__item').cloneNode(true);

  const elementImage = photoCardElement.querySelector('.photo-card__image');
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;

  elementImage.addEventListener('click', () => {
    openPopup(popupShowImage);
    displayImage(cardData);
  });

  photoCardElement.querySelector('.photo-card__title').textContent = cardData.name;

  const elementLikeButton = photoCardElement.querySelector('.photo-card__like-button');
  elementLikeButton.addEventListener('click', () =>
    elementLikeButton.classList.toggle('photo-card__like-button_active'),
  );
  const elementLikeCounter = photoCardElement.querySelector('.photo-card__like-counter');
  elementLikeCounter.textContent = !cardData.likeCounterInput ? '' : cardData.likeCounterInput;

  const elementDeleteButton = photoCardElement.querySelector('.photo-card__delete-button');
  if (userIsOwner(cardData, userData, elementDeleteButton)) {
    elementDeleteButton.addEventListener('click', (evt) =>
      evt.target.closest('.photo-feed__item').remove(),
    );
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
      name: element.name,
      link: element.link,
      likeCounterInput: element.likes.length,
      owner: element.owner,
    };
    const inputData = [cardData, userData];
    photoFeed.append(createPhotoCard(inputData));
  });
}

export { addPhotoCard, renderCards };
