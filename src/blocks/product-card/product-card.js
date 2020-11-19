import Swiper from 'swiper/swiper-bundle';
import {setHeight} from '../../js/scrollHeightAnim.js';
import GLightbox from 'glightbox';
import Imagesloaded from 'imagesloaded';

document.addEventListener('DOMContentLoaded', () => {

  // в избранном / ое

  const setFavortext = () => {
    const favorText = document.querySelector('.product-card__favorites.js-icon');
    const favorSpan = document.querySelector('.product-card__favorites-text');
    favorText.addEventListener('click', () => {
      if (favorText.classList.contains('is-active')) {
        favorSpan.innerHTML = favorText.getAttribute('data-active');
      } else {
        favorSpan.innerHTML = favorText.getAttribute('data-default');
      }
    });
  }
  setFavortext();

  //аккордион

  const animToggleBtn = document.querySelectorAll('.js-anim-toggle-btn');
  const animToggleBlock = document.querySelectorAll('.js-anim-toggle-block');

  for (let i = 0; i < animToggleBtn.length; i++) {
    setHeight(animToggleBtn[i], animToggleBlock[i]);
  }

  //слайдеры

  const mySwiperSimilarProducts = new Swiper('.swiper-container-similar-products', {
    loop: false,
    speed: 500,
    navigation: {
      nextEl: '.js-swiper-similar-next',
      prevEl: '.js-swiper-similar-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 7,
        centeredSlides: false,
      },
      768: {
        slidesPerGroup: 2,
        slidesPerView: 'auto',
        spaceBetween: 45,
        centeredSlides: true,
      },
      1280: {
        spaceBetween: 45,
        centeredSlides: false,
        slidesPerGroup: 2,
        slidesPerView: 4,
      }

    }
  });

  // адаптивная высота

  const getSliderHeight = () => {
    const similarCards = document.querySelectorAll('.similar-products__card');
    let similarSlideHeight = 0;
    for (let i = 0; i < similarCards.length; i++) {
      if (similarCards[i].offsetHeight > similarSlideHeight) {
        similarSlideHeight = similarCards[i].offsetHeight;
      }
    }
    document.querySelector('.swiper-container-similar-products').style.height = similarSlideHeight + "px";
  }

  const similarSliderReload = new Imagesloaded('swiper-container-similar-products', () => {
    getSliderHeight();
  });

  window.addEventListener('resize', getSliderHeight);

  const mySwiperThumbs = new Swiper('.swiper-container-thumbs', {
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        direction: 'horizontal',
        allowTouchMove: true,
        spaceBetween: 15,
        slidesPerView: 4,
        centerInsufficientSlides: true,
      },
      767: {
        allowTouchMove: false,
        freeMode: true,
        slideToClickedSlide: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        autoHeight: true,
        centeredSlides: false,
        centerInsufficientSlides: false,
      }
    }
  });
  
  const mySwiperProduct = new Swiper('.swiper-container-product', {
    loop: true,
    spaceBetween: 20,
    //loopedSlides: 4,
    autoHeight: true,
    navigation: {
      nextEl: '.js-swiper-product-next',
      prevEl: '.js-swiper-product-prev',
    },
    thumbs: {
      swiper: mySwiperThumbs
    }
  });

  // function next() {
  //   if (data[mySwiperProduct.realIndex + 1]) {
  //     mySwiperProduct.slideNext(500)
  //   } else {
  //     mySwiperProduct.slideToLoop(0)
  //   }
  // }
  
  // function prev() {
  //   if (data[mySwiperProduct.realIndex - 1]) {
  //     mySwiperProduct.slidePrev(500)
  //   } else {
  //     mySwiperProduct.slideToLoop(data.length - 1)
  //   }
  // }

  // next();
  // prev();
  // mySwiperProduct.on('init', () => {
  //   if (mySwiperProduct.originalParams.loop && mySwiperProduct.loopedSlides < mySwiperProduct.originalParams.slidesPerView) {
  //     mySwiperProduct.params.slidesPerView = mySwiperProduct.loopedSlides;
  //     mySwiperProduct.destroy(false, false);
  //     mySwiperProduct.init();
  //     }
  // })
  
  mySwiperProduct.on('resize', function () {
    mySwiperThumbs.update();
  });
  
  //лайтбокс

  const lightbox = GLightbox({
    selector: '.js-lightbox',
    touchNavigation: true,
    zoomable: false,
    touchFollowAxis: true,
    loop: true,
    dragToleranceY: 1000,
    dragToleranceX: 20,
  });
  lightbox.removeSlide(4);
  lightbox.removeSlide(0);
  
  // синхронизация лайтбокса со слайдером

  lightbox.on('slide_changed', () => {
    mySwiperProduct.slideTo(lightbox.getActiveSlideIndex() + 1);
  })
});

