import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
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
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
}
