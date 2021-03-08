import * as gFunc from './_functions';
import * as gVal from './_settings';

export function detectDevice() {
  const ua = navigator.userAgent;
  if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
    return 'sp';
  }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
    return 'tb';
  }else{
    return 'pc';
  }
}
export function detectDeviceFromWidth() {
  const windowW = window.innerWidth;
  if (windowW < 415) {
    return 'sp';
  } else if (windowW < 769) {
    return 'tb';
  } else {
    return 'pc';
  }
}
