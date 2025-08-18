"use client"

// Course data types
export interface Exercise {
  question: string
  solution: string
}

export interface CourseDay {
  day: number
  title: string
  phase: string
  theory: string
  exercises: Exercise[]
  resources: string[]
}

export interface Phase {
  name: string
  description: string
  days: number[]
  color: string
  gradient: string
}

// <CHANGE> Complete course data with all 25 days
export const courseData: CourseDay[] = [
  {
    day: 1,
    title: "Introduction to JavaScript",
    phase: "JavaScript Fundamentals",
    theory: `
      <h2>Welcome to JavaScript!</h2>
      <p>JavaScript is a versatile programming language that powers the web. It's used for creating interactive websites, web applications, and even server-side development.</p>
      
      <h3>What is JavaScript?</h3>
      <p>JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It's characterized by:</p>
      <ul>
        <li>Dynamic typing</li>
        <li>First-class functions</li>
        <li>Prototype-based object-orientation</li>
        <li>Event-driven programming</li>
      </ul>

      <h3>JavaScript in the Browser</h3>
      <p>In web browsers, JavaScript can manipulate the DOM (Document Object Model), handle user events, and communicate with servers.</p>
    `,
    exercises: [
      {
        question: "Write a simple JavaScript program that displays 'Hello, World!' in the console.",
        solution: `console.log('Hello, World!');`
      },
      {
        question: "Create a variable to store your name and display it.",
        solution: `const myName = 'John Doe';
console.log('My name is:', myName);`
      }
    ],
    resources: [
      "MDN JavaScript Guide",
      "JavaScript.info",
      "Eloquent JavaScript (book)"
    ]
  },
  {
    day: 2,
    title: "Variables and Data Types",
    phase: "JavaScript Fundamentals",
    theory: `
      <h2>Variables and Data Types</h2>
      <p>Variables are containers for storing data values. JavaScript has several data types including primitives and objects.</p>
      
      <h3>Variable Declarations</h3>
      <p>JavaScript provides three ways to declare variables:</p>
      <ul>
        <li><code>var</code> - Function-scoped or globally-scoped</li>
        <li><code>let</code> - Block-scoped</li>
        <li><code>const</code> - Block-scoped, cannot be reassigned</li>
      </ul>

      <h3>Primitive Data Types</h3>
      <ul>
        <li><strong>Number:</strong> Integers and floating-point numbers</li>
        <li><strong>String:</strong> Text data</li>
        <li><strong>Boolean:</strong> true or false</li>
        <li><strong>Undefined:</strong> Variable declared but not assigned</li>
        <li><strong>Null:</strong> Intentional absence of value</li>
        <li><strong>Symbol:</strong> Unique identifier</li>
        <li><strong>BigInt:</strong> Large integers</li>
      </ul>
    `,
    exercises: [
      {
        question: "Declare variables of different data types and log their types using typeof.",
        solution: `let name = 'Alice';
let age = 25;
let isStudent = true;
let score = null;
let grade;

console.log(typeof name);     // string
console.log(typeof age);      // number
console.log(typeof isStudent); // boolean
console.log(typeof score);    // object (null is object in JS)
console.log(typeof grade);    // undefined`
      },
      {
        question: "Create a const variable for PI and calculate the area of a circle with radius 5.",
        solution: `const PI = 3.14159;
const radius = 5;
const area = PI * radius * radius;
console.log('Area of circle:', area);`
      }
    ],
    resources: [
      "MDN Variables Guide",
      "JavaScript Data Types",
      "Let vs Const vs Var"
    ]
  },
  {
    day: 3,
    title: "Functions and Scope",
    phase: "JavaScript Fundamentals",
    theory: `
      <h2>Functions and Scope</h2>
      <p>Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.</p>
      
      <h3>Function Declaration</h3>
      <p>Functions can be declared in several ways:</p>
      <ul>
        <li>Function declarations</li>
        <li>Function expressions</li>
        <li>Arrow functions</li>
      </ul>

      <h3>Scope</h3>
      <p>Scope determines where variables can be accessed in your code:</p>
      <ul>
        <li><strong>Global scope:</strong> Variables accessible everywhere</li>
        <li><strong>Function scope:</strong> Variables accessible within the function</li>
        <li><strong>Block scope:</strong> Variables accessible within the block</li>
      </ul>
    `,
    exercises: [
      {
        question: "Write a function that takes two numbers and returns their sum.",
        solution: `function addNumbers(a, b) {
  return a + b;
}

// Arrow function version
const addNumbersArrow = (a, b) => a + b;

console.log(addNumbers(5, 3)); // 8
console.log(addNumbersArrow(5, 3)); // 8`
      },
      {
        question: "Create a function that demonstrates different scopes.",
        solution: `let globalVar = 'I am global';

function demonstrateScope() {
  let functionVar = 'I am in function scope';
  
  if (true) {
    let blockVar = 'I am in block scope';
    console.log(globalVar);    // Accessible
    console.log(functionVar);  // Accessible
    console.log(blockVar);     // Accessible
  }
  
  console.log(globalVar);      // Accessible
  console.log(functionVar);    // Accessible
  // console.log(blockVar);    // Error: not accessible
}

demonstrateScope();`
      }
    ],
    resources: [
      "MDN Functions",
      "JavaScript Scope",
      "Arrow Functions Guide"
    ]
  },
  {
    day: 4,
    title: "Control Structures",
    phase: "JavaScript Fundamentals",
    theory: `
      <h2>Control Structures</h2>
      <p>Control structures allow you to control the flow of your program execution based on conditions and loops.</p>
      
      <h3>Conditional Statements</h3>
      <ul>
        <li><code>if...else</code> statements</li>
        <li><code>switch</code> statements</li>
        <li>Ternary operator</li>
      </ul>

      <h3>Loops</h3>
      <ul>
        <li><code>for</code> loop</li>
        <li><code>while</code> loop</li>
        <li><code>do...while</code> loop</li>
        <li><code>for...in</code> loop</li>
        <li><code>for...of</code> loop</li>
      </ul>
    `,
    exercises: [
      {
        question: "Write a program that checks if a number is positive, negative, or zero.",
        solution: `function checkNumber(num) {
  if (num > 0) {
    return 'Positive';
  } else if (num < 0) {
    return 'Negative';
  } else {
    return 'Zero';
  }
}

// Ternary operator version
const checkNumberTernary = (num) => 
  num > 0 ? 'Positive' : num < 0 ? 'Negative' : 'Zero';

console.log(checkNumber(5));   // Positive
console.log(checkNumber(-3));  // Negative
console.log(checkNumber(0));   // Zero`
      },
      {
        question: "Create a function that prints numbers from 1 to 10 using different loop types.",
        solution: `// For loop
console.log('For loop:');
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// While loop
console.log('While loop:');
let j = 1;
while (j <= 10) {
  console.log(j);
  j++;
}

// Do-while loop
console.log('Do-while loop:');
let k = 1;
do {
  console.log(k);
  k++;
} while (k <= 10);`
      }
    ],
    resources: [
      "MDN Control Flow",
      "JavaScript Loops",
      "Conditional Statements"
    ]
  },
  {
    day: 5,
    title: "Arrays and Objects",
    phase: "JavaScript Fundamentals",
    theory: `
      <h2>Arrays and Objects</h2>
      <p>Arrays and objects are fundamental data structures in JavaScript for storing and organizing data.</p>
      
      <h3>Arrays</h3>
      <p>Arrays are ordered lists of values. They can store multiple values in a single variable.</p>
      <ul>
        <li>Zero-indexed</li>
        <li>Dynamic size</li>
        <li>Can store mixed data types</li>
      </ul>

      <h3>Objects</h3>
      <p>Objects are collections of key-value pairs. They represent entities with properties and methods.</p>
      <ul>
        <li>Properties (key-value pairs)</li>
        <li>Methods (functions as properties)</li>
        <li>Dynamic property addition/removal</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create an array of fruits and demonstrate various array methods.",
        solution: `const fruits = ['apple', 'banana', 'orange'];

// Adding elements
fruits.push('grape');        // Add to end
fruits.unshift('mango');     // Add to beginning

console.log(fruits); // ['mango', 'apple', 'banana', 'orange', 'grape']

// Removing elements
const lastFruit = fruits.pop();      // Remove from end
const firstFruit = fruits.shift();   // Remove from beginning

console.log('Removed:', lastFruit, firstFruit);
console.log('Remaining:', fruits);

// Array methods
console.log('Length:', fruits.length);
console.log('Index of banana:', fruits.indexOf('banana'));
console.log('Includes orange:', fruits.includes('orange'));`
      },
      {
        question: "Create a person object with properties and methods.",
        solution: `const person = {
  name: 'John Doe',
  age: 30,
  city: 'New York',
  hobbies: ['reading', 'swimming', 'coding'],
  
  // Method
  introduce: function() {
    return \`Hi, I'm \${this.name} and I'm \${this.age} years old.\`;
  },
  
  // Arrow function method (be careful with 'this')
  getHobbies: () => {
    return person.hobbies.join(', ');
  }
};

console.log(person.introduce());
console.log('Hobbies:', person.getHobbies());

// Adding new property
person.email = 'john@example.com';
console.log('Email:', person.email);

// Accessing properties
console.log('Name:', person['name']);
console.log('Age:', person.age);`
      }
    ],
    resources: [
      "MDN Arrays",
      "MDN Objects",
      "JavaScript Array Methods"
    ]
  },
  {
    day: 6,
    title: "DOM Manipulation",
    phase: "JavaScript Fundamentals",
    theory: `
      <h2>DOM Manipulation</h2>
      <p>The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page structure as a tree of objects.</p>
      
      <h3>Selecting Elements</h3>
      <ul>
        <li><code>getElementById()</code></li>
        <li><code>getElementsByClassName()</code></li>
        <li><code>getElementsByTagName()</code></li>
        <li><code>querySelector()</code></li>
        <li><code>querySelectorAll()</code></li>
      </ul>

      <h3>Modifying Elements</h3>
      <ul>
        <li>Changing content: <code>innerHTML</code>, <code>textContent</code></li>
        <li>Changing attributes: <code>setAttribute()</code>, <code>getAttribute()</code></li>
        <li>Changing styles: <code>style</code> property</li>
        <li>Adding/removing classes: <code>classList</code></li>
      </ul>
    `,
    exercises: [
      {
        question: "Create HTML elements and manipulate them with JavaScript.",
        solution: `// HTML structure needed:
// <div id="container">
//   <h1 id="title">Original Title</h1>
//   <p class="description">Original description</p>
//   <button id="changeBtn">Change Content</button>
// </div>

// Selecting elements
const title = document.getElementById('title');
const description = document.querySelector('.description');
const button = document.getElementById('changeBtn');
const container = document.getElementById('container');

// Modifying content
title.textContent = 'New Title!';
description.innerHTML = '<strong>Updated description</strong>';

// Changing styles
title.style.color = 'blue';
title.style.fontSize = '2em';

// Adding event listener
button.addEventListener('click', function() {
  container.style.backgroundColor = 'lightblue';
  button.textContent = 'Content Changed!';
});

// Adding new element
const newParagraph = document.createElement('p');
newParagraph.textContent = 'This is a new paragraph';
container.appendChild(newParagraph);`
      },
      {
        question: "Create a simple todo list with add and remove functionality.",
        solution: `// HTML needed:
// <div id="todoApp">
//   <input type="text" id="todoInput" placeholder="Enter a task">
//   <button id="addBtn">Add Task</button>
//   <ul id="todoList"></ul>
// </div>

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

function addTodo() {
  const taskText = todoInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }
  
  // Create list item
  const li = document.createElement('li');
  li.innerHTML = \`
    <span>\${taskText}</span>
    <button onclick="removeTask(this)">Remove</button>
  \`;
  
  todoList.appendChild(li);
  todoInput.value = ''; // Clear input
}

function removeTask(button) {
  const li = button.parentElement;
  todoList.removeChild(li);
}

// Event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});`
      }
    ],
    resources: [
      "MDN DOM Introduction",
      "JavaScript DOM Methods",
      "Event Handling Guide"
    ]
  },
  {
    day: 7,
    title: "Events and Event Handling",
    phase: "JavaScript Fundamentals",
    theory: `
      <h2>Events and Event Handling</h2>
      <p>Events are actions that happen in the browser, such as clicks, key presses, or page loads. Event handling allows you to respond to these actions.</p>
      
      <h3>Common Events</h3>
      <ul>
        <li><code>click</code> - Mouse click</li>
        <li><code>keydown/keyup</code> - Keyboard events</li>
        <li><code>load</code> - Page/image loading</li>
        <li><code>submit</code> - Form submission</li>
        <li><code>change</code> - Input value change</li>
        <li><code>mouseover/mouseout</code> - Mouse hover</li>
      </ul>

      <h3>Event Handling Methods</h3>
      <ul>
        <li>HTML event attributes</li>
        <li><code>addEventListener()</code></li>
        <li>Event object properties</li>
        <li>Event delegation</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create a form with validation using event handling.",
        solution: `// HTML needed:
// <form id="userForm">
//   <input type="text" id="username" placeholder="Username" required>
//   <input type="email" id="email" placeholder="Email" required>
//   <input type="password" id="password" placeholder="Password" required>
//   <button type="submit">Submit</button>
// </form>
// <div id="message"></div>

const form = document.getElementById('userForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const message = document.getElementById('message');

// Form submission event
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission
  
  // Validation
  if (username.value.length < 3) {
    showMessage('Username must be at least 3 characters', 'error');
    return;
  }
  
  if (password.value.length < 6) {
    showMessage('Password must be at least 6 characters', 'error');
    return;
  }
  
  showMessage('Form submitted successfully!', 'success');
});

// Real-time validation
username.addEventListener('input', function() {
  if (this.value.length < 3) {
    this.style.borderColor = 'red';
  } else {
    this.style.borderColor = 'green';
  }
});

function showMessage(text, type) {
  message.textContent = text;
  message.className = type;
  message.style.color = type === 'error' ? 'red' : 'green';
}`
      },
      {
        question: "Create an interactive image gallery with keyboard navigation.",
        solution: `// HTML needed:
// <div id="gallery">
//   <img id="currentImage" src="image1.jpg" alt="Gallery Image">
//   <div id="controls">
//     <button id="prevBtn">Previous</button>
//     <button id="nextBtn">Next</button>
//   </div>
//   <div id="imageInfo">Image 1 of 5</div>
// </div>

const images = [
  'image1.jpg',
  'image2.jpg', 
  'image3.jpg',
  'image4.jpg',
  'image5.jpg'
];

let currentIndex = 0;
const currentImage = document.getElementById('currentImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageInfo = document.getElementById('imageInfo');

function updateImage() {
  currentImage.src = images[currentIndex];
  imageInfo.textContent = \`Image \${currentIndex + 1} of \${images.length}\`;
  
  // Update button states
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === images.length - 1;
}

function showPrevious() {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage();
  }
}

function showNext() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateImage();
  }
}

// Button events
prevBtn.addEventListener('click', showPrevious);
nextBtn.addEventListener('click', showNext);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    showPrevious();
  } else if (e.key === 'ArrowRight') {
    showNext();
  }
});

// Initialize
updateImage();`
      }
    ],
    resources: [
      "MDN Event Reference",
      "JavaScript Events Tutorial",
      "Event Delegation Guide"
    ]
  },
  {
    day: 8,
    title: "ES6+ Features",
    phase: "Modern JavaScript",
    theory: `
      <h2>ES6+ Features</h2>
      <p>ES6 (ECMAScript 2015) and later versions introduced many powerful features that make JavaScript more expressive and easier to work with.</p>
      
      <h3>Key ES6+ Features</h3>
      <ul>
        <li>Arrow functions</li>
        <li>Template literals</li>
        <li>Destructuring assignment</li>
        <li>Spread and rest operators</li>
        <li>Default parameters</li>
        <li>Classes</li>
        <li>Modules (import/export)</li>
        <li>Promises and async/await</li>
      </ul>
    `,
    exercises: [
      {
        question: "Demonstrate arrow functions and template literals.",
        solution: `// Traditional function vs Arrow function
function traditionalFunction(name) {
  return 'Hello, ' + name + '!';
}

const arrowFunction = (name) => \`Hello, \${name}!\`;

// Arrow function variations
const square = x => x * x;  // Single parameter, no parentheses
const add = (a, b) => a + b;  // Multiple parameters
const greet = () => 'Hello World!';  // No parameters

// Template literals
const name = 'Alice';
const age = 25;
const message = \`
  Name: \${name}
  Age: \${age}
  Birth Year: \${new Date().getFullYear() - age}
\`;

console.log(message);

// Multi-line strings
const html = \`
  <div class="user-card">
    <h2>\${name}</h2>
    <p>Age: \${age}</p>
  </div>
\`;

console.log(html);`
      },
      {
        question: "Use destructuring assignment and spread operator.",
        solution: `// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log('First:', first);      // 1
console.log('Second:', second);    // 2
console.log('Rest:', rest);        // [3, 4, 5]

// Object destructuring
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
  country: 'USA'
};

const { name, age, ...address } = person;
console.log('Name:', name);        // John
console.log('Age:', age);          // 30
console.log('Address:', address);  // { city: 'New York', country: 'USA' }

// Destructuring with renaming
const { name: fullName, city: location } = person;
console.log('Full Name:', fullName);
console.log('Location:', location);

// Spread operator with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log('Combined:', combined); // [1, 2, 3, 4, 5, 6]

// Spread operator with objects
const defaults = { theme: 'dark', language: 'en' };
const userPrefs = { language: 'es', fontSize: 14 };
const settings = { ...defaults, ...userPrefs };
console.log('Settings:', settings); // { theme: 'dark', language: 'es', fontSize: 14 }`
      }
    ],
    resources: [
      "ES6 Features Guide",
      "MDN Arrow Functions",
      "Destructuring Assignment"
    ]
  },
  {
    day: 9,
    title: "Asynchronous JavaScript",
    phase: "Modern JavaScript",
    theory: `
      <h2>Asynchronous JavaScript</h2>
      <p>Asynchronous programming allows JavaScript to perform long-running operations without blocking the main thread.</p>
      
      <h3>Asynchronous Patterns</h3>
      <ul>
        <li><strong>Callbacks:</strong> Functions passed as arguments</li>
        <li><strong>Promises:</strong> Objects representing eventual completion</li>
        <li><strong>Async/Await:</strong> Syntactic sugar for promises</li>
      </ul>

      <h3>Common Use Cases</h3>
      <ul>
        <li>API calls</li>
        <li>File operations</li>
        <li>Timers and delays</li>
        <li>Database operations</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create examples of callbacks, promises, and async/await.",
        solution: `// 1. Callbacks
function fetchDataCallback(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'John' };
    callback(null, data);  // null for error, data for success
  }, 1000);
}

