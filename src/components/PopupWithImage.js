import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomedImage = this._popupElement.querySelector('.zoomed-photo');
    this._zoomedImageCaption = this._popupElement.querySelector('.caption');
  }

  openPopup(src, caption) {
    this._zoomedImage.src = src;
    this._zoomedImageCaption.textContent = caption;
    super.openPopup();
  }
}
