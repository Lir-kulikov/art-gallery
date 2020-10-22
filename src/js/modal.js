import MicroModal from 'micromodal'
MicroModal.init({
  // onShow: modal => console.info(`${modal.id} is shown`), // [1]
  // onClose: modal => console.info(`${modal.id} is hidden`), // [2]
  openTrigger: 'data-modal-open',
  closeTrigger: 'data-modal-close',
  disableScroll: true,
  disableFocus: false,
  awaitCloseAnimation: true,
  debugMode: true
});

const stopVideoModal = () => {

  const video = document.querySelector('.youtube-video');
  const openModal = document.querySelector('[data-modal-open]');
  const closeModal = document.querySelectorAll('[data-modal-close]');
  
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

stopVideoModal();

