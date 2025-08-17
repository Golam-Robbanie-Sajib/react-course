// PART 1 of 3: Days 1-8
export const courseData = [
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
      { name: "JavaScript.info: Variables", url: "https://javascript.info/variables" }
    ],
    theory: `
      Welcome to Day 1! Today, we'll cover the absolute basics of JavaScript: how to store and manage information.
      <br/><br/>
      In programming, we use <strong>variables</strong> to store data values. JavaScript provides three keywords to declare variables: <code>var</code>, <code>let</code>, and <code>const</code>. <code>let</code> and <code>const</code> are modern (ES6+) and are preferred. Use <code>let</code> for variables that will change, and <code>const</code> for variables that will not.
      <br/><br/>
      JavaScript has several primitive <strong>data types</strong>:
      <ul>
        <li><strong>String:</strong> Text, like "hello world".</li>
        <li><strong>Number:</strong> Numeric values, like 42 or 3.14.</li>
        <li><strong>Boolean:</strong> Represents true or false.</li>
        <li><strong>Null:</strong> Represents the intentional absence of any object value.</li>
        <li><strong>Undefined:</strong> A variable that has been declared but not assigned a value.</li>
      </ul>
      Understanding these building blocks is the first crucial step to mastering JavaScript.
    `,
    exercises: [
      {
        title: "Temperature Converter",
        description: "Create a function that converts Celsius to Fahrenheit and vice-versa, with basic input validation.",
        solution: {
          code: `function convertTemperature(value, unit) {
  if (typeof value !== 'number') {
    return "Error: Input value must be a number.";
  }
  const upperUnit = unit.toUpperCase();
  if (upperUnit === 'C') {
    const fahrenheit = (value * 9/5) + 32;
    return \`\${value}°C is \${fahrenheit.toFixed(2)}°F\`;
  } else if (upperUnit === 'F') {
    const celsius = (value - 32) * 5/9;
    return \`\${value}°F is \${celsius.toFixed(2)}°C\`;
  } else {
    return "Error: Invalid unit. Please use 'C' or 'F'.";
  }
}`,
          explanation: `
            <ol>
              <li><strong>Validate Input:</strong> The function first checks if the input <code>value</code> is a number using <code>typeof</code>. If not, it returns an error string immediately.</li>
              <li><strong>Standardize Unit:</strong> It converts the <code>unit</code> parameter to uppercase. This makes the check case-insensitive, so 'c' and 'C' are treated the same.</li>
              <li><strong>Conditional Logic:</strong> Using an <code>if...else if</code> block, it checks the value of the standardized unit.</li>
              <li><strong>Perform Calculation:</strong> If the unit is 'C', it applies the Celsius to Fahrenheit formula. If it's 'F', it applies the Fahrenheit to Celsius formula.</li>
              <li><strong>Format Output:</strong> The result is rounded to two decimal places using <code>.toFixed(2)</code> and returned inside a user-friendly template literal.</li>
            </ol>
          `
        }
      },
      {
        title: "String Manipulation",
        description: "Write a function that takes a string and returns an object with the original string, the capitalized version, and the character count.",
        solution: {
          code: `function analyzeString(text) {
  if (typeof text !== 'string') {
    return "Error: Input must be a string.";
  }
  const capitalizeWords = (str) => {
    return str.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return {
    original: text,
    capitalized: capitalizeWords(text),
    charCount: text.length,
  };
}`,
          explanation: `
            <ol>
                <li><strong>Input Validation:</strong> The function first ensures the provided <code>text</code> is actually a string.</li>
                <li><strong>Helper Function:</strong> An inner arrow function <code>capitalizeWords</code> is defined to handle the capitalization logic.</li>
                <li><strong>Capitalization Logic:</strong> Inside the helper, the string is converted to lowercase, split into an array of words, each word's first letter is capitalized, and then they are joined back into a single string.</li>
                <li><strong>Return Object:</strong> The function returns a new object with three properties: the original text, the result from the <code>capitalizeWords</code> helper, and the string's length.</li>
            </ol>
          `
        }
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
      { name: "JavaScript.info: Function Basics", url: "https://javascript.info/function-basics" }
    ],
    theory: `
      <strong>Functions</strong> are the primary building blocks of a JavaScript program. They are reusable blocks of code that perform a specific task.
      <br/><br/>
      <strong>Scope</strong> determines the accessibility of variables. When a variable is accessed, JavaScript looks for it in the current scope, then in outer scopes up to the global scope. This is the <strong>scope chain</strong>.
    `,
    exercises: [
      {
        title: "Password Strength Validator",
        description: "Create a function that validates a password based on a set of rules (e.g., length, uppercase, lowercase, number, special character).",
        solution: {
          code: `function validatePassword(password) {
  const errors = [];
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*).");
  }
  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}`,
          explanation: `
            <ol>
              <li><strong>Initialize Storage:</strong> An empty array called <code>errors</code> is created to store any validation failure messages.</li>
              <li><strong>Check Rules Sequentially:</strong> The function checks the password against a series of rules, one by one, using <code>if</code> statements.</li>
              <li><strong>Use Regular Expressions:</strong> Each rule uses a <strong>Regular Expression</strong> (e.g., <code>/[a-z]/</code>) and the <code>.test()</code> method to see if the password contains the required character type.</li>
              <li><strong>Collect Errors:</strong> If a rule fails, a descriptive error message is pushed into the <code>errors</code> array.</li>
              <li><strong>Return Result Object:</strong> Finally, it returns an object. The <code>isValid</code> property is a boolean that is <code>true</code> only if the <code>errors</code> array is empty. The array of error messages is also returned.</li>
            </ol>
          `
        }
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
      { name: "JavaScript.info: Objects", url: "https://javascript.info/object" }
    ],
    theory: `
      <strong>Objects</strong> are collections of key-value pairs used to group related data. <strong>Arrays</strong> are ordered lists of values.
      <br/><br/>
      JavaScript provides many powerful array methods, such as <code>map()</code>, <code>filter()</code>, and <code>reduce()</code>. <strong>Destructuring</strong> (ES6) is a convenient way to extract data from objects and arrays into variables.
    `,
    exercises: [
      {
        title: "Student Grade Book",
        description: "Create an object to act as a grade book. It should have functions to add a student, add a grade, and calculate averages.",
        solution: {
          code: `const gradeBook = {
  students: {},
  addStudent: function(name) {
    if (!this.students[name]) {
      this.students[name] = [];
    }
  },
  addGrade: function(name, grade) {
    if (this.students[name]) {
      this.students[name].push(grade);
    }
  },
  getStudentAverage: function(name) {
    if (this.students[name] && this.students[name].length > 0) {
      const grades = this.students[name];
      const sum = grades.reduce((total, grade) => total + grade, 0);
      return sum / grades.length;
    }
    return 0;
  },
  getClassAverage: function() {
    let totalGrades = 0;
    let gradeCount = 0;
    for (const student in this.students) {
      gradeCount += this.students[student].length;
      totalGrades += this.students[student].reduce((sum, grade) => sum + grade, 0);
    }
    return gradeCount > 0 ? totalGrades / gradeCount : 0;
  }
};`,
          explanation: `
            <ol>
              <li><strong>Data Structure:</strong> The main <code>gradeBook</code> object holds a <code>students</code> object. This inner object will use student names as keys and arrays of their grades as values.</li>
              <li><strong>Add Student:</strong> The <code>addStudent</code> method creates a new entry in the <code>students</code> object with an empty array for grades.</li>
              <li><strong>Add Grade:</strong> The <code>addGrade</code> method finds the student by name and pushes the new grade into their corresponding array.</li>
              <li><strong>Student Average:</strong> <code>getStudentAverage</code> uses the powerful <code>.reduce()</code> array method to sum up a student's grades, then divides by the number of grades to find the average.</li>
              <li><strong>Class Average:</strong> <code>getClassAverage</code> iterates through all students, summing up all grades and counting them, then calculates the final average.</li>
            </ol>
          `
        }
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
      { name: "JavaScript.info: Loops", url: "https://javascript.info/while-for" }
    ],
    theory: `
      <strong>Control Flow</strong> is the order in which the computer executes statements. We can control this flow using conditional statements like <code>if...else</code> and <code>switch</code>.
      <br/><br/>
      <strong>Loops</strong> (<code>for</code>, <code>while</code>) are used to execute a block of code repeatedly as long as a condition is true.
    `,
    exercises: [
      {
        title: "Prime Number Generator",
        description: "Write a function that takes a number `n` and returns an array of all prime numbers up to `n`.",
        solution: {
          code: `function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
function generatePrimes(limit) {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}`,
          explanation: `
            <ol>
              <li><strong>Helper Function:</strong> A separate function <code>isPrime</code> is created to keep the logic clean. It determines if a single number is prime.</li>
              <li><strong>Prime Check Logic:</strong> The <code>isPrime</code> function iterates from 2 up to the square root of the number. This is a key optimization, because if a number has a divisor larger than its square root, it must also have one smaller.</li>
              <li><strong>Main Function:</strong> The <code>generatePrimes</code> function initializes an empty <code>primes</code> array.</li>
              <li><strong>Iteration:</strong> It then loops through every number from 2 up to the given <code>limit</code>.</li>
              <li><strong>Populate Array:</strong> In each iteration, it calls the <code>isPrime</code> helper. If the helper returns <code>true</code>, the number is added to the <code>primes</code> array.</li>
              <li><strong>Return Result:</strong> Finally, the array of prime numbers is returned.</li>
            </ol>
          `
        }
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
      { name: "JavaScript.info: Document", url: "https://javascript.info/document" }
    ],
    theory: `
      The <strong>Document Object Model (DOM)</strong> is the browser's representation of your HTML. JavaScript can be used to select, create, and modify these HTML elements to make web pages interactive. We use methods like <code>document.getElementById()</code> to select elements and <code>element.addEventListener()</code> to respond to user actions like clicks.
    `,
    exercises: [
      {
        title: "Interactive Todo List",
        description: "Create the JavaScript logic for a simple todo list. Handle adding, completing, and deleting a todo. Assume the basic HTML structure exists.",
        solution: {
          code: `// Assumes HTML exists with ids: 'todo-input', 'add-btn', 'todo-list'
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('todo-input');
  const addButton = document.getElementById('add-btn');
  const list = document.getElementById('todo-list');
  const addTodo = () => {
    const text = input.value.trim();
    if (text === '') return;
    const li = document.createElement('li');
    li.innerHTML = \`
      <span>\${text}</span>
      <button class="complete-btn">Complete</button>
      <button class="delete-btn">Delete</button>
    \`;
    list.appendChild(li);
    input.value = '';
  };
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-btn')) {
      e.target.parentElement.querySelector('span').style.textDecoration = 'line-through';
    }
    if (e.target.classList.contains('delete-btn')) {
      e.target.parentElement.remove();
    }
  });
  addButton.addEventListener('click', addTodo);
});`,
          explanation: `
            <ol>
              <li><strong>Wait for DOM Load:</strong> The entire script is wrapped in a <code>DOMContentLoaded</code> event listener to ensure the HTML is ready before the script runs.</li>
              <li><strong>Select Elements:</strong> The script gets references to the input field, add button, and the list itself using <code>getElementById</code>.</li>
              <li><strong>Add Todo Logic:</strong> The <code>addTodo</code> function creates a new <code>&lt;li&gt;</code> element, populates it with HTML for the text and buttons, and appends it to the main list.</li>
              <li><strong>Event Delegation:</strong> A single click listener is added to the parent <code>&lt;ul&gt;</code>. This is more efficient than adding a listener to every single button.</li>
              <li><strong>Handle Clicks:</strong> Inside the listener, <code>e.target</code> is used to check *what* was clicked. If it was a complete button, it styles the text. If it was a delete button, it removes the entire parent <code>&lt;li&gt;</code> element.</li>
            </ol>
          `
        }
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
      { name: "MDN: Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" }
    ],
    theory: `
      JavaScript is single-threaded. <strong>Asynchronous JavaScript</strong> allows us to perform long-running tasks (like fetching data) without blocking the main thread, ensuring the UI remains responsive. This is handled with tools like Callbacks, and more modernly, <strong>Promises</strong> and the <strong>Fetch API</strong>.
    `,
    exercises: [
      {
        title: "Weather App using an API",
        description: "Use the Fetch API to get data from a placeholder API and display it on the page.",
        solution: {
          code: `// Assumes HTML: <div id="weather-info"></div>
const API_URL = 'https://jsonplaceholder.typicode.com/users/1';
const weatherDiv = document.getElementById('weather-info');
function fetchWeather() {
  weatherDiv.innerHTML = '<p>Loading...</p>';
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const weather = { city: data.address.city, temperature: (data.address.geo.lat % 30).toFixed(1) };
      weatherDiv.innerHTML = \`<h2>Weather in \${weather.city}: \${weather.temperature}°C</h2>\`;
    })
    .catch(error => {
      weatherDiv.innerHTML = \`<p>Error: \${error.message}</p>\`;
    });
}
fetchWeather();`,
          explanation: `
            <ol>
              <li><strong>Initial State:</strong> The function first updates the DOM to show a "Loading..." message so the user knows something is happening.</li>
              <li><strong>Make Request:</strong> It calls <code>fetch()</code> with the API URL. This returns a Promise.</li>
              <li><strong>Handle Response:</strong> The first <code>.then()</code> block executes when the server sends a response. It checks if the response was successful (<code>response.ok</code>) and then parses the response body as JSON, which itself returns another promise.</li>
              <li><strong>Handle Data:</strong> The second <code>.then()</code> block receives the parsed JSON data. It then extracts the needed information, creates a new HTML string, and updates the DOM to display the weather.</li>
              <li><strong>Handle Errors:</strong> If any part of the process fails (e.g., a network error, an invalid URL), the <code>.catch()</code> block will execute, displaying an error message to the user.</li>
            </ol>
          `
        }
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
      { name: "JavaScript.info: Modules", url: "https://javascript.info/modules" }
    ],
    theory: `
      ES6 (ECMAScript 2015) and later versions added many features that make JavaScript more powerful and modern. Key features include <strong>Arrow Functions</strong> for a concise syntax, <strong>Template Literals</strong> for easier string formatting, the <strong>Spread/Rest Operator (...)</strong> for working with arrays and objects, and <strong>Modules (import/export)</strong> for organizing code into separate files.
    `,
    exercises: [
      {
        title: "Utility Library with Modules",
        description: "Create two files. One (`utils.js`) will export several utility functions. The second file (`main.js`) will import and use them. This example shows the code for both files.",
        solution: {
          code: `// ============== In utils.js ==============
export const capitalize = (str) => {
  if (typeof str !== 'string' || str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const sumArray = (arr) => {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((sum, num) => sum + num, 0);
};

// ============== In main.js ==============
// import { capitalize, sumArray } from './utils.js';
// const message = "hello";
// const numbers = [10, 20, 30];
// console.log(capitalize(message)); // "Hello"
// console.log(sumArray(numbers));   // 60`,
          explanation: `
            <ol>
              <li><strong>Create Module:</strong> The <code>utils.js</code> file acts as a module. It contains a set of related functions.</li>
              <li><strong>Export Logic:</strong> The <code>export</code> keyword is used in front of each function we want to make available to other files.</li>
              <li><strong>Import Logic:</strong> In <code>main.js</code>, the <code>import</code> keyword is used to bring in the exported functions. The curly braces <code>{...}</code> are used for "named imports," allowing us to specify exactly which pieces we need.</li>
              <li><strong>Usage:</strong> Once imported, the functions can be used in <code>main.js</code> as if they were defined in the same file. This pattern is the foundation of all modern JavaScript and React development.</li>
            </ol>
          `
        }
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
      { name: "JavaScript.info: 'this' keyword", url: "https://javascript.info/object-methods" }
    ],
    theory: `A <strong>closure</strong> is a function that remembers the environment in which it was created. This means it has access to variables from its outer (enclosing) function, even after the outer function has finished executing. Closures are a fundamental concept in JavaScript, enabling patterns like data privacy and creating functions with memory.`,
    exercises: [
      {
        title: "Debounce Utility",
        description: "Create a `debounce` function that delays invoking a function until after `wait` milliseconds have elapsed since the last time it was invoked.",
        solution: {
          code: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`,
          explanation: `
            <ol>
              <li><strong>Outer Function:</strong> The <code>debounce</code> function takes the function to execute (<code>func</code>) and the wait time (<code>wait</code>) as arguments.</li>
              <li><strong>Closure Variable:</strong> It declares a <code>timeout</code> variable. This variable persists between calls because of closure.</li>
              <li><strong>Returned Function:</strong> It returns a new function. This is the function that will actually be called by the event listener.</li>
              <li><strong>Reset Timer:</strong> Every time the returned function is executed, it first clears any existing timer with <code>clearTimeout(timeout)</code>.</li>
              <li><strong>Set New Timer:</strong> It then sets a new timer with <code>setTimeout</code>. The original <code>func</code> is scheduled to run after <code>wait</code> milliseconds.</li>
              <li><strong>Execution:</strong> If the returned function is called again before the timer finishes, the old timer is cleared and a new one is set. The original <code>func</code> only ever runs when the timer is allowed to complete without being cleared.</li>
            </ol>
          `
        }
      }
    ]
  },
  // PART 2 of 3: Days 9-16
  {
    day: 9,
    phase: "Advanced JavaScript",
    title: "Prototypes & Classes",
    topics: ["Prototype Chain", "ES6 Classes", "Inheritance"],
    resources: [
      { name: "MDN: Inheritance and the prototype chain", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" },
      { name: "JavaScript.info: Classes", url: "https://javascript.info/classes" }
    ],
    theory: `JavaScript is a prototype-based language. Each object has a link to another object called its <strong>prototype</strong>. That prototype has its own prototype, and so on, until an object with <code>null</code> as its prototype is reached. This is the <strong>prototype chain</strong>.<br/><br/>ES6 introduced the <strong><code>class</code></strong> syntax, which is syntactic sugar over this system. It provides a much cleaner and more familiar syntax for creating objects and handling inheritance.`,
    exercises: [
      {
        title: "Vehicle Hierarchy with Inheritance",
        description: "Create a base `Vehicle` class and have `Car` and `Motorcycle` classes inherit from it. Add unique properties and methods to each.",
        solution: {
          code: `class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  getInfo() {
    return \`\${this.make} \${this.model}\`;
  }
}
class Car extends Vehicle {
  constructor(make, model, numDoors) {
    super(make, model); // Call the parent constructor
    this.numDoors = numDoors;
  }
  getInfo() {
    return \`\${super.getInfo()} with \${this.numDoors} doors.\`;
  }
}
class Motorcycle extends Vehicle {
  constructor(make, model, engineSize) {
    super(make, model);
    this.engineSize = engineSize;
  }
}`,
          explanation: `
            <ol>
              <li><strong>Base Class:</strong> A <code>Vehicle</code> class is defined with a <code>constructor</code> to set shared properties and a <code>getInfo</code> method.</li>
              <li><strong>Child Class:</strong> The <code>Car</code> class is created using the <code>extends Vehicle</code> syntax to establish the inheritance relationship.</li>
              <li><strong>Calling Parent Constructor:</strong> Inside the <code>Car</code> constructor, <code>super(make, model)</code> is called. This is mandatory in a child class constructor and it calls the constructor of the parent class (<code>Vehicle</code>).</li>
              <li><strong>Adding New Properties:</strong> The <code>Car</code> class adds its own unique property, <code>this.numDoors</code>.</li>
              <li><strong>Overriding Methods:</strong> The <code>Car</code> class defines its own <code>getInfo</code> method. It uses <code>super.getInfo()</code> to call the parent's version of the method and then adds its own extra information to the result.</li>
            </ol>
          `
        }
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
      { name: "JavaScript.info: Async/await", url: "https://javascript.info/async-await" }
    ],
    theory: `
      <strong>Async/Await</strong> (ES2017) is syntactic sugar built on top of Promises that lets us write asynchronous code that looks synchronous, making it much easier to read.
      <br/><br/>
      <ul>
        <li><strong><code>async</code>:</strong> Placed before a function to make it an async function, which always returns a Promise.</li>
        <li><strong><code>await</code>:</strong> Used inside an <code>async</code> function to pause execution and wait for a Promise to resolve.</li>
        <li><strong>Error Handling:</strong> Use the familiar <code>try...catch</code> block to handle errors from awaited promises.</li>
      </ul>
    `,
    exercises: [
      {
        title: "API Client with Retry Logic",
        description: "Create an async function that fetches data from an API and retries up to a specified number of times on failure.",
        solution: {
          code: `const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(\`HTTP error! \${response.status}\`);
      return await response.json();
    } catch (error) {
      console.error(\`Attempt \${i + 1} failed.\`);
      if (i < retries - 1) await delay(1000);
      else throw error; // Rethrow last error
    }
  }
}`,
          explanation: `
            <ol>
              <li><strong>Loop for Retries:</strong> The function uses a <code>for</code> loop to manage the number of retry attempts.</li>
              <li><strong>Try Block:</strong> Inside the loop, a <code>try...catch</code> block handles the core fetch operation. The <code>await</code> keyword pauses execution until the <code>fetch</code> promise settles.</li>
              <li><strong>Success Path:</strong> If the response is <code>ok</code>, the JSON is parsed and the data is returned, which immediately exits the function and loop.</li>
              <li><strong>Failure Path:</strong> If <code>fetch</code> throws an error or the response is not ok, the <code>catch</code> block executes. It saves the error, logs a message, and if it's not the last attempt, it waits for 1 second using the <code>delay</code> helper function.</li>
              <li><strong>Final Failure:</strong> If the loop finishes without a successful return, it means all retries have failed. The function then throws the last error that was captured.</li>
            </ol>
          `
        }
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
      { name: "web.dev: Browser Rendering Optimizations", url: "https://web.dev/articles/rendering-performance" }
    ],
    theory: `<strong>Event delegation</strong> is a technique where instead of adding an event listener to every single child element, you add one listener to the parent. This listener then uses properties of the event object (like <code>event.target</code>) to determine which child was acted upon. This improves performance, especially for long lists of items.<br/><br/><strong>Performance optimization</strong> in the browser involves minimizing layout thrashing (reading and writing to the DOM in quick succession), debouncing and throttling event handlers, and optimizing rendering.`,
    exercises: [
      {
        title: "Drag-and-Drop Sortable List",
        description: "Implement the JavaScript for a simple drag-and-drop sortable list using DOM events.",
        solution: {
          code: `// Assumes HTML: <ul id="sortable-list"> <li draggable="true">...</li> </ul>
const list = document.getElementById('sortable-list');
let draggingElement = null;
list.addEventListener('dragstart', e => {
    draggingElement = e.target;
    setTimeout(() => e.target.classList.add('dragging'), 0);
});
list.addEventListener('dragend', e => {
    e.target.classList.remove('dragging');
});
list.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
        list.appendChild(draggingElement);
    } else {
        list.insertBefore(draggingElement, afterElement);
    }
});
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}`,
          explanation: `
            <ol>
              <li><strong>Setup:</strong> A global variable <code>draggingElement</code> is used to keep track of the item currently being dragged.</li>
              <li><strong>Drag Start:</strong> An event listener for <code>dragstart</code> fires when the user begins dragging an item. It sets <code>draggingElement</code> to the target element. A <code>setTimeout</code> is used to add a class *after* the drag image has been created.</li>
              <li><strong>Drag Over:</strong> The <code>dragover</code> event fires continuously as the element is dragged over a valid drop target. We must call <code>e.preventDefault()</code> to allow a drop.</li>
              <li><strong>Calculate Position:</strong> Inside <code>dragover</code>, a helper function calculates which element the dragged item should be placed "before" based on the mouse's Y position.</li>
              <li><strong>Reorder DOM:</strong> The dragged item is then inserted into the list at the newly calculated position using <code>insertBefore</code> or <code>appendChild</code>.</li>
              <li><strong>Drag End:</strong> The <code>dragend</code> listener simply cleans up by removing the styling class.</li>
            </ol>
          `
        }
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
      { name: "React Docs: Writing Markup with JSX", url: "https://react.dev/learn/writing-markup-with-jsx" }
    ],
    theory: `
      React is a JavaScript library for building user interfaces with <strong>components</strong>. Components are like JavaScript functions that accept inputs (<strong>props</strong>) and return React elements describing what should appear on the screen.
      <br/><br/>
      <strong>JSX (JavaScript XML)</strong> is a syntax extension that looks like HTML and is used to write React elements declaratively.
      <br/><br/>
      Key JSX Rules:
      <ul>
        <li>Return a single root element (or use a fragment <code>&lt;&gt;...&lt;/&gt;</code>).</li>
        <li>HTML attributes like <code>class</code> become <code>className</code>.</li>
        <li>Embed JavaScript expressions in curly braces <code>{}</code>.</li>
      </ul>
    `,
    exercises: [
      {
        title: "Profile Card Component",
        description: "Create a reusable `ProfileCard` component that accepts props for an image URL, name, and a short bio.",
        solution: {
          code: `import React from 'react';
function ProfileCard({ imageUrl, name, bio }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '300px',
      textAlign: 'center',
    }}>
      <img 
        src={imageUrl} 
        alt={\`Profile of \${name}\`}
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
}
export default ProfileCard;`,
          explanation: `
            <ol>
              <li><strong>Function Component:</strong> The component is defined as a JavaScript function named <code>ProfileCard</code>.</li>
              <li><strong>Props Destructuring:</strong> It accepts a single argument, the <code>props</code> object. We use destructuring in the function signature <code>({ imageUrl, name, bio })</code> to directly access the properties we need as variables.</li>
              <li><strong>Return JSX:</strong> The function returns a block of JSX that looks like HTML. This describes the UI for the card.</li>
              <li><strong>Dynamic Content:</strong> The prop values (<code>imageUrl</code>, <code>name</code>, <code>bio</code>) are embedded directly into the JSX using curly braces <code>{}</code>. This makes the component dynamic and reusable.</li>
              <li><strong>Styling:</strong> For simplicity, this example uses inline styles, which are passed as a JavaScript object. Note that CSS properties like <code>border-radius</code> become camelCased (<code>borderRadius</code>).</li>
            </ol>
          `
        }
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
      { name: "React Docs: Responding to Events", url: "https://react.dev/learn/responding-to-events" }
    ],
    theory: `
      To handle data that changes over time, components use <strong>state</strong>. The <strong><code>useState</code></strong> hook adds state to a functional component. It returns an array containing the current state value and a function to update it. When you call the update function, React re-renders the component.
    `,
    exercises: [
      {
        title: "Counter with Increment, Decrement, and Reset",
        description: "Build a component that displays a count and has buttons to increment, decrement, and reset it.",
        solution: {
          code: `import React, { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => setCount(prevCount => prevCount + 1);
  const handleDecrement = () => setCount(prevCount => prevCount - 1);
  const handleReset = () => setCount(0);
  return (
    <div>
      <p style={{ fontSize: '2rem' }}>{count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
export default Counter;`,
          explanation: `
            <ol>
              <li><strong>Import Hook:</strong> First, we import the <code>useState</code> hook from React.</li>
              <li><strong>Initialize State:</strong> Inside the component, we call <code>useState(0)</code>. This declares a state variable named <code>count</code>, initialized to <code>0</code>, and a function to update it, <code>setCount</code>.</li>
              <li><strong>Define Event Handlers:</strong> We create three functions (<code>handleIncrement</code>, <code>handleDecrement</code>, <code>handleReset</code>) that will be called when the buttons are clicked.</li>
              <li><strong>Update State Safely:</strong> The increment and decrement handlers use the "functional update" form: <code>setCount(prevCount => prevCount + 1)</code>. This is the safest way to update state that depends on its previous value.</li>
              <li><strong>Bind Handlers in JSX:</strong> Each button in the returned JSX has an <code>onClick</code> prop. We pass our handler functions to these props. When a button is clicked, the corresponding function executes, calls <code>setCount</code>, and triggers a re-render with the new count value.</li>
            </ol>
          `
        }
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
      { name: "React Docs: You Might Not Need an Effect", url: "https://react.dev/learn/you-might-not-need-an-effect" }
    ],
    theory: `
      The <strong><code>useEffect</code></strong> hook lets you perform "side effects" in functional components. Side effects are operations that interact with the outside world, like fetching data from an API, setting up subscriptions, or manually changing the DOM. The hook's dependency array controls when the effect is re-run.
    `,
    exercises: [
      {
        title: "Data Fetching with Loading States",
        description: "Create a component that fetches a list of users, showing a 'Loading...' message while fetching and an error message on failure.",
        solution: {
          code: `import React, { useState, useEffect } from 'react';
const API_URL = 'https://jsonplaceholder.typicode.com/users';
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); // Empty array = run once
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h1>User List</h1>
      <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  );
}
export default UserList;`,
          explanation: `
            <ol>
              <li><strong>Initialize States:</strong> We set up three state variables: <code>users</code> to hold the API data, <code>loading</code> to track the fetch status (initially true), and <code>error</code> to store any error messages.</li>
              <li><strong>Define Effect:</strong> We use the <code>useEffect</code> hook to perform the data fetch. The logic is placed inside this hook.</li>
              <li><strong>Run Once:</strong> We provide an empty dependency array <code>[]</code> as the second argument to <code>useEffect</code>. This tells React to run the effect function only *once*, after the component first renders.</li>
              <li><strong>Fetch Logic:</strong> Inside the effect, an <code>async</code> function handles the <code>fetch</code> call within a <code>try...catch...finally</code> block to gracefully manage success, error, and loading states.</li>
              <li><strong>Conditional Rendering:</strong> Before rendering the final list, the component checks the <code>loading</code> and <code>error</code> states. It returns the appropriate UI (a loading message, an error message, or the user list) based on these states.</li>
            </ol>
          `
        }
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
      { name: "React Docs: Keeping List Items in Order with key", url: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key" }
    ],
    theory: `
      We use array methods like <strong><code>map()</code></strong> to transform an array of data into an array of React elements. When rendering a list, you must provide a unique and stable <code>key</code> prop to each item.
      <code>{items.map(item => <li key={item.id}>{item.name}</li>)}</code>
      <br/><br/>
      Keys help React identify which items have changed, are added, or are removed. This allows React to efficiently update the UI. The best keys are unique IDs from your data.
    `,
    exercises: [
      {
        title: "Dynamic Todo List with CRUD Operations",
        description: "Build a todo list where todos are managed in React state. Implement Add, Update (toggling completion), and Delete functionality.",
        solution: {
          code: `import React, { useState } from 'react';
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newTodo = { id: Date.now(), text: inputText, completed: false };
    setTodos([...todos, newTodo]);
    setInputText('');
  };
  const handleToggle = (id) => {
    setTodos(
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };
  const handleDelete = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input value={inputText} onChange={e => setInputText(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggle(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;`,
          explanation: `
            <ol>
              <li><strong>State Management:</strong> Two state variables are used: <code>todos</code> to hold the array of todo items, and <code>inputText</code> for the controlled input field.</li>
              <li><strong>Add Todo:</strong> The <code>handleAddTodo</code> function creates a new todo object with a unique <code>id</code> (using <code>Date.now()</code>), the current input text, and a <code>completed</code> status of false. It then adds this new object to the end of the todos array.</li>
              <li><strong>Toggle Completion:</strong> <code>handleToggle</code> maps over the existing todos. If a todo's <code>id</code> matches the one that was clicked, it creates a new object for that todo with the <code>completed</code> property flipped. Otherwise, it returns the original todo. This creates a new array without mutating the original state.</li>
              <li><strong>Delete Todo:</strong> <code>handleDelete</code> uses the <code>.filter()</code> method to create a new array that includes every todo *except* the one whose <code>id</code> matches the one passed to the function.</li>
              <li><strong>Keys:</strong> In the JSX, the <code>todo.id</code> is used as the <code>key</code> prop for each <code>&lt;li&gt;</code>, ensuring React can efficiently track each item.</li>
            </ol>
          `
        }
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
      { name: "React Hook Form Docs", url: "https://react-hook-form.com/" }
    ],
    theory: `In React, a <strong>controlled component</strong> is a form input whose value is controlled by React state. The state is the "single source of truth." The input's <code>value</code> prop is bound to a state variable, and an <code>onChange</code> handler updates that state variable. This makes it easy to implement instant validation, conditional logic, and have full control over the form's data.`,
    exercises: [
      {
        title: "Registration Form with Validation",
        description: "Create a registration form with email and password fields that provides real-time validation feedback to the user.",
        solution: {
          code: `import React, { useState } from 'react';
function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\\S+@\\S+\\.\\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      alert('Form submitted successfully!');
      setEmail('');
      setPassword('');
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}`,
          explanation: `
            <ol>
              <li><strong>Controlled Inputs:</strong> The component controls the <code>email</code> and <code>password</code> inputs using <code>useState</code>. The input's <code>value</code> is tied to the state, and its <code>onChange</code> updates the state.</li>
              <li><strong>Error State:</strong> A separate state variable, <code>errors</code>, is an object used to hold any validation error messages.</li>
              <li><strong>Validation Logic:</strong> A <code>validate</code> function contains all the business logic. It checks the current <code>email</code> and <code>password</code> state and returns a new object containing any error messages.</li>
              <li><strong>Submit Handler:</strong> When the form is submitted, <code>handleSubmit</code> prevents the default form submission, calls the <code>validate</code> function, and checks if the returned errors object is empty.</li>
              <li><strong>Conditional Rendering of Errors:</strong> If there are errors, the <code>errors</code> state is updated, which causes the component to re-render. The JSX includes a check like <code>{errors.email && ...}</code> to conditionally display the error message for each field right below the input.</li>
            </ol>
          `
        }
      }
    ]
  },
  // PART 3 of 3: Days 17-25
  // =================================================================
  // PHASE 4: Advanced React (Days 17-22)
  // =================================================================
  {
    day: 17,
    phase: "Advanced React",
    title: "Advanced Hooks",
    topics: ["useReducer", "useRef", "useMemo", "useCallback"],
    resources: [
      { name: "React Docs: Escape Hatches (useRef, etc.)", url: "https://react.dev/learn/escape-hatches" },
      { name: "React Docs: useReducer", url: "https://react.dev/reference/react/useReducer" }
    ],
    theory: `Beyond the basics, React offers more specialized hooks:<br/><ul><li><strong><code>useReducer</code></strong>: An alternative to <code>useState</code> for managing complex state logic.</li><li><strong><code>useRef</code></strong>: Returns a mutable ref object whose <code>.current</code> property can be changed without re-rendering. Used for accessing DOM nodes or persisting values across renders.</li><li><strong><code>useMemo</code></strong>: Memoizes a value, recomputing it only when its dependencies change. Used for expensive calculations.</li><li><strong><code>useCallback</code></strong>: Memoizes a function, returning the same function instance if dependencies haven't changed. Prevents unnecessary re-renders of child components.</li></ul>`,
    exercises: [
      {
        title: "Shopping Cart with useReducer",
        description: "Manage a shopping cart's state using `useReducer`. Implement actions for adding, removing, and updating item quantities.",
        solution: {
          code: `import React, { useReducer } from 'react';
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    // other cases like 'UPDATE_QUANTITY' could be added here
    default:
      return state;
  }
};
function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });
  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: 'Product ' + (cart.items.length + 1) };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };
  return (
    <div>
      <button onClick={handleAddItem}>Add Item</button>
      <ul>{cart.items.map(item => <li key={item.id}>{item.name}</li>)}</ul>
    </div>
  );
}`,
          explanation: `
            <ol>
              <li><strong>Reducer Function:</strong> A <code>cartReducer</code> function is defined outside the component. It takes the current <code>state</code> and an <code>action</code> object as arguments and returns the *new* state. A <code>switch</code> statement handles the different action types.</li>
              <li><strong>Initialize Reducer:</strong> Inside the component, <code>useReducer</code> is called with the reducer function and the initial state (<code>{ items: [] }</code>). It returns the current state (<code>cart</code>) and a <code>dispatch</code> function.</li>
              <li><strong>Dispatching Actions:</strong> Instead of calling multiple state update functions (like <code>setItems</code>, <code>setTotal</code>), we call the single <code>dispatch</code> function. We pass it an "action object" which has a <code>type</code> describing the action and an optional <code>payload</code> with the data needed for the update.</li>
              <li><strong>Centralized Logic:</strong> This pattern is powerful because it centralizes all state transition logic into one place (the reducer), making the component's code cleaner and the state changes more predictable.</li>
            </ol>
          `
        }
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
      { name: "React Docs: Scaling Up with Reducer and Context", url: "https://react.dev/learn/scaling-up-with-reducer-and-context" }
    ],
    theory: `The <strong>Context API</strong> provides a way to pass data through the component tree without having to pass props down manually at every level. This is the solution to "prop drilling."<br/><br/>You create a Context object using <code>React.createContext()</code>. Then you use a <code>Provider</code> component to wrap a part of your tree and make the data available. Any component inside that tree can then consume the data using the <code>useContext</code> hook.`,
    exercises: [
      {
        title: "Theme System with Context",
        description: "Implement a light/dark mode theme switcher that can be accessed by any component in the application without passing props.",
        solution: {
          code: `import React, { useState, useContext, createContext } from 'react';
// 1. Create the context
const ThemeContext = createContext();
// 2. Create the Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const value = { theme, toggleTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
// 3. Create a component that uses the context
function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</button>;
}
// 4. In your main App.js, wrap the app in <ThemeProvider>
// and then use <ThemeToggleButton /> anywhere inside.`,
          explanation: `
            <ol>
              <li><strong>Create Context:</strong> <code>createContext()</code> is called to create a context object. This object will be used by both the provider and the consumer.</li>
              <li><strong>Create Provider:</strong> A custom <code>ThemeProvider</code> component is created. It manages the theme state (using <code>useState</code>) and defines the <code>toggleTheme</code> function. It passes both of these down in the <code>value</code> prop of the built-in <code>ThemeContext.Provider</code>.</li>
              <li><strong>Consume Context:</strong> The <code>ThemeToggleButton</code> component uses the <code>useContext(ThemeContext)</code> hook. React will look up the component tree for the nearest <code>ThemeProvider</code> and give this component access to the <code>value</code> that was passed.</li>
              <li><strong>Decoupling:</strong> This pattern decouples the consuming component from the provider. The button doesn't need to know *how* the theme is managed; it only needs to know that it can get the current theme and a function to toggle it from the context.</li>
            </ol>
          `
        }
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
      { name: "Epic React: Advanced React Patterns", url: "https://epicreact.dev/modules/advanced-react-patterns" }
    ],
    theory: `There are several advanced patterns for sharing logic and creating flexible components. The most modern and preferred way is the <strong>Custom Hook</strong> pattern.<br/><br/>A custom hook is a JavaScript function whose name starts with "use" and that can call other hooks (like <code>useState</code> or <code>useEffect</code>). It lets you extract component logic into reusable functions, which can then be used in any component that needs that piece of logic.`,
    exercises: [
      {
        title: "Data Fetching Custom Hook",
        description: "Create a reusable custom hook `useFetch` that handles the logic for data fetching, including loading and error states.",
        solution: {
          code: `import { useState, useEffect } from 'react';
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (url) {
      fetchData();
    }
  }, [url]); // Re-fetch if the URL changes
  return { data, loading, error };
}
// Example usage in a component:
// function MyComponent() {
//   const { data, loading, error } = useFetch('api/url');
//   if (loading) return 'Loading...';
//   // ...
// }`,
          explanation: `
            <ol>
              <li><strong>Function Definition:</strong> A function named <code>useFetch</code> is created. The "use" prefix is a mandatory convention for hooks. It takes a <code>url</code> as an argument.</li>
              <li><strong>Encapsulated State:</strong> All the state related to data fetching (<code>data</code>, <code>loading</code>, <code>error</code>) is managed *inside* the hook using <code>useState</code>.</li>
              <li><strong>Encapsulated Effect:</strong> All the side effect logic (the actual fetching) is managed *inside* the hook using <code>useEffect</code>. The effect re-runs whenever the <code>url</code> prop changes.</li>
              <li><strong>Return Values:</strong> The hook returns an object containing the current state values.</li>
              <li><strong>Reusability:</strong> Any component can now get all of this complex data-fetching capability with a single line of code (e.g., <code>const { data, loading, error } = useFetch(someUrl);</code>). This keeps components clean and the logic highly reusable.</li>
            </ol>
          `
        }
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
      { name: "React Router Docs: Tutorial", url: "https://reactrouter.com/en/main/start/tutorial" }
    ],
    theory: `
      Most web applications have multiple pages or views. <strong>React Router</strong> is the standard library for handling routing in React applications. It allows you to synchronize your UI with the URL in the browser, enabling navigation between different components as if they were separate pages.
    `,
    exercises: [
      {
        title: "Multi-page Blog Application",
        description: "Set up a basic blog with a homepage listing posts and a separate page to view a single post's details.",
        solution: {
          code: `import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
// Sample data
const posts = [
  { id: 1, title: 'React Router Intro', content: 'This is a post about React Router.' },
  { id: 2, title: 'State Management', content: 'This is a post about state.' },
];
const Home = () => (
  <div>
    <h1>Blog Posts</h1>
    <ul>{posts.map(post => <li key={post.id}><Link to={\`/post/\${post.id}\`}>{post.title}</Link></li>)}</ul>
  </div>
);
const Post = () => {
  const { postId } = useParams();
  const post = posts.find(p => p.id === parseInt(postId));
  if (!post) return <h2>Post not found</h2>;
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}`,
          explanation: `
            <ol>
              <li><strong>Setup Router:</strong> The entire application's routing logic is wrapped in a <code>&lt;BrowserRouter&gt;</code> component.</li>
              <li><strong>Define Routes:</strong> Inside <code>&lt;Routes&gt;</code>, we define each page with a <code>&lt;Route&gt;</code>. The <code>path</code> prop specifies the URL, and the <code>element</code> prop specifies the component to render.</li>
              <li><strong>Dynamic Route:</strong> The path <code>"/post/:postId"</code> is a dynamic route. The <code>:postId</code> part is a URL parameter that can change.</li>
              <li><strong>Navigation:</strong> The <code>Home</code> component uses the <code>&lt;Link&gt;</code> component to create navigation links. This prevents a full page reload and allows React Router to handle the URL change internally.</li>
              <li><strong>Accessing Parameters:</strong> The <code>Post</code> component uses the <code>useParams</code> hook to get the value of <code>postId</code> from the URL. It then uses this ID to find and display the correct post's data.</li>
            </ol>
          `
        }
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
      { name: "Zustand GitHub Repository", url: "https://github.com/pmndrs/zustand" }
    ],
    theory: `While Context is great for low-frequency updates, it can cause performance issues if the value changes often. For complex, global state, dedicated libraries are often used.<br/><ul><li><strong>Redux Toolkit</strong>: The official, recommended way to write Redux logic. It simplifies store setup, reduces boilerplate, and is highly scalable.</li><li><strong>Zustand</strong>: A small, fast, and scalable state-management solution using a simple hook-based API. It's often seen as a much simpler alternative to Redux.</li></ul>`,
    exercises: [
      {
        title: "E-commerce Cart with Zustand",
        description: "Create a global store for a shopping cart using Zustand. Implement functions to add and remove items from anywhere in the app.",
        solution: {
          code: `import { create } from 'zustand';
// 1. Create the store
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter((item) => item.id !== itemId)
  })),
  clearCart: () => set({ items: [] }),
}));
// 2. Use the store in any component
function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  return <button onClick={() => addItem(product)}>Add to Cart</button>;
}
function CartDisplay() {
  const items = useCartStore((state) => state.items);
  return <div>Cart Items: {items.length}</div>;
}`,
          explanation: `
            <ol>
              <li><strong>Create Store:</strong> Zustand's <code>create</code> function defines the entire store. It takes a setup function that receives a <code>set</code> function as an argument.</li>
              <li><strong>State and Actions:</strong> This setup function returns an object containing both our state (e.g., the <code>items</code> array) and the actions that can modify that state (e.g., <code>addItem</code>).</li>
              <li><strong>Updating State:</strong> Actions call the <code>set</code> function to update the state. Zustand handles immutability for you.</li>
              <li><strong>Using the Store:</strong> In a component, we call our custom hook <code>useCartStore</code>. We pass it a "selector" function (e.g., <code>state => state.addItem</code>) to extract only the specific piece of state or action that component needs.</li>
              <li><strong>Automatic Re-renders:</strong> When an action updates the state, Zustand will automatically and efficiently re-render only the components that have selected a piece of state that actually changed.</li>
            </ol>
          `
        }
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
      { name: "SWR Docs", url: "https://swr.vercel.app/" }
    ],
    theory: `Libraries like <strong>TanStack Query (formerly React Query)</strong> revolutionize data fetching. They are not just fetching libraries; they are server-state management libraries.<br/><br/>They provide out-of-the-box features for caching, automatic refetching, loading/error state management, pagination, optimistic updates, and much more, drastically simplifying your data-fetching logic and improving user experience.`,
    exercises: [
      {
        title: "CRUD with TanStack Query",
        description: "Show an example of how to use TanStack Query to fetch a list of todos and handle adding a new one.",
        solution: {
          code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// Mock API functions
const fetchTodos = async () => [{ id: 1, text: 'Learn React Query' }];
const addTodo = async (newTodo) => newTodo;
function Todos() {
  const queryClient = useQueryClient();
  // Fetching data
  const { data: todos, isLoading } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });
  // Mutating data
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // Invalidate and refetch the 'todos' query after a successful mutation
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  if (isLoading) return 'Loading...';
  return (
    <div>
      <button onClick={() => mutation.mutate({ id: Date.now(), text: 'New Todo' })}>
        Add Todo
      </button>
      {/* List todos... */}
    </div>
  );
}`,
          explanation: `
            <ol>
              <li><strong>Query Client:</strong> A <code>QueryClientProvider</code> must be set up at the top of your app (not shown here). We get access to the client instance with <code>useQueryClient()</code>.</li>
              <li><strong>Fetching Data:</strong> The <code>useQuery</code> hook is used to fetch data. It requires a unique <code>queryKey</code> (<code>['todos']</code>) to identify this data, and a <code>queryFn</code> that returns a promise (your fetch call). It automatically handles loading, error, and data states.</li>
              <li><strong>Mutating Data:</strong> The <code>useMutation</code> hook is used for creating, updating, or deleting data. It takes a <code>mutationFn</code> that performs the API call.</li>
              <li><strong>Invalidation:</strong> The most powerful part is the <code>onSuccess</code> callback. After our mutation succeeds, we don't manually update the local state. Instead, we tell TanStack Query to <code>invalidateQueries</code> with the key <code>['todos']</code>. This marks the existing data as stale, and the library automatically and efficiently refetches it to keep the UI in sync with the server.</li>
            </ol>
          `
        }
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
      { name: "React Testing Library Docs: Introduction", url: "https://testing-library.com/docs/react-testing-library/intro/" },
      { name: "Jest Docs: Getting Started", url: "https://jestjs.io/docs/getting-started" }
    ],
    theory: `Testing is crucial for building robust applications. In the React ecosystem, the common stack is <strong>Jest</strong> (a test runner) and <strong>React Testing Library</strong>. The testing library encourages you to write tests that resemble how users interact with your application. Instead of testing implementation details, you test the component's behavior from a user's perspective.`,
    exercises: [
      {
        title: "Component Unit Tests",
        description: "Write tests for a simple `Button` component to ensure it renders correctly and that its `onClick` handler is called when clicked.",
        solution: {
          code: `import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// Assume a simple Button component exists:
// const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;
describe('Button Component', () => {
  test('renders with the correct text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn(); // Create a mock function
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});`,
          explanation: `
            <ol>
              <li><strong>Arrange:</strong> The first part of a test sets up the necessary conditions. We use the <code>render</code> function from React Testing Library to render our component into a virtual DOM.</li>
              <li><strong>Act:</strong> The second part involves simulating user interaction. For the click test, we use <code>fireEvent.click()</code> to programmatically click the button element.</li>
              <li><strong>Assert:</strong> The final part is the assertion, where we check if the outcome was what we expected. We use queries like <code>screen.getByText()</code> to find elements on the "screen." Then, we use <code>expect</code> from Jest with matcher functions (e.g., <code>.toBeInTheDocument()</code>, <code>.toHaveBeenCalledTimes()</code>) to verify the result.</li>
              <li><strong>Mocking:</strong> <code>jest.fn()</code> creates a "spy" or "mock" function. This allows us to track when and how a function is called without needing its actual implementation.</li>
            </ol>
          `
        }
      }
    ]
  },
  {
    day: 24,
    phase: "Production Ready",
    title: "Performance & Build",
    topics: ["Optimization", "Lazy Loading", "Code Splitting", "Vite/Webpack"],
    resources: [
      { name: "React Docs: Performance", url: "https://react.dev/learn/performance" },
      { name: "React Docs: Code-Splitting", url: "https://react.dev/reference/react/lazy" }
    ],
    theory: `React performance optimization focuses on preventing unnecessary re-renders. Techniques include using <code>React.memo</code> for components, and <code>useMemo</code>/<code>useCallback</code> for values and functions.<br/><br/><strong>Code splitting</strong> is a feature supported by bundlers like Vite and Webpack that can create multiple bundles that can be dynamically loaded at runtime. This allows you to "lazy load" parts of your application on demand, which can significantly improve initial load performance. <code>React.lazy</code> and <code>Suspense</code> are the built-in tools for this.`,
    exercises: [
      {
        title: "Route-based Code Splitting",
        description: "Show how to use `React.lazy` and `Suspense` to code-split a component that is only loaded when a user navigates to a specific route.",
        solution: {
          code: `import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Lazily import the components
const AboutPage = lazy(() => import('./pages/AboutPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`,
          explanation: `
            <ol>
              <li><strong>Lazy Import:</strong> Instead of a standard static <code>import</code>, we use the <code>React.lazy()</code> function. It takes another function as an argument, which must call a dynamic <code>import()</code> expression. This tells the bundler (Vite/Webpack) to put the code for <code>AboutPage</code> into a separate file.</li>
              <li><strong>Suspense Wrapper:</strong> React needs to show something while it's fetching the lazy-loaded code over the network. The <code>&lt;Suspense&gt;</code> component is used to wrap the lazy components.</li>
              <li><strong>Fallback UI:</strong> The <code>fallback</code> prop of <code>Suspense</code> accepts any valid React element (like a loading spinner or simple text). This UI will be displayed to the user until the requested component code has finished loading.</li>
              <li><strong>Usage:</strong> Once wrapped, the lazy components can be used inside the <code>Routes</code> component just like regular, statically imported components. React handles the loading and swapping automatically.</li>
            </ol>
          `
        }
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
      { name: "Vite Docs: Build for Production", url: "https://vitejs.dev/guide/build.html" }
    ],
    theory: `
      Congratulations! Today is about combining all the concepts you've learned—components, state, effects, hooks, routing, and state management—to build a complete application.
      <br/><br/>
      Focus on building a robust, well-structured application. Think about component reusability, state management strategy, and user experience. This is your chance to solidify your knowledge and create a portfolio-worthy piece.
    `,
    exercises: [
      {
        title: "Project: Task Management Platform",
        description: "Plan and build a task management application (like a simplified Trello). It should allow users to create projects, add tasks, and persist the data to localStorage.",
        solution: {
          code: `// This is a high-level architectural example.
// The code demonstrates how the main files might be structured.
// --- App.jsx ---
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import { ProjectProvider } from './context/ProjectContext';
function App() {
  return (
    <ProjectProvider> {/* Global state is available to all routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </ProjectProvider>
  );
}
// --- context/ProjectContext.js ---
import { createContext, useState, useEffect } from 'react';
export const ProjectContext = createContext();
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);
  // Functions to add projects, add tasks, etc. would go here...
  const value = { projects, setProjects };
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};`,
          explanation: `
            <ol>
              <li><strong>Component Architecture:</strong> The application is broken down into pages (<code>DashboardPage</code>, <code>ProjectPage</code>) and potentially many smaller reusable components (e.g., <code>TaskList</code>, <code>AddTaskForm</code>).</li>
              <li><strong>Routing:</strong> <code>React Router</code> is used to handle navigation between the main dashboard (listing all projects) and the view for a single project.</li>
              <li><strong>Global State Management:</strong> A <code>ProjectContext</code> is created to hold the application's shared state (the list of all projects and tasks). This avoids "prop drilling" and makes the state accessible to any component that needs it.</li>
              <li><strong>Data Persistence:</strong> A <code>useEffect</code> hook inside the <code>ProjectProvider</code> watches for any changes to the <code>projects</code> state. Whenever the state changes, it automatically saves the updated version to the browser's <code>localStorage</code>.</li>
              <li><strong>Lazy Initialization:</strong> The initial state for the context is read directly from <code>localStorage</code>. This ensures that when the user refreshes the page, their data is reloaded.</li>
            </ol>
          `
        }
      }
    ]
  },
];