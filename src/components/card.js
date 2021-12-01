import { openPopup } from './modal.js';

const popupShowImage = document.querySelector('.popup_type_show-image');
const photoFeed = document.querySelector('.photo-feed__list');

// setEventCloseButton(popupShowImage);

function displayImage(inputData) {
  const popupImage = popupShowImage.querySelector('.popup__image');
  popupImage.src = inputData.imageLinkInput;
  popupImage.alt = inputData.placeNameInput;

  const popupImageCaption = popupShowImage.querySelector('.popup__image-caption');
  popupImageCaption.textContent = inputData.placeNameInput;
}

function createPhotoCard(inputData) {
  const photoCardTemplate = document.querySelector('#card-template').content;
  const photoCardElement = photoCardTemplate.querySelector('.photo-feed__item').cloneNode(true);

  const elementImage = photoCardElement.querySelector('.photo-card__image');
  elementImage.src = inputData.imageLinkInput;
  elementImage.alt = inputData.placeNameInput;
  elementImage.addEventListener('click', () => {
    openPopup(popupShowImage);
    displayImage(inputData);
  });

  photoCardElement.querySelector('.photo-card__title').textContent = inputData.placeNameInput;

  const elementLikeButton = photoCardElement.querySelector('.photo-card__like-button');
  elementLikeButton.addEventListener('click', () =>
    elementLikeButton.classList.toggle('photo-card__like-button_active'),
  );

  const elementDeleteButton = photoCardElement.querySelector('.photo-card__delete-button');
  elementDeleteButton.addEventListener('click', (evt) =>
    evt.target.closest('.photo-feed__item').remove(),
  );

  return photoCardElement;
}

function addPhotoCard(inputData) {
  photoFeed.prepend(createPhotoCard(inputData));
}

function renderPage(cards) {
  cards.forEach((element) => {
    const inputData = {
      placeNameInput: element.name,
      imageLinkInput: element.link,
    };

    photoFeed.append(createPhotoCard(inputData));
  });
}

export { addPhotoCard, renderPage };
