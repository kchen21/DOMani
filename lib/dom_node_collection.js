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
      arg.remove(); // to be defined; will remove each element of arg.htmlElements from the page

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
}

module.exports = DOMNodeCollection;