fetchDataCallback((error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Callback data:', data);
  }
});

// 2. Promises
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        resolve({ id: 2, name: 'Alice' });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
}

fetchDataPromise()
  .then(data => {
    console.log('Promise data:', data);
    return data.name.toUpperCase();
  })
  .then(upperName => {
    console.log('Uppercase name:', upperName);
  })
  .catch(error => {
    console.error('Promise error:', error.message);
  });

// 3. Async/Await
async function fetchDataAsync() {
  try {
    const data = await fetchDataPromise();
    console.log('Async/await data:', data);
    
    const upperName = data.name.toUpperCase();
    console.log('Async uppercase name:', upperName);
    
    return data;
  } catch (error) {
    console.error('Async/await error:', error.message);
    throw error;
  }
}

fetchDataAsync();`
      },
      {
        question: "Create a function that fetches data from multiple APIs concurrently.",
        solution: `// Simulate API calls
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: \`User \${id}\`, email: \`user\${id}@example.com\` });
    }, Math.random() * 1000 + 500);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', userId },
        { id: 2, title: 'Post 2', userId }
      ]);
    }, Math.random() * 1000 + 500);
  });
}

function fetchComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Great post!', postId },
        { id: 2, text: 'Thanks for sharing', postId }
      ]);
    }, Math.random() * 1000 + 500);
  });
}

// Sequential execution (slower)
async function fetchDataSequential() {
  console.log('Starting sequential fetch...');
  const start = Date.now();
  
  const user = await fetchUser(1);
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  
  const end = Date.now();
  console.log('Sequential result:', { user, posts, comments });
  console.log(\`Sequential time: \${end - start}ms\`);
}

// Concurrent execution (faster)
async function fetchDataConcurrent() {
  console.log('Starting concurrent fetch...');
  const start = Date.now();
  
  // Start all requests simultaneously
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  
  const end = Date.now();
  console.log('Concurrent result:', { user, posts, comments });
  console.log(\`Concurrent time: \${end - start}ms\`);
}

// Run both examples
fetchDataSequential();
fetchDataConcurrent();`
      }
    ],
    resources: [
      "MDN Promises",
      "Async/Await Guide",
      "JavaScript Asynchronous Programming"
    ]
  },
  {
    day: 10,
    title: "Modules and Build Tools",
    phase: "Modern JavaScript",
    theory: `
      <h2>Modules and Build Tools</h2>
      <p>Modules allow you to organize code into separate files and reuse functionality across your application.</p>
      
      <h3>ES6 Modules</h3>
      <ul>
        <li><code>export</code> - Make functions/variables available</li>
        <li><code>import</code> - Use exported functionality</li>
        <li>Default exports vs Named exports</li>
        <li>Dynamic imports</li>
      </ul>

      <h3>Build Tools</h3>
      <ul>
        <li><strong>Webpack:</strong> Module bundler</li>
        <li><strong>Vite:</strong> Fast build tool</li>
        <li><strong>Parcel:</strong> Zero-config bundler</li>
        <li><strong>Rollup:</strong> Module bundler for libraries</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create a utility module with various export patterns.",
        solution: `// utils.js - Utility module
export const PI = 3.14159;

export function calculateArea(radius) {
  return PI * radius * radius;
}

export function calculateCircumference(radius) {
  return 2 * PI * radius;
}

// Default export
export default function greet(name) {
  return \`Hello, \${name}!\`;
}

// Named export of multiple items
export { PI as MATH_PI, calculateArea as area };

// Class export
export class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
  
  multiply(a, b) {
    return a * b;
  }
  
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}

// main.js - Using the module
import greet, { 
  PI, 
  calculateArea, 
  calculateCircumference,
  Calculator,
  MATH_PI as MathPI 
} from './utils.js';

console.log(greet('World'));
console.log('PI value:', PI);
console.log('Area of circle (r=5):', calculateArea(5));
console.log('Circumference (r=5):', calculateCircumference(5));

const calc = new Calculator();
console.log('Addition:', calc.add(10, 5));
console.log('Division:', calc.divide(10, 2));

// Dynamic import
async function loadMathUtils() {
  try {
    const mathModule = await import('./utils.js');
    console.log('Dynamically loaded PI:', mathModule.PI);
  } catch (error) {
    console.error('Failed to load module:', error);
  }
}

loadMathUtils();`
      }
    ],
    resources: [
      "MDN Modules",
      "Webpack Documentation",
      "Vite Guide"
    ]
  },
  {
    day: 11,
    title: "Introduction to React",
    phase: "React Basics",
    theory: `
      <h2>Introduction to React</h2>
      <p>React is a JavaScript library for building user interfaces, particularly web applications. It was created by Facebook and is now maintained by Meta and the community.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Components:</strong> Reusable pieces of UI</li>
        <li><strong>JSX:</strong> JavaScript XML syntax extension</li>
        <li><strong>Virtual DOM:</strong> Efficient DOM manipulation</li>
        <li><strong>Unidirectional Data Flow:</strong> Data flows down, events flow up</li>
      </ul>

      <h3>Why React?</h3>
      <ul>
        <li>Component-based architecture</li>
        <li>Reusable code</li>
        <li>Large ecosystem</li>
        <li>Strong community support</li>
        <li>Performance optimization</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create your first React component using JSX.",
        solution: `// App.js
import React from 'react';

// Functional component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component
const Greeting = ({ message }) => {
  return (
    <div>
      <h2>{message}</h2>
      <p>Welcome to React!</p>
    </div>
  );
};

// Main App component
function App() {
  const user = {
    name: 'Alice',
    age: 25
  };
  
  return (
    <div className="app">
      <Welcome name="World" />
      <Welcome name={user.name} />
      <Greeting message="Getting Started with React" />
      
      <div>
        <h3>User Info</h3>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Can Vote: {user.age >= 18 ? 'Yes' : 'No'}</p>
      </div>
      
      {/* Conditional rendering */}
      {user.age >= 18 && (
        <p>You are eligible to vote!</p>
      )}
      
      {/* List rendering */}
      <ul>
        {['React', 'JavaScript', 'HTML', 'CSS'].map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;`
      }
    ],
    resources: [
      "React Official Documentation",
      "JSX Introduction",
      "Thinking in React"
    ]
  },
  {
    day: 12,
    title: "JSX and Components",
    phase: "React Basics",
    theory: `
      <h2>JSX and Components</h2>
      <p>JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. Components are the building blocks of React applications.</p>
      
      <h3>JSX Rules</h3>
      <ul>
        <li>Must return a single parent element</li>
        <li>Use className instead of class</li>
        <li>Use camelCase for attributes</li>
        <li>Self-closing tags must end with /</li>
        <li>JavaScript expressions in curly braces {}</li>
      </ul>

      <h3>Component Types</h3>
      <ul>
        <li><strong>Functional Components:</strong> Simple functions that return JSX</li>
        <li><strong>Class Components:</strong> ES6 classes (legacy, but still used)</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create components demonstrating JSX features and best practices.",
        solution: `// Button.js - Reusable button component
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  size = 'medium'
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger'
  };
  const sizeClasses = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large'
  };
  
  const className = \`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`;
  
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;`
      }
    ],
    resources: [
      "JSX In Depth",
      "React Components Guide",
      "Component Composition"
    ]
  },
  {
    day: 13,
    title: "Props and State",
    phase: "React Basics",
    theory: `
      <h2>Props and State</h2>
      <p>Props and state are fundamental concepts in React for managing data and making components interactive.</p>
      
      <h3>Props (Properties)</h3>
      <ul>
        <li>Data passed from parent to child components</li>
        <li>Read-only (immutable)</li>
        <li>Used for component configuration</li>
        <li>Can be any JavaScript value</li>
      </ul>

      <h3>State</h3>
      <ul>
        <li>Internal component data that can change</li>
        <li>Managed with useState hook</li>
        <li>Triggers re-renders when updated</li>
        <li>Should be treated as immutable</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create a counter component demonstrating state management.",
        solution: `// Counter.js - Basic counter with state
import { useState } from 'react';

const Counter = ({ initialValue = 0, step = 1, min, max }) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => {
    setCount(prevCount => {
      const newCount = prevCount + step;
      return max !== undefined ? Math.min(newCount, max) : newCount;
    });
  };
  
  const decrement = () => {
    setCount(prevCount => {
      const newCount = prevCount - step;
      return min !== undefined ? Math.max(newCount, min) : newCount;
    });
  };
  
  const reset = () => {
    setCount(initialValue);
  };
  
  const isAtMin = min !== undefined && count <= min;
  const isAtMax = max !== undefined && count >= max;
  
  return (
    <div className="counter">
      <h3>Counter</h3>
      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>
      
      <div className="counter-controls">
        <button 
          onClick={decrement}
          disabled={isAtMin}
          className="btn btn-secondary"
        >
          -
        </button>
        
        <button 
          onClick={reset}
          className="btn btn-outline"
        >
          Reset
        </button>
        
        <button 
          onClick={increment}
          disabled={isAtMax}
          className="btn btn-primary"
        >
          +
        </button>
      </div>
      
      <div className="counter-info">
        <small>
          Step: {step}
          {min !== undefined && \`, Min: \${min}\`}
          {max !== undefined && \`, Max: \${max}\`}
        </small>
      </div>
    </div>
  );
};

export default Counter;`
      }
    ],
    resources: [
      "React State and Lifecycle",
      "Props vs State",
      "useState Hook Guide"
    ]
  },
  {
    day: 14,
    title: "Event Handling in React",
    phase: "React Basics",
    theory: `
      <h2>Event Handling in React</h2>
      <p>React uses SyntheticEvents, which are wrappers around native DOM events that provide consistent behavior across different browsers.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>SyntheticEvent:</strong> React's event wrapper</li>
        <li><strong>Event Delegation:</strong> React uses a single event listener</li>
        <li><strong>Event Object:</strong> Contains event information</li>
        <li><strong>Preventing Default:</strong> e.preventDefault()</li>
      </ul>

      <h3>Common Event Types</h3>
      <ul>
        <li>onClick, onSubmit, onChange</li>
        <li>onMouseEnter, onMouseLeave</li>
        <li>onKeyDown, onKeyUp, onKeyPress</li>
        <li>onFocus, onBlur</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create an interactive form with various event handlers.",
        solution: `// InteractiveForm.js - Comprehensive event handling example
import React, { useState } from 'react';

const InteractiveForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    country: '',
    interests: [],
    newsletter: false,
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  
  const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'Australia'];
  const interestOptions = ['Technology', 'Sports', 'Music', 'Travel', 'Cooking', 'Reading'];
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitCount(prev => prev + 1);
    
    // Validation logic here
    console.log('Form submitted:', formData);
  };
  
  return (
    <div className="interactive-form">
      <h2>Registration Form</h2>
      <p>Submit attempts: {submitCount}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username ? 'error' : ''}
            placeholder="Enter username"
          />
          {errors.username && touched.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>
        
        <button type="submit" className="btn btn-primary btn-large">
          Register
        </button>
      </form>
    </div>
  );
};

