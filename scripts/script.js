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

const popupBlock = document.querySelector('.popup');
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupPlaceAdd = document.querySelector('.popup_type_place-add');
const popupShowImage = document.querySelector('.popup_type_show-image');

function closePopupForm(evt) {
  const formPopup = evt.currentTarget.formPopup;
  formPopup.classList.remove('popup_opened');

  formPopup.removeEventListener('click', closePopupForm);
}

function openPopup(popupForm) {
  popupForm.classList.add('popup_opened');

  const popupCloseButton = popupForm.querySelector('.popup__button_type_close');
  popupCloseButton.addEventListener('click', closePopupForm);
  popupCloseButton.formPopup = popupForm;
}

function loadProfileInfo() {
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__caption');
  popupBlock.querySelector('#login').value = profileName.textContent;
  popupBlock.querySelector('#about').value = profileAbout.textContent;
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

  popupProfileEdit.classList.remove('popup_opened');
});

function displayImage(inputData) {
  const popupImage = popupShowImage.querySelector('.popup__image');
  popupImage.setAttribute('src', inputData.imageLinkInput);
  popupImage.setAttribute('alt', inputData.placeNameInput);

  const popupImageCaption = popupShowImage.querySelector('.popup__image-caption');
  popupImageCaption.textContent = inputData.placeNameInput;
}

function addPhotoCard(inputData) {
  const photoCardTemplate = document.querySelector('#card-template').content;
  const photoCardElement = photoCardTemplate.querySelector('.photo-feed__item').cloneNode(true);

  const elementImage = photoCardElement.querySelector('.photo-card__image');
  elementImage.setAttribute('src', inputData.imageLinkInput);
  elementImage.setAttribute('alt', inputData.placeNameInput);
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

function clearPopupAddInput() {
  popupPlaceAdd.querySelector('#place-name').value.value = '';
  popupPlaceAdd.querySelector('#image-link').value = '';
}

popupPlaceAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const inputData = {
    placeNameInput: popupPlaceAdd.querySelector('#place-name').value,
    imageLinkInput: popupPlaceAdd.querySelector('#image-link').value,
  };

  if (!inputData.placeNameInput || !inputData.imageLinkInput) {
    return;
  }

  document.querySelector('.photo-feed__list').prepend(addPhotoCard(inputData));

  popupPlaceAdd.classList.remove('popup_opened');
});

function renderPage() {
  initialCards.forEach((element) => {
    const inputData = {
      placeNameInput: element.name,
      imageLinkInput: element.link,
    };

    document.querySelector('.photo-feed__list').append(addPhotoCard(inputData));
  });
}

renderPage();
