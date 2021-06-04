'use strict';

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