export default InteractiveForm;`
      }
    ],
    resources: [
      "React Events Guide",
      "SyntheticEvent Documentation",
      "Event Handling Best Practices"
    ]
  },
  {
    day: 15,
    title: "Lists and Keys",
    phase: "React Basics",
    theory: `
      <h2>Lists and Keys in React</h2>
      <p>Rendering lists of data is a common requirement in React applications. Keys help React identify which items have changed, been added, or removed.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Keys:</strong> Unique identifiers for list items</li>
        <li><strong>Reconciliation:</strong> How React updates the DOM efficiently</li>
        <li><strong>Index as Key:</strong> When and why to avoid it</li>
        <li><strong>Stable Keys:</strong> Keys that don't change between renders</li>
      </ul>

      <h3>Best Practices</h3>
      <ul>
        <li>Use unique, stable identifiers as keys</li>
        <li>Avoid using array indices as keys when list can change</li>
        <li>Keys should be unique among siblings</li>
        <li>Don't generate keys during render</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create a todo list demonstrating proper key usage and list manipulation.",
        solution: `// TodoList.js - Comprehensive list management example
import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false, priority: 'high', createdAt: new Date('2024-01-01') },
    { id: 2, text: 'Build a project', completed: false, priority: 'medium', createdAt: new Date('2024-01-02') },
    { id: 3, text: 'Deploy to production', completed: true, priority: 'low', createdAt: new Date('2024-01-03') }
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Add new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const newTodoItem = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      priority: 'medium',
      createdAt: new Date()
    };
    
    setTodos(prev => [...prev, newTodoItem]);
    setNewTodo('');
  };
  
  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  // Delete todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  // Filter todos
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });
  
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add Todo</button>
      </form>
      
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      
      <ul className="todos">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;`
      }
    ],
    resources: [
      "React Lists and Keys",
      "Reconciliation in React",
      "Performance Optimization"
    ]
  },
  {
    day: 16,
    title: "Conditional Rendering",
    phase: "React Intermediate",
    theory: `
      <h2>Conditional Rendering</h2>
      <p>Conditional rendering in React allows you to render different components or elements based on certain conditions, similar to how conditions work in JavaScript.</p>
      
      <h3>Conditional Rendering Techniques</h3>
      <ul>
        <li><strong>if/else statements:</strong> Traditional conditional logic</li>
        <li><strong>Ternary operator:</strong> Inline conditional rendering</li>
        <li><strong>Logical AND (&&):</strong> Render or nothing</li>
        <li><strong>Switch statements:</strong> Multiple conditions</li>
        <li><strong>Immediately Invoked Function Expressions (IIFE):</strong> Complex logic</li>
      </ul>

      <h3>Best Practices</h3>
      <ul>
        <li>Keep conditions simple and readable</li>
        <li>Extract complex logic into functions</li>
        <li>Use meaningful variable names for conditions</li>
        <li>Consider performance implications</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create a user dashboard with different views based on user roles and authentication status.",
        solution: `// UserDashboard.js - Comprehensive conditional rendering example
import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simulate authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const scenarios = [
          null, // Not logged in
          { id: 1, name: 'John Doe', role: 'user', isVerified: true, subscription: 'free' },
          { id: 2, name: 'Jane Admin', role: 'admin', isVerified: true, subscription: 'premium' }
        ];
        
        const randomUser = scenarios[Math.floor(Math.random() * scenarios.length)];
        setUser(randomUser);
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }
  
  // Not authenticated
  if (!user) {
    return (
      <div className="login-prompt">
        <h2>Welcome to Dashboard</h2>
        <p>Please log in to access your dashboard</p>
        <button onClick={() => setUser({ id: 1, name: 'Demo User', role: 'user' })}>
          Log In
        </button>
      </div>
    );
  }
  
  // User verification check
  const isVerified = user.isVerified;
  const isAdmin = user.role === 'admin';
  const isPremium = user.subscription === 'premium';
  
  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <span>{user.name} ({user.role})</span>
      </header>
      
      {/* Verification Banner */}
      {!isVerified && (
        <div className="verification-banner">
          <span>⚠️ Your account is not verified. Some features may be limited.</span>
          <button>Verify Now</button>
        </div>
      )}
      
      <main className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome back, {user.name}!</h2>
          
          {/* Conditional features based on subscription */}
          {isPremium ? (
            <div className="premium-features">
              <h3>Premium Features</h3>
              <ul>
                <li>✅ Advanced Analytics</li>
                <li>✅ Priority Support</li>
                <li>✅ Custom Themes</li>
              </ul>
            </div>
          ) : (
            <div className="upgrade-prompt">
              <h3>Upgrade to Premium</h3>
              <p>Unlock advanced features</p>
              <button>Upgrade Now</button>
            </div>
          )}
        </div>
        
        {/* Admin-only section */}
        {isAdmin && (
          <div className="admin-section">
            <h3>Admin Panel</h3>
            <div className="admin-actions">
              <button>Manage Users</button>
              <button>System Settings</button>
              <button>View Analytics</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;`
      }
    ],
    resources: [
      "Conditional Rendering Guide",
      "React Patterns",
      "Component Design Patterns"
    ]
  },
  {
    day: 17,
    title: "React Hooks - useState and useEffect",
    phase: "React Intermediate",
    theory: `
      <h2>React Hooks - useState and useEffect</h2>
      <p>Hooks are functions that let you use state and other React features in functional components. useState and useEffect are the most commonly used hooks.</p>
      
      <h3>useState Hook</h3>
      <ul>
        <li><strong>Purpose:</strong> Add state to functional components</li>
        <li><strong>Returns:</strong> Array with current state and setter function</li>
        <li><strong>Updates:</strong> Trigger re-renders when state changes</li>
        <li><strong>Batching:</strong> Multiple setState calls are batched</li>
      </ul>

      <h3>useEffect Hook</h3>
      <ul>
        <li><strong>Purpose:</strong> Perform side effects in functional components</li>
        <li><strong>Timing:</strong> Runs after render (by default)</li>
        <li><strong>Dependencies:</strong> Control when effect runs</li>
        <li><strong>Cleanup:</strong> Return function for cleanup</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create a comprehensive example demonstrating various useState patterns.",
        solution: `// StateExamples.js - Comprehensive useState patterns
import React, { useState } from 'react';

const StateExamples = () => {
  // Basic state
  const [count, setCount] = useState(0);
  
  // Object state
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0,
    preferences: {
      theme: 'light',
      notifications: true
    }
  });
  
  // Array state
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build projects', completed: false }
  ]);
  
  // Basic counter operations
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  
  // Object state updates (immutable)
  const updateUserName = (name) => {
    setUser(prevUser => ({
      ...prevUser,
      name
    }));
  };
  
  // Array state operations
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      text: \`New item \${items.length + 1}\`,
      completed: false
    };
    setItems(prevItems => [...prevItems, newItem]);
  };
  
  const toggleItem = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  return (
    <div className="state-examples">
      <h1>useState Hook Examples</h1>
      
      {/* Basic Counter */}
      <section>
        <h2>Basic Counter State</h2>
        <p>Count: <strong>{count}</strong></p>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </section>
      
      {/* Object State */}
      <section>
        <h2>Object State Management</h2>
        <input
          type="text"
          value={user.name}
          onChange={(e) => updateUserName(e.target.value)}
          placeholder="Enter name"
        />
        <p>Name: {user.name}</p>
      </section>
      
      {/* Array State */}
      <section>
        <h2>Array State Operations</h2>
        <button onClick={addItem}>Add Item</button>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
              />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default StateExamples;`
      }
    ],
    resources: [
      "React State and Lifecycle",
      "Props vs State",
      "useState Hook Guide"
    ]
  },
  {
    day: 18,
    title: "Custom Hooks",
    phase: "React Intermediate",
    theory: `
      <h2>Custom Hooks</h2>
      <p>Custom hooks are JavaScript functions that start with "use" and can call other hooks. They allow you to extract component logic into reusable functions.</p>
      
      <h3>Benefits of Custom Hooks</h3>
      <ul>
        <li><strong>Reusability:</strong> Share logic between components</li>
        <li><strong>Separation of Concerns:</strong> Keep components clean</li>
        <li><strong>Testability:</strong> Easier to test isolated logic</li>
        <li><strong>Composition:</strong> Combine multiple hooks</li>
      </ul>

      <h3>Common Custom Hook Patterns</h3>
      <ul>
        <li>Data fetching hooks</li>
        <li>Form handling hooks</li>
        <li>Local storage hooks</li>
        <li>Timer and interval hooks</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create various custom hooks for common use cases.",
        solution: `// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":, error\`);
      return initialValue;
    }
  });
  
  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":, error\`);
    }
  };
  
  return [storedValue, setValue];
};

