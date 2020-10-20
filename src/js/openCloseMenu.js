export const openCloseMenu = (openBtn, menu, closeBtn) => {
  openBtn.addEventListener('click', () => menu.classList.toggle('is-open'));
  if (closeBtn) {
    closeBtn.addEventListener('click', () => menu.classList.remove('is-open'));
  }

  window.addEventListener('click', (e) => {
    if (menu.classList.contains('is-open') && !menu.contains(e.target) && !openBtn.contains(e.target)) {
  	  menu.classList.remove('is-open');
    }
})
}