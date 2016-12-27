const DOMNodeCollection = require('./dom_node_collection');

// $l mimics jQuery's core function $

window.$l = (arg) => {
  if (typeof arg === 'string') { // i.e. if it is a CSS selector
    const nodeList = document.querySelectorAll(arg);
    const htmlElements = Array.apply(null, nodeList);
    return new DOMNodeCollection(htmlElements);
  } else if (arg instanceof HTMLElement) {
    const element = [arg];
    return DOMNodeCollection(element);
  }
};
