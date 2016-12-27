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

  }
}

module.exports = DOMNodeCollection;
