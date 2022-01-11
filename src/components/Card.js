export default class Card {
  constructor(
    inputData,
    { cardSelector, cardClassList, handleCardClick, handleCardDeleteButton, handleLikeToggle },
  ) {
    const [cardData, userData] = inputData;
    this._src = cardData.link;
    this._name = cardData.name;
    this._cardId = cardData._id;
    this._cardData = cardData;
    this._userData = userData;
    this._cardOwner = cardData.owner;
    this._userId = userData._id;
    this._cardLikes = cardData.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteButton = handleCardDeleteButton;
    this._handleLikeToggle = handleLikeToggle;
    this._cardSelector = cardSelector;
    this._photoFeedItem = cardClassList.photoFeedItem;
    this._cardTitle = cardClassList.cardTitle;
    this._cardImage = cardClassList.cardImage;
    this._cardLikeButton = cardClassList.cardLikeButton;
    this._cardLikeCounter = cardClassList.cardLikeCounter;
    this._cardDeleteButton = cardClassList.cardDeleteButton;
    this._likeActiveSelector = cardClassList.likeActiveSelector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(this._photoFeedItem)
      .cloneNode(true);
    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._elementImage = this._element.querySelector(this._cardImage);
    this._elementLikeButton = this._element.querySelector(this._cardLikeButton);
    this._elementLikeCounter = this._element.querySelector(this._cardLikeCounter);
    this._elementDeleteButton = this._element.querySelector(this._cardDeleteButton);
    this._setEventListeners();
    this._showLikesData();
    this._element.setAttribute('card-id', this._cardId);
    this._elementImage.src = this._src;
    this._elementImage.alt = this._name;
    this._element.querySelector(this._cardTitle).textContent = this._name;
    return this._element;
  }

  _showLikesData() {
    const ownerLikes = this._cardLikes.filter((item) => item._id === this._userId);
    if (ownerLikes.length > 0) {
      this._elementLikeButton.classList.toggle(this._likeActiveSelector);
    }
    this._elementLikeCounter.textContent = !this._cardLikes.length ? '' : this._cardLikes.length;
  }

  _userIsOwner() {
    if (this._cardOwner._id !== this._userId) {
      
      return false;
    }
    return true;
  }

  _displayImage() {
    this._handleCardClick(this._cardData);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', (evt) => {
      this._handleCardClick(this._cardData);
    });

    this._elementLikeButton.addEventListener('click', (evt) =>
      this._handleLikeToggle(evt, this._cardData, this._elementLikeCounter),
    );

    if (this._userIsOwner()) {
      this._elementDeleteButton.addEventListener('click', (evt) =>
        this._handleCardDeleteButton(evt),
      );
    } else {
      this._elementDeleteButton.parentNode.removeChild(this._elementDeleteButton);
    }
  }
}
