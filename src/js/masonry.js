import Masonry from 'masonry-layout'
import Imagesloaded from 'imagesloaded'

if (document.querySelector('.js-gallery')) {
  const newWorksGrid = new Masonry('.js-gallery', {
    itemSelector: '.new-works__grid-item',
    columnWidth: '.js-sizer',
    gutter: '.js-gutter',
    horizontalOrder: true,
    stamp: '.new-works__grid-item-fixed-card',
    percentPosition: true
  });
  
  document.addEventListener("resize", function() {
      newWorksGrid.reloadItems()
      newWorksGrid.layout()
  });
  
  const masonryReload = new Imagesloaded('.js-gallery', () => {
    newWorksGrid.reloadItems()
    newWorksGrid.layout()
  });
}
