const iconsCounter = () => {
  const icons = document.querySelectorAll('.js-icon')
  if (icons) {
    for (let icon of icons) {
      icon.addEventListener('click', () => {
        console.log(icon);
        icon.classList.toggle('is-active');
      });
    }
  }
}

iconsCounter();