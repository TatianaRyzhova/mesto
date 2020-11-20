const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const popup = document.querySelector('.popup');
const profilePopupCloseButton = document.querySelector('.popup__close-button_profile');
const popupForm = document.querySelector('.popup__form');
const popupNameField = document.querySelector('.popup__input_type_name');
const popupTitleField = document.querySelector('.popup__input_type_title');
const cardsContainer = document.querySelector('.cards');
const removeButton = cardsContainer.querySelector('.cards__remove-button');
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
const cardsTemplate = document.querySelector('#cards-template');
const cardDescription = document.querySelector('.cards__description');
const cardImage = document.querySelector('.cards__photo');
const cardPopupForm = document.querySelector('.popup__card-form');
const zommedImage = document.querySelector('.zoomed-photo');
const zommedImageCaption = document.querySelector('.caption');
const imagePopupCloseButton = document.querySelector('.popup__close-button_image');
const popupCardTitle = document.querySelector('.popup__input_type_card-title');
const popupCardLink = document.querySelector('.popup__input_type_card-link');

function createCard(data) {
  const cardTemplate = cardsTemplate.content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__photo').src = data.link;
  cardElement.querySelector('.cards__photo').alt = data.name;
  cardElement.querySelector('.cards__description').textContent = data.name;

  cardElement.querySelector('.cards__like-button').addEventListener('click', function (event) {
    event.target.classList.toggle('cards__like-button_active');
  });

  cardElement.querySelector('.cards__remove-button').addEventListener('click', function (event) {
    event.target.closest('.cards__group').remove();
  });

  const cardImage = cardElement.querySelector('.cards__photo');
  cardImage.addEventListener('click', () => openImagePopup(data.link, data.name, data.name));

  return cardElement;
}

function addCards(data) {
  const cards = data.map(el => createCard(el))

  cards.forEach(function (el) {
    cardsContainer.prepend(el);
  })
}

addCards(initialCards);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  // resetValidationState();
}

// function resetValidationState() {
//   const errors = document.querySelectorAll('.popup__input-error_active');
//   for (let i = 0; i < errors.length; i++) {
//     errors[i].remove();
//   }
// }

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function disableSubmitButton(popupForm) {
  const submitButton = popupForm.querySelector('.popup__save-button');
  submitButton.classList.add('popup__save-button_state_disabled');
  submitButton.disabled = true;
}

function openProfilePopup() {
  popupNameField.value = profileName.textContent;
  popupTitleField.value = profileTitle.textContent;
  openPopup(profilePopup);
}

function submitProfilePopup(profilePopup) {
  popupForm.addEventListener('submit', event => {
    event.preventDefault();
    profileName.textContent = popupNameField.value;
    profileTitle.textContent = popupTitleField.value;
    closePopup(profilePopup);
  })
}

editButton.addEventListener('click', () => openProfilePopup());
submitProfilePopup(profilePopup);
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));

function openCardPopup(cardPopup) {
  addCardButton.addEventListener('click', () => openPopup(cardPopup));
}

openCardPopup(cardPopup);

function submitAddCardForm(event) {
  event.preventDefault();
  const cardData = [{
    name: popupCardTitle.value,
    link: popupCardLink.value
  }]
  addCards(cardData);
  cardPopupForm.reset();
  disableSubmitButton(cardPopupForm);
  closePopup(cardPopup);
}

cardPopupForm.addEventListener('submit', submitAddCardForm);

function closeCardPopup() {
  closePopup(cardPopup)
  cardPopupForm.reset();
}

cardPopupCloseButton.addEventListener('click', () => closeCardPopup());

function openImagePopup(src, alt, caption) {
  zommedImage.src = src;
  zommedImage.alt = alt;
  zommedImageCaption.textContent = caption;
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

function closePopupWithEsc(popup) {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  })
}

closePopupWithEsc(profilePopup);
closePopupWithEsc(cardPopup);
closePopupWithEsc(imagePopup);
