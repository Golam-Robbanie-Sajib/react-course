// filepath: lib/exam-data.ts
import type { QuizQuestion } from "./course-data";

export const finalExamQuestions: QuizQuestion[] = [
  // =================================================================
  // PHASE 1: JavaScript Fundamentals (10 Questions)
  // =================================================================
  {
    question: "What is the result of `\"5\" + 3` in JavaScript?",
    options: ["8", "\"53\"", "Error", "NaN"],
    correctAnswerIndex: 1,
    explanation: "Due to type coercion, the number `3` is converted to a string, and the two strings are concatenated."
  },
  {
    question: "Which of the following is NOT a primitive data type in JavaScript?",
    options: ["String", "Number", "Symbol", "Object"],
    correctAnswerIndex: 3,
    explanation: "Object is a complex data type. The primitives are String, Number, Boolean, Null, Undefined, Symbol, and BigInt."
  },
  {
    question: "What will `console.log(hoistedVar)` output in the code: `console.log(hoistedVar); var hoistedVar = 10;`?",
    options: ["10", "ReferenceError", "undefined", "null"],
    correctAnswerIndex: 2,
    explanation: "Declarations using `var` are hoisted to the top of their scope, but their assignments are not. So, the variable exists but is `undefined` when logged."
  },
  {
    question: "Which method is used to add an element to the beginning of an array?",
    options: [".shift()", ".unshift()", ".pop()", ".push()"],
    correctAnswerIndex: 1,
    explanation: "The `.unshift()` method adds one or more elements to the beginning of an array and returns the new length."
  },
  {
    question: "How do you select an HTML element with the id 'main-title' using JavaScript?",
    options: ["document.select('#main-title')", "document.getElement('.main-title')", "document.querySelector('#main-title')", "document.getElementsByTagName('main-title')"],
    correctAnswerIndex: 2,
    explanation: "`document.querySelector()` is a modern and versatile method that uses CSS selectors. The `#` symbol is used to select by ID."
  },
  {
    question: "What is the main difference between `==` and `===` operators?",
    options: ["`===` checks for value equality, while `==` checks for value and type", "`==` performs type coercion, while `===` does not", "They are functionally identical", "`===` is faster than `==`"],
    correctAnswerIndex: 1,
    explanation: "The strict equality operator `===` checks for both value and type equality without performing type coercion. The loose equality operator `==` will try to convert the values to a common type before comparing."
  },
  {
    question: "What is the purpose of the `event.preventDefault()` method?",
    options: ["To stop an event from bubbling up the DOM tree", "To stop an event from being captured", "To cancel the browser's default action for an event", "To trigger an event manually"],
    correctAnswerIndex: 2,
    explanation: "It cancels the event's default action. For example, calling it on a form's submit event will prevent the page from reloading."
  },
  {
    question: "Which loop is best suited for iterating over the properties of an object?",
    options: ["for loop", "for...of loop", "while loop", "for...in loop"],
    correctAnswerIndex: 3,
    explanation: "The `for...in` loop is specifically designed to iterate over the enumerable string properties of an object."
  },
  {
    question: "What does the Fetch API's `response.json()` method return?",
    options: ["A JSON object", "A JavaScript object", "A Promise that resolves with the result of parsing the body text as JSON", "A JSON string"],
    correctAnswerIndex: 2,
    explanation: "The `.json()` method is asynchronous and returns a Promise that, when resolved, gives you the parsed JavaScript object."
  },
  {
    question: "What is a key difference between arrow functions and regular functions regarding the `this` keyword?",
    options: ["Arrow functions cannot use `this`", "Regular functions have their own `this` binding, while arrow functions inherit `this` from the surrounding scope", "They handle `this` identically", "`this` is always the global object in arrow functions"],
    correctAnswerIndex: 1,
    explanation: "Arrow functions have a lexical `this`, meaning they don't create their own `this` context but inherit it from their parent scope."
  },

  // =================================================================
  // PHASE 2: Advanced JavaScript (8 Questions)
  // =================================================================
  {
    question: "What is a closure in JavaScript?",
    options: ["A function bundled together with references to its surrounding state (the lexical environment)", "A special type of class", "A way to close the browser window", "A built-in JavaScript method"],
    correctAnswerIndex: 0,
    explanation: "A closure gives you access to an outer function's scope from an inner function, even after the outer function has finished executing."
  },
  {
    question: "What is the purpose of the `bind` method?",
    options: ["To immediately invoke a function", "To create a new function that, when called, has its `this` keyword set to the provided value", "To merge two functions together", "To link a function to an event"],
    correctAnswerIndex: 1,
    explanation: "`bind` creates a new function with a permanently bound `this` value, which is useful for event handlers and callbacks."
  },
  {
    question: "What is the JavaScript Prototype Chain?",
    options: ["A list of all objects in the application", "A security feature to prevent unauthorized access", "A mechanism where objects can inherit properties and methods from other objects", "A performance optimization technique"],
    correctAnswerIndex: 2,
    explanation: "When trying to access a property on an object, JavaScript will look up the prototype chain until it finds the property or reaches the end (null)."
  },
  {
    question: "What is the correct way to handle an error in an `async` function?",
    options: ["Using a `.catch()` block on the function call", "Using a `try...catch` block around the `await` expression", "Using an `if (error)` statement", "Async functions handle errors automatically"],
    correctAnswerIndex: 1,
    explanation: "The `try...catch` statement is the standard way to handle errors from Promises that are being awaited in an `async` function."
  },
  {
    question: "What does `Promise.all()` do?",
    options: ["Returns the first promise that resolves", "Takes an iterable of promises and returns a single Promise that resolves when all of the input's promises have resolved", "Executes promises sequentially", "Rejects if any of the input promises resolve"],
    correctAnswerIndex: 1,
    explanation: "`Promise.all()` is useful for aggregating the results of multiple promises. It rejects if any of the promises reject."
  },
  {
    question: "An IIFE (Immediately Invoked Function Expression) is primarily used for what purpose?",
    options: ["To create a private scope and avoid polluting the global namespace", "To delay the execution of a function", "To define an asynchronous function", "To create a reusable component"],
    correctAnswerIndex: 0,
    explanation: "By wrapping a function in parentheses and invoking it immediately, you create a new scope for its variables, preventing them from becoming global."
  },
  {
    question: "What is a static method in an ES6 class?",
    options: ["A method that cannot be changed", "A method that is only available on the class itself, not on instances of the class", "A method that is automatically called", "A method inherited from the Object prototype"],
    correctAnswerIndex: 1,
    explanation: "Static methods are called on the class directly (e.g., `MyClass.staticMethod()`) and are often used for utility functions."
  },
  {
    question: "What is event delegation?",
    options: ["Assigning a task to another event", "Adding a single event listener to a parent element to manage events for all its children", "A performance bottleneck", "A way to create custom events"],
    correctAnswerIndex: 1,
    explanation: "Event delegation is a pattern that improves performance by reducing the number of event listeners needed on a page."
  },

  // =================================================================
  // PHASE 3: React Fundamentals (12 Questions)
  // =================================================================
  {
    question: "What must a React component function return?",
    options: ["A string of HTML", "A JavaScript object", "A single root JSX element (or null, or a fragment)", "An array of elements"],
    correctAnswerIndex: 2,
    explanation: "A component must have a single root. If you need to return multiple elements, you can wrap them in a fragment (`<>...</>`)."
  },
  {
    question: "How do you write a comment in JSX?",
    options: ["<!-- This is a comment -->", "// This is a comment", "`This is a comment`", "{/* This is a comment */}"],
    correctAnswerIndex: 3,
    explanation: "JSX comments are written by wrapping a standard JavaScript block comment inside curly braces."
  },
  {
    question: "In React, are props mutable or immutable within the component that receives them?",
    options: ["Mutable", "Immutable", "They can be either, depending on how they are declared", "Only string props are immutable"],
    correctAnswerIndex: 1,
    explanation: "Props are read-only. A component must never modify its own props. This is a core principle of React that ensures a predictable data flow."
  },
  {
    question: "What is the functional update form of `useState` and why is it useful?",
    options: ["A way to set state to a function", "A pattern to ensure the state update is based on the most recent state, avoiding race conditions", "A performance optimization", "A deprecated feature"],
    correctAnswerIndex: 1,
    explanation: "Using `setCount(prevCount => prevCount + 1)` guarantees the update is based on the latest state, which is crucial when the new state depends on the old one."
  },
  {
    question: "What happens when you call the updater function returned by `useState` (e.g., `setCount`)?",
    options: ["It immediately changes the state variable and re-renders the component", "It schedules a re-render of the component with the new state value", "It updates the state but does not trigger a re-render", "It returns the new state value"],
    correctAnswerIndex: 1,
    explanation: "State updates in React are asynchronous. Calling the setter function tells React to queue a re-render for that component and its children."
  },
  {
    question: "What is the purpose of the dependency array in `useEffect(callback, dependencies)`?",
    options: ["It lists the props the component receives", "It's an array of functions to call when the component unmounts", "It tells React to re-run the effect only if one of the values in the array has changed since the last render", "It is an optional array for styling"],
    correctAnswerIndex: 2,
    explanation: "The dependency array is a key performance optimization that prevents the effect from running on every single render."
  },
  {
    question: "When does the cleanup function returned from a `useEffect` callback run?",
    options: ["Only when the component is unmounted", "Before the effect runs again, and also when the component is unmounted", "After every render", "It never runs automatically"],
    correctAnswerIndex: 1,
    explanation: "The cleanup function is crucial for preventing memory leaks by cleaning up subscriptions or timers before the next effect runs or the component is removed."
  },
  {
    question: "What is the best type of value to use for the `key` prop in a list?",
    options: ["The array index of the item", "A random number or string", "A stable and unique identifier from the data, like a database ID", "The name or title of the item"],
    correctAnswerIndex: 2,
    explanation: "Using the array index can lead to bugs with re-ordering, inserting, or deleting items. A stable, unique ID is the only reliable choice."
  },
  {
    question: "What is a controlled component in the context of React forms?",
    options: ["A form element whose value is controlled by the DOM", "A form element whose value is controlled by React state", "A form that cannot be changed", "A component that has been validated"],
    correctAnswerIndex: 1,
    explanation: "In a controlled component, the React component's state is the 'single source of truth' for the input's value, which is updated via an `onChange` handler."
  },
  {
    question: "What does `children` prop represent?",
    options: ["A list of child components in the state", "Any content placed between the opening and closing tags of a component", "A special prop that is always an array", "A method for creating child components"],
    correctAnswerIndex: 1,
    explanation: "The `children` prop allows you to create wrapper components that can contain any JSX, making them highly reusable."
  },
  {
    question: "How do you pass a function from a parent component to a child component?",
    options: ["It's not possible", "By converting the function to a string", "As a prop", "Using the Context API"],
    correctAnswerIndex: 2,
    explanation: "Functions can be passed as props just like any other data type. This is a common pattern for allowing child components to communicate back to their parents."
  },
  {
    question: "In JSX, what does the `className` attribute correspond to in HTML?",
    options: ["The `id` attribute", "The `class` attribute", "The `name` attribute", "A custom data attribute"],
    correctAnswerIndex: 1,
    explanation: "`class` is a reserved keyword in JavaScript, so React uses `className` in JSX to set the HTML `class` attribute."
  },

  // =================================================================
  // PHASE 4: Advanced React (10 Questions)
  // =================================================================
  {
    question: "When is `useReducer` a better choice than `useState`?",
    options: ["For simple state like a boolean or string", "When state logic is complex or the next state depends on the previous one", "When you want to avoid re-renders", "It is never better than useState"],
    correctAnswerIndex: 1,
    explanation: "`useReducer` helps manage complex state transitions by centralizing all update logic into a single reducer function, making the component cleaner."
  },
  {
    question: "What is the primary use case for the `useRef` hook?",
    options: ["To cause a component to re-render", "To store a mutable value that does not cause a re-render when changed, or to access a DOM element", "To manage complex state", "To memoize a value"],
    correctAnswerIndex: 1,
    explanation: "`useRef` is an 'escape hatch' for when you need to interact with the DOM directly or hold a value (like a timer ID) that shouldn't trigger a re-render."
  },
  {
    question: "What is the difference between `useMemo` and `useCallback`?",
    options: ["`useMemo` returns a memoized value, while `useCallback` returns a memoized function", "`useCallback` is for classes, `useMemo` is for functions", "They are identical", "`useMemo` is for DOM nodes, `useCallback` is for state"],
    correctAnswerIndex: 0,
    explanation: "You use `useMemo` to avoid re-calculating an expensive value. You use `useCallback` to avoid re-creating a function, which is useful when passing callbacks to optimized child components."
  },
  {
    question: "How does a component consume a value from the React Context?",
    options: ["By using the `useContext` hook", "By accessing `this.props.context`", "The value is passed automatically as a prop", "By using `useState`"],
    correctAnswerIndex: 0,
    explanation: "The `useContext(MyContext)` hook is the standard way for a functional component to subscribe to a context and get its current value."
  },
  {
    question: "In React Router, which hook is used to access URL parameters from a dynamic route (e.g., '/users/:id')?",
    options: ["useNavigate", "useLocation", "useRoute", "useParams"],
    correctAnswerIndex: 3,
    explanation: "The `useParams` hook returns an object of key/value pairs of the dynamic parameters from the current URL."
  },
  {
    question: "What is a Higher-Order Component (HOC)?",
    options: ["A component that is rendered at the top of the page", "A function that takes a component and returns a new component with additional props or logic", "A component that uses hooks", "A modern, preferred pattern"],
    correctAnswerIndex: 1,
    explanation: "HOCs are a pattern for reusing component logic, though they have been largely superseded by custom hooks for simplicity and better composition."
  },
  {
    question: "What is the main advantage of using a state management library like Zustand or Redux?",
    options: ["To make the application faster", "To reduce the amount of code", "To manage global state that can be accessed by any component without prop drilling", "To handle component styling"],
    correctAnswerIndex: 2,
    explanation: "These libraries provide a centralized store for application state, making it accessible to deeply nested components and easier to manage."
  },
  {
    question: "In TanStack Query, what does the `queryKey` do?",
    options: ["It's the password for the API", "It's a unique, serializable key used to identify and cache a query's data", "It specifies the type of data being fetched", "It's an optional configuration"],
    correctAnswerIndex: 1,
    explanation: "The `queryKey` is fundamental. TanStack Query uses it to manage caching, refetching, and sharing of data throughout your application."
  },
  {
    question: "Which TanStack Query hook would you use to update or delete data on the server?",
    options: ["useQuery", "useServerState", "useMutation", "useUpdate"],
    correctAnswerIndex: 2,
    explanation: "`useQuery` is for reading data. For any action that creates, updates, or deletes data, you should use the `useMutation` hook."
  },
  {
    question: "What is an 'optimistic update'?",
    options: ["Assuming a mutation will succeed and updating the UI immediately, before the server confirms it", "Hoping the server is online", "A type of database query", "A positive error message"],
    correctAnswerIndex: 0,
    explanation: "Optimistic updates make an application feel much faster by updating the UI instantly, then rolling back the change if the server request ultimately fails."
  },

  // =================================================================
  // PHASE 5: Production Ready & Ecosystem (10 Questions)
  // =================================================================
  {
    question: "When testing with React Testing Library, which query is best for finding an element that might not be on the screen yet?",
    options: ["getByRole", "queryByRole", "findByRole", "checkByRole"],
    correctAnswerIndex: 2,
    explanation: "`findBy` methods return a Promise that resolves when the element is found, making them perfect for testing asynchronous behavior (e.g., waiting for data to load)."
  },
  {
    question: "What is the purpose of `React.memo`?",
    options: ["To memoize a function", "To remember the component's state", "A HOC that prevents a component from re-rendering if its props have not changed", "To add memory to the component"],
    correctAnswerIndex: 2,
    explanation: "`React.memo` is a performance optimization that performs a shallow comparison of props to determine if a re-render is necessary."
  },
  {
    question: "What is code-splitting?",
    options: ["Writing code in multiple files", "A feature that allows bundlers to split code into smaller chunks that can be loaded on demand", "A way to comment code", "A CSS technique"],
    correctAnswerIndex: 1,
    explanation: "Code-splitting with tools like `React.lazy` is a key technique for improving the initial load performance of a web application."
  },
  {
    question: "What is the role of a build tool like Vite or Webpack in a React project?",
    options: ["To run the development server only", "To bundle all the JavaScript files, CSS, and assets into optimized files for the browser", "To check for TypeScript errors", "To manage user authentication"],
    correctAnswerIndex: 1,
    explanation: "Bundlers are essential tools that process your source code and produce optimized, production-ready static assets that can be served to users."
  },
  {
    question: "What is the purpose of an `.env.local` file in a Next.js project?",
    options: ["To define global CSS variables", "To store environment variables that are available locally and are not committed to Git", "To list project dependencies", "To configure the build process"],
    correctAnswerIndex: 1,
    explanation: "This file is for storing secrets (like API keys) and other environment-specific configurations. It is listed in `.gitignore` by default to prevent secrets from being exposed."
  },
  {
    question: "What is Row Level Security (RLS) in Supabase?",
    options: ["A way to encrypt data", "A set of database policies that control which rows a user can access or modify based on their session", "A type of user authentication", "A method for optimizing database queries"],
    correctAnswerIndex: 1,
    explanation: "RLS is a critical security feature that allows you to define powerful rules directly in the database, ensuring users can only ever access their own data."
  },
  {
    question: "What is Server-Side Rendering (SSR) in Next.js?",
    options: ["Rendering the entire application on the client", "Pre-rendering a page into HTML on the server for each request", "A method for styling components", "A data-fetching library"],
    correctAnswerIndex: 1,
    explanation: "SSR generates the full HTML for a page on the server in response to a user's request, which can be great for SEO and perceived performance."
  },
  {
    question: "When simulating user interaction in React Testing Library, why is `user-event` often preferred over `fireEvent`?",
    options: ["`user-event` is shorter to type", "`fireEvent` is deprecated", "`user-event` more closely simulates real user interactions, dispatching multiple events as a browser would", "`fireEvent` only works on buttons"],
    correctAnswerIndex: 2,
    explanation: "For example, `userEvent.type(input, 'hello')` will dispatch `keyDown`, `keyPress`, and `keyUp` events for each character, just like a real user, making tests more realistic."
  },
  {
    question: "What is the purpose of the `middleware.ts` file in Next.js?",
    options: ["To define global styles", "To run code on the server before a request is completed, allowing for redirects, rewrites, and authentication checks", "To store custom hook logic", "To configure the Next.js build"],
    correctAnswerIndex: 1,
    explanation: "Middleware is a powerful tool for implementing logic that needs to run at the 'edge' (on the server) for incoming requests, such as protecting routes."
  },
  {
    question: "What does 'Thinking in React' generally advise as the first step when building a new feature?",
    options: ["Write the state logic", "Set up the API calls", "Break the UI into a component hierarchy", "Choose a styling solution"],
    correctAnswerIndex: 2,
    explanation: "The official React docs recommend starting by looking at the design, drawing boxes around every component and subcomponent, and arranging them into a hierarchy."
  },
];