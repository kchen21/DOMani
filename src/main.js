const DOMNodeCollection = require('./dom_node_collection');

const docReadyCallbacks = [];
let docReady = false;

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

window.$l.extend = (baseObj, ...objs) => {
  objs.forEach( (obj) => {
    for (let key in obj) {
      baseObj[key] = obj[key];
    }
  });

  return baseObj;
};

window.$l.ajax = (options) => {
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

// window.$l.ajax2 returns a promise

window.$l.ajax2 = (options) => {
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
