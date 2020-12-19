export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _showInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputInvalidClass);
    error.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputInvalidClass);
    error.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setButtonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._config.buttonInvalidClass);
      button.disabled = false;
    } else {
      button.classList.add(this._config.buttonInvalidClass);
      button.disabled = true;
    }
  }

  _setEventListeners(submitButton) {
    const inputsList = this._form.querySelectorAll(this._config.inputSelector);
    inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._setButtonState(submitButton, this._form.checkValidity());
      });
    });
  }

  enableValidation() {
    const submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._setEventListeners(submitButton);
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setButtonState(submitButton, this._form.checkValidity())
  }

  resetValidation() {
    const inputs = this._form.querySelectorAll(this._config.inputSelector);
    inputs.forEach(input => {
      input.classList.remove(this._config.inputInvalidClass);
    })
    const errors = this._form.querySelectorAll(this._config.inputErrorClass);
    errors.forEach(error => {
      error.textContent = '';
    })
  }

  disableSubmitButton() {
    const submitButton = this._form.querySelector(this._config.submitButtonSelector);
    submitButton.classList.add(this._config.buttonInvalidClass);
    submitButton.disabled = true;
  }
}
