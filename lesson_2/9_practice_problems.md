# 1.
The code will output `Object [global] {...}`, which is the global object in node. Within a regular function call, JavaScript implicitly sets the binding for `this` to the global object.

# 2.
The code will output `{ func: Function [func] }` to the screen. The difference in this code is that `func` is called using method invocation syntax with the caller, `obj`. Therefore, JavaScript interprets `obj` as the implicit context of the method call and binds `this` to the object referenced by `obj`.

# 3.
The code will output the following:
```
Hello from the global scope!
Hello from the function scope!
```

On line 1, `message` is assigned the value of `'Hello from the global scope!'` without the use of a `let`, `var` or `const` keyword. When this happens, Javascript assigns the variable as a property of the global object. Therefore, `message` is now a property of the global object with the value of `'Hello from the global scope!'`. `deliverMessage` is then invoked on line 7 as a regular function, which causes JavaScript to implicitly set its execution context to the global object. Therefore, the `this` in this `deliverMessage` invocation points to the global object, and the value of its `message` property is logged to the screen.

On line 9 the `foo` object is created with the `message` property that has the value of `'Hello from the function scope!'`. On line 13, the `deliverMessage` method is created in the `foo` object and is assigned to the `deliverMessage` function.  When calling a method that belongs to an object, the execution context inside that method call is the object used to call the method. Therefore, on line 15, Javascript sets the `foo` object as the implicit context, binding it to `this`. Therefore, the value of `foo`'s `message` property, `'Hello from the function scope!'` is logged to the screen.

# 4.
`Function.prototype.call()` and `Function.prototype.apply()`.

# 5.
```js
let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

bar.add.call(foo) // returns 3
```