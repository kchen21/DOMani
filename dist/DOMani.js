/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _helper_methods = __webpack_require__(2);
	
	var HelperMethods = _interopRequireWildcard(_helper_methods);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var DOMNodeCollection = __webpack_require__(1);
	
	
	var docReadyCallbacks = [];
	var docReady = false;
	
	var $l = function $l(arg) {
	  if (typeof arg === 'string') {
	    if (HelperMethods.forCreatingElement(arg)) {
	      var tag = HelperMethods.parseTag(arg);
	      var innerHTML = HelperMethods.parseInnerHTML(arg, tag.length);
	      var newHTMLElement = document.createElement(tag);
	      newHTMLElement.innerHTML = innerHTML;
	      return new DOMNodeCollection([newHTMLElement]);
	    } else {
	      // i.e. if it is a CSS selector
	      var nodeList = document.querySelectorAll(arg);
	      var htmlElements = Array.apply(null, nodeList);
	      return new DOMNodeCollection(htmlElements);
	    }
	  } else if (arg instanceof HTMLElement) {
	    var element = [arg];
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
	
	document.addEventListener('DOMContentLoaded', function () {
	  docReady = true;
	  docReadyCallbacks.forEach(function (func) {
	    func();
	  });
	});
	
	$l.extend = function (baseObj) {
	  for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    objs[_key - 1] = arguments[_key];
	  }
	
	  objs.forEach(function (obj) {
	    for (var key in obj) {
	      baseObj[key] = obj[key];
	    }
	  });
	
	  return baseObj;
	};
	
	$l.ajax = function (options) {
	  if (typeof options === 'undefined') {
	    options = {};
	  }
	
	  var defaults = {
	    success: function success() {},
	    error: function error() {},
	    url: "",
	    method: 'GET',
	    data: {},
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	  };
	
	  options = window.$l.extend(defaults, options);
	
	  var xhr = new XMLHttpRequest();
	
	  xhr.open(options.method, options.url);
	
	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      options.success(xhr.response);
	    } else {
	      options.error(xhr.response);
	    }
	  };
	
	  xhr.send(options.data);
	};
	
	// $l.ajax2 returns a promise
	
	$l.ajax2 = function (options) {
	  if (typeof options === 'undefined') {
	    options = {};
	  }
	
	  var defaults = {
	    url: "",
	    method: 'GET',
	    data: {},
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	  };
	
	  options = window.$l.extend(defaults, options);
	
	  return new Promise(function (success, error) {
	    var xhr = new XMLHttpRequest();
	
	    xhr.open(options.method, options.url);
	
	    xhr.onload = function () {
	      if (xhr.status === 200) {
	        success(xhr.response);
	      } else {
	        error(xhr.response);
	      }
	    };
	
	    xhr.send(options.data);
	  });
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DOMNodeCollection = function () {
	  function DOMNodeCollection(htmlElements) {
	    _classCallCheck(this, DOMNodeCollection);
	
	    this.htmlElements = htmlElements;
	  }
	
	  _createClass(DOMNodeCollection, [{
	    key: 'html',
	    value: function html(htmlString) {
	      if (typeof htmlString === 'string') {
	        this.htmlElements.forEach(function (el) {
	          el.innerHTML = htmlString;
	        });
	        return this.htmlElements;
	      } else {
	        return this.htmlElements[0].innerHTML;
	      }
	    }
	  }, {
	    key: 'empty',
	    value: function empty() {
	      this.htmlElements.forEach(function (el) {
	        el.innerHTML = "";
	      });
	      return this.htmlElements;
	    }
	  }, {
	    key: 'append',
	    value: function append(arg) {
	      var _this = this;
	
	      if (arg instanceof HTMLElement) {
	        this.htmlElements.forEach(function (el) {
	          var htmlString = arg.outerHTML;
	          el.insertAdjacentHTML('beforeend', htmlString);
	        });
	      } else if (typeof arg === 'string') {
	        this.htmlElements.forEach(function (el) {
	          el.insertAdjacentHTML('beforeend', arg);
	        });
	      } else if (arg instanceof DOMNodeCollection) {
	        (function () {
	          var argHTMLElements = arg.htmlElements;
	          arg.remove();
	
	          _this.htmlElements.forEach(function (el) {
	            argHTMLElements.forEach(function (argEl) {
	              var htmlString = argEl.outerHTML;
	              el.insertAdjacentHTML('beforeend', htmlString);
	            });
	          });
	        })();
	      }
	
	      return this.htmlElements;
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.htmlElements.forEach(function (el) {
	        if (el.parentNode) {
	          el.parentNode.removeChild(el);
	        }
	      });
	
	      var removedElements = this.htmlElements;
	      this.htmlElements = [];
	      return removedElements;
	    }
	  }, {
	    key: 'attr',
	    value: function attr(attrName, attrVal) {
	      if (typeof attrVal === 'undefined') {
	        return this.htmlElements[0].getAttribute(attrName);
	      } else {
	        this.htmlElements.forEach(function (el) {
	          el.setAttribute(attrName, attrVal);
	        });
	
	        return this.htmlElements;
	      }
	    }
	  }, {
	    key: 'addClass',
	    value: function addClass(classVal) {
	      this.htmlElements.forEach(function (el) {
	        var oldValuesString = el.className || "";
	
	        var newValuesString = oldValuesString + " " + classVal;
	
	        el.className = newValuesString;
	      });
	
	      return this.htmlElements;
	    }
	  }, {
	    key: 'removeClass',
	    value: function removeClass(classVal) {
	      this.htmlElements.forEach(function (el) {
	        var oldValuesString = el.className || "";
	
	        var values = oldValuesString.split(" ");
	
	        if (values.includes(classVal)) {
	          var classValIndex = values.indexOf(classVal);
	          values.splice(classValIndex, 1);
	          var newValuesString = values.join(" ");
	          el.className = newValuesString;
	        }
	      });
	
	      return this.htmlElements;
	    }
	  }, {
	    key: 'children',
	    value: function children() {
	      var children = [];
	
	      this.htmlElements.forEach(function (el) {
	        var elChildren = Array.apply(null, el.children);
	        children = children.concat(elChildren);
	      });
	
	      return new DOMNodeCollection(children);
	    }
	  }, {
	    key: 'parent',
	    value: function parent() {
	      var parents = [];
	
	      this.htmlElements.forEach(function (el) {
	        var elParent = el.parentElement;
	
	        if (parents.indexOf(elParent) === -1) {
	          parents.push(elParent);
	        }
	      });
	
	      return new DOMNodeCollection(parents);
	    }
	  }, {
	    key: 'find',
	    value: function find(selector) {
	      var descendants = [];
	
	      this.htmlElements.forEach(function (el) {
	        var elDescendants = Array.apply(null, el.querySelectorAll(selector));
	        descendants = descendants.concat(elDescendants);
	      });
	
	      return new DOMNodeCollection(descendants);
	    }
	  }, {
	    key: 'on',
	    value: function on(type, listener) {
	      this.htmlElements.forEach(function (el) {
	        el.addEventListener(type, listener);
	        el[type + 'Handler'] = listener;
	      });
	
	      return this.htmlElements;
	    }
	  }, {
	    key: 'off',
	    value: function off(type) {
	      this.htmlElements.forEach(function (el) {
	        el.removeEventListener(type, el[type + 'Handler']);
	        delete el[type + 'Handler'];
	      });
	
	      return this.htmlElements;
	    }
	  }]);
	
	  return DOMNodeCollection;
	}();
	
	module.exports = DOMNodeCollection;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var forCreatingElement = exports.forCreatingElement = function forCreatingElement(str) {
	  return str[0] === "<" && str.slice(-1) === ">";
	};
	
	var parseTag = exports.parseTag = function parseTag(str) {
	  var tag = "";
	
	  for (var i = 1; i < str.length; i++) {
	    if (str[i] === ">") {
	      break;
	    } else {
	      tag += str[i];
	    }
	  }
	
	  return tag;
	};
	
	var parseInnerHTML = exports.parseInnerHTML = function parseInnerHTML(str, tagLength) {
	  return str.slice(tagLength + 2, str.length - tagLength - 3);
	};

/***/ }
/******/ ]);
//# sourceMappingURL=DOMani.js.map