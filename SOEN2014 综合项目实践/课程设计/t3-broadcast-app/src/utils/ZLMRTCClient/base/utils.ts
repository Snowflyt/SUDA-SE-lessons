export const isFirefox = () =>
  window.navigator.userAgent.match('Firefox') !== null;

export const isChrome = () =>
  window.navigator.userAgent.match('Chrome') !== null;

export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);

export const isEdge = () =>
  window.navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) !== null;

export const createUuid = () =>
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
