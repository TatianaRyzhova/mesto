const editButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');
const popupNameField = document.querySelector('.popup__input_type_name');
const popupTitleField = document.querySelector('.popup__input_type_title');

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
