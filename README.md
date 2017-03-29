# DOMani

[DOMani Testing Page][gh-pages] - a simple HTML page that allows the user to test DOMani's capabilities using the examples here and more

[gh-pages]: https://kchen21.github.io/DOMani/

DOMani is a lightweight JavaScript DOM manipulation library. It consists of a core function, $l, and various methods for DOM manipulation and traversal.


## Core Function

DOMani has a core function `$l` that accepts one argument, which can either be a string, an instance of `HTMLElement`, or a function.

If the argument is a string of the following format: '<tag>innerHTML</tag>', then `$l` creates a new DOM element using it and returns a custom `DOMNodeCollection` object that holds that node for manipulation purposes. If the argument is string representing a CSS selector, `$l` returns a `DOMNodeCollection` object that holds the DOM nodes that match the selector. `DOMNodeCollection` is a class that has methods for manipulating and traversing the DOM nodes that its instances hold onto.

If `$l` receives an instance of `HTMLElement`, then it returns a `DOMNodeCollection` object that holds that node. If it receives a function, then one of two things can happen, depending on whether or not the `document` is ready (i.e. the HTML has finished rendering). If the `document` is ready, it will call the function. If not, it will add it to a growable array of functions to be invoked as callbacks when the `document` is ready.

`$l` has three methods: `extend`, `ajax`, and `ajax2`. `extend` receives two or more objects as arguments and merges them. Note: It mutates and returns the first argument.

```javascript
const objA = {a: 'apple', b: 'apple', c: 'apple'};
const objB = {b: 'banana', c: 'banana'};
const objC = {c: 'cherry'};
$l.extend(objA, objB, objC); //=> {a: 'apple', b: 'banana', c: 'cherry'}
objA //=> {a: 'apple', b: 'banana', c: 'cherry'}
```

`ajax` performs an asynchronous HTTP (Ajax) request. It can receive, as an argument, an options hash, which can have one or more of the following properties: `success`, `error`, `url`, `method`, `data`, `contentType`.

`ajax2` also performs an asynchronous HTTP (Ajax) request. However, unlike `ajax`, it returns a `Promise` object. Thus, the user does not need to define a success or error callback when making the request.

## DOMNodeCollection

The `DOMNodeCollection` class holds an array of DOM nodes (HTML elements) and has methods for DOM transversal and manipulation. It contains the following methods:

### DOM Manipulation Methods

`DOMNodeCollection` contains seven DOM manipulation methods that act on the nodes: `#html`, `#empty`, `#append`, `#remove`, `#attr`, `#addClass`, `#removeClass`, `#on`, and `#off`.

To demonstrate these methods, please consider the following snippet of HTML, which I will use as a foundation for manipulation in each example:

```html
<h2>Greetings</h2>
<div class="greetings-container">
  <div class="statement">Hello</div>
  <div class="statement">Hi</div>
</div>

<h2>More Greetings</h2>
<div class="greetings-container">
  <div class="question">How's are things?</div>
  <div class="question">What's new?</div>
</div>
```

#### #html

`#html` can receive an optional HTML string argument. If it receives an HTML string, it sets each node's inner HTML as the HTML. For example, the following code:

```javascript
$l('.greetings-container').html('<p>new innerHTML</p>');
```

creates the following change:

```html
<h2>Greetings</h2>
<div class="greetings-container">
  <p>new innerHTML</p>
</div>

<h2>More Greetings</h2>
<div class="greetings-container">
  <p>new innerHTML</p>
</div>
```

If `#html` doesn't receive an argument, it returns the inner HTML of the first node.

#### #empty

`#empty` clears out each node's inner HTML. For example, the following code:

```javascript
$l('.greetings-container').empty();
```

creates the following change:

```html
<h2>Greetings</h2>
<div class="greetings-container"></div>

<h2>More Greetings</h2>
<div class="greetings-container"></div>
```

#### #append

`#append` receives one argument, which can either be an instance of `HTMLElement`, an HTML string, or an instance of `DOMNodeCollection`.
If it receives an instance of HTMLElement or an HTML string, it adds the HTML to each node's current inner HTML. If it receives an instance of DOMNodeCollection, `#append` adds each node of that instance to each node of the instance that it is being called on, and removes the original argument's nodes using `#remove`, which will be explained later on. For example, the following code:

```javascript
$l('.greetings-container').append($l('h2'));
```

creates the following change:

```html
<div class="greetings-container">
  <div class="statement">Hello</div>
  <div class="statement">Hi</div>
  <h2>Greetings</h2>
  <h2>More Greetings</h2>
</div>

<div class="greetings-container">
  <div class="question">How's are things?</div>
  <div class="question">What's new?</div>
  <h2>Greetings</h2>
  <h2>More Greetings</h2>
</div>
```

#### #remove

`#remove` removes the HTML of each node from the DOM, and also removes all nodes from the array. For example, the following code:

```javascript
$l('h2').remove();
```

