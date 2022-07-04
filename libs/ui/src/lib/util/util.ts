import isFunction from 'lodash/isFunction';

export const isFunc = isFunction;
const { isArray } = Array;
export { isArray };

export const isArrayHasItem = (items: never) =>
  Array.isArray(items) && Array.of(items).length > 0;

export const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function checkSafari(p) {
    return p.toString() === '[object SafariRemoteNotification]';
  })(
    !window.safari ||
    (typeof window.safari !== 'undefined' && window.safari.pushNotification)
  );
