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

'use strict';

(function () {
  var navBlock = document.querySelector('.header-nav');
  var navToggle = document.querySelector('.header-nav__toggle');

  if (navBlock && navToggle) {
    navBlock.classList.remove('header-nav--nojs');

    navToggle.addEventListener('click', function () {
      if (navBlock.classList.contains('header-nav--closed')) {
        navBlock.classList.remove('header-nav--closed');
        navBlock.classList.add('header-nav--opened');
        document.body.style.overflow = 'hidden';

      } else {
        navBlock.classList.add('header-nav--closed');
        navBlock.classList.remove('header-nav--opened');
        document.body.removeAttribute('style');
      }
    });
  }

  var scrollLinks = document.querySelectorAll('a[href^="#"]');

  if (scrollLinks) {
    scrollLinks.forEach(function (scrollLink) {
      scrollLink.addEventListener('click', function (evt) {
        evt.preventDefault();

        if (navBlock.classList.contains('header-nav--opened')) {
          navBlock.classList.add('header-nav--closed');
          navBlock.classList.remove('header-nav--opened');
          document.body.removeAttribute('style');
        }

        var id = scrollLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }
})();
