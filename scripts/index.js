let editButton = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');

let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupForm = document.querySelector('.popup__form');
let popupNameField = document.querySelector('.popup__input_type_name');
let popupTitleField = document.querySelector('.popup__input_type_title');

function showPopup() {
  popup.classList.add('popup_opened');

  popupNameField.setAttribute('value', profileName.textContent);
  popupTitleField.setAttribute('value', profileTitle.textContent);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function submitPopupForm(event) {
  event.preventDefault();

  profileName.textContent = popupNameField.value;
  profileTitle.textContent = popupTitleField.value;
}

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup)

popupForm.addEventListener('submit', submitPopupForm);
