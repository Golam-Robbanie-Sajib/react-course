import type { Course, CourseDay, Phase } from "./types"

const phases: Phase[] = [
  {
    name: "JavaScript Fundamentals",
    days: "Days 1-7",
    bgGradient: "from-blue-100",
    darkBgGradient: "dark:from-blue-900/50",
    gradient: "from-blue-500 to-sky-500",
  },
  {
    name: "Advanced JavaScript",
    days: "Days 8-11",
    bgGradient: "from-purple-100",
    darkBgGradient: "dark:from-purple-900/50",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    name: "React Fundamentals",
    days: "Days 12-16",
    bgGradient: "from-green-100",
    darkBgGradient: "dark:from-green-900/50",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Advanced React",
    days: "Days 17-22",
    bgGradient: "from-yellow-100",
    darkBgGradient: "dark:from-yellow-900/50",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    name: "Production Ready",
    days: "Days 23-25",
    bgGradient: "from-red-100",
    darkBgGradient: "dark:from-red-900/50",
    gradient: "from-red-500 to-rose-500",
  },
]

const days: CourseDay[] = [
  {
    day: 1,
    phase: "JavaScript Fundamentals",
    title: "Variables & Data Types",
    topics: ["let", "const", "var", "Primitives", "Type Coercion"],
    resources: [
      { name: "MDN: Data Structures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures" },
      { name: "JavaScript.info: Variables", url: "https://javascript.info/variables" },
    ],
    theory: `Welcome to Day 1! Today, we'll cover the absolute basics of JavaScript: how to store and manage information.<br/><br/>In programming, we use <strong>variables</strong> to store data values. JavaScript provides three keywords to declare variables: <code>var</code>, <code>let</code>, and <code>const</code>. <code>let</code> and <code>const</code> are modern (ES6+) and are preferred. Use <code>let</code> for variables that will change, and <code>const</code> for variables that will not.<br/><br/>JavaScript has several primitive <strong>data types</strong>:<ul><li><strong>String:</strong> Text, like "hello world".</li><li><strong>Number:</strong> Numeric values, like 42 or 3.14.</li><li><strong>Boolean:</strong> Represents true or false.</li><li><strong>Null:</strong> Represents the intentional absence of any object value.</li><li><strong>Undefined:</strong> A variable that has been declared but not assigned a value.</li></ul>Understanding these building blocks is the first crucial step to mastering JavaScript.`,
    exercises: [
      {
        title: "Temperature Converter",
        description:
          "Create a function `convertTemperature(value, unit)` that converts Celsius to Fahrenheit and vice-versa. Return a string like `\"0°C is 32.00°F\"`. If the unit is not 'C' or 'F', return an error string.",
        template: "vanilla",
        activeFile: "/index.js",
        starter: {
          "/index.js": `function convertTemperature(value, unit) {
  // TODO: validate that 'value' is a number
  // TODO: handle 'C' (Celsius → Fahrenheit) and 'F' (Fahrenheit → Celsius)
  // TODO: return an error string for any other unit
}

console.log(convertTemperature(0, 'C'));
console.log(convertTemperature(212, 'F'));
console.log(convertTemperature('hi', 'C'));
`,
        },
        tests: [
          {
            description: "0°C should convert to 32.00°F",
            assertion: `return /32(\\.00)?.*F/i.test(String(convertTemperature(0, 'C')));`,
          },
          {
            description: "212°F should convert to 100.00°C",
            assertion: `return /100(\\.00)?.*C/i.test(String(convertTemperature(212, 'F')));`,
          },
          {
            description: "Non-numeric input returns an error string",
            assertion: `return String(convertTemperature('hi', 'C')).toLowerCase().includes('error');`,
          },
        ],
        hints: [
          "Use `typeof value !== 'number'` to validate input.",
          "Normalize the unit with `unit.toUpperCase()` so 'c' and 'C' both work.",
          "Use a template literal with `.toFixed(2)` to format the number to 2 decimals.",
        ],
        solution: {
          code: `function convertTemperature(value, unit) {\n  if (typeof value !== 'number') {\n    return "Error: Input value must be a number.";\n  }\n  const upperUnit = unit.toUpperCase();\n  if (upperUnit === 'C') {\n    const fahrenheit = (value * 9/5) + 32;\n    return \`\${value}°C is \${fahrenheit.toFixed(2)}°F\`;\n  } else if (upperUnit === 'F') {\n    const celsius = (value - 32) * 5/9;\n    return \`\${value}°F is \${celsius.toFixed(2)}°C\`;\n  } else {\n    return "Error: Invalid unit. Please use 'C' or 'F'.";\n  }\n}`,
          explanation:
            "The function first validates the input type, then uses conditional logic to apply the correct conversion formula based on the unit provided.",
        },
      },
    ],
    quiz: [
      {
        question: "Which keyword is used to declare a variable that cannot be reassigned?",
        options: ["let", "var", "const", "static"],
        correctAnswerIndex: 2,
        explanation: "'const' is used for constants, which are variables that cannot be reassigned after they are declared.",
      },
      {
        question: "What will `typeof true` return?",
        options: ["'string'", "'boolean'", "'number'", "'object'"],
        correctAnswerIndex: 1,
        explanation: "The value `true` is a primitive of the boolean data type, so `typeof` will return the string 'boolean'.",
      },
    ],
  },
  {
    day: 2,
    phase: "JavaScript Fundamentals",
    title: "Functions & Scope",
    topics: ["Function Declarations", "Expressions", "Arrow Functions", "Scope Chain"],
    resources: [
      { name: "MDN: Functions Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" },
    ],
    theory: `<strong>Functions</strong> are the primary building blocks of a JavaScript program. They are reusable blocks of code that perform a specific task.<br/><br/><strong>Scope</strong> determines the accessibility of variables. JavaScript looks for variables in the current scope, then in outer scopes up to the global scope. This is the <strong>scope chain</strong>.`,
    exercises: [
      {
        title: "Password Strength Validator",
        description: "Create a function `validatePassword(password)` that returns `{ isValid, errors }`. Rules: length ≥ 8, at least one uppercase letter, at least one number.",
        template: "vanilla",
        activeFile: "/index.js",
        starter: {
          "/index.js": `function validatePassword(password) {
  const errors = [];
  // TODO: add rule checks
  return { isValid: errors.length === 0, errors };
}

console.log(validatePassword('abc'));
console.log(validatePassword('Abcdefg1'));
`,
        },
        tests: [
          {
            description: "Strong password is valid",
            assertion: `return validatePassword('Abcdefg1').isValid === true;`,
          },
          {
            description: "Short password is invalid",
            assertion: `return validatePassword('Ab1').isValid === false;`,
          },
          {
            description: "Missing uppercase is invalid",
            assertion: `return validatePassword('abcdefg1').isValid === false;`,
          },
        ],
        hints: [
          "Use `password.length < 8` to check the length rule.",
          "Use regular expressions like `/[A-Z]/.test(password)` to check for uppercase letters.",
        ],
        solution: {
          code: `function validatePassword(password) {\n  const errors = [];\n  if (password.length < 8) errors.push("Too short");\n  if (!/[A-Z]/.test(password)) errors.push("Missing uppercase");\n  if (!/[0-9]/.test(password)) errors.push("Missing number");\n  return {\n    isValid: errors.length === 0,\n    errors: errors,\n  };\n}`,
          explanation: "The function uses regular expressions to test the password against a series of rules, collecting any validation errors in an array.",
        },
      },
    ],
    quiz: [
      {
        question: "What is the main difference between a function declaration and a function expression?",
        options: [
          "Declarations are hoisted, expressions are not",
          "Expressions can be anonymous, declarations cannot",
          "They are functionally identical",
          "Declarations must be named",
        ],
        correctAnswerIndex: 0,
        explanation:
          "Function declarations are hoisted to the top of their scope, meaning you can call them before they are defined in the code. Function expressions are not hoisted.",
      },
    ],
  },
  {
    day: 3,
    phase: "JavaScript Fundamentals",
    title: "Objects & Arrays",
    topics: ["Object Literals", "Array Methods", "Destructuring"],
    resources: [
      { name: "MDN: Array Methods", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
    ],
    theory: `<strong>Objects</strong> are collections of key-value pairs used to group related data. <strong>Arrays</strong> are ordered lists of values.<br/><br/>JavaScript provides many powerful array methods, such as <code>map()</code>, <code>filter()</code>, and <code>reduce()</code>. <strong>Destructuring</strong> is a convenient way to extract data from objects and arrays.`,
    exercises: [
      {
        title: "Student Grade Book",
        description:
          "Create an object `gradeBook` with `addStudent(name)`, `addGrade(name, grade)`, and `getStudentAverage(name)` methods.",
        template: "vanilla",
        activeFile: "/index.js",
        starter: {
          "/index.js": `const gradeBook = {
  students: {},
  // TODO: addStudent, addGrade, getStudentAverage
};

gradeBook.addStudent('Sara');
gradeBook.addGrade('Sara', 90);
gradeBook.addGrade('Sara', 80);
console.log(gradeBook.getStudentAverage('Sara'));
`,
        },
        tests: [
          {
            description: "Average of [90, 80] should be 85",
            assertion: `gradeBook.addStudent('Test'); gradeBook.addGrade('Test', 90); gradeBook.addGrade('Test', 80); return gradeBook.getStudentAverage('Test') === 85;`,
          },
          {
            description: "Unknown student returns 0",
            assertion: `return gradeBook.getStudentAverage('Nobody') === 0;`,
          },
        ],
        hints: [
          "Initialize each student as an empty array in `this.students`.",
          "Use `reduce` to sum grades, then divide by length.",
        ],
        solution: {
          code: `const gradeBook = {\n  students: {},\n  addStudent: function(name) { this.students[name] = []; },\n  addGrade: function(name, grade) { this.students[name].push(grade); },\n  getStudentAverage: function(name) {\n    const grades = this.students[name];\n    if (!grades || grades.length === 0) return 0;\n    return grades.reduce((sum, g) => sum + g, 0) / grades.length;\n  }\n};`,
          explanation: "The object uses methods to manipulate its own internal `students` property.",
        },
      },
    ],
    quiz: [
      {
        question: "Which array method creates a new array with all elements that pass the test implemented by the provided function?",
        options: ["map()", "forEach()", "filter()", "reduce()"],
        correctAnswerIndex: 2,
        explanation: "The `filter()` method creates a new array containing only the elements that satisfy a certain condition.",
      },
    ],
  },
  {
    day: 4,
    phase: "JavaScript Fundamentals",
    title: "Control Flow & Loops",
    topics: ["if/else", "switch", "for", "while", "break/continue"],
    resources: [
      { name: "MDN: Control Flow", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling" },
    ],
    theory: `<strong>Control Flow</strong> is the order in which the computer executes statements. We can control this flow using conditional statements like <code>if...else</code>.<br/><br/><strong>Loops</strong> (<code>for</code>, <code>while</code>) are used to execute a block of code repeatedly as long as a condition is true.`,
    exercises: [
      {
        title: "Prime Number Generator",
        description: "Write `generatePrimes(limit)` that returns an array of all prime numbers up to and including `limit`.",
        template: "vanilla",
        activeFile: "/index.js",
        starter: {
          "/index.js": `function isPrime(num) {
  // TODO
}

function generatePrimes(limit) {
  // TODO: return an array of primes ≤ limit
}

console.log(generatePrimes(20));
`,
        },
        tests: [
          {
            description: "Primes up to 10 are [2, 3, 5, 7]",
            assertion: `return JSON.stringify(generatePrimes(10)) === JSON.stringify([2,3,5,7]);`,
          },
          {
            description: "1 is not prime",
            assertion: `return !generatePrimes(1).includes(1);`,
          },
        ],
        hints: [
          "A number n is prime if no integer from 2 to √n divides it evenly.",
          "Use a loop `for (let i = 2; i * i <= num; i++)`.",
        ],
        solution: {
          code: `function isPrime(num) {\n  if (num <= 1) return false;\n  for (let i = 2; i * i <= num; i++) {\n    if (num % i === 0) return false;\n  }\n  return true;\n}\n\nfunction generatePrimes(limit) {\n  const primes = [];\n  for (let i = 2; i <= limit; i++) {\n    if (isPrime(i)) primes.push(i);\n  }\n  return primes;\n}`,
          explanation: "Uses a helper function `isPrime` and a loop to collect primes up to the limit.",
        },
      },
    ],
    quiz: [
      {
        question: "Which loop is guaranteed to execute at least once?",
        options: ["for loop", "while loop", "do...while loop", "for...in loop"],
        correctAnswerIndex: 2,
        explanation: "A `do...while` loop checks its condition at the end, so the body always runs at least once.",
      },
    ],
  },
  {
    day: 5,
    phase: "JavaScript Fundamentals",
    title: "DOM Manipulation",
    topics: ["Selecting Elements", "Events", "Creating/Modifying DOM"],
    resources: [
      { name: "MDN: Intro to the DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" },
    ],
    theory: `The <strong>Document Object Model (DOM)</strong> is the browser's representation of your HTML. JavaScript can select, create, and modify these HTML elements to make web pages interactive. Common methods include <code>document.getElementById()</code>, <code>document.querySelector()</code>, and <code>element.addEventListener()</code>.`,
    exercises: [
      {
        title: "Interactive Todo List",
        description: "Build a todo list. Typing text and clicking 'Add' should append a new `<li>` to the list. Pressing Enter in the input also adds.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Todos</title></head>
<body>
  <h1>My Todos</h1>
  <input id="todo-input" placeholder="What needs doing?" />
  <button id="add-btn">Add</button>
  <ul id="todo-list"></ul>
  <script src="./script.js"></script>
</body>
</html>`,
          "/script.js": `// TODO: when the user clicks #add-btn (or presses Enter in the input),
// take the input value and append a new <li> to #todo-list.
`,
        },
        hints: [
          "Use `document.getElementById('add-btn').addEventListener('click', ...)`.",
          "Use `document.createElement('li')` and `appendChild` to add a new item.",
          "Listen for `keydown` events on the input and check `e.key === 'Enter'`.",
        ],
        solution: {
          code: `const input = document.getElementById('todo-input');\nconst btn = document.getElementById('add-btn');\nconst list = document.getElementById('todo-list');\n\nfunction addTodo() {\n  const text = input.value.trim();\n  if (!text) return;\n  const li = document.createElement('li');\n  li.textContent = text;\n  list.appendChild(li);\n  input.value = '';\n}\n\nbtn.addEventListener('click', addTodo);\ninput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodo(); });`,
          explanation: "We attach click and keydown listeners that read the input value and append a new list item.",
        },
      },
    ],
    quiz: [
      {
        question: "What does `document.querySelector('.item')` select?",
        options: ["The element with the id 'item'", "The first element with the class 'item'", "All elements with the class 'item'", "The first element of type `<item>`"],
        correctAnswerIndex: 1,
        explanation: "`querySelector` returns the first element matching the CSS selector. `.` indicates a class.",
      },
    ],
  },
  {
    day: 6,
    phase: "JavaScript Fundamentals",
    title: "Asynchronous Basics",
    topics: ["setTimeout", "Callbacks", "Promises", "fetch"],
    resources: [
      { name: "MDN: Asynchronous JavaScript", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous" },
    ],
    theory: `JavaScript is single-threaded. <strong>Asynchronous JavaScript</strong> lets us perform long-running tasks without blocking the main thread. Modern code uses <strong>Promises</strong> and the <strong>Fetch API</strong>.`,
    exercises: [
      {
        title: "Fetch and Display",
        description: "Use `fetch` to load `https://jsonplaceholder.typicode.com/users/1` and log the user's name and city.",
        template: "vanilla",
        activeFile: "/index.js",
        starter: {
          "/index.js": `// TODO: fetch the user and print their name and address.city
`,
        },
        hints: [
          "Call `.json()` on the Response to parse the body.",
          "Chain `.then()` calls or use `async/await` (Day 10).",
        ],
        solution: {
          code: `fetch('https://jsonplaceholder.typicode.com/users/1')\n  .then(r => r.json())\n  .then(u => console.log(u.name, u.address.city))\n  .catch(err => console.error(err));`,
          explanation: "fetch returns a Promise. The first `.then` parses JSON, the second consumes the parsed object.",
        },
      },
    ],
    quiz: [
      {
        question: "A Promise can be in one of three states. Which of these is NOT a valid Promise state?",
        options: ["pending", "fulfilled", "rejected", "waiting"],
        correctAnswerIndex: 3,
        explanation: "A Promise is in one of: `pending`, `fulfilled`, or `rejected`.",
      },
    ],
  },
  {
    day: 7,
    phase: "JavaScript Fundamentals",
    title: "ES6+ Features",
    topics: ["Arrow Functions", "Template Literals", "Spread/Rest", "Modules"],
    resources: [
      { name: "MDN: Arrow Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" },
    ],
    theory: `ES6+ added many features: <strong>Arrow Functions</strong>, <strong>Template Literals</strong>, the <strong>Spread/Rest Operator (...)</strong>, and <strong>Modules (import/export)</strong>.`,
    exercises: [
      {
        title: "Capitalize Each Word",
        description: "Write `titleCase(str)` that returns the input with the first letter of each word capitalized. Use arrow functions, `split`, `map`, and `join`.",
        template: "vanilla",
        activeFile: "/index.js",
        starter: {
          "/index.js": `const titleCase = (str) => {
  // TODO
};

console.log(titleCase('hello world from js'));
`,
        },
        tests: [
          {
            description: "'hello world' becomes 'Hello World'",
            assertion: `return titleCase('hello world') === 'Hello World';`,
          },
          {
            description: "Single word also works",
            assertion: `return titleCase('react') === 'React';`,
          },
        ],
        hints: [
          "`str.split(' ')` gives you an array of words.",
          "Use `.map(w => w[0].toUpperCase() + w.slice(1))`.",
        ],
        solution: {
          code: `const titleCase = (str) =>\n  str.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');`,
          explanation: "Split into words, capitalize each, join back together.",
        },
      },
    ],
    quiz: [
      {
        question: "What is the purpose of the spread operator (`...`) when used with an array?",
        options: ["To create a copy of the array", "To expand the array into individual elements", "To access the first element", "To delete elements from the array"],
        correctAnswerIndex: 1,
        explanation: "The spread operator expands an iterable into its individual elements.",
      },
    ],
  },
  {
    day: 8,
    phase: "Advanced JavaScript",
    title: "Advanced Functions & Closures",
    topics: ["Closures", "IIFE", "this", "call/apply/bind"],
    resources: [{ name: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" }],
    theory: `A <strong>closure</strong> is a function that remembers the environment in which it was created. It retains access to variables from its outer scope even after the outer function has finished executing.<br/><br/>Closures are the foundation of:<ul><li><strong>Private state</strong>: data that's only accessible through specific functions.</li><li><strong>Function factories</strong>: functions that build customized functions.</li><li><strong>Async callbacks</strong>: the callback "remembers" the variables it captured.</li></ul><br/>A common pitfall: in a <code>for</code> loop with <code>var</code>, all callbacks share the same <code>i</code>. Using <code>let</code> creates a new binding per iteration.`,
    exercises: [
      {
        title: "Debounce Utility",
        description: "Implement `debounce(fn, wait)` that delays calling `fn` until `wait` ms have passed since the last call.",
        template: "vanilla",
        activeFile: "/index.js",
        starter: {
          "/index.js": `function debounce(fn, wait) {
  // TODO: use a closure to hold the timer id
}

const log = debounce((msg) => console.log(msg), 300);
log('a'); log('b'); log('c'); // only 'c' should log
`,
        },
        hints: [
          "Declare `let timeout;` outside the returned function so it persists across calls.",
          "Each call should `clearTimeout(timeout)` then `setTimeout` again.",
        ],
        solution: {
          code: `function debounce(fn, wait) {\n  let timeout;\n  return function (...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => fn.apply(this, args), wait);\n  };\n}`,
          explanation: "The returned function closes over `timeout`, which persists between calls.",
        },
      },
    ],
    quiz: [
      {
        question: "What is a key benefit of using a closure?",
        options: ["Data privacy", "Faster execution speed", "Simpler syntax", "Better memory management"],
        correctAnswerIndex: 0,
        explanation: "Closures let you create private variables that outsiders can't access directly.",
      },
    ],
  },
  {
    day: 9,
    phase: "Advanced JavaScript",
    title: "Prototypes & Classes",
    topics: ["Prototype Chain", "ES6 Classes", "Inheritance"],
    resources: [{ name: "JavaScript.info: Classes", url: "https://javascript.info/classes" }],
    theory: `JavaScript is prototype-based. Each object has a hidden link to a <strong>prototype</strong> object; if a property isn't found on the object itself, JS looks up the prototype chain.<br/><br/>ES6 <code>class</code> syntax is sugar over this system. <code>extends</code> creates a subclass and <code>super()</code> calls the parent constructor.`,
    exercises: [
      {
        title: "Vehicle Hierarchy",
        description: "Create a `Vehicle` base class with `getInfo()`, then `Car extends Vehicle` adding `numDoors`.",
        template: "vanilla",
        activeFile: "/index.js",
        starter: {
          "/index.js": `class Vehicle {
  // TODO
}
class Car extends Vehicle {
  // TODO
}
console.log(new Car('Toyota', 'Camry', 4).getInfo());
`,
        },
        hints: ["Call `super(make, model)` first in `Car`'s constructor."],
        solution: {
          code: `class Vehicle {\n  constructor(make, model) { this.make = make; this.model = model; }\n  getInfo() { return \`\${this.make} \${this.model}\`; }\n}\nclass Car extends Vehicle {\n  constructor(make, model, numDoors) { super(make, model); this.numDoors = numDoors; }\n}`,
          explanation: "`extends` sets up the prototype chain; `super` invokes the parent constructor.",
        },
      },
    ],
    quiz: [
      {
        question: "In ES6 classes, how do you call the constructor of a parent class from a child class?",
        options: ["parent()", "super()", "this()", "super.constructor()"],
        correctAnswerIndex: 1,
        explanation: "`super()` must be called in the child constructor before using `this`.",
      },
    ],
  },
  {
    day: 10,
    phase: "Advanced JavaScript",
    title: "Async/Await & Error Handling",
    topics: ["Promise Chains", "async/await", "try/catch", "Promise.all"],
    resources: [{ name: "MDN: async/await", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" }],
    theory: `<strong>async/await</strong> lets you write asynchronous code that looks synchronous. An <code>async</code> function always returns a Promise; <code>await</code> pauses execution until the awaited Promise settles. Wrap awaits in <code>try/catch</code> to handle rejections.`,
    exercises: [
      {
        title: "Retry with backoff",
        description: "Write `fetchWithRetry(url, retries)` that retries a failed fetch up to `retries` times, waiting 500ms between tries.",
        template: "vanilla",
        activeFile: "/index.js",
        starter: {
          "/index.js": `async function fetchWithRetry(url, retries = 3) {
  // TODO
}
`,
        },
        hints: ["Loop with try/catch; await `new Promise(r => setTimeout(r, 500))` between attempts."],
        solution: {
          code: `async function fetchWithRetry(url, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      const r = await fetch(url);\n      if (!r.ok) throw new Error(r.status);\n      return await r.json();\n    } catch (e) {\n      if (i === retries - 1) throw e;\n      await new Promise(res => setTimeout(res, 500));\n    }\n  }\n}`,
          explanation: "A `for` loop with try/catch retries on failure and rethrows on the final attempt.",
        },
      },
    ],
    quiz: [
      {
        question: "What does the `await` keyword do?",
        options: ["It defines a function as asynchronous", "It handles errors in async functions", "It pauses the execution of an async function until a Promise is settled", "It runs multiple promises in parallel"],
        correctAnswerIndex: 2,
        explanation: "`await` can only be used inside an `async` function and pauses execution until the Promise resolves or rejects.",
      },
    ],
  },
  {
    day: 11,
    phase: "Advanced JavaScript",
    title: "Advanced DOM & Performance",
    topics: ["Event Delegation", "Performance Optimization", "Memory Management"],
    resources: [{ name: "JavaScript.info: Event Delegation", url: "https://javascript.info/event-delegation" }],
    theory: `<strong>Event delegation</strong> attaches one listener to a parent instead of many on children, using <code>event.target</code> to figure out which child triggered the event. This is faster for long lists and works for dynamically-added children.`,
    exercises: [
      {
        title: "Delegated Click List",
        description: "Use event delegation: a single click listener on the `<ul>` should highlight the clicked `<li>`.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
<ul id="list">
  <li>Apple</li><li>Banana</li><li>Cherry</li>
</ul>
<style>.active{background:yellow}</style>
<script src="./script.js"></script>
</body></html>`,
          "/script.js": `// TODO: single listener on #list that toggles 'active' on the clicked <li>
`,
        },
        hints: [
          "Check `event.target.tagName === 'LI'` before doing anything.",
          "Use `classList.toggle('active')`.",
        ],
        solution: {
          code: `document.getElementById('list').addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI') e.target.classList.toggle('active');\n});`,
          explanation: "One listener handles clicks on any child via the bubbling event.",
        },
      },
    ],
    quiz: [
      {
        question: "What is the primary benefit of event delegation?",
        options: ["Improved performance by using fewer event listeners", "Code is easier to read", "It allows events to bubble up", "It prevents event capturing"],
        correctAnswerIndex: 0,
        explanation: "Fewer listeners means less memory and easier management of dynamic content.",
      },
    ],
  },
  {
    day: 12,
    phase: "React Fundamentals",
    title: "React Basics & JSX",
    topics: ["Components", "JSX Syntax", "Props", "Rendering"],
    resources: [{ name: "React Docs: Your First Component", url: "https://react.dev/learn/your-first-component" }],
    theory: `React builds UI from <strong>components</strong>: functions that return <strong>JSX</strong>. JSX looks like HTML but compiles to plain JS calls. <strong>Props</strong> are inputs (a single object argument); to embed an expression, wrap it in <code>{}</code>.`,
    exercises: [
      {
        title: "Profile Card",
        description: "Build a `ProfileCard` component that takes `name`, `bio`, and `imageUrl` as props.",
        template: "react",
        activeFile: "/App.js",
        starter: {
          "/App.js": `export default function App() {
  // TODO: render <ProfileCard ... />
  return <div>Profile here</div>;
}

function ProfileCard({ name, bio, imageUrl }) {
  // TODO
}
`,
        },
        hints: ["Use destructuring `{ name, bio, imageUrl }` in the parameter list."],
        solution: {
          code: `function ProfileCard({ name, bio, imageUrl }) {\n  return (\n    <div>\n      <img src={imageUrl} alt={name} width={100} />\n      <h2>{name}</h2>\n      <p>{bio}</p>\n    </div>\n  );\n}\n\nexport default function App() {\n  return <ProfileCard name="Ada" bio="Computing pioneer" imageUrl="https://i.pravatar.cc/100" />;\n}`,
          explanation: "Destructure props in the function signature and use them in JSX.",
        },
      },
    ],
    quiz: [
      {
        question: "In JSX, how do you add a JavaScript expression inside the markup?",
        options: ["((...))", "{{...}}", "(...)", "{...}"],
        correctAnswerIndex: 3,
        explanation: "Expressions are embedded with single curly braces `{}`.",
      },
    ],
  },
  {
    day: 13,
    phase: "React Fundamentals",
    title: "State & Event Handling",
    topics: ["useState Hook", "Event Handling", "Controlled Components"],
    resources: [{ name: "React Docs: State", url: "https://react.dev/learn/state-a-components-memory" }],
    theory: `<code>useState</code> adds state to a function component. It returns <code>[value, setValue]</code>. Calling <code>setValue</code> triggers a re-render with the new value.`,
    exercises: [
      {
        title: "Counter",
        description: "Build a counter with +, -, and Reset buttons.",
        template: "react",
        activeFile: "/App.js",
        starter: {
          "/App.js": `import { useState } from 'react';

export default function App() {
  // TODO
  return <div>Counter</div>;
}
`,
        },
        hints: ["Initialize with `useState(0)`."],
        solution: {
          code: `import { useState } from 'react';\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>+</button>\n      <button onClick={() => setCount(c => c - 1)}>-</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}`,
          explanation: "Using `setCount(c => c + 1)` is safer than `setCount(count + 1)` when updates may batch.",
        },
      },
    ],
    quiz: [
      {
        question: "What does the `useState` hook return?",
        options: ["A single value", "A single function", "An array with the state value and an updater function", "An object with a value and a setter"],
        correctAnswerIndex: 2,
        explanation: "`useState` returns `[value, setValue]`.",
      },
    ],
  },
  {
    day: 14,
    phase: "React Fundamentals",
    title: "Effects & Lifecycle",
    topics: ["useEffect Hook", "Cleanup", "Dependency Array"],
    resources: [{ name: "React Docs: Effects", url: "https://react.dev/learn/synchronizing-with-effects" }],
    theory: `<code>useEffect(fn, deps)</code> runs <code>fn</code> after render. Return a cleanup function to undo the effect. The dependency array controls when the effect re-runs: <code>[]</code> means once, missing means every render, listed deps means re-run when they change.`,
    exercises: [
      {
        title: "User List with Loading",
        description: "Fetch `https://jsonplaceholder.typicode.com/users` in useEffect and render names, showing 'Loading…' first.",
        template: "react",
        activeFile: "/App.js",
        starter: {
          "/App.js": `import { useState, useEffect } from 'react';
export default function App() {
  // TODO
  return <p>Users</p>;
}
`,
        },
        hints: ["Empty dependency array `[]` runs the effect once."],
        solution: {
          code: `import { useState, useEffect } from 'react';\nexport default function App() {\n  const [users, setUsers] = useState(null);\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(r => r.json())\n      .then(setUsers);\n  }, []);\n  if (!users) return <p>Loading…</p>;\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}`,
          explanation: "We use `users === null` as a loading flag and populate it once data arrives.",
        },
      },
    ],
    quiz: [
      {
        question: "What does an empty dependency array `[]` in a `useEffect` hook signify?",
        options: ["The effect runs on every render", "The effect runs only once, after the initial render", "The effect runs whenever any state changes", "It causes a syntax error"],
        correctAnswerIndex: 1,
        explanation: "An empty array means the effect runs exactly once after mount.",
      },
    ],
  },
  {
    day: 15,
    phase: "React Fundamentals",
    title: "Lists & Keys",
    topics: ["Rendering Lists", "Keys", "Dynamic Content"],
    resources: [{ name: "React Docs: Rendering Lists", url: "https://react.dev/learn/rendering-lists" }],
    theory: `Use <code>map()</code> to render arrays as JSX. Each rendered element needs a stable, unique <code>key</code> prop so React can efficiently track item identity across re-renders. Avoid using array index as a key when items can be reordered.`,
    exercises: [
      {
        title: "Todo App",
        description: "Add and remove todos, each with its own delete button.",
        template: "react",
        activeFile: "/App.js",
        starter: {
          "/App.js": `import { useState } from 'react';
export default function App() {
  // TODO
}
`,
        },
        hints: ["Store todos as `{ id, text }`. Use `Date.now()` for id."],
        solution: {
          code: `import { useState } from 'react';\nexport default function App() {\n  const [todos, setTodos] = useState([]);\n  const [text, setText] = useState('');\n  const add = () => { if (!text) return; setTodos([...todos, { id: Date.now(), text }]); setText(''); };\n  const remove = (id) => setTodos(todos.filter(t => t.id !== id));\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button onClick={add}>Add</button>\n      <ul>{todos.map(t => <li key={t.id}>{t.text} <button onClick={() => remove(t.id)}>x</button></li>)}</ul>\n    </div>\n  );\n}`,
          explanation: "Keys are item ids; updates use immutable patterns (`[...todos, …]`, `filter`).",
        },
      },
    ],
    quiz: [
      {
        question: "Why is the `key` prop important when rendering a list of elements in React?",
        options: ["It provides a unique CSS class", "It helps React identify items that have changed, been added, or removed", "It's a required prop for all HTML elements", "It sets the order of the elements"],
        correctAnswerIndex: 1,
        explanation: "Keys give items a stable identity for efficient list reconciliation.",
      },
    ],
  },
  {
    day: 16,
    phase: "React Fundamentals",
    title: "Forms & Validation",
    topics: ["Controlled/Uncontrolled Inputs", "Validation Patterns"],
    resources: [{ name: "React Docs: Sharing State", url: "https://react.dev/learn/sharing-state-between-components" }],
    theory: `In a <strong>controlled component</strong> the input's value is driven by React state. The single source of truth is in your component, so validation, formatting, and submission are straightforward.`,
    exercises: [
      {
        title: "Registration Form",
        description: "Email + password fields with live validation messages.",
        template: "react",
        activeFile: "/App.js",
        starter: {
          "/App.js": `import { useState } from 'react';
export default function App() {
  // TODO
}
`,
        },
        hints: ["Compute `emailValid` and `passValid` from state on every render; no extra effect needed."],
        solution: {
          code: `import { useState } from 'react';\nexport default function App() {\n  const [email, setEmail] = useState('');\n  const [pass, setPass] = useState('');\n  const emailValid = /.+@.+\\..+/.test(email);\n  const passValid = pass.length >= 8;\n  return (\n    <form>\n      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />\n      {!emailValid && <p>Invalid email</p>}\n      <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" />\n      {!passValid && <p>Password too short</p>}\n      <button disabled={!emailValid || !passValid}>Submit</button>\n    </form>\n  );\n}`,
          explanation: "Each render recomputes validity directly from state.",
        },
      },
    ],
    quiz: [
      {
        question: "In a controlled component, where is the state of the form input's value stored?",
        options: ["In the DOM", "In a React ref", "In React state (using useState or useReducer)", "In a global variable"],
        correctAnswerIndex: 2,
        explanation: "React state is the single source of truth.",
      },
    ],
  },
  {
    day: 17,
    phase: "Advanced React",
    title: "Advanced Hooks",
    topics: ["useReducer", "useRef", "useMemo", "useCallback"],
    resources: [{ name: "React Docs: useReducer", url: "https://react.dev/reference/react/useReducer" }],
    theory: `<strong>useReducer</strong> centralizes complex state transitions. <strong>useRef</strong> holds a mutable value across renders without causing re-renders. <strong>useMemo</strong>/<strong>useCallback</strong> memoize expensive values/functions to avoid recomputing on every render.`,
    exercises: [
      {
        title: "Cart with useReducer",
        description: "Manage cart items via `useReducer` with `ADD_ITEM` and `REMOVE_ITEM` actions.",
        template: "react",
        activeFile: "/App.js",
        starter: {
          "/App.js": `import { useReducer } from 'react';
function reducer(state, action) {
  // TODO
  return state;
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  // TODO
  return null;
}
`,
        },
        hints: ["Return a fresh `state.items` array; never mutate."],
        solution: {
          code: `function reducer(state, action) {\n  switch (action.type) {\n    case 'ADD_ITEM': return { items: [...state.items, action.payload] };\n    case 'REMOVE_ITEM': return { items: state.items.filter(i => i.id !== action.payload) };\n    default: return state;\n  }\n}`,
          explanation: "Reducers must be pure and always return a new state object.",
        },
      },
    ],
    quiz: [
      {
        question: "When is `useReducer` generally preferred over `useState`?",
        options: ["For all state management", "When you have complex state logic or the next state depends on the previous one", "When the state is a simple string or number", "When you want to cause fewer re-renders"],
        correctAnswerIndex: 1,
        explanation: "useReducer shines for centralizing complex transitions.",
      },
    ],
  },
  {
    day: 18,
    phase: "Advanced React",
    title: "Context & Global State",
    topics: ["Context API", "prop drilling solutions", "state management patterns"],
    resources: [{ name: "React Docs: Context", url: "https://react.dev/learn/passing-data-deeply-with-context" }],
    theory: `<strong>Context</strong> avoids prop-drilling: create a context, wrap your tree with a Provider, and read it via <code>useContext</code> anywhere below.`,
    exercises: [
      {
        title: "Theme Context",
        description: "Build a light/dark theme switcher using Context.",
        template: "react",
        activeFile: "/App.js",
        starter: {
          "/App.js": `import { createContext, useContext, useState } from 'react';
const ThemeContext = createContext();
export default function App() {
  // TODO: Provider + child that toggles
}
`,
        },
        hints: ["Expose `{ theme, setTheme }` as the context value."],
        solution: {
          code: `import { createContext, useContext, useState } from 'react';\nconst ThemeContext = createContext();\nfunction Toggle() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Theme: {theme}</button>;\n}\nexport default function App() {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <div style={{ background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#000', padding: 20 }}>\n        <Toggle />\n      </div>\n    </ThemeContext.Provider>\n  );\n}`,
          explanation: "Provider gives the value; useContext reads it.",
        },
      },
    ],
    quiz: [
      {
        question: "What problem does the React Context API primarily solve?",
        options: ["Slow rendering performance", "Fetching data from an API", "Prop drilling", "Styling components"],
        correctAnswerIndex: 2,
        explanation: "Context avoids threading props through every intermediate component.",
      },
    ],
  },
  {
    day: 19,
    phase: "Advanced React",
    title: "Component Patterns",
    topics: ["HOCs", "Render Props", "Compound Components", "Custom Hooks"],
    resources: [{ name: "React Docs: Custom Hooks", url: "https://react.dev/learn/reusing-logic-with-custom-hooks" }],
    theory: `<strong>Custom hooks</strong> let you extract stateful logic into reusable functions whose names start with <code>use</code>. They follow the same rules as built-in hooks: call them at the top level, only inside React functions.`,
    exercises: [
      {
        title: "useFetch",
        description: "Build a hook `useFetch(url)` returning `{ data, loading, error }`.",
        template: "react",
        activeFile: "/App.js",
        starter: {
          "/App.js": `import { useState, useEffect } from 'react';
function useFetch(url) {
  // TODO
}
export default function App() {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/users/1');
  if (loading) return <p>Loading…</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
`,
        },
        hints: ["Reset `loading` to true when url changes."],
        solution: {
          code: `function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  useEffect(() => {\n    let cancelled = false;\n    setLoading(true);\n    fetch(url).then(r => r.json()).then(d => { if (!cancelled) { setData(d); setLoading(false); } }).catch(e => { if (!cancelled) { setError(e); setLoading(false); } });\n    return () => { cancelled = true; };\n  }, [url]);\n  return { data, loading, error };\n}`,
          explanation: "Cancellation prevents setting state on an unmounted component.",
        },
      },
    ],
    quiz: [
      {
        question: "What is the primary rule for creating a custom hook?",
        options: ["It must return JSX", "It must be a class component", "Its name must start with 'use'", "It cannot call other hooks"],
        correctAnswerIndex: 2,
        explanation: "The 'use' prefix tells the linter to enforce the rules of hooks.",
      },
    ],
  },
  {
    day: 20,
    phase: "Advanced React",
    title: "React Router",
    topics: ["Routing", "Nested Routes", "Navigation", "Protected Routes"],
    resources: [{ name: "React Router Docs", url: "https://reactrouter.com/en/main/start/concepts" }],
    theory: `<strong>React Router</strong> keeps your UI in sync with the URL. Declare routes with <code>&lt;Routes&gt;</code> and <code>&lt;Route&gt;</code>, navigate with <code>&lt;Link&gt;</code>, and read URL params with <code>useParams</code>.`,
    exercises: [
      {
        title: "Two-page App",
        description: "Set up `/` and `/post/:id` routes with navigation.",
        template: "react",
        activeFile: "/App.js",
        starter: {
          "/App.js": `// TODO: set up BrowserRouter, Routes, Route, Link
export default function App() { return null; }
`,
        },
        hints: ["You'll need to install react-router-dom in Sandpack."],
        solution: {
          code: `import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';\nfunction Home() { return <><h1>Home</h1><Link to="/post/1">Post 1</Link></>; }\nfunction Post() { const { id } = useParams(); return <h1>Post {id}</h1>; }\nexport default function App() {\n  return (<BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/post/:id" element={<Post />} /></Routes></BrowserRouter>);\n}`,
          explanation: "Routes match by path; useParams extracts URL parameters.",
        },
      },
    ],
    quiz: [
      {
        question: "In React Router, which component is used to create navigation links without causing a full page reload?",
        options: ["<a>", "<href>", "<Route>", "<Link>"],
        correctAnswerIndex: 3,
        explanation: "<Link> performs client-side navigation.",
      },
    ],
  },
  {
    day: 21,
    phase: "Advanced React",
    title: "State Management Libraries",
    topics: ["Redux Toolkit", "Zustand", "Global State Patterns"],
    resources: [{ name: "Redux Toolkit", url: "https://redux-toolkit.js.org/tutorials/quick-start" }],
    theory: `For large apps, dedicated state libraries scale better than Context. <strong>Zustand</strong> offers a tiny hook-based API; <strong>Redux Toolkit</strong> is the official, modern Redux with much less boilerplate than classic Redux.`,
    exercises: [
      {
        title: "Cart store with Zustand",
        description: "Sketch a Zustand store for a cart with `items`, `addItem`, `removeItem`.",
        solution: {
          code: `import { create } from 'zustand';\nexport const useCartStore = create(set => ({\n  items: [],\n  addItem: (item) => set(s => ({ items: [...s.items, item] })),\n  removeItem: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),\n}));`,
          explanation: "Components subscribe with `useCartStore(s => s.items)` to read just what they need.",
        },
        hints: ["Set updates take a function that receives current state and returns the new state."],
      },
    ],
    quiz: [
      {
        question: "Compared to traditional Redux, what is a key advantage of Zustand?",
        options: ["It requires more boilerplate code", "It is significantly less boilerplate and has a simpler API", "It does not support asynchronous actions", "It is older and more established"],
        correctAnswerIndex: 1,
        explanation: "Zustand has minimal boilerplate.",
      },
    ],
  },
  {
    day: 22,
    phase: "Advanced React",
    title: "Data Fetching & APIs",
    topics: ["TanStack Query", "SWR", "Caching", "Optimistic Updates"],
    resources: [{ name: "TanStack Query", url: "https://tanstack.com/query/latest/docs/react/overview" }],
    theory: `<strong>TanStack Query</strong> is a server-state library. It caches responses by query key, dedupes in-flight requests, refetches stale data automatically, and gives you a clean <code>useMutation</code> API for writes — including optimistic updates and cache invalidation on success.`,
    exercises: [
      {
        title: "useQuery for todos",
        description: "Sketch a useQuery to fetch todos plus a useMutation to add one and invalidate the cache.",
        solution: {
          code: `const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });\nconst qc = useQueryClient();\nconst add = useMutation({ mutationFn: addTodo, onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }) });`,
          explanation: "Invalidating after success triggers a background refetch.",
        },
        hints: ["Always pair related queries by sharing a queryKey prefix."],
      },
    ],
    quiz: [
      {
        question: "In TanStack Query, what is the purpose of `invalidateQueries`?",
        options: ["To delete data from the cache", "To mark cached data as stale, triggering a refetch", "To force an error state", "To manually update the cache"],
        correctAnswerIndex: 1,
        explanation: "Invalidation marks data stale so it's refetched.",
      },
    ],
  },
  {
    day: 23,
    phase: "Production Ready",
    title: "Testing",
    topics: ["Jest", "React Testing Library", "Component Testing"],
    resources: [{ name: "React Testing Library", url: "https://testing-library.com/docs/react-testing-library/intro/" }],
    theory: `<strong>React Testing Library</strong> encourages tests that resemble how users use your app: query by role/text/label, simulate interactions with <code>fireEvent</code> or <code>userEvent</code>, then assert on the rendered output.`,
    exercises: [
      {
        title: "Button click test",
        description: "Sketch a test that the Button's onClick is called when clicked.",
        solution: {
          code: `import { render, screen, fireEvent } from '@testing-library/react';\ntest('calls onClick', () => {\n  const fn = jest.fn();\n  render(<Button onClick={fn}>Click</Button>);\n  fireEvent.click(screen.getByText(/click/i));\n  expect(fn).toHaveBeenCalledTimes(1);\n});`,
          explanation: "Find by visible text, simulate the click, assert mock was called.",
        },
        hints: ["Prefer `getByRole` over `getByTestId` when possible."],
      },
    ],
    quiz: [
      {
        question: "What is the core philosophy of React Testing Library?",
        options: ["The more tests, the better", "Test implementation details, not behavior", "The more your tests resemble the way your software is used, the more confidence they can give you", "Only test components that fetch data"],
        correctAnswerIndex: 2,
        explanation: "Test as users would interact with your UI.",
      },
    ],
  },
  {
    day: 24,
    phase: "Production Ready",
    title: "Performance & Build",
    topics: ["Optimization", "Lazy Loading", "Code Splitting", "Vite/Webpack"],
    resources: [{ name: "React Docs: Code-Splitting", url: "https://react.dev/reference/react/lazy" }],
    theory: `Use <code>React.lazy</code> + <code>&lt;Suspense&gt;</code> to split bundles by route. Memoize expensive computations with <code>useMemo</code>; memoize child components with <code>React.memo</code> to avoid re-renders when props haven't changed.`,
    exercises: [
      {
        title: "Lazy-load a route",
        description: "Sketch a route-level code-split using React.lazy and Suspense.",
        solution: {
          code: `import { lazy, Suspense } from 'react';\nconst About = lazy(() => import('./About'));\nexport default function App() { return (<Suspense fallback={<p>Loading…</p>}><About /></Suspense>); }`,
          explanation: "lazy + Suspense defer loading until the component is rendered.",
        },
        hints: ["Always pair a lazy import with a Suspense boundary somewhere above it."],
      },
    ],
    quiz: [
      {
        question: "In React, what is the purpose of the `<Suspense>` component?",
        options: ["To handle errors in child components", "To provide a fallback UI while lazy-loaded components are loading", "To suspend rendering of the entire app", "To manage global state"],
        correctAnswerIndex: 1,
        explanation: "Suspense renders a fallback while children are loading.",
      },
    ],
  },
  {
    day: 25,
    phase: "Production Ready",
    title: "Final Project",
    topics: ["Full Application Integration"],
    resources: [{ name: "Thinking in React", url: "https://react.dev/learn/thinking-in-react" }],
    theory: `Bring everything together. Pick a domain (tasks, expenses, recipes), break it into a component tree, decide where state lives (local vs Context vs library), wire routing, fetch and persist data, then test the critical paths.`,
    exercises: [
      {
        title: "Capstone project",
        description: "Plan and build a task management app: projects, tasks, persistence (localStorage or API).",
        solution: {
          code: `// High-level: <App> → <ProjectsSidebar/> + <ProjectView>\n//             <ProjectView> → <TaskList/> + <NewTaskForm/>\n//             Store: Zustand persisted to localStorage`,
          explanation: "Start from data shape and component boundaries, not styling.",
        },
        hints: ["Sketch the component tree on paper before coding."],
      },
    ],
    quiz: [
      {
        question: "What is often the first step when building a complex React application?",
        options: ["Choosing a CSS library", "Writing all the state logic", "Breaking the UI into a component hierarchy", "Setting up the database"],
        correctAnswerIndex: 2,
        explanation: "Identify the component tree first; everything else follows.",
      },
    ],
  },
]

export const reactCourse: Course = {
  id: "react",
  slug: "react",
  title: "Master React in 25 Days",
  tagline: "JavaScript foundations to production-ready React",
  description:
    "From variables and loops to hooks, routing, state management, and testing — a complete 25-day journey to build modern React apps with confidence.",
  level: "Beginner → Intermediate",
  durationLabel: "25 days · ~40 hours",
  coverGradient: "from-blue-500 to-purple-600",
  phases,
  days,
  hasFinalExam: true,
}
