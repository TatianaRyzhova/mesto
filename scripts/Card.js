export class Card {

  constructor(data, cardTemplate, openImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplate).content.querySelector('.cards__group').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListenersForLikeButton();
    this._setEventListenersForRemoveButton();
    this._setEventListenersForImagePopup();

    this._element.querySelector('.cards__photo').src = this._link;
    this._element.querySelector('.cards__photo').alt = this._name;
    this._element.querySelector('.cards__description').textContent = this._name;
    return this._element;
  }

  _setEventListenersForLikeButton() {
    this._element.querySelector('.cards__like-button').addEventListener('click', () => {
      this._handleLikeButton();
    })
  }

  _handleLikeButton() {
    this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
  }

  _setEventListenersForRemoveButton() {
    this._element.querySelector('.cards__remove-button').addEventListener('click', () => {
      this._handleRemoveButton();
    })
  }

  _handleRemoveButton() {
    this._element.querySelector('.cards__remove-button').closest('.cards__group').remove();
  }

  _setEventListenersForImagePopup() {
    this._element.querySelector('.cards__photo').addEventListener('click', () =>
      this._openImagePopup(this._link, this._name, this._name));
  }

}
