const editButton = document.querySelector('.profile__button_type_edit');
const popupBlock = document.querySelector('.popup');
const popupCloseButton = popupBlock.querySelector('.popup__button_type_close');
const popupSaveButton = popupBlock.querySelector('.popup__button_type_submit');

function loadProfileInfo() {
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__caption');
  popupBlock.querySelector('#login').value = profileName.textContent;
  popupBlock.querySelector('#about').value = profileAbout.textContent;
}

editButton.addEventListener('click', function () {
  popupBlock.classList.add('popup_opened');
  loadProfileInfo();
});

popupCloseButton.addEventListener('click', function () {
  popupBlock.classList.remove('popup_opened');
});

popupSaveButton.addEventListener('click', function () {
  const formElement = popupBlock.querySelector('.popup__form');
  const loginInput = formElement.querySelector('#login');
  const jobInput = formElement.querySelector('#about');

  function formSubmitHandler(evt) {
    evt.preventDefault();

    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__caption');

    profileName.textContent = loginInput.value;
    profileAbout.textContent = jobInput.value;
  }

  formElement.addEventListener('submit', formSubmitHandler);
  closePopup();
});

function renderPage(_initialCards) {
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

  initialCards.forEach((element) => {
    const photoCardTemplate = document.querySelector('#card-template').content;
    const photoCardElement = photoCardTemplate.querySelector('.photo-feed__item').cloneNode(true);

    const elementImage = photoCardElement.querySelector('.photo-card__image');
    elementImage.setAttribute('src', element.link);
    elementImage.setAttribute('alt', element.name);

    photoCardElement.querySelector('.photo-card__title').textContent = element.name;

    document.querySelector('.photo-feed__list').append(photoCardElement);
  });
}

renderPage();
