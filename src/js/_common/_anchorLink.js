import * as gFunc from './_functions';
import * as gVal from './_settings';
import * as device from './_detectDevice';
import smoothScroll from './_smoothScroll';

function anchorLink() {
  const eventType = (device.detectDevice() == 'pc') ? 'click' : 'touchstart';
  const node = document.querySelectorAll('a[href^="#"]');
  if (node) {
    for (let i=0; i<node.length; i++) {
      node[i].addEventListener(eventType, function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        smoothScroll(target, 300, 0);
      });
    }
  }
}

export default anchorLink;