class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(htmlString) {
    if (typeof htmlString === 'string') {
      this.htmlElements.forEach( (el) => {
        el.innerHTML = htmlString;
      });
      return this.htmlElements;
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.htmlElements.forEach( (el) => {
      el.innerHTML = "";
    });
    return this.htmlElements;
  }

  append(arg) {
    if (arg instanceof HTMLElement) {
      this.htmlElements.forEach( (el) => {
        let htmlString = arg.outerHTML;
        el.insertAdjacentHTML('beforeend', htmlString);
      });
    } else if (typeof arg === 'string') {
      this.htmlElements.forEach( (el) => {
        el.insertAdjacentHTML('beforeend', arg);
      });
    } else if (arg instanceof DOMNodeCollection) {
      const argHTMLElements = arg.htmlElements;
      arg.remove();

      this.htmlElements.forEach( (el) => {
        argHTMLElements.forEach( (argEl) => {
          let htmlString = argEl.outerHTML;
          el.insertAdjacentHTML('beforeend', htmlString);
        });
      });
    }

    return this.htmlElements;
  }

  remove() {
    this.htmlElements.forEach( (el) => {
      el.parentNode.removeChild(el);
    });

    const removedElements = this.htmlElements;
    this.htmlElements = [];
    return removedElements;
  }

  attr(attrName, attrVal) {
    if (typeof attrVal === 'undefined') {
      return this.htmlElements[0].getAttribute(attrName);
    } else {
      this.htmlElements.forEach( (el) => {
        el.setAttribute(attrName, attrVal);
      });

      return this.htmlElements;
    }
  }

  addClass(classVal) {
    this.htmlElements.forEach( (el) => {
      const oldValuesString = el.className || "";

      const newValuesString = oldValuesString + " " + classVal;

      el.className = newValuesString;
    });

    return this.htmlElements;
  }

  removeClass(classVal) {
    this.htmlElements.forEach( (el) => {
      const oldValuesString = el.className || "";

      let values = oldValuesString.split(" ");

      if (values.includes(classVal)) {
        let classValIndex = values.indexOf(classVal);
        values.splice(classValIndex, 1);
        let newValuesString = values.join(" ");
        el.className = newValuesString;
      }
    });

    return this.htmlElements;
  }

  children() {
    let children = [];

    this.htmlElements.forEach( (el) => {
      let elChildren = Array.apply(null, el.children);
      children = children.concat(elChildren);
    });

    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];

    this.htmlElements.forEach( (el) => {
      let elParent = el.parentElement;

      if (parents.indexOf(elParent) === -1) {
        parents.push(elParent);
      }
    });

    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let descendants = [];

    this.htmlElements.forEach( (el) => {
      let elDescendants = Array.apply( null, el.querySelectorAll(selector));
      descendants = descendants.concat(elDescendants);
    });

    return new DOMNodeCollection(descendants);
  }

  on(type, listener) {
    this.htmlElements.forEach( (el) => {
      el.addEventListener(type, listener);
      el[`${type}Handler`] = listener;
    });

    return this.htmlElements;
  }

  off(type) {
    this.htmlElements.forEach( (el) => {
      el.removeEventListener(type, el[`${type}Handler`]);
      delete el[`${type}Handler`];
    });

    return this.htmlElements;
  }
}

module.exports = DOMNodeCollection;
