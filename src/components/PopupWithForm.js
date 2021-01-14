import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
  }

  openPopup(inputsData = {}) {
    super.openPopup();
    Object.keys(inputsData).forEach((name) => {
      const input = this._popupElement.querySelector(`input[name=${name}]`);
      input.value = inputsData[name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    })
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupElement.querySelector('.popup__save-button').innerText = 'Сохранение...';
    } else {
      this._popupElement.querySelector('.popup__save-button').innerText = 'Сохранить';
    }
  }
}
