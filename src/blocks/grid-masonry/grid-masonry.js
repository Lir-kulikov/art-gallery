import Masonry from 'masonry-layout'
import Imagesloaded from 'imagesloaded'

const jsGalleryFixed = document.querySelector('.js-gallery-fixed');
if (jsGalleryFixed) {
  const gridFixed = new Masonry('.js-gallery-fixed', {
    itemSelector: '.js-grid-item',
    columnWidth: '.js-sizer',
    gutter: '.js-gutter',
    horizontalOrder: true,
    stamp: '.grid-masonry__item-fixed-card',
    percentPosition: true
  });
  
  document.addEventListener("resize", function() {
      gridFixed.reloadItems()
      gridFixed.layout()
  });
  
  const masonryReload = new Imagesloaded('.js-gallery', () => {
    gridFixed.reloadItems()
    gridFixed.layout()
  });
}


const jsGallery = document.querySelector('.js-gallery');
if (jsGallery) {
  const grid = new Masonry(jsGallery, {
    itemSelector: '.js-grid-item',
    columnWidth: '.js-sizer',
    gutter: '.js-gutter',
    horizontalOrder: true,
    percentPosition: true
  })

  document.addEventListener("resize", function() {
    grid.reloadItems()
    grid.layout()
});

const masonryReload = new Imagesloaded('.js-gallery', () => {
  grid.reloadItems()
  grid.layout()
});
}


