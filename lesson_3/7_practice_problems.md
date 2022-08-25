# 1.
The code will output:
```
NaN
NaN
```
When `RECTANGLE.area()` and `RECTANGLE.perimeter()` get invoked on line 13 and 14 respectively, the context of `this` within both functions is implicitly set to `RECTANGLE`, the calling object. Since `RECTANGLE` does not have `width` or `height` properties, nor are those properties presumably present in `RECTANGLE`'s prototype chain, both `this.width` and `this.height` evaluate to `undefined`. The operations performed on `undefined` values in both the `RECTANGLE.area()` and `RECTANGLE.perimeter()` return `NaN`, hence the output.

# 2.
```js
let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);
```

# 3.
```js
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function () {
  return Math.PI * (this.radius ** 2);
}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false
```

# 4.
The code logs `true` to the screen.
On line 7, the `swingSword` method is added to the prototype object of the `Ninja` constructor. Therefore, any object that is created by `Ninja`, like `ninja`, has access to this method even though the method is not defined on the created object itself. When `swingSword()` is called by `ninja` on line 11, the context of `this` is implicitly set to the `ninja` object. Thus, the value of the `swung` property of `ninja`, `true`, is logged to the screen.

# 5.
JavaScript will throw an error: `TypeError: ninja.swingSword is not a function`.
On line 7, `ninja.prototype` is assigned to a new object, instead of simply having the `swingSword` method added to `Ninja`'s existing prototype object. Since the `ninja` object was created on line 5, before the reassignment of `Ninja.prototype`, the `[[prototype]]` property of `ninja` still points to the original prototype object of `Ninja`, which did not have a `swingSword` method. Therefore, the `swingSword` method is not present in `ninja`'s prototype chain, causing JavaScript to throw an error.

# 6.
```js
Ninja.prototype.swing = function () {
  this.swung = true;
  return this;
}
```

# 7.
```js
let ninjaB = new ninjaA.constructor();
```

# 8.
```js
function User(first, last) {
  if (!(this instanceof User)) return new User(first, last);

  this.name = first + ' ' + last;
}
```