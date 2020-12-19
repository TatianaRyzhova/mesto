export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscButton = this._handleEscButton.bind(this);
  }

  openPopup() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscButton);
  }

  closePopup() {
    this._popupSelector.classList.remove('popup_opened');
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
    this._popupSelector.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup') || event.target.classList.contains('overlay')) {
          this.closePopup();
        }
      }
    )
  }

}
