# 1.
```js
function createPet(animal, name) {
  return {
    animal,
    name,

    sleep() {
      console.log('I am sleeping');
    },

    wake() {
      console.log('I am awake');
    }
  };
}
```

# 2.
```js
let PetPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep() {
    console.log('I am sleeping');
  },

  wake() {
    console.log('I am awake');
  }
};
```

# 3.
The objects in problem 1 each have their own copies of the `wake` and `sleep` methods. In problem 2, however, those methods are only defined in the `PetPrototype` object and are merely inherited by the animal objects. This allows objects created by the OLOO pattern to be more memory efficient.