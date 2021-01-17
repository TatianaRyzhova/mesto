import {Popup} from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmationButton = popupSelector.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', () => {
      this._handleSubmitCallback();
    })
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

}
