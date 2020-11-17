import Swiper from 'swiper/swiper-bundle';

import {setHeight} from '../../js/scrollHeightAnim.js';
import {iconsCounter} from '../../js/iconsCounter.js'

import GLightbox from 'glightbox'

document.addEventListener('DOMContentLoaded', () => {
  // кликабельные иконки
  iconsCounter();

  //аккордион

  const animToggleBtn = document.querySelectorAll('.js-anim-toggle-btn');
  const animToggleBlock = document.querySelectorAll('.js-anim-toggle-block');

  for (let i = 0; i < animToggleBtn.length; i++) {
    setHeight(animToggleBtn[i], animToggleBlock[i]);
  }

  //слайдеры

  const mySwiperSimilarProducts = new Swiper('.swiper-container-similar-products', {
    loop: true,
    speed: 500,
    //slidesPerView: 4,
    // slidesPerView:'auto',
    autoHeight: true,
    // spaceBetween: 45,
    navigation: {
      nextEl: '.js-swiper-similar-next',
      prevEl: '.js-swiper-similar-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 7,
      },
      768: {
        slidesPerView:'auto',
        spaceBetween: 45,
      }
    }
  });
  
  const mySwiperThumbs = new Swiper('.swiper-container-thumbs', {
    slideToClickedSlide: true,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        direction: 'horizontal',
        spaceBetween: 15,
        slidesPerView: 5,
        centerInsufficientSlides: true,
      },
      767: {
        direction: 'vertical',
        slidesPerView: 6,
        centeredSlides: false,
        centerInsufficientSlides: false,
      }
    }
  });
  
  const mySwiperProduct = new Swiper('.swiper-container-product', {
    spaceBetween: 20,
    navigation: {
      nextEl: '.js-swiper-product-next',
      prevEl: '.js-swiper-product-prev',
    },
    thumbs: {
      swiper: mySwiperThumbs
    }
  });

  //лайтбокс

  const lightbox = GLightbox({
    selector: '.js-lightbox',
    touchNavigation: true,
    zoomable: false
  });

  // синхронизация лайтбокса со слайдером

  lightbox.on('slide_changed', () => {
    mySwiperProduct.slideTo(lightbox.getActiveSlideIndex());
  })
});