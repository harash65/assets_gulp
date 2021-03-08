import * as gFunc from './_functions';
import * as gVal from './_settings';
import Swiper from '../../libs/swiper/swiper.min';

function swiperUtil() {
  var mySwiper = new Swiper('.swiper-container', {
    speed: 500,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

export default swiperUtil;