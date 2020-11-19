const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`#${formInput.id}-error`);
// const formError = formElement.querySelector('.name-input-error');
// console.log(formInput.id);
// console.log(formErrorNull);
// console.log(formError);

const showInputError = (input, errorMessage) => {
  input.classList.add('popup__form_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};

const hideInputError = (input) => {
  input.classList.remove('popup__form_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
};

formElement.addEventListener('submit', function (event) {
  event.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});


