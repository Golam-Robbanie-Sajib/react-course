// filepath: lib/course-data.ts

// 1. ========= DEFINE THE TYPES =========
export interface Resource {
  name: string;
  url: string;
}

export interface ExerciseSolution {
  code: string;
  explanation: string;
}

export interface Exercise {
  title: string;
  description: string;
  solution: ExerciseSolution;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CourseDay {
  day: number;
  phase: string;
  title: string;
  topics: string[];
  resources: Resource[];
  theory: string;
  exercises: Exercise[];
  quiz?: QuizQuestion[];
}

// 2. ========= DEFINE THE COURSE DATA =========
export const courseData: CourseDay[] = [
  // =================================================================
  // PHASE 1: JavaScript Fundamentals (Days 1-7)
  // =================================================================
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
        description: "Create a function that converts Celsius to Fahrenheit and vice-versa, with basic input validation.",
        solution: {
          code: `function convertTemperature(value, unit) {\n  if (typeof value !== 'number') {\n    return "Error: Input value must be a number.";\n  }\n  const upperUnit = unit.toUpperCase();\n  if (upperUnit === 'C') {\n    const fahrenheit = (value * 9/5) + 32;\n    return \`\${value}°C is \${fahrenheit.toFixed(2)}°F\`;\n  } else if (upperUnit === 'F') {\n    const celsius = (value - 32) * 5/9;\n    return \`\${value}°F is \${celsius.toFixed(2)}°C\`;\n  } else {\n    return "Error: Invalid unit. Please use 'C' or 'F'.";\n  }\n}`,
          explanation: `The function first validates the input type, then uses conditional logic to apply the correct conversion formula based on the unit provided.`,
        },
      },
    ],
    quiz: [
      {
        question: "Which keyword is used to declare a variable that cannot be reassigned?",
        options: ["let", "var", "const", "static"],
        correctAnswerIndex: 2,
        explanation: "'const' is used for constants, which are variables that cannot be reassigned after they are declared."
      },
      {
        question: "What will `typeof true` return?",
        options: ["'string'", "'boolean'", "'number'", "'object'"],
        correctAnswerIndex: 1,
        explanation: "The value `true` is a primitive of the boolean data type, so `typeof` will return the string 'boolean'."
      }
    ]
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
        description: "Create a function that validates a password based on a set of rules (e.g., length, uppercase, number).",
        solution: {
          code: `function validatePassword(password) {\n  const errors = [];\n  if (password.length < 8) errors.push("Too short");\n  if (!/[A-Z]/.test(password)) errors.push("Missing uppercase");\n  if (!/[0-9]/.test(password)) errors.push("Missing number");\n  return {\n    isValid: errors.length === 0,\n    errors: errors,\n  };\n}`,
          explanation: `The function uses regular expressions to test the password against a series of rules, collecting any validation errors in an array.`,
        },
      },
    ],
    quiz: [
      {
        question: "What is the main difference between a function declaration and a function expression?",
        options: ["Declarations are hoisted, expressions are not", "Expressions can be anonymous, declarations cannot", "They are functionally identical", "Declarations must be named"],
        correctAnswerIndex: 0,
        explanation: "Function declarations are hoisted to the top of their scope, meaning you can call them before they are defined in the code. Function expressions are not hoisted."
      }
    ]
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
        description: "Create an object to act as a grade book. It should have functions to add a student, add a grade, and calculate averages.",
        solution: {
          code: `const gradeBook = {\n  students: {},\n  addStudent: function(name) { this.students[name] = []; },\n  addGrade: function(name, grade) { this.students[name].push(grade); },\n  getStudentAverage: function(name) {\n    const grades = this.students[name];\n    if (!grades || grades.length === 0) return 0;\n    return grades.reduce((sum, g) => sum + g, 0) / grades.length;\n  }\n};`,
          explanation: `The object uses methods to manipulate its own internal \`students\` property, demonstrating how objects can encapsulate both data and behavior.`,
        },
      },
    ],
    quiz: [
      {
        question: "Which array method creates a new array with all elements that pass the test implemented by the provided function?",
        options: ["map()", "forEach()", "filter()", "reduce()"],
        correctAnswerIndex: 2,
        explanation: "The `filter()` method is used to create a new array containing only the elements from the original array that satisfy a certain condition."
      }
    ]
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
        description: "Write a function that takes a number `n` and returns an array of all prime numbers up to `n`.",
        solution: {
          code: `function isPrime(num) {\n  if (num <= 1) return false;\n  for (let i = 2; i * i <= num; i++) {\n    if (num % i === 0) return false;\n  }\n  return true;\n}\n\nfunction generatePrimes(limit) {\n  const primes = [];\n  for (let i = 2; i <= limit; i++) {\n    if (isPrime(i)) primes.push(i);\n  }\n  return primes;\n}`,
          explanation: `This solution uses a helper function \`isPrime\` and then a \`for\` loop to iterate up to the limit, checking each number and adding it to an array if it is prime.`,
        },
      },
    ],
    quiz: [
      {
        question: "Which loop is guaranteed to execute at least once?",
        options: ["for loop", "while loop", "do...while loop", "for...in loop"],
        correctAnswerIndex: 2,
        explanation: "A `do...while` loop checks its condition at the end of the loop, so its body will always execute at least one time."
      }
    ]
  },
  {
    day: 5,
    phase: "JavaScript Fundamentals",
    title: "DOM Manipulation",
    topics: ["Selecting Elements", "Events", "Creating/Modifying DOM"],
    resources: [
      { name: "MDN: Intro to the DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" },
    ],
    theory: `The <strong>Document Object Model (DOM)</strong> is the browser's representation of your HTML. JavaScript can be used to select, create, and modify these HTML elements to make web pages interactive. We use methods like <code>document.getElementById()</code> and <code>element.addEventListener()</code>.`,
    exercises: [
      {
        title: "Interactive Todo List",
        description: "Create the JavaScript logic for a simple todo list. Handle adding, completing, and deleting a todo.",
        solution: {
          code: `// HTML: <input id="todo-input"/> <button id="add-btn">Add</button> <ul id="todo-list"></ul>\ndocument.getElementById('add-btn').addEventListener('click', () => {\n  const input = document.getElementById('todo-input');\n  const text = input.value.trim();\n  if (text) {\n    const li = document.createElement('li');\n    li.textContent = text;\n    document.getElementById('todo-list').appendChild(li);\n    input.value = '';\n  }\n});`,
          explanation: `This script adds a click event listener to a button. When clicked, it reads text from an input, creates a new list item element, and appends it to the list.`,
        },
      },
    ],
    quiz: [
      {
        question: "What does `document.querySelector('.item')` select?",
        options: ["The element with the id 'item'", "The first element with the class 'item'", "All elements with the class 'item'", "The first element of type `<item>`"],
        correctAnswerIndex: 1,
        explanation: "`querySelector` returns the very first element in the document that matches the specified CSS selector. The `.` indicates a class."
      }
    ]
  },
  {
    day: 6,
    phase: "JavaScript Fundamentals",
    title: "Asynchronous Basics",
    topics: ["setTimeout", "Callbacks", "Promises", "fetch"],
    resources: [
      { name: "MDN: Asynchronous JavaScript", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous" },
    ],
    theory: `JavaScript is single-threaded. <strong>Asynchronous JavaScript</strong> allows us to perform long-running tasks without blocking the main thread. This is handled with tools like Callbacks, and more modernly, <strong>Promises</strong> and the <strong>Fetch API</strong>.`,
    exercises: [
      {
        title: "Weather App using an API",
        description: "Use the Fetch API to get data from a placeholder API and display it on the page.",
        solution: {
          code: `fetch('https://jsonplaceholder.typicode.com/users/1')\n  .then(response => response.json())\n  .then(data => {\n    document.body.innerHTML = \`<h1>\${data.name}'s city: \${data.address.city}</h1>\`;\n  })\n  .catch(error => console.error('Error:', error));`,
          explanation: `The \`fetch\` function returns a Promise. We use \`.then()\` to handle the successful response and parse it as JSON, and another \`.then()\` to use the data. \`.catch()\` handles any errors.`,
        },
      },
    ],
    quiz: [
      {
        question: "A Promise can be in one of three states. Which of these is NOT a valid Promise state?",
        options: ["pending", "fulfilled", "rejected", "waiting"],
        correctAnswerIndex: 3,
        explanation: "A Promise is always in one of these three states: `pending` (initial state), `fulfilled` (operation completed successfully), or `rejected` (operation failed)."
      }
    ]
  },
  {
    day: 7,
    phase: "JavaScript Fundamentals",
    title: "ES6+ Features",
    topics: ["Arrow Functions", "Template Literals", "Spread/Rest", "Modules"],
    resources: [
      { name: "MDN: Arrow Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" },
    ],
    theory: `ES6 and later versions added many features that make JavaScript more powerful. Key features include <strong>Arrow Functions</strong>, <strong>Template Literals</strong>, the <strong>Spread/Rest Operator (...)</strong>, and <strong>Modules (import/export)</strong>.`,
    exercises: [
      {
        title: "Utility Library with Modules",
        description: "Create one file (`utils.js`) that exports functions, and a second file (`main.js`) that imports and uses them.",
        solution: {
          code: `// In utils.js\nexport const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);\n\n// In main.js\nimport { capitalize } from './utils.js';\nconsole.log(capitalize('hello')); // "Hello"`,
          explanation: `The \`export\` keyword makes functions available to other files, while \`import\` brings them into the current file's scope. This is the foundation of modern JavaScript development.`,
        },
      },
    ],
    quiz: [
      {
        question: "What is the purpose of the spread operator (`...`) when used with an array?",
        options: ["To create a copy of the array", "To expand the array into individual elements", "To access the first element", "To delete elements from the array"],
        correctAnswerIndex: 1,
        explanation: "The spread operator `...` expands an iterable (like an array) into its individual elements. This is useful for creating copies or combining arrays."
      }
    ]
  },
    // =================================================================
  // PHASE 2: Advanced JavaScript (Days 8-11)
  // =================================================================
  {
    day: 8,
    phase: "Advanced JavaScript",
    title: "Advanced Functions & Closures",
    topics: ["Closures", "IIFE", "this", "call/apply/bind"],
    resources: [
      { name: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" },
    ],
    theory: `A <strong>closure</strong> is a function that remembers the environment in which it was created. This means it has access to variables from its outer (enclosing) function, even after the outer function has finished executing. Closures are a fundamental concept in JavaScript.`,
    exercises: [
      {
        title: "Debounce Utility",
        description: "Create a `debounce` function that delays invoking a function until after `wait` milliseconds have elapsed since the last time it was invoked.",
        solution: {
          code: `function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}`,
          explanation: `This function uses a closure. The \`timeout\` variable persists between calls to the returned function, allowing it to clear and reset the timer on each invocation.`,
        },
      },
    ],
    quiz: [
      {
        question: "What is a key benefit of using a closure?",
        options: ["Data privacy", "Faster execution speed", "Simpler syntax", "Better memory management"],
        correctAnswerIndex: 0,
        explanation: "Closures can create private variables that are only accessible to the returned function, which is a common pattern for data encapsulation and privacy."
      }
    ]
  },
  {
    day: 9,
    phase: "Advanced JavaScript",
    title: "Prototypes & Classes",
    topics: ["Prototype Chain", "ES6 Classes", "Inheritance"],
    resources: [
      { name: "JavaScript.info: Classes", url: "https://javascript.info/classes" },
    ],
    theory: `JavaScript is a prototype-based language. Each object has a link to another object called its <strong>prototype</strong>. ES6 introduced the <strong><code>class</code></strong> syntax, which is syntactic sugar over this system, providing a cleaner way to create objects and handle inheritance.`,
    exercises: [
      {
        title: "Vehicle Hierarchy with Inheritance",
        description: "Create a base `Vehicle` class and have `Car` and `Motorcycle` classes inherit from it.",
        solution: {
          code: `class Vehicle {\n  constructor(make, model) {\n    this.make = make;\n    this.model = model;\n  }\n  getInfo() { return \`\${this.make} \${this.model}\`; }\n}\n\nclass Car extends Vehicle {\n  constructor(make, model, numDoors) {\n    super(make, model);\n    this.numDoors = numDoors;\n  }\n}`,
          explanation: `The \`extends\` keyword is used to create a subclass. The \`super()\` keyword is used to call the constructor of the parent class.`,
        },
      },
    ],
    quiz: [
      {
        question: "In ES6 classes, how do you call the constructor of a parent class from a child class?",
        options: ["parent()", "super()", "this()", "super.constructor()"],
        correctAnswerIndex: 1,
        explanation: "The `super()` keyword must be called in the child class's constructor before `this` can be used. It calls the parent's constructor."
      }
    ]
  },
  {
    day: 10,
    phase: "Advanced JavaScript",
    title: "Async/Await & Error Handling",
    topics: ["Promise Chains", "async/await", "try/catch", "Promise.all"],
    resources: [
      { name: "MDN: async/await", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" },
    ],
    theory: `<strong>Async/Await</strong> is syntactic sugar built on top of Promises that lets us write asynchronous code that looks synchronous, making it easier to read. Use the <code>try...catch</code> block to handle errors from awaited promises.`,
    exercises: [
      {
        title: "API Client with Retry Logic",
        description: "Create an async function that fetches data from an API and retries up to a specified number of times on failure.",
        solution: {
          code: `const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));\n\nasync function fetchWithRetry(url, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      const response = await fetch(url);\n      if (!response.ok) throw new Error(\`HTTP error! \${response.status}\`);\n      return await response.json();\n    } catch (error) {\n      if (i < retries - 1) await delay(1000);\n      else throw error;\n    }\n  }\n}`,
          explanation: `This function uses a \`for\` loop for retries and a \`try...catch\` block to handle fetch errors. The \`await\` keyword pauses execution until the promise settles.`,
        },
      },
    ],
    quiz: [
      {
        question: "What does the `await` keyword do?",
        options: ["It defines a function as asynchronous", "It handles errors in async functions", "It pauses the execution of an async function until a Promise is settled", "It runs multiple promises in parallel"],
        correctAnswerIndex: 2,
        explanation: "`await` can only be used inside an `async` function and it pauses execution, waiting for the Promise to either resolve or reject."
      }
    ]
  },
  {
    day: 11,
    phase: "Advanced JavaScript",
    title: "Advanced DOM & Performance",
    topics: ["Event Delegation", "Performance Optimization", "Memory Management"],
    resources: [
      { name: "JavaScript.info: Event Delegation", url: "https://javascript.info/event-delegation" },
    ],
    theory: `<strong>Event delegation</strong> is a technique where instead of adding an event listener to every single child element, you add one listener to the parent. This improves performance, especially for long lists of items.`,
    exercises: [
      {
        title: "Drag-and-Drop Sortable List",
        description: "Implement the JavaScript for a simple drag-and-drop sortable list using DOM events.",
        solution: {
          code: `// Assumes HTML: <ul id="sortable-list"> <li draggable="true">...</li> </ul>\nconst list = document.getElementById('sortable-list');\nlet draggingElement = null;\nlist.addEventListener('dragstart', e => { draggingElement = e.target; });\nlist.addEventListener('dragover', e => {\n  e.preventDefault();\n  const afterElement = /* logic to find element to drop before */ null;\n  list.insertBefore(draggingElement, afterElement);\n});`,
          explanation: `This simplified example shows the core events used: \`dragstart\` to identify the element being dragged, and \`dragover\` to handle the reordering logic as it moves.`,
        },
      },
    ],
    quiz: [
      {
        question: "What is the primary benefit of event delegation?",
        options: ["Improved performance by using fewer event listeners", "Code is easier to read", "It allows events to bubble up", "It prevents event capturing"],
        correctAnswerIndex: 0,
        explanation: "By placing a single event listener on a parent element instead of many on child elements, you reduce memory usage and the number of event handlers the browser has to manage."
      }
    ]
  },
    // =================================================================
  // PHASE 3: React Fundamentals (Days 12-16)
  // =================================================================
  {
    day: 12,
    phase: "React Fundamentals",
    title: "React Basics & JSX",
    topics: ["Components", "JSX Syntax", "Props", "Rendering"],
    resources: [
      { name: "React Docs: Your First Component", url: "https://react.dev/learn/your-first-component" },
    ],
    theory: `React is a JavaScript library for building user interfaces with <strong>components</strong>. Components are like JavaScript functions that accept inputs (<strong>props</strong>) and return React elements describing what should appear on the screen.<br/><br/><strong>JSX (JavaScript XML)</strong> is a syntax extension that looks like HTML and is used to write React elements declaratively.`,
    exercises: [
      {
        title: "Profile Card Component",
        description: "Create a reusable `ProfileCard` component that accepts props for an image URL, name, and a short bio.",
        solution: {
          code: `function ProfileCard({ imageUrl, name, bio }) {\n  return (\n    <div>\n      <img src={imageUrl} alt={name} />\n      <h2>{name}</h2>\n      <p>{bio}</p>\n    </div>\n  );\n}`,
          explanation: `The component is a function that takes a \`props\` object (destructured in the signature) and returns JSX. The prop values are embedded in the JSX using curly braces.`,
        },
      },
    ],
    quiz: [
      {
        question: "In JSX, how do you add a JavaScript expression inside the markup?",
        options: ["Using ((...))", "Using {{...}}", "Using (...) parentheses", "Using {...} curly braces"],
        correctAnswerIndex: 3,
        explanation: "JavaScript expressions, such as variables or function calls, are embedded in JSX by wrapping them in curly braces `{}`."
      }
    ]
  },
  {
    day: 13,
    phase: "React Fundamentals",
    title: "State & Event Handling",
    topics: ["useState Hook", "Event Handling", "Controlled Components"],
    resources: [
      { name: "React Docs: State - A Component's Memory", url: "https://react.dev/learn/state-a-components-memory" },
    ],
    theory: `To handle data that changes over time, components use <strong>state</strong>. The <strong><code>useState</code></strong> hook adds state to a functional component. It returns an array containing the current state value and a function to update it. When you call the update function, React re-renders the component.`,
    exercises: [
      {
        title: "Counter with Increment, Decrement, and Reset",
        description: "Build a component that displays a count and has buttons to increment, decrement, and reset it.",
        solution: {
          code: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      <button onClick={() => setCount(count - 1)}>Decrement</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}`,
          explanation: `The \`useState\` hook initializes the \`count\` state. The \`onClick\` handlers are functions that call \`setCount\` to update the state, which triggers a re-render.`,
        },
      },
    ],
    quiz: [
      {
        question: "What does the `useState` hook return?",
        options: ["A single value", "A single function", "An array with the state value and an updater function", "An object with a value and a setter"],
        correctAnswerIndex: 2,
        explanation: "`useState` returns an array of two elements: the current state value and a function that lets you update it."
      }
    ]
  },
  {
    day: 14,
    phase: "React Fundamentals",
    title: "Effects & Lifecycle",
    topics: ["useEffect Hook", "Cleanup", "Dependency Array"],
    resources: [
      { name: "React Docs: Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects" },
    ],
    theory: `The <strong><code>useEffect</code></strong> hook lets you perform "side effects" in functional components. Side effects are operations that interact with the outside world, like fetching data or setting up subscriptions. The hook's dependency array controls when the effect is re-run.`,
    exercises: [
      {
        title: "Data Fetching with Loading States",
        description: "Create a component that fetches a list of users, showing a 'Loading...' message while fetching and an error message on failure.",
        solution: {
          code: `import { useState, useEffect } from 'react';\n\nfunction UserList() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(res => res.json())\n      .then(data => {\n        setUsers(data);\n        setLoading(false);\n      });\n  }, []); // Empty array = run once\n\n  if (loading) return <p>Loading...</p>;\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}`,
          explanation: `The \`useEffect\` hook with an empty dependency array \`[]\` runs only once after the initial render. It fetches data and updates the \`users\` and \`loading\` states.`,
        },
      },
    ],
    quiz: [
      {
        question: "What does an empty dependency array `[]` in a `useEffect` hook signify?",
        options: ["The effect runs on every render", "The effect runs only once, after the initial render", "The effect runs whenever any state changes", "It causes a syntax error"],
        correctAnswerIndex: 1,
        explanation: "An empty dependency array tells React to run the effect once and only once, mimicking the behavior of `componentDidMount` in class components."
      }
    ]
  },
  {
    day: 15,
    phase: "React Fundamentals",
    title: "Lists & Keys",
    topics: ["Rendering Lists", "Keys", "Dynamic Content"],
    resources: [
      { name: "React Docs: Rendering Lists", url: "https://react.dev/learn/rendering-lists" },
    ],
    theory: `We use array methods like <strong><code>map()</code></strong> to transform an array of data into an array of React elements. When rendering a list, you must provide a unique and stable <code>key</code> prop to each item.<br/><br/>Keys help React identify which items have changed, are added, or are removed, allowing for efficient UI updates.`,
    exercises: [
      {
        title: "Dynamic Todo List with CRUD Operations",
        description: "Build a todo list where todos are managed in React state. Implement Add, Update, and Delete functionality.",
        solution: {
          code: `import { useState } from 'react';\n\nfunction TodoList() {\n  const [todos, setTodos] = useState([]);\n  const [text, setText] = useState('');\n  const addTodo = () => {\n    setTodos([...todos, { id: Date.now(), text, completed: false }]);\n    setText('');\n  };\n  // ... (delete logic would use .filter())\n  return (\n    <div>\n      {/* Form and list rendering */}\n    </div>\n  );\n}`,
          explanation: `The \`todos\` are stored in state. The \`addTodo\` function uses the spread operator \`...\` to create a new array with the new todo item, ensuring state immutability.`,
        },
      },
    ],
    quiz: [
      {
        question: "Why is the `key` prop important when rendering a list of elements in React?",
        options: ["It provides a unique CSS class", "It helps React identify items that have changed, been added, or removed", "It's a required prop for all HTML elements", "It sets the order of the elements"],
        correctAnswerIndex: 1,
        explanation: "Keys give elements a stable identity, which helps React optimize rendering by quickly determining what has changed in a list."
      }
    ]
  },
  {
    day: 16,
    phase: "React Fundamentals",
    title: "Forms & Validation",
    topics: ["Controlled/Uncontrolled Inputs", "Validation Patterns"],
    resources: [
      { name: "React Docs: Sharing State Between Components", url: "https://react.dev/learn/sharing-state-between-components" },
    ],
    theory: `In React, a <strong>controlled component</strong> is a form input whose value is controlled by React state. The state is the "single source of truth." The input's <code>value</code> prop is bound to a state variable, and an <code>onChange</code> handler updates that state variable.`,
    exercises: [
      {
        title: "Registration Form with Validation",
        description: "Create a registration form with email and password fields that provides real-time validation feedback.",
        solution: {
          code: `import { useState } from 'react';\n\nfunction RegistrationForm() {\n  const [email, setEmail] = useState('');\n  const isEmailValid = email.includes('@');\n  return (\n    <div>\n      <input value={email} onChange={e => setEmail(e.target.value)} />\n      {!isEmailValid && <p>Invalid email</p>}\n    </div>\n  );\n}`,
          explanation: `The input is a controlled component: its \`value\` is tied to the \`email\` state, and its \`onChange\` event updates that state. The validation logic runs on every render.`,
        },
      },
    ],
    quiz: [
      {
        question: "In a controlled component, where is the state of the form input's value stored?",
        options: ["In the DOM", "In a React ref", "In React state (using useState or useReducer)", "In a global variable"],
        correctAnswerIndex: 2,
        explanation: "In a controlled component, the React component's state is the single source of truth for the input's value."
      }
    ]
  },
    // =================================================================
  // PHASE 4: Advanced React (Days 17-22)
  // =================================================================
  {
    day: 17,
    phase: "Advanced React",
    title: "Advanced Hooks",
    topics: ["useReducer", "useRef", "useMemo", "useCallback"],
    resources: [
      { name: "React Docs: useReducer", url: "https://react.dev/reference/react/useReducer" },
    ],
    theory: `Beyond the basics, React offers more specialized hooks:<br/><ul><li><strong><code>useReducer</code></strong>: An alternative to <code>useState</code> for managing complex state logic.</li><li><strong><code>useRef</code></strong>: For accessing DOM nodes or persisting values across renders without causing a re-render.</li><li><strong><code>useMemo</code></strong> / <strong><code>useCallback</code></strong>: For performance optimizations by memoizing values and functions.</li></ul>`,
    exercises: [
      {
        title: "Shopping Cart with useReducer",
        description: "Manage a shopping cart's state using `useReducer`. Implement actions for adding and removing items.",
        solution: {
          code: `import { useReducer } from 'react';\n\nconst cartReducer = (state, action) => {\n  switch (action.type) {\n    case 'ADD_ITEM': return { ...state, items: [...state.items, action.payload] };\n    case 'REMOVE_ITEM': return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };\n    default: return state;\n  }\n};\n\nfunction ShoppingCart() {\n  const [cart, dispatch] = useReducer(cartReducer, { items: [] });\n  // ...\n}`,
          explanation: `The reducer function contains all the state update logic. The component calls \`dispatch\` with an action object to trigger state changes. This centralizes complex state logic.`,
        },
      },
    ],
    quiz: [
      {
        question: "When is `useReducer` generally preferred over `useState`?",
        options: ["For all state management", "When you have complex state logic or the next state depends on the previous one", "When the state is a simple string or number", "When you want to cause fewer re-renders"],
        correctAnswerIndex: 1,
        explanation: "`useReducer` is ideal for managing state with complex transitions, especially when the next state is derived from the previous one, as it centralizes the update logic."
      }
    ]
  },
  {
    day: 18,
    phase: "Advanced React",
    title: "Context & Global State",
    topics: ["Context API", "prop drilling solutions", "state management patterns"],
    resources: [
      { name: "React Docs: Passing Data Deeply with Context", url: "https://react.dev/learn/passing-data-deeply-with-context" },
    ],
    theory: `The <strong>Context API</strong> provides a way to pass data through the component tree without having to pass props down manually at every level. This is the solution to "prop drilling." You create a Context, provide a value, and consume it in any child component using the <code>useContext</code> hook.`,
    exercises: [
      {
        title: "Theme System with Context",
        description: "Implement a light/dark mode theme switcher that can be accessed by any component in the application.",
        solution: {
          code: `import { createContext, useState, useContext } from 'react';\n\nconst ThemeContext = createContext();\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;\n}\n\nexport const useTheme = () => useContext(ThemeContext);`,
          explanation: `A \`ThemeContext\` is created and a \`ThemeProvider\` component manages the state. Any child component can now access the theme state by calling the \`useTheme\` custom hook.`,
        },
      },
    ],
    quiz: [
      {
        question: "What problem does the React Context API primarily solve?",
        options: ["Slow rendering performance", "Fetching data from an API", "Prop drilling", "Styling components"],
        correctAnswerIndex: 2,
        explanation: "Context is designed to prevent 'prop drilling,' which is the inconvenient process of passing props down through many layers of intermediate components."
      }
    ]
  },
  {
    day: 19,
    phase: "Advanced React",
    title: "Component Patterns",
    topics: ["HOCs", "Render Props", "Compound Components", "Custom Hooks"],
    resources: [
      { name: "React Docs: Reusing Logic with Custom Hooks", url: "https://react.dev/learn/reusing-logic-with-custom-hooks" },
    ],
    theory: `There are several advanced patterns for sharing logic. The most modern and preferred way is the <strong>Custom Hook</strong> pattern.<br/><br/>A custom hook is a JavaScript function whose name starts with "use" and that can call other hooks. It lets you extract component logic into reusable functions.`,
    exercises: [
      {
        title: "Data Fetching Custom Hook",
        description: "Create a reusable custom hook `useFetch` that handles the logic for data fetching, including loading and error states.",
        solution: {
          code: `import { useState, useEffect } from 'react';\n\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    // ... fetch logic ...\n  }, [url]);\n\n  return { data, loading };\n}`,
          explanation: `The \`useFetch\` hook encapsulates all the state and effect logic for fetching data. Any component can now get this functionality with a single line of code.`,
        },
      },
    ],
    quiz: [
      {
        question: "What is the primary rule for creating a custom hook?",
        options: ["It must return JSX", "It must be a class component", "Its name must start with 'use'", "It cannot call other hooks"],
        correctAnswerIndex: 2,
        explanation: "By convention, the name of a custom hook must start with 'use'. This allows React's linter to enforce the Rules of Hooks."
      }
    ]
  },
  {
    day: 20,
    phase: "Advanced React",
    title: "React Router",
    topics: ["Routing", "Nested Routes", "Navigation", "Protected Routes"],
    resources: [
      { name: "React Router Docs: Main Concepts", url: "https://reactrouter.com/en/main/start/concepts" },
    ],
    theory: `Most web applications have multiple pages. <strong>React Router</strong> is the standard library for handling routing in React. It allows you to synchronize your UI with the URL in the browser, enabling navigation between different components as if they were separate pages.`,
    exercises: [
      {
        title: "Multi-page Blog Application",
        description: "Set up a basic blog with a homepage listing posts and a separate page to view a single post's details.",
        solution: {
          code: `import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';\n\n// ... components for Home and Post\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/post/:postId" element={<Post />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
          explanation: `The \`<Routes>\` component defines the application's pages. A dynamic route like \`/:postId\` uses a URL parameter, which can be accessed in the component with the \`useParams\` hook.`,
        },
      },
    ],
    quiz: [
      {
        question: "In React Router, which component is used to create navigation links without causing a full page reload?",
        options: ["<a>", "<href>", "<Route>", "<Link>"],
        correctAnswerIndex: 3,
        explanation: "The `<Link>` component from React Router creates a navigation link that updates the URL and renders the new route internally, preventing a full page refresh."
      }
    ]
  },
  {
    day: 21,
    phase: "Advanced React",
    title: "State Management Libraries",
    topics: ["Redux Toolkit", "Zustand", "Global State Patterns"],
    resources: [
      { name: "Redux Toolkit Docs: Quick Start", url: "https://redux-toolkit.js.org/tutorials/quick-start" },
    ],
    theory: `While Context is great, it can cause performance issues if the value changes often. For complex, global state, dedicated libraries are often used.<br/><ul><li><strong>Redux Toolkit</strong>: The official, recommended way to write Redux logic.</li><li><strong>Zustand</strong>: A small, fast, and scalable solution using a simple hook-based API.</li></ul>`,
    exercises: [
      {
        title: "E-commerce Cart with Zustand",
        description: "Create a global store for a shopping cart using Zustand. Implement functions to add and remove items.",
        solution: {
          code: `import { create } from 'zustand';\n\nconst useCartStore = create((set) => ({\n  items: [],\n  addItem: (item) => set((state) => ({ items: [...state.items, item] })),\n  removeItem: (itemId) => set((state) => ({ items: state.items.filter(i => i.id !== itemId) }))\n}));`,
          explanation: `Zustand's \`create\` function defines the store, including its state and the actions that modify it. Any component can then use this store by calling the \`useCartStore\` hook.`,
        },
      },
    ],
    quiz: [
      {
        question: "Compared to traditional Redux, what is a key advantage of Zustand?",
        options: ["It requires more boilerplate code", "It is significantly less boilerplate and has a simpler API", "It does not support asynchronous actions", "It is older and more established"],
        correctAnswerIndex: 1,
        explanation: "Zustand is known for its minimal API and lack of boilerplate, making it much simpler and faster to set up global state compared to traditional Redux."
      }
    ]
  },
  {
    day: 22,
    phase: "Advanced React",
    title: "Data Fetching & APIs",
    topics: ["TanStack Query", "SWR", "Caching", "Optimistic Updates"],
    resources: [
      { name: "TanStack Query Docs", url: "https://tanstack.com/query/latest/docs/react/overview" },
    ],
    theory: `Libraries like <strong>TanStack Query (formerly React Query)</strong> revolutionize data fetching. They are not just fetching libraries; they are server-state management libraries.<br/><br/>They provide out-of-the-box features for caching, automatic refetching, loading/error state management, and much more.`,
    exercises: [
      {
        title: "CRUD with TanStack Query",
        description: "Show an example of how to use TanStack Query to fetch a list of todos and handle adding a new one.",
        solution: {
          code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';\n\nconst { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });\n\nconst mutation = useMutation({\n  mutationFn: addTodo,\n  onSuccess: () => {\n    queryClient.invalidateQueries({ queryKey: ['todos'] });\n  },\n});`,
          explanation: `The \`useQuery\` hook fetches and caches data. The \`useMutation\` hook handles updates. Crucially, after a successful mutation, we \`invalidateQueries\` to tell TanStack Query to automatically refetch the data, keeping the UI in sync.`,
        },
      },
    ],
    quiz: [
      {
        question: "In TanStack Query, what is the purpose of `invalidateQueries`?",
        options: ["To delete data from the cache", "To mark cached data as stale, triggering a refetch", "To force an error state", "To manually update the cache"],
        correctAnswerIndex: 1,
        explanation: "Invalidating a query marks its data as stale. TanStack Query will then automatically refetch that data in the background to keep it up-to-date."
      }
    ]
  },
  // =================================================================
  // PHASE 5: Production Ready (Days 23-25)
  // =================================================================
  {
    day: 23,
    phase: "Production Ready",
    title: "Testing",
    topics: ["Jest", "React Testing Library", "Component Testing"],
    resources: [
      { name: "React Testing Library Docs", url: "https://testing-library.com/docs/react-testing-library/intro/" },
    ],
    theory: `Testing is crucial for robust applications. In React, the common stack is <strong>Jest</strong> (a test runner) and <strong>React Testing Library</strong>. The testing library encourages you to write tests that resemble how users interact with your application, focusing on behavior rather than implementation details.`,
    exercises: [
      {
        title: "Component Unit Tests",
        description: "Write tests for a simple `Button` component to ensure it renders correctly and that its `onClick` handler is called.",
        solution: {
          code: `import { render, screen, fireEvent } from '@testing-library/react';\n\ntest('calls onClick handler when clicked', () => {\n  const handleClick = jest.fn();\n  render(<Button onClick={handleClick}>Click Me</Button>);\n  fireEvent.click(screen.getByText(/click me/i));\n  expect(handleClick).toHaveBeenCalledTimes(1);\n});`,
          explanation: `We \`render\` the component, find the button using \`screen\`, simulate a click with \`fireEvent\`, and then \`expect\` that our mock function was called.`,
        },
      },
    ],
    quiz: [
      {
        question: "What is the core philosophy of React Testing Library?",
        options: ["The more tests, the better", "Test implementation details, not behavior", "The more your tests resemble the way your software is used, the more confidence they can give you", "Only test components that fetch data"],
        correctAnswerIndex: 2,
        explanation: "The library's guiding principle is to test components from the user's perspective, which leads to more resilient and maintainable tests."
      }
    ]
  },
  {
    day: 24,
    phase: "Production Ready",
    title: "Performance & Build",
    topics: ["Optimization", "Lazy Loading", "Code Splitting", "Vite/Webpack"],
    resources: [
      { name: "React Docs: Code-Splitting", url: "https://react.dev/reference/react/lazy" },
    ],
    theory: `React performance optimization focuses on preventing unnecessary re-renders. <strong>Code splitting</strong> is a feature supported by bundlers that can create multiple bundles that can be dynamically loaded at runtime. This allows you to "lazy load" parts of your application on demand, improving initial load performance.`,
    exercises: [
      {
        title: "Route-based Code Splitting",
        description: "Show how to use `React.lazy` and `Suspense` to code-split a component that is only loaded when a user navigates to a specific route.",
        solution: {
          code: `import { lazy, Suspense } from 'react';\n\nconst AboutPage = lazy(() => import('./pages/AboutPage'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      {/* Routes setup */}\n    </Suspense>\n  );\n}`,
          explanation: `The \`React.lazy\` function lets you render a dynamic import as a regular component. \`Suspense\` is used to show a fallback UI (like a loading spinner) while the lazy component is being loaded.`,
        },
      },
    ],
    quiz: [
      {
        question: "In React, what is the purpose of the `<Suspense>` component?",
        options: ["To handle errors in child components", "To provide a fallback UI while lazy-loaded components are loading", "To suspend rendering of the entire app", "To manage global state"],
        correctAnswerIndex: 1,
        explanation: "`Suspense` is used to wrap lazy components and show a fallback (e.g., a spinner) until the necessary code has been loaded."
      }
    ]
  },
  {
    day: 25,
    phase: "Production Ready",
    title: "Final Project",
    topics: ["Full Application Integration"],
    resources: [
      { name: "React Docs: Thinking in React", url: "https://react.dev/learn/thinking-in-react" },
    ],
    theory: `Congratulations! Today is about combining all the concepts you've learned—components, state, effects, hooks, routing, and state management—to build a complete application.<br/><br/>Focus on building a robust, well-structured application. Think about component reusability, state management strategy, and user experience.`,
    exercises: [
      {
        title: "Project: Task Management Platform",
        description: "Plan and build a task management application (like a simplified Trello). It should allow users to create projects, add tasks, and persist the data to localStorage or a backend.",
        solution: {
          code: `// This is a high-level architectural example.\n// You would structure your app with components for the board, lists, and cards.\n// State could be managed with Context or a library like Zustand.\n// Data would be fetched from an API you create.\n\nfunction App() {\n  // ... routing, providers, and layout\n}`,
          explanation: `A final project requires breaking down the UI into a component hierarchy, planning your state management strategy, handling user interactions, and connecting to a data source.`,
        },
      },
    ],
    quiz: [
      {
        question: "What is often the first step when building a complex React application?",
        options: ["Choosing a CSS library", "Writing all the state logic", "Breaking the UI into a component hierarchy", "Setting up the database"],
        correctAnswerIndex: 2,
        explanation: "As described in the 'Thinking in React' guide, the first step is almost always to look at the design and break it down into a tree of reusable components."
      }
    ]
  }
];

// 3. ========= ADD HELPER DATA AND FUNCTIONS =========
export const phases = [
  { name: "JavaScript Fundamentals", days: "Days 1-7", bgGradient: "from-blue-100", darkBgGradient: "dark:from-blue-900/50", gradient: "from-blue-500 to-sky-500" },
  { name: "Advanced JavaScript", days: "Days 8-11", bgGradient: "from-purple-100", darkBgGradient: "dark:from-purple-900/50", gradient: "from-purple-500 to-indigo-500" },
  { name: "React Fundamentals", days: "Days 12-16", bgGradient: "from-green-100", darkBgGradient: "dark:from-green-900/50", gradient: "from-green-500 to-emerald-500" },
  { name: "Advanced React", days: "Days 17-22", bgGradient: "from-yellow-100", darkBgGradient: "dark:from-yellow-900/50", gradient: "from-yellow-500 to-amber-500" },
  { name: "Production Ready", days: "Days 23-25", bgGradient: "from-red-100", darkBgGradient: "dark:from-red-900/50", gradient: "from-red-500 to-rose-500" },
];

export const courseDays = courseData; // Alias for clarity

export function getPhaseForDay(day: number) {
  if (day >= 1 && day <= 7) return phases[0];
  if (day >= 8 && day <= 11) return phases[1];
  if (day >= 12 && day <= 16) return phases[2];
  if (day >= 17 && day <= 22) return phases[3];
  if (day >= 23 && day <= 25) return phases[4];
  return null;
}