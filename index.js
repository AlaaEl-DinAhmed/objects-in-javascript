// Object.create({}) will clone Object.prototype
// and inherit all object properties
// Object.create(null) will create a complete empty object
// without any object method.
const obj = Object.create({});
const obj2 = Object.create(null);
// obj.hasOwnProperty('x');
// obj2.hasOwnProperty('x');

/*
Approach 1
----------
Creating objects with factory function && object literal
This approach is untenable as we store
getFullName method on every single object
created with personCreator function
and this is anti-pattern with memory.
*/
function personCreator(firstName, lastName, age) {
  const newPerson = {};
  newPerson.firstName = firstName;
  newPerson.lastName = lastName;
  newPerson.age = age;
  newPerson.getFullName = function () {
    console.log(`My name is ${this.firstName} ${this.lastName}.`);
  };
  return newPerson;
}

const personOne = personCreator('Alaa', 'Ahmad', 30);

// Approach 2
// Creating objects with factory function && Object.create()
// In This approach we store all methods in another object
// and link the new created object to this object with the
// __proto__ (the hidden bond up)
function userCreator(firstName, lastName, age) {
  const newUser = Object.create(userFunctionStore);
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.age = age;
  return newUser;
}

const userFunctionStore = {
  getFullName: function () {
    console.log(`My name is ${this.firstName} ${this.lastName}.`);
  },
};

const userOne = userCreator('Alaa', 'Ahmad', 30);

// Approach 3
// Creating objects with the new keyword.
// prototype (a big old empty object) is created by default
// when we invoke a function (function-object combo).
function Developer(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

Developer.prototype.getFullName = function () {
  console.log(`My name is ${this.firstName} ${this.lastName}.`);
};

const developerOne = new Developer('Alaa', 'Ahmad', 30);

function Counter(count) {
  this.count = count;
}

Counter.prototype.addCount = function () {
  // this here refers to the global window object.
  function addOneWithRegularFunc() {
    console.log(`Count is ${this.count++}.`);
  }

  // this here refers to that which,
  // was assigner to this which refers to the created
  // counter object.
  const that = this;
  function addOneWithRegularFuncAndThat() {
    console.log(`Count is ${that.count++}.`);
  }

  // this here refers to the this from where it was born.
  // static (lexical scoped)
  // Lexical static scope means => where I was born,
  // saved means what this will refers to.
  const addOneWithArrowFunc = () => {
    console.log(`Count is ${this.count++}.`);
  };

  addOneWithRegularFunc();
  addOneWithRegularFuncAndThat();
  addOneWithArrowFunc();
};
const countOne = new Counter(1);

// Approach 4
class Car {
  constructor(name, speed, color) {
    this.name = name;
    this.speed = speed;
    this.color = color;
  }

  getSpeed() {
    return this.speed;
  }
}

const bmwCar = new Car('BMW', 100, 'red');

///// Sub-classing in JavaScript \\\\\

// Approach 1 with Factory Functions
function accountCreator(name, isPaid) {
  const account = Object.create(accountFunctions);
  account.name = name;
  account.isPaid = isPaid;
  return account;
}

const accountFunctions = {
  getAccountInfo: function (isPaid) {
    return isPaid ? `This is paid account.` : `This is free account.`;
  },
};

const freeAccount = accountCreator('Alaa', false);

function paidAccountCreator(name, isPaid, fees) {
  const paidAccount = accountCreator(name, isPaid, fees);
  Object.setPrototypeOf(paidAccount, paidAccountFunctions);
  paidAccount.fees = fees;
  return paidAccount;
}

const paidAccountFunctions = {
  getFees: function () {
    return this.fees;
  },
};

Object.setPrototypeOf(paidAccountFunctions, accountFunctions);

const paidAccount = paidAccountCreator('Ahmad', true, 100);

// Approach 2 with new keyword
function Teacher(name, age) {
  this.name = name;
  this.age = age;
}

Teacher.prototype.getAge = function () {
  console.log(this.age);
};

function MathTeacher(name, age, type) {
  Teacher.call(this, name, age);
  this.type = type;
}

MathTeacher.prototype = Object.create(Teacher.prototype);
MathTeacher.prototype.getType = function () {
  console.log(this.type);
};

const mathTeacher = new MathTeacher('Alaa', 30, 'Math');

// Approach 3 with ES2015 class
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  getFirstName() {
    console.log(this.firstName);
  }
}

class ChildPerson extends Person {
  constructor(firstName, lastName, age) {
    super(firstName, lastName);
    this.age = age;
  }
  getAge() {
    console.log(this.age);
  }
}

const childPersonOne = new ChildPerson('Alaa', 'Ahmad', 30);
