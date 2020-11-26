import MicroModal from 'micromodal'
import Bouncer from '../../node_modules/formbouncerjs/dist/bouncer.polyfills.min'

// 

MicroModal.init({
  openTrigger: 'data-modal-open',
  closeTrigger: 'data-modal-close',
  disableScroll: true,
  disableFocus: false,
  awaitCloseAnimation: true,
  //awaitOpenAnimation: true,
  debugMode: true,
});


// видео

const video = document.querySelector('.youtube-video');
const openModal = document.querySelector('[data-modal-open="modal-video"]');
const closeModal = document.querySelectorAll('[data-modal-close="modal-video-close"]');

if (openModal) {
  const stopVideoModal = () => {
  
    openModal.addEventListener('click', () => {
      const videoSrc = video.getAttribute('data-src-video');
      video.setAttribute('src', videoSrc);
    })
  
    for(let item of closeModal) {
      item.addEventListener('click', () => {
        video.setAttribute('src', '');
      })
    }
  }
  if (openModal, closeModal, video) {
    stopVideoModal();
  }
}


// закрытие предыдущего попапа при открытии следующего

const triggerNextModal = document.querySelectorAll('.js-next-modal');
for (let item of triggerNextModal) {
  if (!item.classList.contains('.js-modal-submit'))
  item.addEventListener('click', () => {
    item.closest('.modal').classList.remove('is-open');
  })
}


