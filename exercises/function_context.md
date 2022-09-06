# 1. What is This?
The code will log `NaN` to the screen. This happens because `this` on line 4 is not part of a method. Therefore, even though `full.Name` is called by the `person` object on line 7, the `this` in the property references the global object. Since `firstName` and `lastName` are not properties defined on the global object, they both return `undefined` and their sum, `NaN` is logged.

# 2. The Franchise
Since the callback function on line 4 is passed as an argument to `map()`, it is stripped of its execution context. This means that when the callback is invoked, the `this` keyword within its function body implicitly points to the global object. Since the global object does not have a `name` property, `undefined` (+ /1/2/3) is returned by the callback.
This problem can be fixed using a JavaScript lexical scoping rule that allows the inner scope to access variables defined in the outer scope:
```js
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};
```

# 3. The Franchise - Solution 2
```js
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },
};
```

# 4. myFilter()
```js
function myFilter(array, func, thisArg) {
  let result = [];

  array.forEach(function(value) {
    if (func.call(thisArg, value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
}

console.log(myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter)); // returns [5, 6, 9]
```