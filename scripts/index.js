import {Card} from "./Card.js";
import {Section} from "./Section.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards} from "./data.js";

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const profilePopupCloseButton = document.querySelector('.popup__close-button_profile');
const popupForm = document.querySelector('.popup__form');
const popupNameField = document.querySelector('.popup__input_type_name');
const popupTitleField = document.querySelector('.popup__input_type_title');
const cardsContainer = '.cards';
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');
const cardPopupCloseButton = document.querySelector('.popup__close-button_card');
const cardPopupForm = document.querySelector('.popup__card-form');
const profilePopupForm = document.querySelector('.popup__profile-form');
const zoomedImage = document.querySelector('.zoomed-photo');
const zoomedImageCaption = document.querySelector('.caption');
const imagePopupCloseButton = document.querySelector('.popup__close-button_image');
const popupCardTitle = document.querySelector('.popup__input_type_card-title');
const popupCardLink = document.querySelector('.popup__input_type_card-link');
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputInvalidClass: 'popup__form_type_error',
  inputErrorClass: '.input-error',
  buttonInvalidClass: 'popup__save-button_state_disabled',
};

function addCards(data) {
  const defaultCardList = new Section({
    items: data,
    renderer: (item) => {
      const card = new Card(item, '#cards-template', openImagePopup);
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    }
  }, cardsContainer);
  defaultCardList.renderer();
}

addCards(initialCards);

const profilePopupFormValidation = new FormValidator(validationConfig, profilePopupForm);
profilePopupFormValidation.enableValidation();

const cardPopupFormValidation = new FormValidator(validationConfig, cardPopupForm);
cardPopupFormValidation.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

function closePopupWithEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openProfilePopup() {
  popupNameField.value = profileName.textContent;
  popupTitleField.value = profileTitle.textContent;
  profilePopupFormValidation.resetValidation();
  openPopup(profilePopup);
}

popupForm.addEventListener('submit', () => {
  profileName.textContent = popupNameField.value;
  profileTitle.textContent = popupTitleField.value;
  closePopup(profilePopup);
})

editButton.addEventListener('click', () => openProfilePopup());
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));

function openCardPopup() {
  cardPopupFormValidation.resetValidation();
  cardPopupFormValidation.disableSubmitButton();
  openPopup(cardPopup);
  cardPopupForm.reset();
}

addCardButton.addEventListener('click', () => openCardPopup());

function submitAddCardForm() {
  const cardData = [{
    name: popupCardTitle.value,
    link: popupCardLink.value
  }]
  addCards(cardData);
  closePopup(cardPopup);
}

cardPopupForm.addEventListener('submit', submitAddCardForm);

function closeCardPopup() {
  closePopup(cardPopup)
}

cardPopupCloseButton.addEventListener('click', () => closeCardPopup());

function openImagePopup(src, alt, caption) {
  zoomedImage.src = src;
  zoomedImage.alt = alt;
  zoomedImageCaption.textContent = caption;
  openPopup(imagePopup);
}

imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));

function popupClickHandler(popup) {
  popup.addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('overlay')) {
      closePopup(popup);
    }
  })
}

popupClickHandler(profilePopup);
popupClickHandler(cardPopup);
popupClickHandler(imagePopup);
