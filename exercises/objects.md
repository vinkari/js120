# 1. Buggy Code 1
The problem with this code lies in the `greet()` method. On lines 11, 14 and 17, the `morning`, `afternoon`, `evening` and `name` variables are presumably meant to reference those properties of the objects created by the `createGreeter` factory function. However, in order to that, the properties need to be called by the object itself. This can be done by prepending each of the names with `this.`.
```js
function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

let helloVictor = createGreeter('Victor');
helloVictor.greet('morning');
```

# 2. Buggy Code 2
```js
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;
    let discountedPrice = this.price - discount;
    
    return discountedPrice;
  },
};

console.log(item.discount(20))   // should return 40
console.log(item.discount(50))   // should return 25
console.log(item.discount(25))   // should return 37.5
```

# 3. Testing Object Equality
```js
function objectsEqual(object1, object2) {
  if (Object.keys(object1).length !== Object.keys(object2).length) {
    return false;
  }

  for (let i = 0; i < Object.keys(object1).length; i++) {
    if (Object.keys(object1)[i] !== Object.keys(object2)[i] ||
        Object.values(object1)[i] !== Object.values(object2)[i]) {
          return false;
    }
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
```

# 4. Student
```js
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`)
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      console.log(this.courses);
    },

    addNote(code, note) {
      let course = this.courses.filter(course => course.code === code)[0];
      if (course.note) {
        course.note = course['note'] += `; ${note}`;
      } else {
        course.note = note;
      }
    },

    updateNote(code, note) {
      let course = this.courses.filter(course => course.code === code)[0];
      course.note = note;
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      })
    }
  }
}

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"
```

# 5. School
```js
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`)
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      console.log(this.courses);
    },

    addNote(code, note) {
      let course = this.courses.filter(course => course.code === code)[0];
      if (course.note) {
        course.note = course['note'] += `; ${note}`;
      } else {
        course.note = note;
      }
    },

    updateNote(code, note) {
      let course = this.courses.filter(course => course.code === code)[0];
      course.note = note;
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      })
    }
  }
}


let school = {
  students: [],

  addStudent(student) {
    let validYears = ['1st', '2nd', '3rd', '4th', '5th'];
    if (validYears.includes(student.year)) {
      this.students.push(student);
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(name, course) {
    let student = this.students.filter(student => student.name === name)[0];
    student.courses.push(course);
  },

  addGrade(name, code, grade) {
    let student = this.students.filter(student => student.name === name)[0];
    let course = student.courses.filter(course => course.code === code)[0];
    course.grade = grade;
  },

  getReportCard(name) {
    let student = this.students.filter(student => student.name === name)[0];
    student.courses.forEach(course => {
      console.log(`${course.name}: ${course.grade ? course.grade : 'In progress'}`);
    })
  },

  courseReport(courseName) {
    let grades = [];

    this.students.forEach(student => student.courses.forEach(course => {
      if (course.name === courseName && course.grade) {
        grades.push([student.name, course.grade]);
      }
    }));

    if (grades.length === 0) return undefined;

    let average = grades.map(grade => grade[1]).reduce((acc, cv) => acc + cv) / grades.length;
    
    console.log(`=${courseName} Grades=`);
    grades.forEach(grade => console.log(`${grade[0]}: ${grade[1]}`));
    console.log('---');
    console.log(`Course Average: ${average}`);
  }
}

//Test
const COURSES = {
  math:         { name: 'Math', code: 101, },
  advancedMath: { name: 'Advanced Math', code: 102, },
  physics:      { name: 'Physics', code: 202, }
}

let foo = createStudent('foo', '3rd');
school.addStudent(foo);
school.enrollStudent('foo', Object.assign({}, COURSES.math));
school.enrollStudent('foo', Object.assign({}, COURSES.advancedMath));
school.enrollStudent('foo', Object.assign({}, COURSES.physics));
school.addGrade('foo', 101, 95);
school.addGrade('foo', 102, 90);

let bar = createStudent('bar', '2nd');
school.addStudent(bar);
school.enrollStudent('bar', Object.assign({}, COURSES.math));
school.addGrade('bar', 101, 91);

let qux = createStudent('qux', '2nd');
school.addStudent(qux);
school.enrollStudent('qux', Object.assign({}, COURSES.math));
school.enrollStudent('qux', Object.assign({}, COURSES.advancedMath));
school.addGrade('qux', 101, 93);
school.addGrade('qux', 102, 90);

school.getReportCard('foo'); // must be PHysics: In progress
console.log('-------------');

school.courseReport('Math');
console.log('-------------');
school.courseReport('Advanced Math');
console.log('-------------');
school.courseReport('Physics');
```