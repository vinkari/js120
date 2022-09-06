# 1. Rectangles
```js
class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth());
console.log(rect.getLength());
console.log(rect.getArea());
```

# 2. Rectangles and Squares
```js
class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`);
```

# 3. Fake Cat
```js
class Cat {
  constructor(name) {
    this.name = name;
  }

  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat.prototype);
console.log(fakeCat instanceof Cat);
console.log(fakeCat.name);
console.log(fakeCat.speaks());
```

# 4. Complete the program - Cats!
```js
class Cat {
  constructor(name) {
    this.name = name;
  }

  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat.prototype);
console.log(fakeCat instanceof Cat);
console.log(fakeCat.name);
console.log(fakeCat.speaks());

```

# 5. Animals
```js
class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, '4', 'cat', status);
  }

  introduce() {
    return super.introduce() + ' Meow meow!';
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'dog', status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`;
  }
}

let cat = new Cat('Pepe', 2, 'happy');
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");

```

# 6. Refactoring Vehicles
```js
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  info() {
    return `${this.make} ${this.model}`
  }
}

class Car extends Vehicle {
  getWheels() {
    return 4;
  }
}

class Motorcycle extends Vehicle {
  getWheels() {
    return 2;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}
```

# 7. What Will This Do?
```
ByeBye
HelloHello
```

# 8. Shouter
```js
class Person {
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting(text) {
    super.greeting(text.toUpperCase());
  }
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you.");
shouter.greeting("Hello my friend.");
```

# 9. Moving
```js
const walkMixin = {
  walk() {
    return `${this.name} ${this.gait()} forward`; 
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return 'strolls';
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return 'saunters';
  }
}

class Cheetah {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return 'runs';
  }
}

Object.assign(Person.prototype, walkMixin);
Object.assign(Cat.prototype, walkMixin);
Object.assign(Cheetah.prototype, walkMixin);

let mike = new Person('Mike');
console.log(mike.walk());

let kitty = new Cat('Kitty');
console.log(kitty.walk());

let flash = new Cheetah('Flash');
console.log(flash.walk());
```

# 10. Pet Shelter
```js
class Owner {
  constructor(name) {
    this.name = name;
    this.petCount = 0;
  }

  numberOfPets() {
    return this.petCount;
  }
}

class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }
}

class Shelter {
  constructor(adoptionList) {
    this.adoptionList = {};
  }

  adopt(owner, pet) {
    if (!this.adoptionList.hasOwnProperty(owner.name)) {
      this.adoptionList[owner.name] = [];
    }
    this.adoptionList[owner.name].push(pet);
    owner.petCount += 1;
  }

  printAdoptions() {
    for (let property in this.adoptionList) {
      console.log(`${property} has adopted the following pets:`);
      this.adoptionList[property].forEach(pet => console.log(`a ${pet.species} named ${pet.name}`));
    }
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
```

# 11. Banner Class
```js
class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), 
                 this.emptyLine(), 
                 this.messageLine(), 
                 this.emptyLine(), 
                 this.horizontalRule()].join("\n"))
  }

  horizontalRule() {
    let dashes = this.message.length + 2;
    return `+${'-'.repeat(dashes)}+`;
  }

  emptyLine() {
    let spaces = this.message.length + 2;
    return `|${' '.repeat(spaces)}|`
  }

  messageLine() {
    return `| ${this.message} |`
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();

let banner2 = new Banner('');
banner2.displayBanner();
```