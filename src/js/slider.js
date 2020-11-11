//import Swiper, { Navigation, Pagination } from 'swiper';
import Swiper from 'swiper/swiper-bundle';

const mySwiper = new Swiper('.swiper-container-hero', {
  slidesPerView: 1,
  loop: true,
  speed: 700,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const mySwiperStyleReview = new Swiper('.swiper-container-style-review', {
  //slidesPerView: 2,
  loop: true,
  speed: 700,
  autoHeight: true,
  navigation: {
    nextEl: '.js-swiper-style-review-next',
    prevEl: '.js-swiper-style-review-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 12,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 42,
    },
  }
});

const mySwiperNews = new Swiper('.swiper-container-news', {
  loop: false,
  speed: 700,
  autoHeight: true,
  navigation: {
    nextEl: '.js-swiper-news-next',
    prevEl: '.js-swiper-news-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    1023: {
      slidesPerView: 2,
      spaceBetween: 42
    },
  }
});

const mySwiperFilterCards = new Swiper('.swiper-container-filter', {
  loop: false,
  watchSlidesVisibility: true,
  speed: 500,
  autoHeight: true,
  spaceBetween: 12,
  navigation: {
    nextEl: '.js-swiper-filter-next',
    prevEl: '.js-swiper-filter-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 4,
    },
    1280: {
      slidesPerView: 5,
    }
  }
})
window.addEventListener('resize', () => {
  mySwiperFilterCards.updateSlides()
});

// const sliders = mySwiperFilterCards.slides;
// window.addEventListener('resize', () => {

//   if (document.body.clientWidth >= 1280) {
//     mySwiperFilterCards.params.slidesPerView = 'auto';
//     for(let slide of sliders) {
//       slide.style.width = 238 + "px";
//       slide.style.height = 148 + "px";
//     }
//    }

//   if (document.body.clientWidth < 1280 && document.body.clientWidth > 767) {
//     mySwiperFilterCards.params.slidesPerView = 'auto';
//     for(let slide of sliders) {
//       slide.style.width = 176 + "px";
//       slide.style.height = 109 + "px";
//     }
//    }

//    if (document.body.clientWidth < 768) {
//     mySwiperFilterCards.params.slidesPerView = 1;
//     // for(let slide of sliders) {
//     //   slide.style.width = 80 + "%";
//     //   slide.style.height = 60 + "vw";
//     // }
//    }
   
// })
