# 1.
The `bind` method.

# 2.
The bind method call on line 9 returns a new version of the function referenced by `foo` that is permanently bound to the `obj` object. `bind` does not invoke the function used to call it, therefore, nothing gets logged to the screen.

# 3.
The code will log the following to the screen:
```
NaN
5
```
On line 10, the `bar` global variable is initialized to the return value of the `bind` method call, which is a new `foo` function that is permanently bound to the `obj` object. `bind` explicitly sets the execution context of this new function to the `obj` object.

In the `foo()` invocation on line 12, the value of `this` is implicitly set to the global object. The global object does not have the properties `a` or `b`. Therefore, this.a and this.b evaluate `undefined` and their sum, `NaN` is logged.

On line 13, however, `obj` is the execution context of the `bar()` invocation. Since `obj` has `a` and `b` properties, `this.a` equals `2` and `this.b` equals `3`, and their sum, `5`, is logged.

# 4.
The code will log `JavaScript makes sense!`.

On line 13, the `bind` method call returns a new version of the function referenced by `foo` that is permanently bound to the `positivity` object. This function is assigned to `bar`.

Although the `bar` function is added as a method called `logMessage` to negativity, the `negativity.logMessage()` method call on line 16 still uses `positivity` as its execution context due to it being permanently bound to `positivity`.

# 5.
`Amazebulous!` is logged to the screen.

The `foo.bind` call on line 12 returns a new function that is permanently bound to the `obj` object, which is assigned to the `bar` variable. So even though `bar` invokes the `call` method with `otherObj` as its argument on line 14, that does not change `bar`'s execution context to `otherObj` since it is permanently bound to `obj`.