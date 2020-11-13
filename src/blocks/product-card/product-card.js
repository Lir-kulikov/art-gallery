import {setHeight} from '../../js/scrollHeightAnim.js';
import {iconsCounter} from '../../js/iconsCounter.js'

document.addEventListener('DOMContentLoaded', () => {
  
  iconsCounter();

  const animToggleBtn = document.querySelectorAll('.js-anim-toggle-btn');
  const animToggleBlock = document.querySelectorAll('.js-anim-toggle-block');

  for (let i = 0; i < animToggleBtn.length; i++) {
    setHeight(animToggleBtn[i], animToggleBlock[i]);
  }


});