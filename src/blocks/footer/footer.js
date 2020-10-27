
const dataMobile = document.querySelector('[data-mobile-text]');
const dataMobileText = dataMobile.innerHTML;
const dataMobileValue = dataMobile.getAttribute('data-mobile-text')

const attrTextChanger = () => {
  if (window.innerWidth < 768) {
    dataMobile.innerHTML = dataMobileValue;
  } else {
    dataMobile.innerHTML = dataMobileText;
  }
}

window.addEventListener('resize', () => {
  attrTextChanger()
})

window.addEventListener('DOMContentLoaded', () => {
  attrTextChanger()
})

