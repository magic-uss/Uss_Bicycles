"use strict";

const nameInput = document.querySelector('.page-header__form input[id="name"]');
const telephoneInput = document.querySelector('.page-header__form input[id="telephone"]');
const formButton = document.querySelector('.page-header__form button');
let isStorageSupport = true;
let storageName = '';

try {
  storageName = localStorage.getItem('name');
  storageTelephone = localStorage.getItem('tel');
} catch (err) {
  isStorageSupport = false;
};

if (storageName) {
  nameInput.value = storageName;
  telephoneInput.value = storageTelephone;
};

if (telephoneInput && formButton) {
  formButton.addEventListener('submit', () => {
    if (isStorageSupport) {
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('tel', telephoneInput.value);
    }
  });
};

if (telephoneInput) {
  telephoneInput.addEventListener('input', (evt) => {
    let telephoneValues = telephoneInput.value.toLowerCase().split('');
    let regex = /[+()\d]/g;

    for (let i = 0; i < telephoneValues.length; i++) {
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
};

const navBlock = document.querySelector('.header-nav');
const navToggle = document.querySelector('.header-nav__toggle');

if (navBlock && navToggle) {
  navBlock.classList.remove('header-nav--nojs');

  navToggle.addEventListener('click', () => {
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
};

const scrollLinks = document.querySelectorAll('a[href^="#"]');

if (scrollLinks) {
  for (let scrollLink of scrollLinks) {
    scrollLink.addEventListener('click', (evt) => {
          evt.preventDefault();

          if (navBlock.classList.contains('header-nav--opened')) {
            navBlock.classList.add('header-nav--closed');
            navBlock.classList.remove('header-nav--opened');
            document.body.removeAttribute('style');
          };

          const id = scrollLink.getAttribute('href');

          document.querySelector(id).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  };
};
