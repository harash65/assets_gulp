var $ = require('jQuery');

function smoothScroll(target, transition=500, margin=100) {
  if (target) {
    if (!Array.isArray(target)) {
      const $target = $(target);
      const targetY = $target.offset().top;
      $("html, body").animate({scrollTop: targetY - margin}, transition, "swing");
    }
  } else {
    return false;
  }
}

export default smoothScroll;