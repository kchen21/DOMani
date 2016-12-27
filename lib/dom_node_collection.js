class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(htmlString) {
    if (typeof htmlString === "string") {
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
        const htmlString = arg.outerHTML;
        el.insertAdjacentHTML('beforeend', htmlString);
      });
    } else if (typeof arg === "string") {
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
    if (typeof attrVal === "undefined") {
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
      const oldValuesString = el.className;

      const newValuesString = oldValuesString + " " + classVal;

      el.className = newValuesString;
    });

    return this.htmlElements;
  }

  removeClass(classVal) {
    this.htmlElements.forEach( (el) => {
      const oldValuesString = el.className;

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
}

module.exports = DOMNodeCollection;
