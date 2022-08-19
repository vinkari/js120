# 1.
```js
let book1 = {
  title: 'Mythos',
  author: 'Stephen Fry',

  getDescription() {
    return `${this.title} was written by ${this.author}.`
  }

  let book2 = {
  title: 'Me Talk Pretty One Day',
  author: 'David Sedaris',

  getDescription() {
    return `${this.title} was written by ${this.author}.`
  }

  let book3 = {
  title: 'Aunts aren\'t Gentlemen',
  author: 'PG Wodehouse',

  getDescription() {
    return `${this.title} was written by ${this.author}.`
  }
}
```

# 2.
The `getDescription` method is duplicated in each object.

# 3.
```js
function createBook(title, author) {
  return {
    title,
    author,

    getDescription() {
      return `${this.title} was written by ${this.author}.`
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

book1.getDescription();  // "Mythos was written by Stephen Fry."
book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"
```

# 4.
```js
function createBook(title, author) {
  return {
    title,
    author,
    read: false,

    getDescription() {
      return `${this.title} was written by ${this.author}.`
    }
  }
}
```

# 5.
```js
function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}.`
    }
  }
}
```

# 6.
```js
function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}.`
    },

    readBook() {
      this.read = true;
    }
  }
}
```

# 7.
```js
function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}. I ${this.read ? 'have' : 'haven\'t'} read it.`
    },

    readBook() {
      this.read = true;
    }
  }
}
```