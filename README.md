# DOMani

DOMani is a lightweight JavaScript DOM manipulation library.

## Core Function

DOMani has a core function `$l`, which accepts one argument, which can either be a CSS selector, an instance of `HTMLElement`, or a function. If the argument is a CSS selector, it returns an custom `DOMNodeCollection` object that holds the DOM nodes that match the selector. `DOMNodeCollection` is a class that holds DOM nodes in general and has methods for DOM transversal and manipulation.

If `$l` receives an instance of `HTMLElement`, then it returns a `DOMNodeCollection` object that holds that node. If it receives a function, then one of two things can happen, depending on whether or not the `document` is ready (i.e. the HTML has finished rendering). If the `document` is ready, it will call the function. If not, it will add it to a growable array of functions to be invoked as callbacks when the `document` is ready.

$l has three methods: `extend`, `ajax`, and `ajax2`. `extend` receives two or more objects as arguments and merges them. Note: It mutates and returns the first argument.

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

`DOMNodeCollection` contains seven DOM manipulation methods that act on the nodes: `html`, `empty`, `append`, `remove`, `attr`, `addClass`, and `removeClass`.

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

`html` can receive an optional HTML string argument. If it receives an HTML string, it sets each node's inner HTML as the HTML. For example, the following code:

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

If `html` doesn't receive an argument, it returns the inner HTML of the first node.

#### #empty

`empty` clears out each node's inner HTML. For example, the following code:

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

`append` receives one argument, which can either be an instance of `HTMLElement`, an HTML string, or an instance of `DOMNodeCollection`.
If it receives an instance of HTMLElement or an HTML string, it adds the HTML to each node's current inner HTML. If it receives an instance of DOMNodeCollection, `append` adds each node of that instance to each node of the instance that it is being called on, and removes the original argument's nodes using `remove`, which will be explained later on. For example, the following code:

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

`remove` removes the HTML of each node from the DOM, and also removes all nodes from the array. For example, the following code:

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
