export const scrollHeightAnim = (elem) => {
  if (elem.classList.contains('is-open')) {
    elem.style.maxHeight = elem.scrollHeight + 'px';
  } else {
    elem.style.maxHeight = 0;
  }
}

export const setHeight = (showBtn, elBlock) => {
  elBlock.style.height = "0px";
  showBtn.addEventListener("click", () => {
    if (elBlock.style.height === "0px") {
      elBlock.style.height = `${ elBlock.scrollHeight }px`
    } else {
      elBlock.style.height = `${ elBlock.scrollHeight }px`;
        window.getComputedStyle(elBlock, null).getPropertyValue("height");
        elBlock.style.height = "0";
    }

    elBlock.addEventListener("transitionend", () => {
      if (elBlock.style.height !== "0px") {
          elBlock.style.height = "auto"
      }
  });
});
}