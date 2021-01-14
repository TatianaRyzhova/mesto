import './index.css';
import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {api} from "../components/Api.js";
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
  profilePicture,
  profilePopup,
  profilePopupCloseButton,
  profilePopupForm,
  profileTitle,
  validationConfig
} from "../utils/constants.js";

const popupWithImage = new PopupWithImage(imagePopup);
const userInfo = new UserInfo(profileName, profileTitle, profilePicture);

const section = new Section({
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    }
  },
  cardsContainer)

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((result) => {
    userInfo.setUserInfo(result[0]);
    section.renderer(result[1]);
  })
  .catch((error) => {
    console.log(error);
  })


// api.getInitialCards()
//   .then((initialCards) => {
//     const defaultCardList = new Section({
//       items: initialCards,
//       renderer: (item) => {
//         const card = new Card({
//             data: item,
//             handleCardClick: () => {
//               popupWithImage.openPopup(item.link, item.name)
//             }
//           },
//           '#cards-template');
//         const cardElement = card.generateCard();
//         defaultCardList.addItem(cardElement);
//       }
//     }, cardsContainer);
//     defaultCardList.renderer();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const profilePopupWithForm = new PopupWithForm({
  popupSelector: profilePopup,
  handleFormSubmit: () => {
    profilePopupWithForm.renderLoading(true);
    // userInfo.setUserInfo({
    //   profileName: popupNameField.value,
    //   profileTitle: popupTitleField.value
    // })
    api.updateUserProfile(popupNameField.value, popupTitleField.value)
      .then((result) => {
        console.log("TEST " + result);
        userInfo.setUserInfo(result)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        profilePopupWithForm.renderLoading(false);
      })
  }
})
profilePopupWithForm.setEventListeners();

function createCard(item) {
  const card = new Card({
      data: item,
      handleCardClick: () => {
        popupWithImage.openPopup(item.link, item.name)
      }
    },
    '#cards-template');
  return card.generateCard();

}

const newCardSection = new Section({
  items: [{
    name: popupCardTitle.value,
    link: popupCardLink.value
  }],
  renderer: (item) => {
    const cardElement = createCard(item);
    newCardSection.addItem(cardElement);
  }
}, cardsContainer)

const cardPopupWithForm = new PopupWithForm({
  popupSelector: cardPopup,
  handleFormSubmit: (data) => {
    const cardElement = createCard(data)
    newCardSection.addItem(cardElement);
  }
})
cardPopupWithForm.setEventListeners();

editButton.addEventListener('click', () => {
  profilePopupFormValidation.resetValidation();
  profilePopupWithForm.openPopup(userInfo.getUserInfo());
});

profilePopupCloseButton.addEventListener('click', () => profilePopupWithForm.closePopup());
profilePopupWithForm.setEventListeners();

addCardButton.addEventListener('click', () => {
  cardPopupFormValidation.resetValidation();
  cardPopupFormValidation.disableSubmitButton();
  cardPopupWithForm.openPopup();
  cardPopupForm.reset();
});

cardPopupCloseButton.addEventListener('click', () => cardPopupWithForm.closePopup());

imagePopupCloseButton.addEventListener('click', () => popupWithImage.closePopup());
popupWithImage.setEventListeners();

const profilePopupFormValidation = new FormValidator(validationConfig, profilePopupForm);
profilePopupFormValidation.enableValidation();

const cardPopupFormValidation = new FormValidator(validationConfig, cardPopupForm);
cardPopupFormValidation.enableValidation();
