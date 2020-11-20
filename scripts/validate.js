function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__form_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('input-error');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__form_type_error');
  errorElement.classList.remove('input-error');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setButtonState(button, isActive) {
  if (isActive) {
    button.classList.remove('popup__save-button_state_disabled');
    button.disabled = false;
  } else {
    button.classList.add('popup__save-button_state_disabled');
    button.disabled = true;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButton = formElement.querySelector('.popup__save-button');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      setButtonState(submitButton, formElement.checkValidity());
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    const submitButton = formElement.querySelector('.popup__save-button');
    setButtonState(submitButton, formElement.checkValidity());
  });
}

enableValidation();
