import type { Course, CourseDay, Phase } from "./types"

const phases: Phase[] = [
  {
    name: "Programming Foundations",
    days: "Days 1-3",
    bgGradient: "from-cyan-100",
    darkBgGradient: "dark:from-cyan-900/50",
    gradient: "from-cyan-500 to-sky-500",
  },
  {
    name: "C Basics",
    days: "Days 4-7",
    bgGradient: "from-sky-100",
    darkBgGradient: "dark:from-sky-900/50",
    gradient: "from-sky-500 to-indigo-500",
  },
  {
    name: "Control Flow",
    days: "Days 8-12",
    bgGradient: "from-indigo-100",
    darkBgGradient: "dark:from-indigo-900/50",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Data Structures & Functions",
    days: "Days 13-15",
    bgGradient: "from-purple-100",
    darkBgGradient: "dark:from-purple-900/50",
    gradient: "from-purple-500 to-pink-500",
  },
]

const days: CourseDay[] = [
  {
    day: 1,
    phase: "Programming Foundations",
    title: "What is a Programming Language?",
    topics: ["Machine language", "Assembly language", "High-level languages", "Translators"],
    resources: [
      { name: "HSC ICT — Chapter 5 (textbook reference)", url: "https://en.wikipedia.org/wiki/Programming_language" },
    ],
    theory: `Computers were built to do calculations quickly. To tell a computer what to do, we use a <strong>programming language</strong>. Programs written in any language are eventually translated into the only language the computer's CPU actually understands — <strong>machine language</strong> (1s and 0s).<br/><br/><strong>Three levels of language</strong><ul><li><strong>Machine language</strong> — pure binary instructions for the CPU. Fastest to execute, but unreadable by humans.</li><li><strong>Assembly language</strong> — a thin layer above machine code (mnemonics like <code>MOV</code>, <code>ADD</code>). Still very low-level and CPU-specific. Translated to machine code by an <strong>assembler</strong>.</li><li><strong>High-level language</strong> — close to English (C, C++, Java, Python). Easier to write and read. Translated to machine code by a <strong>compiler</strong> or run by an <strong>interpreter</strong>.</li></ul>This course teaches the <strong>C language</strong> — a high-level language famous for being fast, portable, and the foundation under most operating systems and lower-level libraries.<br/><br/><strong>Compiler vs Interpreter</strong><ul><li>A <strong>compiler</strong> translates the entire program at once into a machine-code executable file. Errors in any part of the file have to be fixed before any of it runs. Examples: C, C++.</li><li>An <strong>interpreter</strong> reads the program line by line and executes each line directly. The program stops at the first error encountered. Examples: Python, JavaScript.</li></ul>Compiled programs generally run faster; interpreted programs are usually easier to develop and debug.`,
    exercises: [
      {
        title: "Match the level to the language",
        description:
          "There's no live editor for this conceptual day. Write down (on paper or in a note) which level each of these belongs to: (a) <code>MOV AX, 5</code>, (b) <code>printf(\"hi\")</code>, (c) <code>10110010 00000101</code>. Then expand the solution to check.",
        solution: {
          code: `(a) MOV AX, 5            -> assembly language
(b) printf("hi")        -> high-level language (C)
(c) 10110010 00000101   -> machine language (raw binary)`,
          explanation:
            "Machine language is pure binary the CPU executes directly. Assembly uses short mnemonics like MOV/ADD that map almost 1-to-1 to machine instructions. High-level languages like C use English-like syntax and need a compiler/interpreter to reach machine code.",
        },
        hints: [
          "Binary digits (0/1) are the bottom of the stack.",
          "Mnemonics like MOV/ADD are one level above binary.",
          "English-like syntax with function calls is the top level.",
        ],
      },
    ],
    quiz: [
      {
        question: "Which level of language does the CPU directly execute?",
        options: ["High-level", "Assembly", "Machine", "Source code"],
        correctAnswerIndex: 2,
        explanation: "Machine language (binary instructions) is the only language a CPU runs natively. Everything else must be translated to it first.",
      },
      {
        question: "Which tool translates an entire C program into an executable file in one pass?",
        options: ["Compiler", "Interpreter", "Assembler", "Linker"],
        correctAnswerIndex: 0,
        explanation: "A compiler reads the whole source file, finds all the errors it can, and outputs an executable. An interpreter reads and runs the code line by line.",
      },
      {
        question: "Which is generally true about interpreted languages vs compiled languages?",
        options: [
          "Interpreted languages always run faster",
          "Compiled languages always run faster",
          "Interpreted languages are typically easier to test and debug interactively",
          "There is no real difference",
        ],
        correctAnswerIndex: 2,
        explanation: "Compiled languages are usually faster at runtime, but interpreted languages let you test code line-by-line without recompiling — which is great for development.",
      },
    ],
  },
  {
    day: 2,
    phase: "Programming Foundations",
    title: "Algorithm & Flowchart",
    topics: ["Algorithm", "Flowchart symbols", "Problem-solving steps"],
    resources: [{ name: "Wikipedia: Flowchart", url: "https://en.wikipedia.org/wiki/Flowchart" }],
    theory: `Before writing code, a programmer plans the solution. The two classic tools are the <strong>algorithm</strong> and the <strong>flowchart</strong>.<br/><br/><strong>Algorithm</strong> — an ordered sequence of steps that solves a problem. A good algorithm is:<ul><li><strong>Finite</strong> — it ends in a reasonable number of steps.</li><li><strong>Definite</strong> — every step is clear and unambiguous.</li><li><strong>Effective</strong> — every step is something a person (or computer) can actually carry out.</li><li><strong>General</strong> — solves a class of problems, not just one specific input.</li></ul><br/><strong>Flowchart</strong> — a picture of the algorithm, drawn with a small set of standard shapes:<ul><li>🟢 <strong>Oval</strong> — Start / End.</li><li>⬛ <strong>Parallelogram</strong> — Input / Output.</li><li>▭ <strong>Rectangle</strong> — Process (an operation, like an assignment or calculation).</li><li>🔶 <strong>Diamond</strong> — Decision (a yes/no question).</li><li>⭕ <strong>Circle</strong> — Connector (to join parts of a chart that span pages).</li><li>↓ <strong>Arrows</strong> — flow of control between shapes.</li></ul><br/><strong>The typical workflow</strong><ol><li>Understand the problem thoroughly.</li><li>Write an algorithm in plain language.</li><li>Draw a flowchart from the algorithm.</li><li>Write the code in your chosen language.</li><li>Test the code and release.</li></ol>This same skill applies to every language — once you can think in algorithms and flowcharts, switching languages becomes mostly syntax.`,
    exercises: [
      {
        title: "Write an algorithm to find the larger of two numbers",
        description:
          "Plan (don't code) an algorithm that takes two numbers and outputs which is larger (or that they're equal). Write out the steps in plain English.",
        solution: {
          code: `Algorithm: Larger of Two Numbers
1. Start
2. Input two numbers, call them A and B
3. If A > B, then output "A is larger" and go to step 6
4. If B > A, then output "B is larger" and go to step 6
5. Output "A and B are equal"
6. End`,
          explanation:
            "A complete algorithm has start/end, takes inputs, checks each condition, and gives an output for every possible case (including equality).",
        },
        hints: [
          "Start with Start. End with End. Number every step.",
          "Don't forget the case where the two numbers are equal.",
        ],
      },
    ],
    quiz: [
      {
        question: "Which flowchart symbol represents a decision (a yes/no question)?",
        options: ["Rectangle", "Diamond", "Oval", "Parallelogram"],
        correctAnswerIndex: 1,
        explanation: "The diamond shape always means a decision — exactly two output arrows labeled Yes/No (or True/False).",
      },
      {
        question: "Which shape is used for Start and End in a flowchart?",
        options: ["Rectangle", "Diamond", "Oval", "Circle"],
        correctAnswerIndex: 2,
        explanation: "Ovals (rounded shapes) are reserved for the entry and exit points of a flowchart.",
      },
      {
        question: "Which is NOT a required property of a good algorithm?",
        options: ["Finite", "Definite", "Written in C", "Effective"],
        correctAnswerIndex: 2,
        explanation: "An algorithm is language-independent. It must be finite, definite/clear, and effective, but it can be expressed in plain English or in any programming language.",
      },
    ],
  },
  {
    day: 3,
    phase: "Programming Foundations",
    title: "Languages, Generations & Programming Paradigms",
    topics: ["Generations of languages", "Procedural", "Object-oriented", "Why C"],
    resources: [{ name: "Wikipedia: Programming paradigm", url: "https://en.wikipedia.org/wiki/Programming_paradigm" }],
    theory: `<strong>Generations of programming languages</strong><ul><li><strong>1st generation</strong> — machine language.</li><li><strong>2nd generation</strong> — assembly language.</li><li><strong>3rd generation</strong> — high-level procedural languages (FORTRAN, COBOL, C, Pascal).</li><li><strong>4th generation</strong> — declarative / domain-specific languages (SQL, MATLAB).</li><li><strong>5th generation</strong> — logic / AI languages (Prolog).</li></ul><br/><strong>Programming paradigms</strong><ul><li><strong>Structured / procedural</strong> — programs are sequences of statements organized into functions/procedures. C is the classic example.</li><li><strong>Object-oriented (OOP)</strong> — programs are objects that bundle data and behavior. C++, Java, Python.</li><li><strong>Functional</strong> — programs are mathematical functions applied to data. Haskell, parts of JavaScript.</li><li><strong>Logical</strong> — programs are rules and facts; the runtime infers answers. Prolog.</li></ul><br/><strong>Why learn C?</strong> C is small (a handful of keywords), fast (compiles to efficient machine code), and the building block under most operating systems, database engines, embedded systems, and other languages' runtimes. Most languages you'll meet later — C++, Java, JavaScript, Python — borrow their core syntax from C, so what you learn here transfers everywhere.<br/><br/>The official C compiler used by the textbook is <strong>GCC</strong> (or any C99/C11-compatible compiler). On a real machine you would install GCC or use an online editor; in this course, write your code in the editor, then compile and run it in your own environment.`,
    exercises: [
      {
        title: "Hello, World! — compile it yourself",
        description:
          "Copy the program below into a file called <code>hello.c</code> on your own machine, then compile and run it with <code>gcc hello.c -o hello</code> followed by <code>./hello</code>. The on-page editor is a code workspace — actual compilation happens locally.",
        template: "c",
        activeFile: "/hello.c",
        starter: {
          "/hello.c": `// Type your program here, then copy/paste into a local file.
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
`,
        },
        hints: [
          "#include <stdio.h> brings in printf.",
          "Every C program starts at main().",
          "On Linux/macOS: gcc hello.c -o hello && ./hello",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
          explanation:
            "Three things to notice: <code>#include &lt;stdio.h&gt;</code> is a preprocessor directive that loads the standard I/O library so we can use <code>printf</code>; <code>int main()</code> is where execution begins; <code>return 0;</code> tells the OS the program ended successfully.",
        },
      },
    ],
    quiz: [
      {
        question: "Which paradigm does C primarily belong to?",
        options: ["Object-oriented", "Functional", "Procedural / structured", "Logical"],
        correctAnswerIndex: 2,
        explanation: "C is the canonical procedural language — functions operate on data passed to them, with no built-in classes or objects.",
      },
      {
        question: "Which generation of programming languages includes C, FORTRAN and Pascal?",
        options: ["1st", "2nd", "3rd", "5th"],
        correctAnswerIndex: 2,
        explanation: "3rd-generation languages are the early high-level, procedural languages. 1st = machine, 2nd = assembly, 4th = SQL/MATLAB, 5th = Prolog.",
      },
    ],
  },
  {
    day: 4,
    phase: "C Basics",
    title: "First Program: structure of a C source file",
    topics: ["#include", "main()", "printf", "return", "Comments"],
    resources: [
      { name: "C reference: printf", url: "https://en.cppreference.com/w/c/io/fprintf" },
    ],
    theory: `Every C program looks roughly like this:<br/><br/><code>#include &lt;stdio.h&gt;<br/><br/>int main() {<br/>&nbsp;&nbsp;&nbsp;&nbsp;printf("Hello, World!\\n");<br/>&nbsp;&nbsp;&nbsp;&nbsp;return 0;<br/>}</code><br/><br/><strong>What each line does</strong><ul><li><code>#include &lt;stdio.h&gt;</code> — a <strong>preprocessor directive</strong>. It tells the compiler to paste in the standard I/O header so the program can use <code>printf</code> and <code>scanf</code>.</li><li><code>int main()</code> — the function where every C program begins. <code>int</code> means it returns an integer to the operating system.</li><li><code>{ ... }</code> — curly braces define a <strong>block</strong> of code. Everything between them is the body of <code>main</code>.</li><li><code>printf("Hello, World!\\n");</code> — calls the <code>printf</code> library function with one argument, a string. The <code>\\n</code> at the end means newline.</li><li><code>return 0;</code> — exits the function and reports success (0) to the OS.</li><li>Each <strong>statement ends with a semicolon</strong> <code>;</code>.</li></ul><br/><strong>Comments</strong> are notes for humans, ignored by the compiler:<ul><li><code>// single-line comment</code></li><li><code>/* multi-line<br/>comment */</code></li></ul><br/><strong>Escape characters</strong> inside strings:<ul><li><code>\\n</code> — newline</li><li><code>\\t</code> — tab</li><li><code>\\\\</code> — a literal backslash</li><li><code>\\"</code> — a literal double quote</li></ul>`,
    exercises: [
      {
        title: "Print three lines",
        description:
          "Modify the program to print these three lines, exactly:<br/>1) <code>My name is Sara.</code><br/>2) <code>I am learning C.</code><br/>3) <code>Press any key to continue.</code>",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    // TODO: print three lines
    return 0;
}
`,
        },
        hints: [
          "Use three printf calls.",
          "End each string with \\n to move to the next line.",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    printf("My name is Sara.\\n");
    printf("I am learning C.\\n");
    printf("Press any key to continue.\\n");
    return 0;
}`,
          explanation:
            "Each printf prints one string and the trailing \\n drops the cursor to the next line. Without \\n, all three lines would be glued together.",
        },
      },
    ],
    quiz: [
      {
        question: "What does `\\n` mean inside a printf string?",
        options: ["Print the letter n", "Newline", "Null character", "Skip the next character"],
        correctAnswerIndex: 1,
        explanation: "`\\n` is an escape sequence for the newline character. It moves the cursor to the start of the next line.",
      },
      {
        question: "Which line preloads the printf function into your program?",
        options: ["int main()", "#include <stdio.h>", "return 0;", "void printf()"],
        correctAnswerIndex: 1,
        explanation: "stdio.h ('standard I/O') declares printf, scanf and friends. Without the #include, the compiler doesn't know what printf is.",
      },
      {
        question: "Every C statement must end with which character?",
        options: [".", ",", ";", ":"],
        correctAnswerIndex: 2,
        explanation: "Statements in C are terminated with a semicolon. Missing semicolons are one of the most common beginner errors.",
      },
    ],
  },
  {
    day: 5,
    phase: "C Basics",
    title: "Variables & Data Types",
    topics: ["int", "char", "float", "double", "Format specifiers", "Naming rules"],
    resources: [],
    theory: `A <strong>variable</strong> is a named container for a value. You must declare its <strong>type</strong> before you use it.<br/><br/><strong>Primitive types in C</strong><table style="margin: 8px 0"><tr><th>Type</th><th>What it stores</th><th>Format specifier</th></tr><tr><td><code>int</code></td><td>whole numbers (e.g. 5, -42)</td><td><code>%d</code></td></tr><tr><td><code>char</code></td><td>a single character (e.g. 'A')</td><td><code>%c</code></td></tr><tr><td><code>float</code></td><td>decimal numbers (~7 digits of precision)</td><td><code>%f</code></td></tr><tr><td><code>double</code></td><td>decimal numbers (~15 digits of precision)</td><td><code>%lf</code></td></tr></table><br/><strong>Declaration vs assignment</strong><br/><code>int x;</code>          → declare x (it now holds an unspecified value).<br/><code>x = 5;</code>          → assign 5 to x.<br/><code>int x = 5;</code>      → declare and initialize in one step.<br/>You can declare several variables of the same type on one line:<br/><code>int number1, number2;</code><br/><br/><strong>Naming rules</strong><ul><li>Names can contain letters, digits, and underscores.</li><li>Names <strong>must not</strong> start with a digit.</li><li>Names are <strong>case-sensitive</strong> — <code>age</code> and <code>Age</code> are different.</li><li>Names cannot contain spaces or hyphens (so <code>my-marks</code> and <code>final result</code> are invalid; use <code>my_marks</code> and <code>final_result</code>).</li><li>Cannot be a C <strong>keyword</strong> (int, return, if, while, for, …).</li></ul><br/><strong>Using printf with variables</strong><br/><code>printf("%d", age);</code> — prints the int <code>age</code>.<br/><code>printf("%d years and %c grade", age, grade);</code> — substitutes each specifier in order.`,
    exercises: [
      {
        title: "Declare and print four variables",
        description:
          "Declare an int (age = 17), a char (grade = 'A'), a float (height = 5.4), and a double (gpa = 3.85). Print each on its own line in the format <code>age = 17</code>, <code>grade = A</code>, etc.",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    // TODO: declare 4 variables and print each
    return 0;
}
`,
        },
        hints: [
          "Use %d for int, %c for char, %f for float, %lf for double.",
          "Surround char literals with single quotes: 'A'.",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    int age = 17;
    char grade = 'A';
    float height = 5.4;
    double gpa = 3.85;

    printf("age = %d\\n", age);
    printf("grade = %c\\n", grade);
    printf("height = %f\\n", height);
    printf("gpa = %lf\\n", gpa);

    return 0;
}`,
          explanation:
            "Each variable type pairs with its own format specifier. Float and double both print as numbers but double has higher precision and uses %lf.",
        },
      },
    ],
    quiz: [
      {
        question: "Which is a valid C variable name?",
        options: ["1result", "my-marks", "final result", "student_marks"],
        correctAnswerIndex: 3,
        explanation: "Variable names can't start with a digit, can't contain hyphens or spaces. Underscores are fine, so 'student_marks' works.",
      },
      {
        question: "Which format specifier prints a char?",
        options: ["%d", "%c", "%f", "%s"],
        correctAnswerIndex: 1,
        explanation: "%c is for a single character. %d is for integers, %f for floats, %s for strings.",
      },
      {
        question: "What's the difference between float and double?",
        options: [
          "There is none — they're aliases",
          "float can only hold positive numbers",
          "double has higher precision (more decimal digits)",
          "double is for currency only",
        ],
        correctAnswerIndex: 2,
        explanation: "Both hold decimal numbers, but double uses twice the memory and gives about 15 digits of precision vs ~7 for float.",
      },
    ],
  },
  {
    day: 6,
    phase: "C Basics",
    title: "Arithmetic Operators & Expressions",
    topics: ["+ - * /", "%", "Order of operations", "Multiple printf"],
    resources: [],
    theory: `C has the usual arithmetic operators:<ul><li><code>+</code> addition</li><li><code>-</code> subtraction</li><li><code>*</code> multiplication</li><li><code>/</code> division</li><li><code>%</code> modulo (remainder)</li></ul><br/><strong>Integer division</strong><br/>When both operands are integers, <code>/</code> performs <em>integer division</em> — the fractional part is thrown away. So <code>12 / 5</code> in C is <code>2</code>, not <code>2.4</code>. To get a decimal result, at least one operand must be a float or double: <code>12.0 / 5</code> is <code>2.4</code>.<br/><br/><strong>The modulo operator</strong><br/><code>%</code> gives the remainder after integer division. So <code>12 % 5</code> is <code>2</code> (because 12 = 5×2 + 2). Modulo is the standard way to test if a number is even or odd: <code>n % 2 == 0</code> means n is even.<br/><br/><strong>Operator precedence</strong><br/>Like in math: <code>*</code>, <code>/</code>, and <code>%</code> bind tighter than <code>+</code> and <code>-</code>. Use parentheses when in doubt:<br/><code>int x = 2 + 3 * 4;     // 14, because 3*4 first</code><br/><code>int y = (2 + 3) * 4;   // 20, parentheses change the order</code><br/><br/><strong>Combining variables and printf</strong><br/>You can pass an expression directly as a printf argument:<br/><code>printf("sum = %d\\n", number1 + number2);</code>`,
    exercises: [
      {
        title: "Sum, difference, product, quotient",
        description:
          "Declare two int variables (number1 = 12, number2 = 4). Print four lines showing their sum, difference, product, and quotient using one printf per line. The output should look like the textbook's example program.",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    int number1, number2;
    number1 = 12;
    number2 = 4;
    // TODO: print sum, difference, product, quotient
    return 0;
}
`,
        },
        hints: [
          "You can put an arithmetic expression directly inside printf as an argument.",
          "Format: printf(\"number1 + number2 = %d\\n\", number1 + number2);",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    int number1, number2;
    number1 = 12;
    number2 = 4;

    printf("number1 + number2 = %d\\n", number1 + number2);
    printf("number1 - number2 = %d\\n", number1 - number2);
    printf("number1 * number2 = %d\\n", number1 * number2);
    printf("number1 / number2 = %d\\n", number1 / number2);

    return 0;
}`,
          explanation:
            "Each line prints one operation. Note that integer division throws away the remainder — 12/4 happens to be exactly 3, but 13/4 would be 3 (not 3.25) and you'd need 13.0/4 to get the decimal.",
        },
      },
    ],
    quiz: [
      {
        question: "What is the value of `(2 + 3) * 4` in C?",
        options: ["14", "20", "9", "11"],
        correctAnswerIndex: 1,
        explanation: "Parentheses force the addition first: (2+3) = 5, then 5*4 = 20.",
      },
      {
        question: "What does `7 % 3` evaluate to in C?",
        options: ["2", "1", "0", "2.33"],
        correctAnswerIndex: 1,
        explanation: "% gives the remainder. 7 = 3*2 + 1, so the remainder is 1.",
      },
      {
        question: "What is `5 / 2` when both operands are int in C?",
        options: ["2.5", "2", "3", "Error"],
        correctAnswerIndex: 1,
        explanation: "Integer division truncates the fractional part. Use 5.0 / 2 to get 2.5.",
      },
    ],
  },
  {
    day: 7,
    phase: "C Basics",
    title: "Input with scanf",
    topics: ["scanf", "& (address-of)", "Mixed input", "Celsius → Fahrenheit"],
    resources: [],
    theory: `So far our programs use hard-coded values. To take input from the keyboard we use <code>scanf</code>:<br/><br/><code>int n1, n2;<br/>scanf("%d %d", &amp;n1, &amp;n2);</code><br/><br/><strong>Key points</strong><ul><li>The first argument is a format string telling <code>scanf</code> what types to expect.</li><li>Each variable name is preceded by <code>&amp;</code> (the "address-of" operator). This is required for scalar types — it tells scanf <em>where</em> to write the input.</li><li>Use the same format specifiers as printf: <code>%d</code> for int, <code>%c</code> for char, <code>%f</code> for float, <code>%lf</code> for double.</li><li>Separators in the format string (like a space) usually mean "any whitespace including newline" — so the user can press Enter or Space between numbers.</li></ul><br/><strong>Example: take two ints and print their sum</strong><br/><code>#include &lt;stdio.h&gt;<br/>int main() {<br/>&nbsp;&nbsp;&nbsp;&nbsp;int n1, n2;<br/>&nbsp;&nbsp;&nbsp;&nbsp;scanf("%d %d", &amp;n1, &amp;n2);<br/>&nbsp;&nbsp;&nbsp;&nbsp;printf("%d\\n", n1 + n2);<br/>&nbsp;&nbsp;&nbsp;&nbsp;return 0;<br/>}</code><br/><br/>When run, the program <em>waits</em> for the user to type two numbers and press Enter, then prints the sum.<br/><br/><strong>Celsius to Fahrenheit (textbook Example 5)</strong><br/>The formula is <code>F = 1.8 × C + 32</code>. Plan: take C as input, compute F, print it.`,
    exercises: [
      {
        title: "Celsius to Fahrenheit converter",
        description:
          "Read a float from the user representing a Celsius temperature. Compute the Fahrenheit equivalent using <code>F = 1.8 * C + 32</code> and print it.",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    float celsius, fahrenheit;
    // TODO: read celsius, compute fahrenheit, print
    return 0;
}
`,
        },
        hints: [
          "Use scanf(\"%f\", &celsius) to read a float.",
          "C operator precedence makes 1.8 * celsius happen before + 32, so parentheses aren't strictly needed.",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    float celsius, fahrenheit;
    scanf("%f", &celsius);
    fahrenheit = 1.8 * celsius + 32;
    printf("Fahrenheit = %f\\n", fahrenheit);
    return 0;
}`,
          explanation:
            "scanf with %f and &celsius writes the user's number into the celsius variable. Multiplication binds tighter than addition, so the formula works without parentheses.",
        },
      },
    ],
    quiz: [
      {
        question: "Why does scanf need `&` (ampersand) before each variable?",
        options: [
          "It's just decoration",
          "It means 'AND' — bitwise operator",
          "scanf needs the memory address where it should store the value",
          "It tells scanf to skip the value",
        ],
        correctAnswerIndex: 2,
        explanation: "`&variable` gives the memory address of the variable. scanf writes the input into that address.",
      },
      {
        question: "Which scanf call correctly reads two integers into n1 and n2?",
        options: [
          `scanf("%d %d", n1, n2);`,
          `scanf("%d %d", &n1, &n2);`,
          `scanf("%f %f", &n1, &n2);`,
          `scanf("%c %c", &n1, &n2);`,
        ],
        correctAnswerIndex: 1,
        explanation: "Two %d for two ints, and both variables prefixed with & so scanf knows where to write.",
      },
    ],
  },
  {
    day: 8,
    phase: "Control Flow",
    title: "If / else / else if",
    topics: ["Relational operators", "if", "if-else", "else if chain"],
    resources: [],
    theory: `Sometimes we want code to run only when a condition is true. That's the job of the <code>if</code> statement.<br/><br/><strong>Relational operators</strong><br/>These compare two values and produce <strong>true</strong> (non-zero) or <strong>false</strong> (zero):<ul><li><code>==</code> equal</li><li><code>!=</code> not equal</li><li><code>&gt;</code> greater than</li><li><code>&lt;</code> less than</li><li><code>&gt;=</code> greater than or equal</li><li><code>&lt;=</code> less than or equal</li></ul><strong>Warning:</strong> <code>=</code> is <em>assignment</em>, <code>==</code> is <em>comparison</em>. Mixing them up is one of the most common C bugs.<br/><br/><strong>if</strong><br/><code>if (condition) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;statement;<br/>}</code><br/><br/><strong>if / else</strong><br/><code>if (condition) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;// runs if true<br/>} else {<br/>&nbsp;&nbsp;&nbsp;&nbsp;// runs if false<br/>}</code><br/><br/><strong>else if chain</strong><br/>For multiple mutually-exclusive cases:<br/><code>if (cond1) { ... }<br/>else if (cond2) { ... }<br/>else if (cond3) { ... }<br/>else { ... }</code><br/><br/>The chain is evaluated top to bottom. As soon as one condition is true, its block runs and the rest are skipped.<br/><br/><strong>Example: grade calculator (textbook Example 7)</strong><br/>Read marks. Print 'A' if marks ≥ 80, 'A' if ≥ 70, 'A-' if ≥ 60, 'B' if ≥ 50, 'C' if ≥ 40, 'D' if ≥ 33, else 'F'.`,
    exercises: [
      {
        title: "Grade calculator",
        description:
          "Read an integer <code>marks</code>. Print the grade following the rules above. Use an else-if chain.",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    int marks;
    scanf("%d", &marks);
    // TODO: print grade using else-if chain
    return 0;
}
`,
        },
        hints: [
          "Order matters — check the highest threshold first.",
          "Use printf(\"Your grade is A+\\n\") for the top grade.",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    int marks;
    scanf("%d", &marks);

    if (marks >= 80) {
        printf("Your grade is A+\\n");
    } else if (marks >= 70) {
        printf("Your grade is A\\n");
    } else if (marks >= 60) {
        printf("Your grade is A-\\n");
    } else if (marks >= 50) {
        printf("Your grade is B\\n");
    } else if (marks >= 40) {
        printf("Your grade is C\\n");
    } else if (marks >= 33) {
        printf("Your grade is D\\n");
    } else {
        printf("Your grade is F\\n");
    }

    return 0;
}`,
          explanation:
            "The conditions are checked top-down. The moment one is true, that block runs and the rest are skipped. So marks=75 prints 'A' (the second branch); the >= 60, >= 50, etc. branches are never tested.",
        },
      },
    ],
    quiz: [
      {
        question: "What does `if (x = 5)` actually do in C?",
        options: [
          "Checks if x equals 5",
          "Assigns 5 to x, then treats the result as true",
          "Compares 5 to x",
          "Causes a compile error",
        ],
        correctAnswerIndex: 1,
        explanation: "`=` is assignment. `x = 5` stores 5 in x and the expression's value (5) is truthy, so the if body always runs. This is a classic bug. Use `==` for comparison.",
      },
      {
        question: "In an `if / else if / else` chain, how many of the blocks can run?",
        options: ["All of them", "At most one", "Exactly two", "None"],
        correctAnswerIndex: 1,
        explanation: "Once a branch's condition is true, its block runs and the rest are skipped. If no condition is true, the else block runs (if there is one).",
      },
      {
        question: "Which operator means 'not equal to'?",
        options: ["<>", "!=", "=/=", "~="],
        correctAnswerIndex: 1,
        explanation: "C uses `!=` for not-equal. `<>` is from other languages like Pascal.",
      },
    ],
  },
  {
    day: 9,
    phase: "Control Flow",
    title: "Logical Operators: && || !",
    topics: ["&&", "||", "!", "Truth tables", "FizzBuzz"],
    resources: [],
    theory: `When a decision depends on more than one condition, combine them with <strong>logical operators</strong>.<ul><li><code>&amp;&amp;</code> (AND) — true only if <em>both</em> sides are true.</li><li><code>||</code>  (OR)  — true if <em>at least one</em> side is true.</li><li><code>!</code>  (NOT) — flips true to false and vice versa.</li></ul><br/><strong>Truth tables</strong><br/><table><tr><th>A</th><th>B</th><th>A &amp;&amp; B</th><th>A || B</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td></tr><tr><td>F</td><td>T</td><td>F</td><td>T</td></tr><tr><td>F</td><td>F</td><td>F</td><td>F</td></tr></table><br/><strong>Examples</strong><ul><li>Adult voter: <code>if (age &gt;= 18 &amp;&amp; citizen == 1) { ... }</code></li><li>Weekend: <code>if (day == 6 || day == 7) { ... }</code></li><li>Not zero: <code>if (!(n == 0)) { ... }</code> — equivalent to <code>if (n != 0)</code></li></ul><br/><strong>FizzBuzz (textbook Example 9)</strong><br/>A classic problem that combines if/else and logical operators:<br/>Take a number. If it's divisible by both 3 and 5, print "FizzBuzz". If only by 3, print "Fizz". If only by 5, print "Buzz". Otherwise, do nothing or print the number itself.`,
    exercises: [
      {
        title: "FizzBuzz for one number",
        description:
          "Read an int <code>n</code>. Print 'FizzBuzz' if n is divisible by both 3 and 5, 'Fizz' if only by 3, 'Buzz' if only by 5. Otherwise print nothing.",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    // TODO: Fizz / Buzz / FizzBuzz
    return 0;
}
`,
        },
        hints: [
          "Check the FizzBuzz case first — it's the most specific.",
          "n is divisible by 3 if n % 3 == 0.",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    if (n % 3 == 0 && n % 5 == 0) {
        printf("FizzBuzz\\n");
    } else if (n % 3 == 0) {
        printf("Fizz\\n");
    } else if (n % 5 == 0) {
        printf("Buzz\\n");
    }
    return 0;
}`,
          explanation:
            "Order matters: if you check `n % 3 == 0` before `(n % 3 == 0 && n % 5 == 0)`, a number like 15 would print 'Fizz' instead of 'FizzBuzz'.",
        },
      },
    ],
    quiz: [
      {
        question: "Which expression is true only when BOTH x > 0 AND y > 0?",
        options: ["x > 0 || y > 0", "x > 0 && y > 0", "!(x > 0)", "x > 0, y > 0"],
        correctAnswerIndex: 1,
        explanation: "&& is logical AND. Both sides must be true for the whole expression to be true.",
      },
      {
        question: "In `n % 3 == 0`, what is being tested?",
        options: [
          "Whether n is greater than 3",
          "Whether n equals 30",
          "Whether n divided by 3 has remainder 0 (i.e. is a multiple of 3)",
          "Whether n is exactly 3",
        ],
        correctAnswerIndex: 2,
        explanation: "% is modulo (remainder). If n % 3 is 0, n is evenly divisible by 3.",
      },
      {
        question: "What does `!(x == 5)` evaluate to when x is 5?",
        options: ["true", "false", "5", "0 — compile error"],
        correctAnswerIndex: 1,
        explanation: "(x == 5) is true when x = 5; ! flips it to false. So !(x == 5) is the same as x != 5.",
      },
    ],
  },
  {
    day: 10,
    phase: "Control Flow",
    title: "While loop",
    topics: ["while syntax", "Counter variable", "Termination"],
    resources: [],
    theory: `A <strong>loop</strong> repeats a block of code while a condition holds.<br/><br/><strong>while syntax</strong><br/><code>while (condition) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;// body — runs repeatedly while condition is true<br/>}</code><br/><br/><strong>How it works</strong><ol><li>Check the condition.</li><li>If true, run the body, then go back to step 1.</li><li>If false, skip the body and continue after the loop.</li></ol><br/><strong>Example (textbook 10): print 'I Love Bangladesh.' 5 times</strong><br/><code>int i = 0;<br/>while (i &lt; 5) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;printf("I Love Bangladesh.\\n");<br/>&nbsp;&nbsp;&nbsp;&nbsp;i = i + 1;<br/>}</code><br/><br/>Notice the three ingredients: an <strong>initial value</strong> (<code>i = 0</code>), a <strong>continuation condition</strong> (<code>i &lt; 5</code>), and a <strong>step</strong> that progresses toward the exit (<code>i = i + 1</code>). Forgetting the step gives an <strong>infinite loop</strong>.<br/><br/><strong>Common loop: print numbers 1 to N</strong><br/><code>int n = 1;<br/>while (n &lt;= 100) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;printf("%d\\n", n);<br/>&nbsp;&nbsp;&nbsp;&nbsp;n = n + 1;<br/>}</code>`,
    exercises: [
      {
        title: "Print every even number from 2 to 100",
        description:
          "Use a while loop to print all even numbers between 2 and 100 (inclusive), each on its own line.",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    int n = 2;
    // TODO: while loop incrementing by 2 each step
    return 0;
}
`,
        },
        hints: [
          "Start n at 2 and increment by 2 each iteration.",
          "Or start at 1, increment by 1, and only print when n % 2 == 0.",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    int n = 2;
    while (n <= 100) {
        printf("%d\\n", n);
        n = n + 2;
    }
    return 0;
}`,
          explanation:
            "Starting at 2 and incrementing by 2 is the cleanest. Each iteration prints n, then advances n by 2. The loop exits when n becomes 102.",
        },
      },
    ],
    quiz: [
      {
        question: "What happens if you forget to update the loop variable inside a while loop?",
        options: [
          "The loop runs once and stops",
          "The loop never executes",
          "The loop runs forever (infinite loop)",
          "It causes a compile error",
        ],
        correctAnswerIndex: 2,
        explanation: "If the condition is true and never becomes false (because the variable never changes), the loop runs forever — an infinite loop.",
      },
      {
        question: "What does `while (i < 5) { printf(\"hi\"); i = i + 1; }` print, if i starts at 0?",
        options: ["nothing", "hi (once)", "hi hi hi hi hi (5 times)", "infinite hi"],
        correctAnswerIndex: 2,
        explanation: "i goes 0, 1, 2, 3, 4 — five iterations — then i = 5 fails the condition and the loop exits.",
      },
    ],
  },
  {
    day: 11,
    phase: "Control Flow",
    title: "For loop and continue",
    topics: ["for syntax", "Multiplication table", "continue", "Nested loops"],
    resources: [],
    theory: `When a loop has a clear counter, the <strong>for loop</strong> is more concise than while.<br/><br/><strong>for syntax</strong><br/><code>for (initialization; condition; update) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;// body<br/>}</code><br/><br/>It's exactly equivalent to:<br/><code>initialization;<br/>while (condition) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;// body<br/>&nbsp;&nbsp;&nbsp;&nbsp;update;<br/>}</code><br/><br/><strong>Sum 1 to 100 (textbook Example 13, rewritten as for)</strong><br/><code>int sum = 0;<br/>for (int n = 1; n &lt;= 100; n = n + 1) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;sum = sum + n;<br/>}<br/>printf("Result: %d\\n", sum);</code><br/><br/><strong>continue</strong> — skip the rest of the current iteration and go to the next one. <code>break</code> — exit the loop entirely. (We'll meet break in detail on day 12.)<br/><br/><strong>Nested loops: multiplication table</strong><br/>One loop inside another. To print the multiplication table for n:<br/><code>for (int i = 1; i &lt;= 10; i = i + 1) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;printf("%d x %d = %d\\n", n, i, n * i);<br/>}</code><br/>To print tables for several n values, wrap that in another for loop.`,
    exercises: [
      {
        title: "Multiplication table for one number",
        description:
          "Read an int <code>n</code>. Print its multiplication table from 1 to 10 using a for loop, formatted as <code>n x i = result</code>.",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    // TODO: for loop 1..10
    return 0;
}
`,
        },
        hints: [
          "for (int i = 1; i <= 10; i = i + 1)",
          "printf has three %d slots; pass n, i, and n*i.",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= 10; i = i + 1) {
        printf("%d x %d = %d\\n", n, i, n * i);
    }
    return 0;
}`,
          explanation:
            "The for loop neatly bundles init / condition / update. printf has three %d placeholders that are filled in order by n, i, and the product n*i.",
        },
      },
    ],
    quiz: [
      {
        question: "Inside a loop, what does `continue` do?",
        options: [
          "Exits the loop entirely",
          "Skips the rest of the current iteration and goes to the next",
          "Restarts the program",
          "Pauses execution",
        ],
        correctAnswerIndex: 1,
        explanation: "continue jumps to the next iteration. break exits the loop entirely.",
      },
      {
        question: "Which for loop sums numbers 1 through 10?",
        options: [
          "`for (int n = 0; n < 10; n++) sum = sum + n;`",
          "`for (int n = 1; n <= 10; n++) sum = sum + n;`",
          "`for (int n = 1; n < 10; n++) sum = sum + n;`",
          "`for (int n = 0; n < 10; n--) sum = sum + n;`",
        ],
        correctAnswerIndex: 1,
        explanation: "Start at 1, run while n <= 10 (so n hits 10), step by +1 each time. n++ is shorthand for n = n + 1.",
      },
    ],
  },
  {
    day: 12,
    phase: "Control Flow",
    title: "do-while loop & loop choice",
    topics: ["do-while syntax", "Exit-controlled vs entry-controlled", "When to pick which"],
    resources: [],
    theory: `The <strong>do-while</strong> loop is like while, but the condition is checked at the <em>end</em> of the iteration instead of the beginning.<br/><br/><code>do {<br/>&nbsp;&nbsp;&nbsp;&nbsp;// body — always runs at least once<br/>} while (condition);</code><br/><br/>Notice the trailing semicolon after the closing <code>)</code>.<br/><br/><strong>The crucial difference</strong><ul><li><code>while</code> and <code>for</code> are <strong>entry-controlled</strong> — if the condition is false from the start, the body runs <em>zero</em> times.</li><li><code>do-while</code> is <strong>exit-controlled</strong> — the body runs at least <em>once</em>, then the condition is checked.</li></ul><br/>Use <code>do-while</code> when an action <em>must</em> happen at least once, like asking the user for input until they give a valid answer.<br/><br/><strong>Example</strong><br/><code>int n;<br/>do {<br/>&nbsp;&nbsp;&nbsp;&nbsp;printf("Enter a positive number: ");<br/>&nbsp;&nbsp;&nbsp;&nbsp;scanf("%d", &amp;n);<br/>} while (n &lt;= 0);</code><br/><br/><strong>Choosing the right loop</strong><ul><li><strong>for</strong> — when you know how many times to loop (count from 1 to N).</li><li><strong>while</strong> — when you don't know how many iterations but want to check the condition before each one.</li><li><strong>do-while</strong> — when the body must run at least once.</li></ul>`,
    exercises: [
      {
        title: "Sum odd numbers 1 to 500 — using a while loop",
        description:
          "Use a while loop to compute and print the sum of all odd numbers from 1 to 500 (inclusive).",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    int n = 1;
    int sum = 0;
    // TODO: accumulate odd numbers
    printf("Sum = %d\\n", sum);
    return 0;
}
`,
        },
        hints: [
          "Start n at 1 and add 2 each step (1, 3, 5, …).",
          "Or test n % 2 == 1 and add 1 each step.",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    int n = 1;
    int sum = 0;
    while (n <= 500) {
        sum = sum + n;
        n = n + 2;
    }
    printf("Sum = %d\\n", sum);
    return 0;
}`,
          explanation:
            "Starting at 1 and stepping by 2 visits only odd numbers — simpler than checking n%2 each iteration. The sum reaches 62500.",
        },
      },
    ],
    quiz: [
      {
        question: "Which loop is guaranteed to execute its body at least once?",
        options: ["while", "for", "do-while", "None"],
        correctAnswerIndex: 2,
        explanation: "do-while checks the condition after the body, so the body always runs once before the condition is even tested.",
      },
      {
        question: "What's the right ending of a do-while loop?",
        options: [
          "} while (condition)",
          "} while (condition);",
          "} until (condition);",
          "}",
        ],
        correctAnswerIndex: 1,
        explanation: "A do-while ends with `} while (condition);` — note the semicolon after the closing parenthesis.",
      },
    ],
  },
  {
    day: 13,
    phase: "Data Structures & Functions",
    title: "Arrays",
    topics: ["Declaration", "Indexing", "Loops over arrays", "Swap", "Reverse"],
    resources: [],
    theory: `An <strong>array</strong> is a fixed-size collection of values of the same type, stored under one name.<br/><br/><strong>Declaration</strong><br/><code>int marks[5];               // an array of 5 ints (uninitialized)<br/>int marks[5] = {87, 82, 76, 85, 88};   // declare and initialize</code><br/><br/><strong>Indexing</strong><br/>Array indices in C start at <strong>0</strong>. So for an array of size 5, valid indices are 0, 1, 2, 3, 4.<br/><code>marks[0] = 90;              // assign to first element<br/>printf("%d\\n", marks[2]);   // read the third element</code><br/><br/><strong>Looping over an array</strong><br/><code>int marks[5] = {87, 82, 76, 85, 88};<br/>for (int i = 0; i &lt; 5; i = i + 1) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;printf("%d\\n", marks[i]);<br/>}</code><br/><br/><strong>Reading an array from input</strong><br/><code>int n = 5;<br/>int ara[5];<br/>for (int i = 0; i &lt; n; i = i + 1) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;scanf("%d", &amp;ara[i]);<br/>}</code><br/><br/><strong>Swapping two variables</strong> requires a temporary variable, because <code>a = b; b = a;</code> would lose the original a.<br/><code>int temp = a;<br/>a = b;<br/>b = temp;</code><br/><br/><strong>Reversing an array</strong> — swap pairs from the ends inward:<br/><code>for (int i = 0; i &lt; n / 2; i = i + 1) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;int temp = ara[i];<br/>&nbsp;&nbsp;&nbsp;&nbsp;ara[i] = ara[n - 1 - i];<br/>&nbsp;&nbsp;&nbsp;&nbsp;ara[n - 1 - i] = temp;<br/>}</code>`,
    exercises: [
      {
        title: "Find the maximum in an array",
        description:
          "Declare an int array of 5 numbers (your choice), then write a for loop that finds and prints the largest value.",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    int ara[5] = {12, 7, 35, 18, 24};
    // TODO: find and print the maximum
    return 0;
}
`,
        },
        hints: [
          "Initialize max to the first element, then iterate from index 1.",
          "If ara[i] > max, update max = ara[i].",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    int ara[5] = {12, 7, 35, 18, 24};
    int max = ara[0];
    for (int i = 1; i < 5; i = i + 1) {
        if (ara[i] > max) {
            max = ara[i];
        }
    }
    printf("Max = %d\\n", max);
    return 0;
}`,
          explanation:
            "Standard pattern: assume the first element is the max, then sweep the rest and update whenever you find something bigger.",
        },
      },
    ],
    quiz: [
      {
        question: "Given `int a[5];`, which is the FIRST valid index?",
        options: ["1", "0", "-1", "5"],
        correctAnswerIndex: 1,
        explanation: "C array indices start at 0. For an array of size 5, valid indices are 0, 1, 2, 3, 4.",
      },
      {
        question: "Why do we need a temp variable to swap two values?",
        options: [
          "C doesn't allow direct assignment",
          "Without temp, the first assignment overwrites one of the values before the second assignment can use it",
          "It makes the code faster",
          "temp is required by the standard",
        ],
        correctAnswerIndex: 1,
        explanation: "If you do `a = b; b = a;`, after the first line a has been overwritten with b's value, so the second line just copies that back — both end up with b's original value.",
      },
      {
        question: "Given `int ara[5] = {10, 20, 30, 40, 50};`, what is `ara[3]`?",
        options: ["3", "30", "40", "50"],
        correctAnswerIndex: 2,
        explanation: "Index 3 is the fourth element (0-based counting): 10, 20, 30, 40. So ara[3] = 40.",
      },
    ],
  },
  {
    day: 14,
    phase: "Data Structures & Functions",
    title: "Strings",
    topics: ["char arrays", "Null terminator \\0", "%s with scanf/printf", "String length", "Search"],
    resources: [],
    theory: `C has no dedicated string type — a <strong>string is just an array of chars</strong> ending with a special <strong>null character</strong> <code>'\\0'</code>. The null tells library functions where the string ends.<br/><br/><strong>Declaration</strong><br/><code>char name[80];   // can hold up to 79 characters + the trailing '\\0'</code><br/><br/><strong>Input / output</strong><br/>Use <code>%s</code> with scanf and printf. Notice scanf with <code>%s</code> does <em>not</em> need <code>&amp;</code> — the array name is already a pointer to its first element.<br/><code>char name[80];<br/>scanf("%s", name);<br/>printf("Hello, %s\\n", name);</code><br/><br/>Note: <code>scanf("%s", …)</code> reads until the first whitespace, so it can't read "Md Rahim" as one name.<br/><br/><strong>The null terminator</strong><br/>If the user types "Bangla", memory looks like:<br/><table><tr><th>Index</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr><tr><th>Value</th><td>'B'</td><td>'a'</td><td>'n'</td><td>'g'</td><td>'l'</td><td>'a'</td><td>'\\0'</td></tr></table><br/><strong>String length manually</strong><br/><code>int length = 0;<br/>while (name[length] != '\\0') {<br/>&nbsp;&nbsp;&nbsp;&nbsp;length = length + 1;<br/>}</code><br/><br/><strong>Search for a value in an array</strong> — same loop idea, with a flag or early return:<br/><code>int found = 0;<br/>for (int i = 0; i &lt; n; i = i + 1) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;if (ara[i] == key) { found = 1; break; }<br/>}<br/>if (found) printf("FOUND!\\n"); else printf("NOT FOUND!\\n");</code>`,
    exercises: [
      {
        title: "Count the characters of a name",
        description:
          "Read a string into a char array of size 80. Then count its characters manually (without using <code>strlen</code>) by looping until you hit '\\0'. Print '<name> has <n> characters.'",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int main() {
    char name[80];
    int length = 0;
    scanf("%s", name);
    // TODO: count characters until '\\0'
    printf("%s has %d characters.\\n", name, length);
    return 0;
}
`,
        },
        hints: [
          "Use a while loop with condition name[length] != '\\0'.",
          "Increment length inside the loop.",
        ],
        solution: {
          code: `#include <stdio.h>

int main() {
    char name[80];
    int length = 0;
    scanf("%s", name);
    while (name[length] != '\\0') {
        length = length + 1;
    }
    printf("%s has %d characters.\\n", name, length);
    return 0;
}`,
          explanation:
            "Walk the array one position at a time until you reach the null terminator. The number of steps is the string's length.",
        },
      },
    ],
    quiz: [
      {
        question: "What character marks the end of a C string?",
        options: ["'\\n' (newline)", "' ' (space)", "'\\0' (null character)", "There is no end marker"],
        correctAnswerIndex: 2,
        explanation: "'\\0' (the null character, value 0) signals the end of a C string. Library functions like strlen and printf look for it.",
      },
      {
        question: "Why does scanf(\"%s\", name) NOT need an `&` before name?",
        options: [
          "Because %s is special",
          "Because an array name already represents the address of its first element",
          "Because strings are immutable",
          "It actually does need &; the textbook is wrong",
        ],
        correctAnswerIndex: 1,
        explanation: "In C, the bare name of an array decays into a pointer to its first element. That's already the address scanf needs.",
      },
    ],
  },
  {
    day: 15,
    phase: "Data Structures & Functions",
    title: "Functions",
    topics: ["Library vs user-defined", "Declaration", "Definition", "Return values", "string.h"],
    resources: [],
    theory: `A <strong>function</strong> is a named block of code you can call from elsewhere. Functions let you avoid repetition and break big problems into smaller ones.<br/><br/><strong>Two kinds</strong><ul><li><strong>Library functions</strong> — provided by C's standard library (printf, scanf, strlen, strcmp). You use them by <code>#include</code>-ing the right header.</li><li><strong>User-defined functions</strong> — you write them yourself.</li></ul><br/><strong>Anatomy of a user-defined function</strong><br/><code>// Declaration (prototype) — tells the compiler the function exists.<br/>int sum(int a, int b);<br/><br/>int main() {<br/>&nbsp;&nbsp;&nbsp;&nbsp;int result = sum(3, 4);<br/>&nbsp;&nbsp;&nbsp;&nbsp;printf("%d\\n", result);<br/>&nbsp;&nbsp;&nbsp;&nbsp;return 0;<br/>}<br/><br/>// Definition — the actual implementation.<br/>int sum(int a, int b) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;return a + b;<br/>}</code><br/><br/><strong>Parts</strong><ul><li><strong>Return type</strong> (<code>int</code>) — the type of value the function gives back. Use <code>void</code> if it returns nothing.</li><li><strong>Name</strong> (<code>sum</code>) — what you'll call it.</li><li><strong>Parameters</strong> (<code>int a, int b</code>) — typed inputs.</li><li><strong>Body</strong> — the code inside the braces.</li><li><strong>return</strong> — the value to send back to the caller. Execution leaves the function immediately when return is hit.</li></ul><br/><strong>String library (<code>#include &lt;string.h&gt;</code>)</strong><ul><li><code>strlen(s)</code> — returns the length of s (not counting '\\0').</li><li><code>strcmp(s1, s2)</code> — returns 0 if equal, &gt; 0 if s1 &gt; s2 alphabetically, &lt; 0 if s1 &lt; s2.</li></ul><br/><strong>Textbook Example 25: Celsius → Fahrenheit as a function</strong><br/><code>float celsius_to_fahrenheit(float celsius);<br/>// ...<br/>float celsius_to_fahrenheit(float celsius) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;return (celsius * 9 / 5) + 32;<br/>}</code>`,
    exercises: [
      {
        title: "Write a max() function",
        description:
          "Write a function <code>int max(int a, int b)</code> that returns the larger of two ints. In main, take two ints from the user, call max, and print the result.",
        template: "c",
        activeFile: "/main.c",
        starter: {
          "/main.c": `#include <stdio.h>

int max(int a, int b);

int main() {
    int x, y;
    scanf("%d %d", &x, &y);
    // TODO: call max and print
    return 0;
}

// TODO: implement max
`,
        },
        hints: [
          "If a > b, return a; otherwise return b.",
          "The prototype above main lets you define the function below main.",
        ],
        solution: {
          code: `#include <stdio.h>

int max(int a, int b);

int main() {
    int x, y;
    scanf("%d %d", &x, &y);
    printf("max = %d\\n", max(x, y));
    return 0;
}

int max(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}`,
          explanation:
            "The prototype `int max(int, int);` near the top tells the compiler the function exists and what it looks like. The definition (below main) provides the actual code. From main, calling `max(x, y)` runs that code with x and y substituted for a and b.",
        },
      },
    ],
    quiz: [
      {
        question: "What does the `return` statement do inside a function?",
        options: [
          "Restarts the function",
          "Sends a value back to the caller and exits the function",
          "Calls another function",
          "Nothing — it's optional decoration",
        ],
        correctAnswerIndex: 1,
        explanation: "return ends the function immediately and (if the function isn't void) passes its expression back to whatever called the function.",
      },
      {
        question: "Which header file declares strlen and strcmp?",
        options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>"],
        correctAnswerIndex: 2,
        explanation: "string.h provides the C string library: strlen, strcmp, strcpy, strcat and friends.",
      },
      {
        question: "Given `int sum(int a, int b) { return a + b; }`, what does `sum(3, 4)` evaluate to?",
        options: ["3", "4", "7", "12"],
        correctAnswerIndex: 2,
        explanation: "The function returns a + b = 3 + 4 = 7.",
      },
    ],
  },
]

export const cCourse: Course = {
  id: "c",
  slug: "c",
  title: "Master C in 15 Days",
  tagline: "HSC ICT Chapter 5 — Programming Language, from first principles to functions",
  description:
    "A complete walk-through of the C programming language built around the HSC ICT Chapter 5 curriculum: algorithms and flowcharts, variables and operators, input/output, conditions, loops, arrays, strings, and functions. Every exercise is taken from the book's examples and 'Do it yourself' problems.",
  level: "Beginner",
  durationLabel: "15 days · ~25 hours",
  coverGradient: "from-cyan-500 to-indigo-600",
  phases,
  days,
  hasFinalExam: true,
}
