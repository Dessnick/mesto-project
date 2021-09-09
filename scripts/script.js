const editButton = document.querySelector('.profile__button_type_edit');
const popupBlock = document.querySelector('.popup');
const popupCloseButton = popupBlock.querySelector('.popup__button_type_close');
const popupSaveButton = popupBlock.querySelector('.popup__button_type_submit');

function loadProfileInfo() {
  let profileName = document.querySelector('.profile__name').textContent;
  let profileAbout = document.querySelector('.profile__caption').textContent;
  popupBlock.querySelector('#login').value = profileName;
  popupBlock.querySelector('#about').value = profileAbout;
}

function closePopup() {
  popupBlock.classList.remove('popup_opened');
}

editButton.addEventListener('click', function () {
  popupBlock.classList.add('popup_opened');
  loadProfileInfo();
});

popupCloseButton.addEventListener('click', closePopup);

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