creates the following change:

```html
<div class="greetings-container">
  <div class="statement">Hello</div>
  <div class="statement">Hi</div>
</div>

<div class="greetings-container">
  <div class="question">How's are things?</div>
  <div class="question">What's new?</div>
</div>
```

#### #attr

`#attr` can either set or get an attribute. It must receive one argument, but can receive up to two. If it receives one argument, the argument itself is interpreted as an attribute name, and `#attr` will find its corresponding value in the first node. If it receives two, the first argument is interpreted as an attribute name and the second is interpreted as its corresponding value, and `#attr` sets the name-value pair as an attribute of each node's HTML. For example, the following code:

```javascript
$l('.statement').attr('length', 'short');
```

creates the following change:

```html
<h2>Greetings</h2>
<div class="greetings-container">
  <div class="statement" length="short">Hello</div>
  <div class="statement" length="short">Hi</div>
</div>

<h2>More Greetings</h2>
<div class="greetings-container">
  <div class="question">How's are things?</div>
  <div class="question">What's new?</div>
</div>
```

#### #addClass

`#addClass`receives a string argument which it interprets as a class value. It sets the class of each node's HTML to the given value if no class exists and adds the given value to its current class value if it does. For example, the following code:

```javascript
$l('.statement').addClass('basic');
```

creates the following change:

```html
<h2>Greetings</h2>
<div class="greetings-container">
  <div class="statement basic" length="short">Hello</div>
  <div class="statement basic" length="short">Hi</div>
</div>

<h2>More Greetings</h2>
<div class="greetings-container">
  <div class="question">How's are things?</div>
  <div class="question">What's new?</div>
</div>
```

#### #removeClass

`#removeClass` receives a string argument which it interprets as a class value. For each node, it removes the given value from the set of class values for that element. For example, the following code:

```javascript
$l('.greetings-container > div').removeClass('question');
```

creates the following change:

```html
<h2>Greetings</h2>
<div class="greetings-container">
  <div class="statement">Hello</div>
  <div class="statement">Hi</div>
</div>

<h2>More Greetings</h2>
<div class="greetings-container">
  <div class>How's are things?</div>
  <div class>What's new?</div>
</div>
```

#### #on

`#on` adds an event handler to each node's HTML. It receives two arguments: a string and a function. The string represents an event type such as 'click' while the function represents the listener that will correspond to it. For example, the following code:

```javascript
const questionClicked = () => {
  alert('You\'ve clicked on a question!');
};

$l('.question').on('click', questionClicked);
```

adds an event handler to all nodes that have a class value of 'question'. The page will now show an alert containing "You've clicked on a question!" if either "How are things?" or "What's new?" is clicked.

#### #off

`#off` receives one argument: a string representing an event type. For each node, if there happens to be an event listener for that event type at the moment, it will remove that event listener from the node's HTML. To demonstrate, assume that I have added the event handler in the example for `#on`. I can now remove that event handler using `#off` like so:

```javascript
$l('.question').off('click');
```

### DOM Transversal Methods

DOMNodeCollection contains methods that don't change the DOM, but traverse through it and return new instances of DOMNodeCollection that hold new DOM nodes. There are three of them in total: `#children`, `#parent`, and `#find`.

To demonstrate these methods, please consider the following snippet of HTML, which I will use as a foundation for traversal in each example:

```html
<h2>Greetings</h2>
<div class="greetings-container">
  <div class="statement">Hello</div>
  <div class="statement">Hi</div>
</div>

<h2>More Greetings</h2>
<div class="greetings-container">
  <div class="question">How's are things?</div>
  <div class="question">What's new?</div>
</div>
```

#### #children

`#children` returns an instance of DOMNodeCollection that holds all children of all DOM nodes of the DOMNodeCollection object it is being called on. For example, the following code:

```javascript
$l('.greetings-container').children();
```

returns an instance of DOMNodeCollection that has an array consisting of four DOM nodes corresponding to:

```html
<div class="statement">Hello</div>
<div class="statement">Hi</div>
<div class="question">How's are things?</div>
<div class="question">What's new?</div>
```

#### #parent

`#parent` returns an instance of DOMNodeCollection that holds all parents of all DOM nodes of the DOMNodeCollection it is being called on. For example, the following code:

```javascript
$l('.statement').parent();
```
returns an instance of DOMNodeCollection that has an array consisting of one DOM node corresponding to:

```html
<div class="greetings-container"></div>
```

#### #find

`#find` receives one string argument, which it interprets as a CSS selector, and returns an instance of DOMNodeCollection that holds all descendants that match the CSS selector, from the set of all DOM nodes of the DOMNodeCollection it is being called on. For example, the following code:

```javascript
$l('.greetings-container').find('.question');
```

returns an instance of DOMNodeCollection that has an array consisting of two DOM nodes corresponding to:

```html
<div class="question">How's are things?</div>
<div class="question">What's new?</div>
```
