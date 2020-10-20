import {openCloseMenu} from '../../js/openCloseMenu.js';

const searchOpen = document.querySelector('.js-search-opener');
const searchDrop = document.querySelector('.js-search-drop');
const searchClose = document.querySelector('.js-search-close');
const searchField = document.querySelector('.js-search-focus');

openCloseMenu(searchOpen, searchDrop, searchClose);

searchOpen.addEventListener('click', () => {
  console.log('focus');
  searchField.select();
  searchField.focus();
});

