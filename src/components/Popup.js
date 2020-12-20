export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscButton = this._handleEscButton.bind(this);
  }

  openPopup() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscButton);
  }

  closePopup() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscButton);
  }

  setEventListeners() {
    document.querySelector('.popup__close-button').addEventListener('click', () => this.closePopup());

    this._overlayClickHandler();
  }

  _handleEscButton(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  _overlayClickHandler() {
    this._popupElement.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup') || event.target.classList.contains('overlay')) {
          this.closePopup();
        }
      }
    )
  }

}