// hooks/useFetch.js
import { useState, useEffect } from 'react';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (url) {
      fetchData();
    }
  }, [url, JSON.stringify(options)]);
  
  const refetch = () => {
    if (url) {
      fetchData();
    }
  };
  
  return { data, loading, error, refetch };
};

// hooks/useCounter.js
import { useState } from 'react';

export const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);
  const setValue = (value) => setCount(value);
  
  return {
    count,
    increment,
    decrement,
    reset,
    setValue
  };
};

// Example usage component
import React from 'react';
import { useLocalStorage, useFetch, useCounter } from './hooks';

const CustomHooksExample = () => {
  // Using custom hooks
  const [name, setName] = useLocalStorage('userName', '');
  const { data: posts, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const { count, increment, decrement, reset } = useCounter(0, 1);
  
  return (
    <div className="custom-hooks-example">
      <h1>Custom Hooks Example</h1>
      
      {/* Local Storage Hook */}
      <section>
        <h2>useLocalStorage Hook</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name (saved to localStorage)"
        />
        <p>Stored name: {name}</p>
      </section>
      
      {/* Counter Hook */}
      <section>
        <h2>useCounter Hook</h2>
        <p>Count: {count}</p>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </section>
      
      {/* Fetch Hook */}
      <section>
        <h2>useFetch Hook</h2>
        <button onClick={refetch} disabled={loading}>
          {loading ? 'Loading...' : 'Refetch Posts'}
        </button>
        
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {posts && (
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.body.substring(0, 100)}...</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default CustomHooksExample;`
      }
    ],
    resources: [
      "Building Your Own Hooks",
      "Custom Hook Patterns",
      "Hook Rules and Best Practices"
    ]
  },
  {
    day: 19,
    title: "Context API",
    phase: "React Intermediate",
    theory: `
      <h2>Context API</h2>
      <p>The Context API provides a way to pass data through the component tree without having to pass props down manually at every level.</p>
      
      <h3>When to Use Context</h3>
      <ul>
        <li><strong>Global State:</strong> Data needed by many components</li>
        <li><strong>Theme Information:</strong> UI themes, language preferences</li>
        <li><strong>User Authentication:</strong> Current user data</li>
        <li><strong>Avoiding Prop Drilling:</strong> Deep component hierarchies</li>
      </ul>

      <h3>Context Components</h3>
      <ul>
        <li><strong>createContext:</strong> Creates a context object</li>
        <li><strong>Provider:</strong> Provides context value to children</li>
        <li><strong>useContext:</strong> Consumes context in functional components</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create a theme context and authentication context system.",
        solution: `// contexts/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme,
    colors: {
      light: {
        background: '#ffffff',
        text: '#000000',
        primary: '#007bff'
      },
      dark: {
        background: '#1a1a1a',
        text: '#ffffff',
        primary: '#0d6efd'
      }
    }
  };
  
  return (
    <ThemeContext.Provider value={value}>
      <div style={{
        backgroundColor: value.colors[theme].background,
        color: value.colors[theme].text,
        minHeight: '100vh',
        transition: 'all 0.3s ease'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulate checking for existing session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: 1,
        email,
        name: email.split('@')[0],
        role: 'user'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// components/Header.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <header style={{
      padding: '1rem',
      borderBottom: \`1px solid \${colors[theme].text}20\`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1>My App</h1>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: colors[theme].primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
        </button>
        
        {isAuthenticated ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>Welcome, {user.name}!</span>
            <button
              onClick={logout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: colors[theme].text,
                border: \`1px solid \${colors[theme].text}\`,
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </header>
  );
};

// components/LoginForm.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, loading } = useAuth();
  const { theme, colors } = useTheme();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      border: \`1px solid \${colors[theme].text}20\`,
      borderRadius: '8px'
    }}>
      <h2>Login</h2>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: colors[theme].background,
            color: colors[theme].text,
            border: \`1px solid \${colors[theme].text}40\`,
            borderRadius: '4px'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: colors[theme].background,
            color: colors[theme].text,
            border: \`1px solid \${colors[theme].text}40\`,
            borderRadius: '4px'
          }}
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: colors[theme].primary,
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

// App.js - Main application
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import { useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        {isAuthenticated ? (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard! You are now logged in.</p>
          </div>
        ) : (
          <LoginForm />
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;`
      }
    ],
    resources: [
      "React Context API",
      "Context Best Practices",
      "Avoiding Context Hell"
    ]
  },
  {
    day: 20,
    title: "React Router",
    phase: "React Advanced",
    theory: `
      <h2>React Router</h2>
      <p>React Router is the standard routing library for React applications. It enables navigation between different components and manages the application's URL.</p>
      
      <h3>Core Concepts</h3>
      <ul>
        <li><strong>BrowserRouter:</strong> Provides routing functionality</li>
        <li><strong>Routes & Route:</strong> Define path-component mappings</li>
        <li><strong>Link & NavLink:</strong> Navigation components</li>
        <li><strong>useNavigate:</strong> Programmatic navigation</li>
        <li><strong>useParams:</strong> Access URL parameters</li>
      </ul>

      <h3>Advanced Features</h3>
      <ul>
        <li>Nested routes</li>
        <li>Protected routes</li>
        <li>Dynamic routing</li>
        <li>Route guards</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create a complete routing system with navigation, protected routes, and dynamic routing.",
        solution: `// App.js - Main routing setup
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// components/Layout.js - Main layout with navigation
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';

const Layout = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  
  return (
    <div className="app-layout">
      <Navigation />
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>&copy; 2024 My App. All rights reserved.</p>
        <p>Current path: {location.pathname}</p>
      </footer>
    </div>
  );
};

// components/Navigation.js - Navigation component
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">My App</Link>
      </div>
      
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/products"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Products
          </NavLink>
        </li>
        
        {isAuthenticated ? (
          <>
            <li>
              <NavLink 
                to="/dashboard"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/profile"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <span>Welcome, {user?.name}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <NavLink 
              to="/login"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

// components/ProtectedRoute.js - Route protection
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// pages/Products.js - Products listing with search
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999, category: 'electronics' },
    { id: 2, name: 'Phone', price: 699, category: 'electronics' },
    { id: 3, name: 'Book', price: 29, category: 'books' },
    { id: 4, name: 'Headphones', price: 199, category: 'electronics' }
  ]);
  
  const searchTerm = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category || product.category === category;
    return matchesSearch && matchesCategory;
  });
  
  const handleSearchChange = (e) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set('search', e.target.value);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };
  
  const handleCategoryChange = (e) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set('category', e.target.value);
    } else {
      newSearchParams.delete('category');
    }
    setSearchParams(newSearchParams);
  };
  
  return (
    <div className="products-page">
      <h1>Products</h1>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
        </select>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>\${product.price}</p>
            <p>Category: {product.category}</p>
            <Link to={\`/products/\${product.id}\`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p>No products found matching your criteria.</p>
      )}
    </div>
  );
};

// pages/ProductDetail.js - Dynamic route with params
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      setLoading(true);
      
      // Mock products data
      const products = {
        '1': { id: 1, name: 'Laptop', price: 999, category: 'electronics', description: 'High-performance laptop' },
        '2': { id: 2, name: 'Phone', price: 699, category: 'electronics', description: 'Latest smartphone' },
        '3': { id: 3, name: 'Book', price: 29, category: 'books', description: 'Interesting book' },
        '4': { id: 4, name: 'Headphones', price: 199, category: 'electronics', description: 'Noise-canceling headphones' }
      };
      
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      
      const foundProduct = products[id];
      setProduct(foundProduct);
      setLoading(false);
    };
    
    fetchProduct();
  }, [id]);
  
  if (loading) {
    return <div>Loading product...</div>;
  }
  
  if (!product) {
    return (
      <div>
        <h1>Product Not Found</h1>
        <p>The product with ID {id} was not found.</p>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }
  
  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>← Back</button>
      
      <h1>{product.name}</h1>
      <p className="price">\${product.price}</p>
      <p className="category">Category: {product.category}</p>
      <p className="description">{product.description}</p>
      
      <div className="actions">
        <button onClick={() => alert('Added to cart!')}>
          Add to Cart
        </button>
        <Link to="/products">View All Products</Link>
      </div>
    </div>
  );
};

// pages/Login.js - Login with redirect
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };
  
  return (
    <div className="login-page">
      <h1>Login</h1>
      
      {location.state?.from && (
        <p>You need to log in to access {location.state.from.pathname}</p>
      )}
      
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default App;`
      }
    ],
    resources: [
      "React Router Documentation",
      "Routing Patterns",
      "Navigation Best Practices"
    ]
  },
  {
    day: 21,
    title: "State Management with Redux",
    phase: "React Advanced",
    theory: `
      <h2>State Management with Redux</h2>
      <p>Redux is a predictable state container for JavaScript applications. It helps manage application state in a centralized store with a unidirectional data flow.</p>
      
      <h3>Core Concepts</h3>
      <ul>
        <li><strong>Store:</strong> Single source of truth for application state</li>
        <li><strong>Actions:</strong> Plain objects describing what happened</li>
        <li><strong>Reducers:</strong> Pure functions that specify state changes</li>
        <li><strong>Dispatch:</strong> Method to send actions to the store</li>
      </ul>

      <h3>Redux Toolkit</h3>
      <ul>
        <li>Modern Redux development approach</li>
        <li>Simplified store setup</li>
        <li>Built-in best practices</li>
        <li>Immer integration for immutable updates</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create a Redux store with Redux Toolkit for a todo application.",
        solution: `// store/store.js - Redux store setup
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todosSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store/slices/todosSlice.js - Todos slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return [
        { id: 1, text: 'Learn Redux', completed: false, priority: 'high' },
        { id: 2, text: 'Build React app', completed: true, priority: 'medium' },
        { id: 3, text: 'Deploy to production', completed: false, priority: 'low' }
      ];
    } catch (error) {
      return rejectWithValue('Failed to fetch todos');
    }
  }
);

