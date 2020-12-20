import './index.css';
import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {FormValidator} from "../components/FormValidator.js";
import {initialCards} from "../utils/data.js";
import {Popup} from "../components/Popup.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {
  addCardButton,
  cardPopup,
  cardPopupCloseButton,
  cardPopupForm,
  cardsContainer,
  editButton,
  imagePopup,
  imagePopupCloseButton,
  popupCardLink,
  popupCardTitle,
  popupNameField,
  popupTitleField,
  profileName,
  profilePopup,
  profilePopupCloseButton,
  profilePopupForm,
  profileTitle,
  validationConfig
} from "../utils/constants.js";


const popupWithImage = new PopupWithImage(imagePopup);
const userInfo = new UserInfo(profileName, profileTitle);

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
        data: item,
        handleCardClick: () => {
          popupWithImage.openPopup(item.link, item.name)
        }
      },
      '#cards-template');
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardsContainer);
defaultCardList.renderer();


const profilePopupWithForm = new PopupWithForm({
  popupSelector: profilePopup,
  handleFormSubmit: () => {
    userInfo.setUserInfo({
      profileName: popupNameField.value,
      profileTitle: popupTitleField.value
    })
  }
})
profilePopupWithForm.setEventListeners();

const cardPopupWithForm = new PopupWithForm({
  popupSelector: cardPopup,
  handleFormSubmit: () => {
    const newCardSection = new Section({
      items: [{
        name: popupCardTitle.value,
        link: popupCardLink.value
      }],
      renderer: (item) => {
        const newCard = new Card({
            data: item,
            handleCardClick: () => {
              popupWithImage.openPopup(item.link, item.name)
            }
          },
          '#cards-template');
        const cardElement = newCard.generateCard();
        newCardSection.addItem(cardElement);
      }
    }, cardsContainer)
    newCardSection.renderer();
  }
})
cardPopupWithForm.setEventListeners();

editButton.addEventListener('click', () => {
  profilePopupFormValidation.resetValidation();
  profilePopupWithForm.openPopup(userInfo.getUserInfo());
});

profilePopupCloseButton.addEventListener('click', () => profilePopupWithForm.closePopup());
profilePopupWithForm.setEventListeners();

// const cardPopupClass = new Popup(cardPopup);
addCardButton.addEventListener('click', () => {
  cardPopupFormValidation.resetValidation();
  cardPopupFormValidation.disableSubmitButton();
  cardPopupWithForm.openPopup();
  cardPopupForm.reset();
});

cardPopupCloseButton.addEventListener('click', () => cardPopupWithForm.closePopup());
// cardPopupClass.setEventListeners();

const imagePopupClass = new Popup(imagePopup);
imagePopupCloseButton.addEventListener('click', () => imagePopupClass.closePopup());
imagePopupClass.setEventListeners();

const profilePopupFormValidation = new FormValidator(validationConfig, profilePopupForm);
profilePopupFormValidation.enableValidation();

const cardPopupFormValidation = new FormValidator(validationConfig, cardPopupForm);
cardPopupFormValidation.enableValidation();
