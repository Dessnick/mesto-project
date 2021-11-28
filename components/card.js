import { openPopup, closePopup, setEventCloseButton } from './modal.js';

const initialCards = [
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1628453350277-c816ea6fee08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1551844931-2436eb1a9bd6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=664&q=80',
  },
];

const popupShowImage = document.querySelector('.popup_type_show-image');
const photoFeed = document.querySelector('.photo-feed__list');

setEventCloseButton(popupShowImage);

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

function renderPage(cards) {
  cards.forEach((element) => {
    const inputData = {
      placeNameInput: element.name,
      imageLinkInput: element.link,
    };

    photoFeed.append(createPhotoCard(inputData));
  });
}

renderPage(initialCards);
