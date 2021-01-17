export class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteClick}, cardTemplate, currentUserId) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._currentUserId = currentUserId;
    this._cardId = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplate).content.querySelector('.cards__group').cloneNode(true);
  }

  _setEventListenersForLikeButton() {
    this._element.querySelector('.cards__like-button').addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._isLiked());
    })
  }

  _isLiked() {
    return this._element.querySelector('.cards__like-button').classList.contains('cards__like-button_active');
  }

  _cardIsLikedByCurrentUser() {
    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id === this._currentUserId) {
        return true;
      }
    }
    return false;
  }

  _displayCurrentLikesQty() {
    const likesCounterElement = this._element.querySelector('.cards__like-counter');
    if (this._likes.length !== 0) {
      likesCounterElement.textContent = this._likes.length;
    } else {
      likesCounterElement.textContent = '';
    }
  }

  setLikes(likesArray) {
    const cardsLikeButtonElement = this._element.querySelector('.cards__like-button');
    this._element.querySelector('.cards__like-counter').textContent = likesArray.length;
    this._likes = likesArray;
    if (this._cardIsLikedByCurrentUser()) {
      cardsLikeButtonElement.classList.add('cards__like-button_active');
    } else {
      cardsLikeButtonElement.classList.remove('cards__like-button_active');
      this._displayCurrentLikesQty();
    }
  }

  _displayCardRemoveButton() {
    if (this._owner._id !== this._currentUserId) {
      this._element.querySelector('.cards__remove-button').classList.add('cards__remove-button_hidden');
    }
  }

  _setEventListenersForRemoveButton() {
    this._element.querySelector('.cards__remove-button').addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);
    })
  }

  _setEventListenersForImagePopup() {
    this._element.querySelector('.cards__photo').addEventListener('click', () =>
      this._handleCardClick(this._link, this._name));
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardsPhoto = this._element.querySelector('.cards__photo');
    this._setEventListenersForLikeButton();
    this._setEventListenersForRemoveButton();
    this._setEventListenersForImagePopup();
    this._displayCurrentLikesQty();
    this.setLikes(this._likes);
    this._displayCardRemoveButton();
    cardsPhoto.src = this._link;
    cardsPhoto.alt = this._name;
    this._element.querySelector('.cards__description').textContent = this._name;
    return this._element;
  }

}
