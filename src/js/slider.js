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
  slidesPerView: 2,
  loop: false,
  spaceBetween: 42,
  speed: 700,
  autoHeight: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const mySwiperNews = new Swiper('.swiper-container-news', {
  slidesPerView: 2,
  loop: false,
  spaceBetween: 42,
  speed: 700,
  autoHeight: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});