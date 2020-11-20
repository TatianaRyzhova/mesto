function showInputError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputInvalidClass);
  error.textContent = input.validationMessage;
}

function hideInputError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputInvalidClass);
  error.textContent = '';
}

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.buttonInvalidClass);
    button.disabled = false;
  } else {
    button.classList.add(config.buttonInvalidClass);
    button.disabled = true;
  }
}

function setEventListeners(form, config) {
  const inputsList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputsList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config)
  });
}

function resetValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  inputs.forEach(input => {
    input.classList.remove(config.inputInvalidClass);
  })
  const errors = form.querySelectorAll(config.inputErrorClass);
  errors.forEach(error => {
    error.textContent = '';
  })
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputInvalidClass: 'popup__form_type_error',
  inputErrorClass: '.input-error',
  buttonInvalidClass: 'popup__save-button_state_disabled',
};

enableValidation(validationConfig);

