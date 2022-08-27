# 1.
The `play` method added to `Bingo` would override the `play` method in the `Game` prototype object (`Game.prototype`), if the method is called by instances of `Bingo`. A method redefined in a subclass overrides the method defined in its superclass. When a method is accessed on an object, JavaScript first looks for an "own" method with that name on the object. However, if the method is not present, JavaScript looks for it in the object's prototype. If it can't find the property there, it next looks in the prototype's prototype. This process continues until it finds the property or it reaches `Object.prototype`. If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`. So the `play` method that is closest to the calling object gets invoked.

# 2.
```js
class Greeting {
  greet(string) {
    console.log(string);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}
```