'use strict';

(function () {
  var nameInput = document.querySelector('.page-header__form input[id="name"]');
  var telephoneInput = document.querySelector('.page-header__form input[id="telephone"]');
  var formButton = document.querySelector('.page-header__form button');
  var isStorageSupport = true;
  var storageName = '';
  var storageTelephone = '';

  try {
    storageName = localStorage.getItem('name');
    storageTelephone = localStorage.getItem('tel');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageName) {
    nameInput.value = storageName;
    telephoneInput.value = storageTelephone;
  }

  if (telephoneInput && formButton) {
    formButton.addEventListener('submit', function () {
      if (isStorageSupport) {
        localStorage.setItem('name', nameInput.value);
        localStorage.setItem('tel', telephoneInput.value);
      }
    });
  }

  if (telephoneInput) {
    telephoneInput.addEventListener('input', function () {
      var telephoneValues = telephoneInput.value.toLowerCase().split('');
      var regex = /[+()\d]/g;

      for (var i = 0; i < telephoneValues.length; i++) {
        if (telephoneValues[i].search(regex) === -1) {
          telephoneInput.setCustomValidity('Номер телефона может содержать только цифры');
        } else {
          telephoneInput.setCustomValidity('');
        }

        telephoneInput.reportValidity();
      }

      if (!telephoneInput.validity.valid) {
        telephoneInput.setAttribute('style', 'border-color: red; outline: none;');
        return;
      }
      telephoneInput.removeAttribute('style');
    });
  }
})();