// Async thunk for adding todo
export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async (todoText, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        id: Date.now(),
        text: todoText,
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue('Failed to add todo');
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filter: 'all' // all, active, completed
  },
  reducers: {
    // Synchronous actions
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, updates } = action.payload;
      const todo = state.items.find(todo => todo.id === id);
      if (todo) {
        Object.assign(todo, updates);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(todo => !todo.completed);
    },
    markAllCompleted: (state) => {
      state.items.forEach(todo => {
        todo.completed = true;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add todo
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  clearCompleted,
  markAllCompleted
} = todosSlice.actions;

export default todosSlice.reducer;

// Selectors
export const selectAllTodos = (state) => state.todos.items;
export const selectTodosLoading = (state) => state.todos.loading;
export const selectTodosError = (state) => state.todos.error;
export const selectTodosFilter = (state) => state.todos.filter;

export const selectFilteredTodos = (state) => {
  const todos = selectAllTodos(state);
  const filter = selectTodosFilter(state);
  
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const selectTodosStats = (state) => {
  const todos = selectAllTodos(state);
  return {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };
};

// hooks/redux.js - Typed hooks
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// components/TodoApp.js - Main todo component
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  fetchTodos,
  addTodoAsync,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  clearCompleted,
  markAllCompleted,
  selectFilteredTodos,
  selectTodosLoading,
  selectTodosError,
  selectTodosStats,
  selectTodosFilter
} from '../store/slices/todosSlice';

const TodoApp = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectFilteredTodos);
  const loading = useAppSelector(selectTodosLoading);
  const error = useAppSelector(selectTodosError);
  const stats = useAppSelector(selectTodosStats);
  const filter = useAppSelector(selectTodosFilter);
  
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    await dispatch(addTodoAsync(newTodo.trim()));
    setNewTodo('');
  };
  
  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };
  
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  
  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    
    dispatch(updateTodo({
      id: editingId,
      updates: { text: editText.trim() }
    }));
    
    setEditingId(null);
    setEditText('');
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };
  
  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };
  
  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };
  
  const handleMarkAllCompleted = () => {
    dispatch(markAllCompleted());
  };
  
  if (loading && todos.length === 0) {
    return <div className="loading">Loading todos...</div>;
  }
  
  return (
    <div className="todo-app">
      <div className="todo-header">
        <h1>Redux Todo App</h1>
        
        {/* Stats */}
        <div className="todo-stats">
          <span>Total: {stats.total}</span>
          <span>Active: {stats.active}</span>
          <span>Completed: {stats.completed}</span>
        </div>
      </div>
      
      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} className="add-todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !newTodo.trim()}>
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      
      {/* Error Display */}
      {error && (
        <div className="error-message">
          Error: {error}
          <button onClick={() => dispatch(fetchTodos())}>Retry</button>
        </div>
      )}
      
      {/* Filters */}
      <div className="todo-filters">
        <button
          onClick={() => handleFilterChange('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => handleFilterChange('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active ({stats.active})
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed ({stats.completed})
        </button>
      </div>
      
      {/* Bulk Actions */}
      {todos.length > 0 && (
        <div className="bulk-actions">
          <button onClick={handleMarkAllCompleted}>
            Mark All Complete
          </button>
          {stats.completed > 0 && (
            <button onClick={handleClearCompleted}>
              Clear Completed ({stats.completed})
            </button>
          )}
        </div>
      )}
      
      {/* Todo List */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos found.</p>
            {filter !== 'all' && (
              <button onClick={() => handleFilterChange('all')}>
                Show All Todos
              </button>
            )}
          </div>
        ) : (
          <ul className="todos">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={\`todo-item \${todo.completed ? 'completed' : ''}\`}
              >
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  
                  {editingId === todo.id ? (
                    <div className="edit-mode">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                        autoFocus
                      />
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div className="view-mode">
                      <span
                        className="todo-text"
                        onDoubleClick={() => handleStartEdit(todo)}
                      >
                        {todo.text}
                      </span>
                      <span className={\`priority priority-\${todo.priority}\`}>
                        {todo.priority}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="todo-actions">
                  {editingId !== todo.id && (
                    <>
                      <button onClick={() => handleStartEdit(todo)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteTodo(todo.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// App.js - Provider setup
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TodoApp from './components/TodoApp';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <TodoApp />
      </div>
    </Provider>
  );
};

export default App;`
      }
    ],
    resources: [
      "Redux Toolkit Documentation",
      "Redux Best Practices",
      "State Management Patterns"
    ]
  },
  {
    day: 22,
    title: "Testing React Applications",
    phase: "React Advanced",
    theory: `
      <h2>Testing React Applications</h2>
      <p>Testing ensures your React applications work correctly and helps prevent regressions. React applications can be tested at multiple levels.</p>
      
      <h3>Testing Levels</h3>
      <ul>
        <li><strong>Unit Tests:</strong> Test individual components in isolation</li>
        <li><strong>Integration Tests:</strong> Test component interactions</li>
        <li><strong>End-to-End Tests:</strong> Test complete user workflows</li>
      </ul>

      <h3>Testing Tools</h3>
      <ul>
        <li><strong>Jest:</strong> JavaScript testing framework</li>
        <li><strong>React Testing Library:</strong> Simple and complete testing utilities</li>
        <li><strong>MSW:</strong> Mock Service Worker for API mocking</li>
        <li><strong>Cypress/Playwright:</strong> End-to-end testing</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create comprehensive tests for React components using Jest and React Testing Library.",
        solution: `// components/Counter.js - Component to test
import React, { useState } from 'react';

const Counter = ({ 
  initialValue = 0, 
  step = 1, 
  min, 
  max, 
  onCountChange 
}) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => {
    const newCount = count + step;
    const finalCount = max !== undefined ? Math.min(newCount, max) : newCount;
    setCount(finalCount);
    onCountChange?.(finalCount);
  };
  
  const decrement = () => {
    const newCount = count - step;
    const finalCount = min !== undefined ? Math.max(newCount, min) : newCount;
    setCount(finalCount);
    onCountChange?.(finalCount);
  };
  
  const reset = () => {
    setCount(initialValue);
    onCountChange?.(initialValue);
  };
  
  const isAtMin = min !== undefined && count <= min;
  const isAtMax = max !== undefined && count >= max;
  
  return (
    <div data-testid="counter">
      <div data-testid="count-display">
        Count: <span data-testid="count-value">{count}</span>
      </div>
      
      <div data-testid="counter-controls">
        <button
          data-testid="decrement-btn"
          onClick={decrement}
          disabled={isAtMin}
        >
          -
        </button>
        
        <button
          data-testid="reset-btn"
          onClick={reset}
        >
          Reset
        </button>
        
        <button
          data-testid="increment-btn"
          onClick={increment}
          disabled={isAtMax}
        >
          +
        </button>
      </div>
      
      <div data-testid="counter-info">
        <small>
          Step: {step}
          {min !== undefined && \`, Min: \${min}\`}
          {max !== undefined && \`, Max: \${max}\`}
        </small>
      </div>
    </div>
  );
};

export default Counter;

// __tests__/Counter.test.js - Unit tests
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../components/Counter';

describe('Counter Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    test('renders with default props', () => {
      render(<Counter />);
      
      expect(screen.getByTestId('counter')).toBeInTheDocument();
      expect(screen.getByTestId('count-value')).toHaveTextContent('0');
      expect(screen.getByTestId('increment-btn')).toBeInTheDocument();
      expect(screen.getByTestId('decrement-btn')).toBeInTheDocument();
      expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
    });
    
    test('renders with custom initial value', () => {
      render(<Counter initialValue={5} />);
      
      expect(screen.getByTestId('count-value')).toHaveTextContent('5');
    });
    
    test('displays step information', () => {
      render(<Counter step={2} min={0} max={10} />);
      
      expect(screen.getByTestId('counter-info')).toHaveTextContent('Step: 2, Min: 0, Max: 10');
    });
  });
  
  // Interaction tests
  describe('User Interactions', () => {
    test('increments count when increment button is clicked', async () => {
      const user = userEvent.setup();
      render(<Counter />);
      
      const incrementBtn = screen.getByTestId('increment-btn');
      const countValue = screen.getByTestId('count-value');
      
      await user.click(incrementBtn);
      expect(countValue).toHaveTextContent('1');
      
      await user.click(incrementBtn);
      expect(countValue).toHaveTextContent('2');
    });
    
    test('decrements count when decrement button is clicked', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={5} />);
      
      const decrementBtn = screen.getByTestId('decrement-btn');
      const countValue = screen.getByTestId('count-value');
      
      await user.click(decrementBtn);
      expect(countValue).toHaveTextContent('4');
    });
    
    test('resets count when reset button is clicked', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={3} />);
      
      const incrementBtn = screen.getByTestId('increment-btn');
      const resetBtn = screen.getByTestId('reset-btn');
      const countValue = screen.getByTestId('count-value');
      
      // Change the count
      await user.click(incrementBtn);
      await user.click(incrementBtn);
      expect(countValue).toHaveTextContent('5');
      
      // Reset
      await user.click(resetBtn);
      expect(countValue).toHaveTextContent('3');
    });
  });
  
  // Props and configuration tests
  describe('Props and Configuration', () => {
    test('uses custom step value', async () => {
      const user = userEvent.setup();
      render(<Counter step={5} />);
      
      const incrementBtn = screen.getByTestId('increment-btn');
      const countValue = screen.getByTestId('count-value');
      
      await user.click(incrementBtn);
      expect(countValue).toHaveTextContent('5');
      
      await user.click(incrementBtn);
      expect(countValue).toHaveTextContent('10');
    });
    
    test('respects minimum value constraint', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={2} min={0} />);
      
      const decrementBtn = screen.getByTestId('decrement-btn');
      const countValue = screen.getByTestId('count-value');
      
      // Decrement to minimum
      await user.click(decrementBtn);
      await user.click(decrementBtn);
      expect(countValue).toHaveTextContent('0');
      
      // Try to go below minimum
      await user.click(decrementBtn);
      expect(countValue).toHaveTextContent('0');
      
      // Button should be disabled at minimum
      expect(decrementBtn).toBeDisabled();
    });
    
    test('respects maximum value constraint', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={8} max={10} />);
      
      const incrementBtn = screen.getByTestId('increment-btn');
      const countValue = screen.getByTestId('count-value');
      
      // Increment to maximum
      await user.click(incrementBtn);
      await user.click(incrementBtn);
      expect(countValue).toHaveTextContent('10');
      
      // Try to go above maximum
      await user.click(incrementBtn);
      expect(countValue).toHaveTextContent('10');
      
      // Button should be disabled at maximum
      expect(incrementBtn).toBeDisabled();
    });
  });
  
  // Callback tests
  describe('Callbacks', () => {
    test('calls onCountChange when count changes', async () => {
      const user = userEvent.setup();
      const mockOnCountChange = jest.fn();
      
      render(<Counter onCountChange={mockOnCountChange} />);
      
      const incrementBtn = screen.getByTestId('increment-btn');
      
      await user.click(incrementBtn);
      expect(mockOnCountChange).toHaveBeenCalledWith(1);
      
      await user.click(incrementBtn);
      expect(mockOnCountChange).toHaveBeenCalledWith(2);
      
      expect(mockOnCountChange).toHaveBeenCalledTimes(2);
    });
    
    test('calls onCountChange when reset', async () => {
      const user = userEvent.setup();
      const mockOnCountChange = jest.fn();
      
      render(<Counter initialValue={5} onCountChange={mockOnCountChange} />);
      
      const incrementBtn = screen.getByTestId('increment-btn');
      const resetBtn = screen.getByTestId('reset-btn');
      
      await user.click(incrementBtn);
      await user.click(resetBtn);
      
      expect(mockOnCountChange).toHaveBeenCalledWith(6);
      expect(mockOnCountChange).toHaveBeenCalledWith(5);
    });
  });
  
  // Accessibility tests
  describe('Accessibility', () => {
    test('buttons have proper disabled states', () => {
      render(<Counter initialValue={0} min={0} max={0} />);
      
      const incrementBtn = screen.getByTestId('increment-btn');
      const decrementBtn = screen.getByTestId('decrement-btn');
      
      expect(incrementBtn).toBeDisabled();
      expect(decrementBtn).toBeDisabled();
    });
    
    test('has proper ARIA attributes', () => {
      render(<Counter />);
      
      const counter = screen.getByTestId('counter');
      expect(counter).toBeInTheDocument();
      
      // Check that buttons are focusable
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });
});

// components/TodoList.js - More complex component for integration testing
import React, { useState } from 'react';

const TodoList = ({ initialTodos = [] }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false
    };
    
    setTodos(prev => [...prev, todo]);
    setNewTodo('');
  };
  
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });
  
  return (
    <div data-testid="todo-list">
      <form onSubmit={addTodo} data-testid="add-todo-form">
        <input
          data-testid="new-todo-input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit" data-testid="add-todo-btn">
          Add Todo
        </button>
      </form>
      
      <div data-testid="filter-buttons">
        <button
          data-testid="filter-all"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          data-testid="filter-active"
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button
          data-testid="filter-completed"
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>
      
      <ul data-testid="todos">
        {filteredTodos.map(todo => (
          <li key={todo.id} data-testid={\`todo-\${todo.id}\`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-testid={\`toggle-\${todo.id}\`}
            />
            <span
              className={todo.completed ? 'completed' : ''}
              data-testid={\`text-\${todo.id}\`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              data-testid={\`delete-\${todo.id}\`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {filteredTodos.length === 0 && (
        <div data-testid="empty-message">
          No todos found.
        </div>
      )}
    </div>
  );
};

export default TodoList;

// __tests__/TodoList.test.js - Integration tests
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Integration Tests', () => {
  const mockTodos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write tests', completed: true },
    { id: 3, text: 'Deploy app', completed: false }
  ];
  
  describe('Todo Management Workflow', () => {
    test('complete todo management workflow', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      // Initially empty
      expect(screen.getByTestId('empty-message')).toBeInTheDocument();
      
      // Add a new todo
      const input = screen.getByTestId('new-todo-input');
      const addBtn = screen.getByTestId('add-todo-btn');
      
      await user.type(input, 'New todo item');
      await user.click(addBtn);
      
      // Check todo was added
      expect(screen.queryByTestId('empty-message')).not.toBeInTheDocument();
      expect(screen.getByText('New todo item')).toBeInTheDocument();
      expect(input).toHaveValue('');
      
      // Toggle todo completion
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      expect(checkbox).toBeChecked();
      
      // Delete todo
      const deleteBtn = screen.getByText('Delete');
      await user.click(deleteBtn);
      
      // Should be empty again
      expect(screen.getByTestId('empty-message')).toBeInTheDocument();
    });
  });
  
  describe('Filtering Functionality', () => {
    test('filters todos correctly', async () => {
      const user = userEvent.setup();
      render(<TodoList initialTodos={mockTodos} />);
      
      // All todos visible initially
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
      
      // Filter to active todos
      await user.click(screen.getByTestId('filter-active'));
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Deploy app')).toBeInTheDocument();
      expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
      
      // Filter to completed todos
      await user.click(screen.getByTestId('filter-completed'));
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByText('Write tests')).toBeInTheDocument();
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      
      // Back to all todos
      await user.click(screen.getByTestId('filter-all'));
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
  });
  
  describe('Form Validation', () => {
    test('prevents adding empty todos', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      const addBtn = screen.getByTestId('add-todo-btn');
      
      // Try to add empty todo
      await user.click(addBtn);
      expect(screen.getByTestId('empty-message')).toBeInTheDocument();
      
      // Try to add whitespace-only todo
      const input = screen.getByTestId('new-todo-input');
      await user.type(input, '   ');
      await user.click(addBtn);
      expect(screen.getByTestId('empty-message')).toBeInTheDocument();
    });
  });
  
  describe('Keyboard Navigation', () => {
    test('supports keyboard interactions', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      const input = screen.getByTestId('new-todo-input');
      
      // Add todo with Enter key
      await user.type(input, 'Keyboard todo{enter}');
      
      expect(screen.getByText('Keyboard todo')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });
  });
});

// __tests__/setup.js - Test setup file
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// utils/test-utils.js - Custom render function
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Create a custom render function that includes providers
export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        // Add your reducers here
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }
  
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { renderWithProviders as render };`
      }
    ],
    resources: [
      "React Testing Library Documentation",
      "Jest Testing Framework",
      "Testing Best Practices"
    ]
  },
  {
    day: 23,
    title: "Performance Optimization",
    phase: "React Advanced",
    theory: `
      <h2>Performance Optimization</h2>
      <p>React applications can become slow as they grow. Understanding performance optimization techniques helps maintain smooth user experiences.</p>
      
      <h3>Common Performance Issues</h3>
      <ul>
        <li><strong>Unnecessary Re-renders:</strong> Components updating when they don't need to</li>
        <li><strong>Large Bundle Sizes:</strong> Too much JavaScript to download</li>
        <li><strong>Expensive Calculations:</strong> Heavy computations on every render</li>
        <li><strong>Memory Leaks:</strong> Components not cleaning up properly</li>
      </ul>

      <h3>Optimization Techniques</h3>
      <ul>
        <li><strong>React.memo:</strong> Prevent unnecessary re-renders</li>
        <li><strong>useMemo & useCallback:</strong> Memoize expensive calculations</li>
        <li><strong>Code Splitting:</strong> Load code on demand</li>
        <li><strong>Virtualization:</strong> Render only visible items</li>
      </ul>
    `,
    exercises: [
      {
        question: "Create examples demonstrating various React performance optimization techniques.",
        solution: `// hooks/usePerformanceMonitor.js - Custom hook for performance monitoring
import { useEffect, useRef
