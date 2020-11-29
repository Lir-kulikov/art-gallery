export const scrollHeightAnim = (elem) => {
  if (elem.classList.contains('is-open')) {
    elem.style.maxHeight = elem.scrollHeight + 'px';
  } else {
    elem.style.maxHeight = 0;
  }
}

export const setHeight = (showBtn, elBlock) => {
  elBlock.style.height = 0 + 'px';
  if (elBlock.style.height !== "0px") {
    showBtn.classList.add('is-open');
    elBlock.classList.add('is-open');
  }
  showBtn.addEventListener("click", () => {
    if (elBlock.style.height === "0px" || !elBlock.style.height === "0px") {
      elBlock.style.height = `${ elBlock.scrollHeight }px`
      showBtn.classList.add('is-open');
      elBlock.classList.add('is-open');
    } else {
      elBlock.style.height = `${ elBlock.scrollHeight }px`;
      window.getComputedStyle(elBlock, null).getPropertyValue("height");
      elBlock.style.height = "0px";
      showBtn.classList.remove('is-open');
      elBlock.classList.remove('is-open');
    }
  });

  elBlock.addEventListener("transitionend", () => {
    if (elBlock.style.height !== "0px") {
      elBlock.style.height = "auto"
    }
  });
}