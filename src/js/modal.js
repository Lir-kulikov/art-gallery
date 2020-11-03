import MicroModal from 'micromodal'

const video = document.querySelector('.youtube-video');
const openModal = document.querySelector('[data-modal-open]');
const closeModal = document.querySelectorAll('[data-modal-close]');

if (openModal) {
  MicroModal.init({
    openTrigger: 'data-modal-open',
    closeTrigger: 'data-modal-close',
    disableScroll: true,
    disableFocus: false,
    awaitCloseAnimation: true,
    debugMode: true
  });

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


