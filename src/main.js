const DOMNodeCollection = require('./dom_node_collection');
import * as HelperMethods from './helper_methods';

const docReadyCallbacks = [];
let docReady = false;

const $l = (arg) => {
  if (typeof arg === 'string') {
    if (HelperMethods.forCreatingElement(arg)) {
      const tag = HelperMethods.parseTag(arg);
      const innerHTML = HelperMethods.parseInnerHTML(arg, tag.length);
      const newHTMLElement = document.createElement(tag);
      newHTMLElement.innerHTML = innerHTML;
      return new DOMNodeCollection([newHTMLElement]);
    } else {
      // i.e. if it is a CSS selector
      const nodeList = document.querySelectorAll(arg);
      const htmlElements = Array.apply(null, nodeList);
      return new DOMNodeCollection(htmlElements);
    }
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

window.$l = $l;

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  docReadyCallbacks.forEach( (func) => {
    func();
  });
});

$l.extend = (baseObj, ...objs) => {
  objs.forEach( (obj) => {
    for (let key in obj) {
      baseObj[key] = obj[key];
    }
  });

  return baseObj;
};

$l.ajax = (options) => {
  if (typeof options === 'undefined') {
    options = {};
  }

  const defaults = {
    success: () => {},
    error: () => {},
    url: "",
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = window.$l.extend(defaults, options);

  const xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url);

  xhr.onload = () => {
    if (xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  };

  xhr.send(options.data);
};

// $l.ajax2 returns a promise

$l.ajax2 = (options) => {
  if (typeof options === 'undefined') {
    options = {};
  }

  const defaults = {
    url: "",
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = window.$l.extend(defaults, options);

  return new Promise(function (success, error) {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url);

    xhr.onload = () => {
      if (xhr.status === 200) {
        success(xhr.response);
      } else {
        error(xhr.response);
      }
    };

    xhr.send(options.data);
  });
};
