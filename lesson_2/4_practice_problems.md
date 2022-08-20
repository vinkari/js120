# 1.
The code will log `2` to the screen. `Object.create` creates a new object that inherits the properties of the object supplied as its argument. Therefore, the `Object.create` method call on line 2 creates an object that inherits from the object referenced by `qux` and assigns it to `baz`. When the `foo` property is accessed on baz in line 3, JavaScript first looks for the property in `baz`. Since `baz` does not have its own `foo` property, JavaScript goes up the prototype chain and finds the property in `qux` with a value of `1`. So `baz.foo` resolves to `1`, as does `qux.foo`, and the sum of these two values is `2`.

# 2.
The code will log `3` to the screen. On line 2, the `Object.create` method call creates an object that inherits from the object referenced by `qux` and initializes it to `baz`. So the object referenced by `baz` now has access to the `foo` property of its prototype, which is the object referenced by `qux`. On line 3, however, a new `foo` property is defined on the object referenced by `baz` and is assigned the value of `2`. When assigning a property on an object, JavaScript always treats the property as an "own" property. That is, it assumes that the property belongs to the object named to the left of the property name. Even if the prototype chain already has a property with that name, it assigns the "own" property. The `foo` assignment on the object referenced by `baz`, however, does not change the value of the `foo` property of the object referenced by `qux`. Therefore, the value of `baz.foo` is `2` and that of `qux.foo` is `1`, and their sum, `3`, is output to the screen.

# 3.
The code will log `4` to the screen. On line 2, the `Object.create` method call creates an object that inherits from the `qux` object and initializes it to `baz`. On line 3, the `foo` property of `qux` is reassigned to `2`. When accessing the `foo` property on `baz`, JavaScripts sees that `baz` does not have its own copy of `foo`, therefore, it looks in the prototype chain to find the `foo` property in `qux`. Objects hold a reference to their prototype objects through their internal [[Prototype]] property. If the object's prototype changes in some way, the changes are observable in the inheriting object as well. Therefore, both `baz.foo` and `qux.foo` have the same value of `2`, the sum of which, `4`, is logged to the screen.

# 4.
```js
function assignProperty(object, property, value) {
  while (object !== null) {
    if (object.hasOwnProperty(property)) {
      object[property] = value;
      break;
    } else {
      object = Object.getPrototypeOf(object);
    }
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false
```

# 5.
A `for/in` loop iterates over an object's enumerable properties. The iteration includes properties from the objects in its prototype chain, in addition to the object's "own" properties. `Object.keys`, however, returns an array containing only the object's "own" enumerable property keys, excluding those that the object inherits from its prototype. Therefore, the provided code will not always log the same result.

This difference is illustrated in the following code:
```js
let baz = { a: 1, b: 2 };
let foo = Object.create(baz);
foo.c = 3;
foo.d = 4;

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
} 
//logs:
// c: 3
// d: 4
// a: 1
// b: 2

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});
//logs:
// a: 1
// b: 2
```

# 6.
An object without a prototype object, also known as a bare object, can be created using the `Object.create` method with `null` passed as its argument.

You can determine whether an object has a prototype by using the `Object.getPrototypeOf()` method and checking that it does not return `null`.