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
  avatarPopup,
  avatarPopupCloseButton,
  avatarPopupForm,
  cardPopup,
  cardPopupCloseButton,
  cardPopupForm,
  cardsContainer,
  confirmationPopup,
  confirmationPopupCloseButton,
  editButton,
  imagePopup,
  imagePopupCloseButton,
  popupAvatarLink,
  popupCardLink,
  popupCardTitle,
  popupNameField,
  popupTitleField,
  profileName,
  profilePicture,
  profilePictureKit,
  profilePopup,
  profilePopupCloseButton,
  profilePopupForm,
  profileTitle,
  validationConfig
} from "../utils/constants.js";
import {PopupConfirm} from "../components/PopupConfirm.js";

let currentUserId;

const popupWithImage = new PopupWithImage(imagePopup);
const userInfo = new UserInfo(profileName, profileTitle, profilePicture);
const popupConfirmation = new PopupConfirm(confirmationPopup);

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

    currentUserId = result[0]._id
    console.log("Current user id: " + currentUserId);
  })
  .catch((error) => {
    console.log(error);
  })

const profilePopupWithForm = new PopupWithForm({
  popupSelector: profilePopup,
  handleFormSubmit: () => {
    profilePopupWithForm.renderLoading(true);
    api.updateUserProfile(popupNameField.value, popupTitleField.value)
      .then((result) => {
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
      },
      handleLikeClick: (cardId, isLiked) => {
        if (isLiked) {
          api.deleteLike(cardId)
            .then((result) => {
              card.setLikes(result.likes);
            })
            .catch((error) => {
              console.log(error);
            })
        } else {
          api.addCardLike(cardId)
            .then((result) => {
              card.setLikes(result.likes)
            })
            .catch((error) => {
              console.log(error);
            })
        }
      },
      handleDeleteClick: (cardId) => {
        popupConfirmation.setSubmitAction(() => {
          api.deleteCard(cardId)
            .then(() => {
              card.deleteCard();
              popupConfirmation.closePopup();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        popupConfirmation.openPopup();
      }
    },
    '#cards-template',
    '4d12faba6892ec6f056527cb');
  // console.log("TEST2 " + currentUserId);
  return card.generateCard();
}

const cardPopupWithForm = new PopupWithForm({
  popupSelector: cardPopup,
  handleFormSubmit: () => {
    cardPopupWithForm.renderLoading(true);
    api.postNewCard(popupCardTitle.value, popupCardLink.value)
      .then(result => {
        const cardElement = createCard(result);
        section.addItem(cardElement);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        cardPopupWithForm.renderLoading(false);
      })
  }
})
cardPopupWithForm.setEventListeners();

const avatarPopupWithForm = new PopupWithForm({
  popupSelector: avatarPopup,
  handleFormSubmit: () => {
    avatarPopupWithForm.renderLoading(true);
    api.updateAvatar(popupAvatarLink.value)
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        avatarPopupWithForm.renderLoading(false);
      })
    avatarPopupWithForm.openPopup();
  }
})

const profilePopupFormValidation = new FormValidator(validationConfig, profilePopupForm);
profilePopupFormValidation.enableValidation();

const cardPopupFormValidation = new FormValidator(validationConfig, cardPopupForm);
cardPopupFormValidation.enableValidation();

const avatarPopupFormValidation = new FormValidator(validationConfig, avatarPopupForm);
avatarPopupFormValidation.enableValidation();

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

confirmationPopupCloseButton.addEventListener('click', () => popupConfirmation.closePopup());
popupConfirmation.setEventListeners();

profilePictureKit.addEventListener('click', () => {
  avatarPopupFormValidation.resetValidation();
  avatarPopupFormValidation.disableSubmitButton();
  avatarPopupWithForm.openPopup();
  avatarPopupForm.reset();
})

avatarPopupCloseButton.addEventListener('click', () => avatarPopupWithForm.closePopup());

avatarPopupWithForm.setEventListeners();
