const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const popupShowImage = document.querySelector('.popup_type_show-image');
const photoFeed = document.querySelector('.photo-feed__list');

function openPopup(popupForm) {
  popupForm.classList.add('popup_opened');
}

function clearPopupAddInput() {
  popupPlaceAdd.querySelector('.popup__form').reset();
}

function closePopup(popupForm) {
  popupForm.classList.remove('popup_opened');
}

function setEventCloseButton(popupForm) {
  const closeButton = popupForm.querySelector('.popup__button_type_close');
  closeButton.addEventListener('click', () => {
    closePopup(popupForm);
  });
}

setEventCloseButton(popupProfileEdit);
setEventCloseButton(popupPlaceAdd);
setEventCloseButton(popupShowImage);

function loadProfileInfo() {
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__caption');
  popupProfileEdit.querySelector('#login').value = profileName.textContent;
  popupProfileEdit.querySelector('#about').value = profileAbout.textContent;
}

const editButton = document.querySelector('.profile__button_type_edit');
editButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  loadProfileInfo();
});

const addButton = document.querySelector('.profile__button_type_add');
addButton.addEventListener('click', () => {
  openPopup(popupPlaceAdd);
});

popupProfileEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const loginInput = popupProfileEdit.querySelector('#login').value;
  const jobInput = popupProfileEdit.querySelector('#about').value;

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
