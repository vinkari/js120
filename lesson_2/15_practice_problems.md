# 1.
The code will output `undefined undefined is a undefined.`
This is clearly different from the desired output. 
This happened because when a method is taken out of an object and executed as a standalone function, the function's context is not longer the original object. `getDescription` is a method of the `turk` object. On Line 18, it is passed as an argument to the `logReturnVal` function, and assigned to `func`. `func` is invoked as a standalone function in the `logReturnVal()` call and is, therefore, implicitly bound to the global object. The global object does not have the `firstName`, `lastName` or `occupation` properties, so `undefined` is returned when each of these are referenced in the `func()` call. This logs the unexpected result to the screen.

# 2.
```js
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);
```

# 3.
```js
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

let getDescription = turk.getDescription.bind(turk);

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(getDescription);
```

# 4.
The code will not produce the provided output.
The callback function passed to `forEach` on line 5 includes `this` in its function body, with an expected execution context of the `TESgames` object. This, however, is not the case since the function is supplied as an argument to `forEach`. Passing a function as an argument to another function strips it of its execution context, which means the function argument gets invoked with the context implicitly set to the global object. Since the global object does not have a `seriesTitle` property, `this.seriesTitle` evaluates to `undefined` on each invocation of the callback.

# 5.
```js
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
```

# 6.
```js
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    }, this);
  }
};

TESgames.listGames();
```

# 7.
```js
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => console.log(this.seriesTitle + ': ' + title));
  }
};

TESgames.listGames();
```

# 8.
The value of `foo.a` will remain unchanged, at `0`.
On line 8, `increment()` is invoked as a standalone function, so JavaScript sets its `this` value to the global object. `this.a`, therefore, does not point to the `a` property of `foo`, and the `increment()` call does not affect the value of `foo.a`.

# 9.
```js
let foo = {
  a: 0,
  incrementA: function() {
    let increment = () => this.a += 1;

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a) // logs 3
```