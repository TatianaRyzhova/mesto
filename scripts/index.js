const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
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
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupViewImage = document.querySelector('.popup_type_image');

function createCard(data) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__photo').src = data.link;
  cardElement.querySelector('.cards__description').textContent = data.name;

  cardElement.querySelector('.cards__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('cards__like-button_active');
  });

  cardElement.querySelector('.cards__remove-button').addEventListener('click', function() {
    document.querySelector('.cards__group').remove();
  });

  return cardElement;
}

function addCard(data) {
  const cards = data.map(function (el) {
    return createCard(el);
  })

  cards.forEach(function (el) {
    cardsContainer.prepend(el);
  })
}

addCard(initialCards);

function showPopup() {
  popupNameField.value = profileName.textContent;
  popupTitleField.value = profileTitle.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function submitPopupForm(event) {
  event.preventDefault();
  profileName.textContent = popupNameField.value;
  profileTitle.textContent = popupTitleField.value;
  closePopup();
}

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitPopupForm);

// editButton.addEventListener('click', () => showPopup(popupEditProfile));
// popupCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
// popupForm.addEventListener('submit', submitPopupForm(popupEditProfile));

// addCardButton.addEventListener('click', () => showPopup(popupAddCard));
// popupCloseButton.addEventListener('click', () => closePopup(popupAddCard));