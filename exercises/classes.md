# 1. Name the Constructor
```js
console.log('Hello'.constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);
```

# 2. Create the Class
```js
class Cat {}
```

# 3. Create an Instance
```js
class Cat {}

let kitty = new Cat();
```

# 4. What are you?
```js
class Cat {
  constructor() {
    console.log('I\'m a cat!');
  }
}

let kitty = new Cat();
```

# 5. Hello, Sophie! (part 1)
```js
class Cat {
  constructor(name) {
    this.name = name;
    console.log(`Hello! My name is ${this.name}!`)
  }
}

let kitty = new Cat('Sophie');
```

# 6. Hello, Sophie! (part 2)
```js
class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie');
kitty.greet();
```

# 7. Default Person
```js
class Person {
  constructor(name = 'John Doe') {
    this.name = name;
  }
}

let person1 = new Person();
let person2 = new Person('Pepe');

console.log(person1.name);
console.log(person2.name);
```

# 8. Hello, Chloe!
```js
class Cat {
  constructor(name) {
    this.name = name;
  }

  rename(name) {
    this.name = name;
  }
}

let kitty = new Cat('Sophie');
console.log(kitty.name);
kitty.rename('Chloe');
console.log(kitty.name);
```

# 9. Generic Greeting (part 1)
```js
class Cat {
  static genericGreeting() {
    console.log('Hello! I\'m a cat!');
  }
}

Cat.genericGreeting();
```

# 10. Generic Greeting (part 2)
```js
class Cat {
  constructor(name) {
    this.name = name;
  }

  static genericGreeting() {
    console.log('Hello! I\'m a cat!');
  }

  personalGreeting() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie');
Cat.genericGreeting();
kitty.personalGreeting();
```