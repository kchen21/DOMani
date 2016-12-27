const DOMNodeCollection = require('./dom_node_collection');

const docReadyCallbacks = [];
let docReady = false;

// $l mimics jQuery's core function $

window.$l = (arg) => {
  if (typeof arg === 'string') { // i.e. if it is a CSS selector
    const nodeList = document.querySelectorAll(arg);
    const htmlElements = Array.apply(null, nodeList);
    return new DOMNodeCollection(htmlElements);
  } else if (arg instanceof HTMLElement) {
    const element = [arg];
    return new DOMNodeCollection(element);
  } else if (typeof arg === 'function') {
    if (docReady) {
      arg();
    } else {
      docReadyCallbacks.push(arg);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  docReadyCallbacks.forEach( (func) => {
    func();
  });
});
