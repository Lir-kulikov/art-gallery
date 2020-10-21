import Masonry from 'masonry-layout'

const newWorksGrid = new Masonry('.js-gallery', {
  // options
  itemSelector: '.new-works__grid-item',
  columnWidth: '.js-sizer',
  gutter: '.js-gutter',
  horizontalOrder: true,
  stamp: '.new-works__grid-item-fixed-card',
  percentPosition: true
});

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() => {
    newWorksGrid.reloadItems()
    newWorksGrid.layout()
  }, 500)
});

document.addEventListener("resize", function() {
    newWorksGrid.reloadItems()
    newWorksGrid.layout()
});