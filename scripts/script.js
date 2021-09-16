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

function closePopupForm(evt) {
  const formPopup = evt.currentTarget.formPopup;
  formPopup.classList.remove('popup_opened');

  //++add removeEventListener for 'click' and 'keydown'
}

const popupCloseProfileEdit = popupProfileEdit.querySelector('.popup__button_type_close');
popupCloseProfileEdit.addEventListener('click', closePopupForm);
popupCloseProfileEdit.formPopup = popupProfileEdit;

const popupClosePlaceAdd = popupPlaceAdd.querySelector('.popup__button_type_close');
popupClosePlaceAdd.addEventListener('click', closePopupForm);
popupClosePlaceAdd.formPopup = popupPlaceAdd;

function openPopup(popupForm) {
  popupForm.classList.add('popup_opened');
}

function loadProfileInfo() {
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__caption');
  popupBlock.querySelector('#login').value = profileName.textContent;
  popupBlock.querySelector('#about').value = profileAbout.textContent;
}

const editButton = document.querySelector('.profile__button_type_edit');
editButton.addEventListener('click', function () {
  openPopup(popupProfileEdit);
  loadProfileInfo();
});

const addButton = document.querySelector('.profile__button_type_add');
addButton.addEventListener('click', function () {
  openPopup(popupPlaceAdd);
});

popupProfileEdit.addEventListener('submit', function (evt) {
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

function addPhotoCard(inputData) {
  const photoCardTemplate = document.querySelector('#card-template').content;
  const photoCardElement = photoCardTemplate.querySelector('.photo-feed__item').cloneNode(true);

  const elementImage = photoCardElement.querySelector('.photo-card__image');
  elementImage.setAttribute('src', inputData.imageLinkInput);
  elementImage.setAttribute('alt', inputData.placeNameInput);

  photoCardElement.querySelector('.photo-card__title').textContent = inputData.placeNameInput;

  return photoCardElement;
}

function clearPopupAddInput() {
  popupPlaceAdd.querySelector('#place-name').value.value = '';
  popupPlaceAdd.querySelector('#image-link').value = '';
}

popupPlaceAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const inputData = {
    placeNameInput: popupPlaceAdd.querySelector('#place-name').value,
    imageLinkInput: popupPlaceAdd.querySelector('#image-link').value,
  };

  document.querySelector('.photo-feed__list').prepend(addPhotoCard(inputData));

  //close
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
