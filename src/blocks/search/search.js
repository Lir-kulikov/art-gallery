// import {openCloseMenu} from '../../js/openCloseMenu.js';

const searchOpen = document.querySelector('.js-search-opener');
const searchDrop = document.querySelector('.js-search-drop');
const searchClose = document.querySelector('.js-search-close');
const searchField = document.querySelector('.js-search-focus');

searchOpen.addEventListener('click', () => {
  searchField.select();
  searchField.focus();
});

const openCloseSearch = () => {
  searchOpen.addEventListener('click', () => {
    searchDrop.classList.toggle('is-open');
    searchOpen.classList.toggle('is-open');
  });
  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchDrop.classList.remove('is-open');
      searchField.value = '';
    });
  }

  window.addEventListener('click', (e) => {
    if (searchDrop.classList.contains('is-open') && !searchDrop.contains(e.target) && !searchOpen.contains(e.target)) {
      searchDrop.classList.remove('is-open');
      searchOpen.classList.remove('is-open');
      searchField.value = '';
    }
})
}

openCloseSearch();


