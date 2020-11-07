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
// const cardDescription = document.querySelector('.cards__description');
// const cardImage = document.querySelector('.cards__photo');
// const cardTitle = document.querySelector('.popup__input_type_card-title');
// const cardLink = document.querySelector('.popup__input_type_card-link');
const cardPopupForm = document.querySelector('.popup__card-form');

function createCard(data) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__photo').src = data.link;
  cardElement.querySelector('.cards__description').textContent = data.name;

  cardElement.querySelector('.cards__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('cards__like-button_active');
  });

  cardElement.querySelector('.cards__remove-button').addEventListener('click', function(event) {
    event.target.closest('.cards__group').remove();
  });

  return cardElement;
}

function addCards(data) {
  const cards = data.map(el => createCard(el))

  cards.forEach(function (el) {
    cardsContainer.prepend(el);
  })
}

addCards(initialCards);

function submitAddCardForm(event) {
  event.preventDefault();
  const cardData = [{
    name: document.querySelector('.popup__input_type_card-title').value,
    link: document.querySelector('.popup__input_type_card-link').value
}]
  addCards(cardData);
  cardPopupForm.reset();
  closePopup(cardPopup);
}
cardPopupForm.addEventListener('submit', submitAddCardForm);


function showPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfilePopup() {
  popupNameField.value = profileName.textContent;
  popupTitleField.value = profileTitle.textContent;
  showPopup(profilePopup);  
}

function closeProfilePopup(profilePopup) {
  profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));
}

function submitProfilePopup(profilePopup) {
  popupForm.addEventListener('submit', event => {
  event.preventDefault();
  profileName.textContent = popupNameField.value;
  profileTitle.textContent = popupTitleField.value;
  closePopup(profilePopup);
})
}

function openCardPopup(cardPopup) {
  addCardButton.addEventListener('click', () => showPopup(cardPopup));
}

function closeCardPopup(cardPopup) {
  cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup));
}

editButton.addEventListener('click', () => openProfilePopup());
closeProfilePopup(profilePopup);
submitProfilePopup(profilePopup);

openCardPopup(cardPopup);
closeCardPopup(cardPopup);

// editButton.addEventListener('click', showPopup);
// popupCloseButton.addEventListener('click', closePopup);
// popupForm.addEventListener('submit', submitPopupForm);
