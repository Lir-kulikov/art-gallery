import {openCloseMenu} from '../../js/openCloseMenu.js';

const accountOpen = document.querySelector('.js-account-opener');
const accountDrop = document.querySelector('.js-account-drop');

if (accountOpen) {
  openCloseMenu(accountOpen, accountDrop);
}
