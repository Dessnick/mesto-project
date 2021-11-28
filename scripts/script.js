import enableValidation from './components/validate.js';

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const popupShowImage = document.querySelector('.popup_type_show-image');
const photoFeed = document.querySelector('.photo-feed__list');

function handleKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function handleOverlayPopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function setCloseHandlers(popupForm) {
  document.addEventListener('keydown', handleKeyEsc);
  popupForm.addEventListener('click', handleOverlayPopup);
}

function removeCloseHandlers(popupForm) {
  document.removeEventListener('keydown', handleKeyEsc);
  popupForm.removeEventListener('click', handleOverlayPopup);
}

function openPopup(popupForm) {
  popupForm.classList.add('popup_opened');
  setCloseHandlers(popupForm);
}

function closePopup(popupForm) {
  popupForm.classList.remove('popup_opened');
  removeCloseHandlers(popupForm);
}

function clearPopupAddInput() {
  popupPlaceAdd.querySelector('.popup__form').reset();
}

function setEventCloseButton(popupForm) {
  const closeButton = popupForm.querySelector('.popup__button_type_close');
  closeButton.addEventListener('click', () => {
    window.resetForm(popupForm);
    closePopup(popupForm);
  });
}

setEventCloseButton(popupProfileEdit);
setEventCloseButton(popupPlaceAdd);
setEventCloseButton(popupShowImage);

function loadProfileInfo() {
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__caption');
  popupProfileEdit.querySelector('#login-input').value = profileName.textContent;
  popupProfileEdit.querySelector('#about-input').value = profileAbout.textContent;
}

const editButton = document.querySelector('.profile__button_type_edit');
editButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  loadProfileInfo();
  enableValidation();
});

const addButton = document.querySelector('.profile__button_type_add');
addButton.addEventListener('click', () => {
  openPopup(popupPlaceAdd);
  enableValidation();
});

popupProfileEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const loginInput = popupProfileEdit.querySelector('#login-input').value;
  const jobInput = popupProfileEdit.querySelector('#about-input').value;

  if (!loginInput || !jobInput) {
    return;
  }

  document.querySelector('.profile__name').textContent = loginInput;
  document.querySelector('.profile__caption').textContent = jobInput;

  closePopup(popupProfileEdit);
});

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

popupPlaceAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  clearPopupAddInput();

  const inputData = {
    placeNameInput: popupPlaceAdd.querySelector('#place-name').value,
    imageLinkInput: popupPlaceAdd.querySelector('#image-link').value,
  };

  if (!inputData.placeNameInput || !inputData.imageLinkInput) {
    return;
  }

  photoFeed.prepend(createPhotoCard(inputData));

  clearPopupAddInput();
  closePopup(popupPlaceAdd);
});

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

// function keyHandler(evt) {
//   const popupList = Array.from(document.querySelectorAll('.popup'));
//   popupList.forEach((popupForm) => {
//     if (evt.key === 'Escape') {
//       closePopup(popupForm);
//     }
//   });
// }

// function setMouseAndKeyboardListeners() {
//   const popupList = Array.from(document.querySelectorAll('.popup'));
//   popupList.forEach((popupForm) => {
//     document.addEventListener('keydown', function (evt) {
//       console.log(evt.key);
//       if (evt.key === 'Escape') {
//         closePopup(popupForm);
//       }
//     });
//     // if (evt.key === 'Escape') {
//     //   closePopup(popupForm);
//     // }

//     popupForm.addEventListener('click', function (evt) {
//       console.log(evt.target);
//     });
//   });
// }

// setMouseAndKeyboardListeners();
