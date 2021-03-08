import * as gFunc from './_functions';
import * as gVal from './_settings';
import * as device from './_detectDevice';
const $ = require('jQuery');

function hamMenu() {
  $(window).on('load', function() {
    const open = 'open';
    const $nav = $('header nav');
    const eventType = (device.detectDevice() == 'pc') ? 'click' : 'touchstart';
    $nav.find('.navBtn').on(eventType, function() {
      if ($nav.hasClass(open)) {
        $nav.removeClass(open);
        $accordion.css('height', '0px');
      } else {
        $nav.addClass(open);
      }
    });
    $nav.find('a').on(eventType, function() {
      $nav.removeClass(open);
    });
  });
}

export default hamMenu;