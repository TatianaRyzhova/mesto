import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const profilePopupCloseButton = document.querySelector('.popup__close-button_profile');
const popupForm = document.querySelector('.popup__form');
const popupNameField = document.querySelector('.popup__input_type_name');
const popupTitleField = document.querySelector('.popup__input_type_title');
const cardsContainer = document.querySelector('.cards');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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
  data.forEach((item) => {
    const card = new Card(item, '#cards-template', openImagePopup);
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
  })
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
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function openProfilePopup() {
  popupNameField.value = profileName.textContent;
  popupTitleField.value = profileTitle.textContent;
  profilePopupFormValidation.resetValidation();
  openPopup(profilePopup);
}

function submitProfilePopup(profilePopup) {
  popupForm.addEventListener('submit', () => {
    profileName.textContent = popupNameField.value;
    profileTitle.textContent = popupTitleField.value;
    closePopup(profilePopup);
  })
}

editButton.addEventListener('click', () => openProfilePopup());
submitProfilePopup(profilePopup);
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));

function openCardPopup() {
  cardPopupFormValidation.resetValidation();
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
  cardPopupFormValidation.disableSubmitButton();
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
