// const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
// const popupPlaceAdd = document.querySelector('.popup_type_place-add');

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

// function clearPopupAddInput() {
//   popupPlaceAdd.querySelector('.popup__form').reset();
// }

// export function setEventCloseButton(popupForm) {
//   const closeButton = popupForm.querySelector('.popup__button_type_close');
//   closeButton.addEventListener('click', () => {
//     window.resetForm(popupForm);
//     closePopup(popupForm);
//   });
// }

// setEventCloseButton(popupProfileEdit);
// setEventCloseButton(popupPlaceAdd);

// function loadProfileInfo() {
//   const profileName = document.querySelector('.profile__name');
//   const profileAbout = document.querySelector('.profile__caption');
//   popupProfileEdit.querySelector('#login-input').value = profileName.textContent;
//   popupProfileEdit.querySelector('#about-input').value = profileAbout.textContent;
// }

// const editButton = document.querySelector('.profile__button_type_edit');
// editButton.addEventListener('click', () => {
//   openPopup(popupProfileEdit);
//   loadProfileInfo();
//   enableValidation();
// });

// const addButton = document.querySelector('.profile__button_type_add');
// addButton.addEventListener('click', () => {
//   openPopup(popupPlaceAdd);
//   enableValidation();
// });

// popupProfileEdit.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const loginInput = popupProfileEdit.querySelector('#login-input').value;
//   const jobInput = popupProfileEdit.querySelector('#about-input').value;

//   if (!loginInput || !jobInput) {
//     return;
//   }

//   document.querySelector('.profile__name').textContent = loginInput;
//   document.querySelector('.profile__caption').textContent = jobInput;

//   closePopup(popupProfileEdit);
// });

// popupPlaceAdd.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   clearPopupAddInput();

//   const inputData = {
//     placeNameInput: popupPlaceAdd.querySelector('#place-name').value,
//     imageLinkInput: popupPlaceAdd.querySelector('#image-link').value,
//   };

//   if (!inputData.placeNameInput || !inputData.imageLinkInput) {
//     return;
//   }

//   photoFeed.prepend(createPhotoCard(inputData));

//   clearPopupAddInput();
//   closePopup(popupPlaceAdd);
// });

export { openPopup, closePopup };
