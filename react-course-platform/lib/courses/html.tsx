import type { Course, CourseDay, Phase } from "./types"
import Day1Theory from "./html/day1-theory.mdx"

const phases: Phase[] = [
  {
    name: "HTML Foundations",
    days: "Days 1-5",
    bgGradient: "from-orange-100",
    darkBgGradient: "dark:from-orange-900/50",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Structuring Content",
    days: "Days 6-10",
    bgGradient: "from-amber-100",
    darkBgGradient: "dark:from-amber-900/50",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "Forms & Media",
    days: "Days 11-14",
    bgGradient: "from-rose-100",
    darkBgGradient: "dark:from-rose-900/50",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    name: "Modern HTML & Web",
    days: "Days 15-18",
    bgGradient: "from-cyan-100",
    darkBgGradient: "dark:from-cyan-900/50",
    gradient: "from-cyan-500 to-blue-500",
  },
]

const days: CourseDay[] = [
  {
    day: 1,
    phase: "HTML Foundations",
    title: "What is HTML & Your First Page",
    topics: ["Documents", "Elements", "Tags", "Browser rendering"],
    resources: [
      { name: "MDN: Getting started with HTML", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started" },
    ],
    theory: Day1Theory,
    exercises: [
      {
        title: "Your first HTML page",
        description: "Create a complete HTML document with a tab title 'My First Page' and a visible heading 'Hello, web!'.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!-- TODO: write a complete HTML5 document.
  Requirements:
  - <!DOCTYPE html> on the first line
  - <html>, <head>, <body>
  - <title> in head says "My First Page"
  - <h1> in body says "Hello, web!"
-->
`,
        },
        tests: [
          {
            description: "Page has a <title> reading 'My First Page'",
            runner: "html",
            assertion: `return doc.title.trim() === 'My First Page';`,
          },
          {
            description: "Body contains an <h1> with 'Hello, web!'",
            runner: "html",
            assertion: `const h = doc.querySelector('h1'); return !!h && h.textContent.trim() === 'Hello, web!';`,
          },
        ],
        hints: [
          "Start with <!DOCTYPE html> on line 1, then wrap everything else in <html>...</html>.",
          "Put <title>My First Page</title> inside <head>. Put <h1>Hello, web!</h1> inside <body>.",
          "Don't forget closing tags for every element you open.",
        ],
        solution: {
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, web!</h1>
  </body>
</html>`,
          explanation:
            "Every page follows this skeleton. <code>lang</code> helps screen readers and search engines, <code>meta charset</code> tells the browser how to decode the bytes.",
        },
      },
    ],
    quiz: [
      {
        question: "Which element contains the visible content of an HTML page?",
        options: ["<head>", "<main>", "<body>", "<content>"],
        correctAnswerIndex: 2,
        explanation: "<body> wraps everything the user sees. <head> holds invisible metadata.",
      },
      {
        question: "What does <!DOCTYPE html> do?",
        options: [
          "Declares the document's language",
          "Tells the browser to render in modern HTML5 mode",
          "Defines a comment",
          "Imports an external file",
        ],
        correctAnswerIndex: 1,
        explanation: "The doctype switches the browser out of legacy 'quirks' mode and into standards mode.",
      },
    ],
  },
  {
    day: 2,
    phase: "HTML Foundations",
    title: "Text Content & Headings",
    topics: ["Headings h1-h6", "Paragraphs", "Line breaks", "Whitespace"],
    resources: [
      { name: "MDN: Headings", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements" },
    ],
    theory: `Text is the most basic content on the web. HTML gives you specific tags to mark up different <em>kinds</em> of text:<ul><li><code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code> for headings, where <code>&lt;h1&gt;</code> is the most important. Use only one <code>&lt;h1&gt;</code> per page (the page title) and don't skip levels (don't go from <code>&lt;h2&gt;</code> straight to <code>&lt;h4&gt;</code>).</li><li><code>&lt;p&gt;</code> for a paragraph of running prose.</li><li><code>&lt;br/&gt;</code> forces a line break — but use it sparingly. Most "spacing" should come from styling paragraphs, not from sprinkling <code>&lt;br&gt;</code>s.</li><li><code>&lt;hr/&gt;</code> is a thematic break (a horizontal rule).</li></ul><br/><strong>HTML collapses whitespace.</strong> Any run of spaces, tabs, or newlines in your source becomes a single space when rendered. So you can indent your code freely; the browser doesn't care.<br/><br/>Why does heading structure matter? Search engines and screen readers build an outline of your page from the heading levels. A well-structured outline is a huge accessibility and SEO win — for free.`,
    exercises: [
      {
        title: "Article outline",
        description:
          "Build a page with this outline: one h1 'My Blog', then two h2 sections ('Today' and 'Yesterday'). Each section has one paragraph of any text.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Blog</title></head>
  <body>
    <!-- TODO: h1, then two h2 sections with paragraphs -->
  </body>
</html>
`,
        },
        tests: [
          {
            description: "Exactly one <h1>",
            runner: "html",
            assertion: `return doc.querySelectorAll('h1').length === 1;`,
          },
          {
            description: "At least two <h2> headings",
            runner: "html",
            assertion: `return doc.querySelectorAll('h2').length >= 2;`,
          },
          {
            description: "At least two <p> paragraphs",
            runner: "html",
            assertion: `return doc.querySelectorAll('p').length >= 2;`,
          },
        ],
        hints: [
          "Use exactly one <h1>.",
          "Each <h2> should be followed by a <p> containing some prose.",
        ],
        solution: {
          code: `<h1>My Blog</h1>
<h2>Today</h2>
<p>I learned HTML headings and how they form a document outline.</p>
<h2>Yesterday</h2>
<p>Yesterday I wrote my first page from scratch.</p>`,
          explanation:
            "A single h1 communicates the page title; h2s form the next-level outline. Screen readers can jump between headings to navigate the page.",
        },
      },
    ],
    quiz: [
      {
        question: "How many <h1> elements should typically be on a page?",
        options: ["As many as you want", "One", "At least three", "Zero — h2 is preferred"],
        correctAnswerIndex: 1,
        explanation: "One h1 (the page title) is the most common and accessible pattern.",
      },
      {
        question: "What happens to extra spaces/newlines in your HTML source?",
        options: [
          "They are preserved exactly",
          "They are collapsed to a single space when rendered",
          "They cause a parse error",
          "They are converted to <br>",
        ],
        correctAnswerIndex: 1,
        explanation: "HTML collapses any whitespace run to one space.",
      },
    ],
  },
  {
    day: 3,
    phase: "HTML Foundations",
    title: "Text Formatting & Inline Elements",
    topics: ["strong", "em", "code", "mark", "small", "br vs p"],
    resources: [
      { name: "MDN: Inline text semantics", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element#inline_text_semantics" },
    ],
    theory: `Once you have paragraphs, you'll often want to emphasize parts of them. HTML separates <strong>meaning</strong> from <strong>style</strong>:<ul><li><code>&lt;strong&gt;</code> — important text (screen readers may speak it more forcefully). Visually <strong>bold</strong> by default.</li><li><code>&lt;em&gt;</code> — emphasized text. Visually <em>italic</em> by default.</li><li><code>&lt;b&gt;</code> and <code>&lt;i&gt;</code> — purely visual bold/italic with no extra meaning. Prefer <code>&lt;strong&gt;</code>/<code>&lt;em&gt;</code> when the emphasis is meaningful.</li><li><code>&lt;code&gt;</code> — inline code, like <code>const x = 1</code>.</li><li><code>&lt;mark&gt;</code> — highlighted text (e.g. search results).</li><li><code>&lt;small&gt;</code> — side comments and fine print.</li><li><code>&lt;abbr title="..."&gt;</code> — an abbreviation, with the full form in the title.</li></ul>The general rule: pick the tag that describes <em>what the text is</em>, not <em>what it looks like</em>. Looks are styled later with CSS.`,
    exercises: [
      {
        title: "Highlight important words",
        description:
          "Take a paragraph about HTML and mark the word 'semantic' as strong, 'meaning' as em, and 'HTML' as inline code.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <p>
    <!-- TODO: write a sentence using <strong>, <em>, and <code> -->
  </p>
</body></html>
`,
        },
        hints: ["Inline elements live inside a block element like <p>."],
        solution: {
          code: `<p>
  <strong>Semantic</strong> tags add <em>meaning</em>, not just style.
  We use <code>HTML</code> to mark content.
</p>`,
          explanation: "Semantic tags describe what content is, decoupling meaning from styling.",
        },
      },
    ],
    quiz: [
      {
        question: "Which tag should you use to mark a word as having extra importance?",
        options: ["<b>", "<bold>", "<strong>", "<important>"],
        correctAnswerIndex: 2,
        explanation: "<strong> carries semantic importance; <b> is visual-only.",
      },
    ],
  },
  {
    day: 4,
    phase: "HTML Foundations",
    title: "Links",
    topics: ["Anchors", "href", "target", "rel", "Same-page links"],
    resources: [{ name: "MDN: <a>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a" }],
    theory: `Links are how the web is woven together. The <code>&lt;a&gt;</code> ("anchor") element creates a hyperlink:<br/><br/><code>&lt;a href="https://example.com"&gt;Visit Example&lt;/a&gt;</code><br/><br/>Important attributes:<ul><li><code>href</code> — the destination URL. Absolute (<code>https://...</code>), relative (<code>about.html</code>, <code>../page.html</code>), or in-page (<code>#section-id</code>).</li><li><code>target="_blank"</code> — opens the link in a new tab.</li><li><code>rel="noopener noreferrer"</code> — pair this with <code>target="_blank"</code> for security and privacy.</li><li><code>download</code> — turns the link into a file download.</li></ul><br/>You can also link to <strong>email</strong> (<code>href="mailto:hi@example.com"</code>) and <strong>phone numbers</strong> (<code>href="tel:+15551234"</code>) — useful on mobile.<br/><br/>Always write link text that makes sense out of context. "Click here" is a poor link; "Read the privacy policy" is much better for users and screen readers.`,
    exercises: [
      {
        title: "Build a small navigation",
        description:
          "Create three links: a normal link to https://example.com, a same-page link to '#about', and an email link.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <nav>
    <!-- TODO: three <a> links -->
  </nav>
  <section id="about">
    <h2>About</h2>
    <p>This is the about section.</p>
  </section>
</body></html>
`,
        },
        tests: [
          {
            description: "Has at least 3 <a> elements",
            runner: "html",
            assertion: `return doc.querySelectorAll('a').length >= 3;`,
          },
          {
            description: "Has an in-page link to #about",
            runner: "html",
            assertion: `return !!doc.querySelector('a[href=\"#about\"]');`,
          },
          {
            description: "Has a mailto link",
            runner: "html",
            assertion: `return !!doc.querySelector('a[href^=\"mailto:\"]');`,
          },
        ],
        hints: [
          "An in-page link uses href='#about' and the target needs id='about'.",
          "A mail link uses href='mailto:hello@example.com'.",
        ],
        solution: {
          code: `<nav>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">Example</a>
  <a href="#about">About</a>
  <a href="mailto:hello@example.com">Email me</a>
</nav>`,
          explanation: "External links open in a new tab; same-page links jump to elements by id; mailto launches the user's mail client.",
        },
      },
    ],
    quiz: [
      {
        question: "Which rel value should accompany target=\"_blank\" for safer external links?",
        options: ["nofollow", "external", "noopener noreferrer", "alternate"],
        correctAnswerIndex: 2,
        explanation: "noopener noreferrer prevents the new tab from accessing window.opener and from leaking the referrer.",
      },
    ],
  },
  {
    day: 5,
    phase: "HTML Foundations",
    title: "Images & alt text",
    topics: ["<img>", "alt", "width/height", "Responsive images", "Figure"],
    resources: [{ name: "MDN: <img>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img" }],
    theory: `Images are embedded with the self-closing <code>&lt;img&gt;</code> tag:<br/><br/><code>&lt;img src="cat.jpg" alt="A black cat sitting on a windowsill"&gt;</code><br/><br/>Two attributes are essential:<ul><li><code>src</code> — the URL of the image.</li><li><code>alt</code> — alternative text for users who can't see the image (screen reader users, broken images, search engines). <strong>Write it in plain language; describe what the image conveys, not "image of...".</strong> If the image is purely decorative, use <code>alt=""</code> (empty, but the attribute must be present).</li></ul>You can (and should) also set <code>width</code> and <code>height</code>: this lets the browser reserve space before the image loads, preventing layout shift.<br/><br/>For a caption, wrap your image in <code>&lt;figure&gt;</code> with a <code>&lt;figcaption&gt;</code>:<br/><br/><code>&lt;figure&gt;<br/>&nbsp;&nbsp;&lt;img src="..." alt="..."&gt;<br/>&nbsp;&nbsp;&lt;figcaption&gt;...&lt;/figcaption&gt;<br/>&lt;/figure&gt;</code>`,
    exercises: [
      {
        title: "Captioned image",
        description: "Use a <figure> with a placeholder image and a caption. Give the image proper alt text.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <!-- TODO: <figure> with <img> and <figcaption> -->
</body></html>
`,
        },
        tests: [
          {
            description: "Has a <figure> containing an <img> and a <figcaption>",
            runner: "html",
            assertion: `const f = doc.querySelector('figure'); return !!f && !!f.querySelector('img') && !!f.querySelector('figcaption');`,
          },
          {
            description: "The <img> has a non-empty alt attribute",
            runner: "html",
            assertion: `const img = doc.querySelector('img'); return !!img && (img.getAttribute('alt') || '').trim().length > 0;`,
          },
        ],
        hints: [
          "You can use https://picsum.photos/300/200 as a placeholder image.",
          "alt should describe what the image shows, not the word 'image'.",
        ],
        solution: {
          code: `<figure>
  <img src="https://picsum.photos/300/200" alt="A randomly generated landscape" width="300" height="200" />
  <figcaption>Today's lucky photo.</figcaption>
</figure>`,
          explanation: "<figure>/<figcaption> connect the image to its caption semantically.",
        },
      },
    ],
    quiz: [
      {
        question: "When is `alt=\"\"` (empty alt) appropriate?",
        options: [
          "Never — every image needs descriptive alt text",
          "When the image is purely decorative",
          "When the image is small",
          "When you don't know what to write",
        ],
        correctAnswerIndex: 1,
        explanation: "Empty alt tells assistive tech to skip a decorative image. Omitting the attribute is wrong; it should be empty.",
      },
    ],
  },
  {
    day: 6,
    phase: "Structuring Content",
    title: "Lists: ordered, unordered, description",
    topics: ["<ul>", "<ol>", "<li>", "<dl>", "Nested lists"],
    resources: [{ name: "MDN: Lists", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul" }],
    theory: `Lists group related items.<ul><li><code>&lt;ul&gt;</code> — <strong>unordered list</strong>, where order doesn't matter (a shopping list, a set of features).</li><li><code>&lt;ol&gt;</code> — <strong>ordered list</strong>, where order matters (steps, rankings). Use <code>start="..."</code> or <code>reversed</code> to control numbering.</li><li><code>&lt;li&gt;</code> — a single list item, used inside both ul and ol.</li><li><code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code> — <strong>description lists</strong>: pairs of terms (dt) and definitions (dd). Useful for FAQs, glossaries, key/value pairs.</li></ul>Lists can be nested — put another <code>&lt;ul&gt;</code> or <code>&lt;ol&gt;</code> inside a <code>&lt;li&gt;</code>. This is how you build sub-bullets.<br/><br/>One important habit: don't reach for lists just because you want a vertical stack of items. Use them when the items truly are a group. Otherwise, plain paragraphs or sections may be clearer.`,
    exercises: [
      {
        title: "Recipe steps",
        description: "Build an ordered list of 3 steps to make tea, and an unordered list of 3 ingredients.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <h2>Ingredients</h2>
  <!-- TODO: ul -->
  <h2>Steps</h2>
  <!-- TODO: ol -->
</body></html>
`,
        },
        tests: [
          {
            description: "Has at least one <ul> with 3 items",
            runner: "html",
            assertion: `return Array.from(doc.querySelectorAll('ul')).some(ul => ul.children.length >= 3);`,
          },
          {
            description: "Has at least one <ol> with 3 items",
            runner: "html",
            assertion: `return Array.from(doc.querySelectorAll('ol')).some(ol => ol.children.length >= 3);`,
          },
        ],
        hints: ["Each item goes in its own <li>."],
        solution: {
          code: `<h2>Ingredients</h2>
<ul>
  <li>Water</li>
  <li>Tea leaves</li>
  <li>Milk (optional)</li>
</ul>
<h2>Steps</h2>
<ol>
  <li>Boil water.</li>
  <li>Add tea leaves and steep 3 minutes.</li>
  <li>Strain into a cup.</li>
</ol>`,
          explanation: "Order matters for steps (ol), not for ingredients (ul).",
        },
      },
    ],
    quiz: [
      {
        question: "Which list type should you use for a set of steps?",
        options: ["<ul>", "<ol>", "<dl>", "<menu>"],
        correctAnswerIndex: 1,
        explanation: "Ordered lists communicate that order matters.",
      },
    ],
  },
  {
    day: 7,
    phase: "Structuring Content",
    title: "Semantic Layout: header, nav, main, footer",
    topics: ["<header>", "<nav>", "<main>", "<section>", "<article>", "<aside>", "<footer>"],
    resources: [{ name: "MDN: HTML elements reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element" }],
    theory: `For years, web pages were a soup of <code>&lt;div&gt;</code>s. HTML5 introduced <strong>semantic layout elements</strong> that say what each region <em>is</em>:<ul><li><code>&lt;header&gt;</code> — top of a page or section (logo, title, intro).</li><li><code>&lt;nav&gt;</code> — primary navigation links.</li><li><code>&lt;main&gt;</code> — the page's main content. Only one per page.</li><li><code>&lt;section&gt;</code> — a thematic grouping of content (typically with its own heading).</li><li><code>&lt;article&gt;</code> — a self-contained piece (a blog post, a comment, a product card).</li><li><code>&lt;aside&gt;</code> — sidebar / tangentially related content.</li><li><code>&lt;footer&gt;</code> — bottom of a page or section (copyright, links).</li></ul>These are still rendered as plain block boxes, but they help assistive tech, search engines, and reader-mode browsers understand your page. They also make CSS more readable than <code>div.header</code>, <code>div.nav</code>, etc.<br/><br/>A reasonable starting layout for a typical site:<br/><code>&lt;body&gt;<br/>&nbsp;&nbsp;&lt;header&gt;...&lt;/header&gt;<br/>&nbsp;&nbsp;&lt;nav&gt;...&lt;/nav&gt;<br/>&nbsp;&nbsp;&lt;main&gt;...&lt;/main&gt;<br/>&nbsp;&nbsp;&lt;footer&gt;...&lt;/footer&gt;<br/>&lt;/body&gt;</code>`,
    exercises: [
      {
        title: "Build a semantic blog layout",
        description:
          "Build a page skeleton with header (with the site name), nav (3 links), main (with one article), and footer (copyright).",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Layout</title></head>
<body>
  <!-- TODO: header, nav, main with article, footer -->
</body>
</html>
`,
        },
        tests: [
          {
            description: "Has <header>, <nav>, <main>, and <footer>",
            runner: "html",
            assertion: `return ['header','nav','main','footer'].every(t => !!doc.querySelector(t));`,
          },
          {
            description: "<nav> has at least 3 links",
            runner: "html",
            assertion: `return (doc.querySelector('nav')?.querySelectorAll('a').length || 0) >= 3;`,
          },
          {
            description: "<main> contains an <article>",
            runner: "html",
            assertion: `return !!doc.querySelector('main article');`,
          },
        ],
        hints: [
          "Place <nav> either inside <header> or right after it — both are valid.",
          "The article should have its own <h2>.",
        ],
        solution: {
          code: `<header><h1>My Site</h1></header>
<nav>
  <a href="/">Home</a> <a href="/about">About</a> <a href="/contact">Contact</a>
</nav>
<main>
  <article>
    <h2>First post</h2>
    <p>Hello, world!</p>
  </article>
</main>
<footer>&copy; 2026 Me</footer>`,
          explanation: "Each region uses the right semantic element. Search engines and screen readers thank you.",
        },
      },
    ],
    quiz: [
      {
        question: "How many <main> elements should a page have?",
        options: ["As many as needed", "One", "Zero — it's optional", "One per section"],
        correctAnswerIndex: 1,
        explanation: "There should be exactly one <main> per page, marking the primary content area.",
      },
      {
        question: "Which element best represents a self-contained piece of content like a blog post?",
        options: ["<section>", "<article>", "<aside>", "<div>"],
        correctAnswerIndex: 1,
        explanation: "<article> is for content that makes sense on its own, like a post, comment, or card.",
      },
    ],
  },
  {
    day: 8,
    phase: "Structuring Content",
    title: "Tables",
    topics: ["<table>", "<tr>", "<td>", "<th>", "<thead>/<tbody>", "scope"],
    resources: [{ name: "MDN: Tables", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics" }],
    theory: `Tables are for <em>tabular data</em> — rows and columns of related values. Don't use them for page layout; that's what semantic elements and CSS are for.<br/><br/>Anatomy:<ul><li><code>&lt;table&gt;</code> — the table wrapper.</li><li><code>&lt;tr&gt;</code> — a row.</li><li><code>&lt;th&gt;</code> — a header cell (bold/centered by default).</li><li><code>&lt;td&gt;</code> — a data cell.</li><li><code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code> — group rows into header / body / footer regions.</li><li><code>&lt;caption&gt;</code> — a title for the whole table, placed at the top.</li></ul>For accessibility, give your header cells <code>scope="col"</code> or <code>scope="row"</code>. This tells assistive tech which cells are headers for which data.`,
    exercises: [
      {
        title: "Pricing table",
        description: "Create a table with a caption 'Pricing' and a header row of 'Plan' and 'Price', then two data rows.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <!-- TODO: <table> with <caption>, <thead>, <tbody> -->
</body></html>
`,
        },
        tests: [
          {
            description: "Has a <table> with a <caption>, <thead>, and <tbody>",
            runner: "html",
            assertion: `const t = doc.querySelector('table'); return !!t && !!t.querySelector('caption') && !!t.querySelector('thead') && !!t.querySelector('tbody');`,
          },
          {
            description: "<thead> has at least 2 <th> cells",
            runner: "html",
            assertion: `return (doc.querySelector('thead')?.querySelectorAll('th').length || 0) >= 2;`,
          },
          {
            description: "<tbody> has at least 2 data rows",
            runner: "html",
            assertion: `return (doc.querySelector('tbody')?.querySelectorAll('tr').length || 0) >= 2;`,
          },
        ],
        hints: ["Add scope=\"col\" to your <th> cells in the header."],
        solution: {
          code: `<table>
  <caption>Pricing</caption>
  <thead>
    <tr><th scope="col">Plan</th><th scope="col">Price</th></tr>
  </thead>
  <tbody>
    <tr><td>Free</td><td>$0</td></tr>
    <tr><td>Pro</td><td>$10/mo</td></tr>
  </tbody>
</table>`,
          explanation: "thead/tbody and scope improve both readability and accessibility.",
        },
      },
    ],
    quiz: [
      {
        question: "What does the `scope` attribute on a <th> communicate?",
        options: [
          "The cell's color scheme",
          "Whether the header applies to a row or column",
          "The data type of the column",
          "The width of the column",
        ],
        correctAnswerIndex: 1,
        explanation: "scope=\"col\" or scope=\"row\" tells assistive tech how the header relates to data cells.",
      },
    ],
  },
  {
    day: 9,
    phase: "Structuring Content",
    title: "Block vs Inline & The Box Model Basics",
    topics: ["Block elements", "Inline elements", "Generic containers", "<div>", "<span>"],
    resources: [{ name: "MDN: Block-level elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements" }],
    theory: `Every HTML element renders as either <strong>block</strong> or <strong>inline</strong> by default:<ul><li><strong>Block elements</strong> — take up a full row and stack vertically. Examples: <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;ul&gt;</code>.</li><li><strong>Inline elements</strong> — flow within a line of text and only take as much width as their content. Examples: <code>&lt;a&gt;</code>, <code>&lt;span&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;img&gt;</code>.</li></ul><br/>When no semantic tag fits, use a <strong>generic container</strong>:<ul><li><code>&lt;div&gt;</code> — a block-level "nothing" element, used for grouping for CSS or JS purposes.</li><li><code>&lt;span&gt;</code> — an inline "nothing" element, used to style or script part of a line.</li></ul>Always prefer a semantic tag (<code>section</code>, <code>article</code>, <code>nav</code>, …) when one applies. Reach for <code>div</code>/<code>span</code> only when you genuinely need a generic wrapper.<br/><br/>Note: CSS can change any element's display type with <code>display: block | inline | inline-block | flex | grid | none</code>. So "block vs inline" is the default behavior, not a permanent identity.`,
    exercises: [
      {
        title: "Group with the right container",
        description: "Wrap three buttons in a div. Inside a paragraph, wrap the word 'highlight' in a span with class 'mark'.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html>
<head><style>.mark{background:yellow}</style></head>
<body>
  <!-- TODO -->
</body>
</html>
`,
        },
        hints: ["<div> for the buttons (block), <span> for the highlighted word (inline)."],
        solution: {
          code: `<div>
  <button>Save</button>
  <button>Cancel</button>
  <button>Delete</button>
</div>
<p>This is a sentence with a <span class="mark">highlight</span> inside.</p>`,
          explanation: "div groups block content, span wraps an inline piece for styling.",
        },
      },
    ],
    quiz: [
      {
        question: "Which element is inline by default?",
        options: ["<p>", "<div>", "<span>", "<section>"],
        correctAnswerIndex: 2,
        explanation: "<span> is the canonical inline generic container.",
      },
    ],
  },
  {
    day: 10,
    phase: "Structuring Content",
    title: "Attributes, IDs, and Classes",
    topics: ["Global attributes", "id", "class", "data-*", "title", "hidden"],
    resources: [{ name: "MDN: Global attributes", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes" }],
    theory: `Most HTML attributes can go on any element — these are <strong>global attributes</strong>:<ul><li><code>id="..."</code> — unique identifier for one element. Used for in-page links (<code>#id</code>), JS lookups, and form labels.</li><li><code>class="a b c"</code> — one or more class names. Reusable. Used heavily by CSS and JS.</li><li><code>title="..."</code> — a tooltip shown on hover. Don't rely on it for important info (no support on touch screens).</li><li><code>hidden</code> — hides the element completely (visually + from screen readers).</li><li><code>data-*="..."</code> — custom data attributes. Any attribute starting with <code>data-</code> is yours to use, readable from JS via <code>element.dataset</code>.</li><li><code>aria-*="..."</code> — accessibility attributes (coming in a later day).</li></ul>Rules:<ul><li>IDs must be unique per page. Two elements with the same id is a bug.</li><li>Class names are case-sensitive (<code>btn</code> and <code>Btn</code> are different).</li><li>Multiple classes are separated by spaces.</li></ul>`,
    exercises: [
      {
        title: "Identify and label",
        description: "Give a button id='submit-btn' and class='btn primary'. Add a data-action='submit' attribute.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <!-- TODO: a button with id, classes, and a data-* attribute -->
</body></html>
`,
        },
        tests: [
          {
            description: "Has a button with id 'submit-btn'",
            runner: "html",
            assertion: `return !!doc.querySelector('button#submit-btn');`,
          },
          {
            description: "The button has both 'btn' and 'primary' classes",
            runner: "html",
            assertion: `const b = doc.querySelector('button#submit-btn'); return !!b && b.classList.contains('btn') && b.classList.contains('primary');`,
          },
          {
            description: "Has a data-* attribute set on the button",
            runner: "html",
            assertion: `const b = doc.querySelector('button#submit-btn'); return !!b && Object.keys(b.dataset).length > 0;`,
          },
        ],
        hints: ["Multiple classes go in one attribute: class=\"btn primary\"."],
        solution: {
          code: `<button id="submit-btn" class="btn primary" data-action="submit">Save</button>`,
          explanation: "id targets a single element; class is reusable; data-* attributes carry custom data without leaving HTML.",
        },
      },
    ],
    quiz: [
      {
        question: "Which statement about `id` is correct?",
        options: [
          "An id can be repeated on multiple elements",
          "An id must be unique within the document",
          "Ids are required on every element",
          "Ids work the same as classes",
        ],
        correctAnswerIndex: 1,
        explanation: "An id is meant to identify a single element on the page.",
      },
    ],
  },
  {
    day: 11,
    phase: "Forms & Media",
    title: "Forms: inputs and labels",
    topics: ["<form>", "<input>", "<label>", "name attribute", "method/action"],
    resources: [{ name: "MDN: Form basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form" }],
    theory: `Forms are the primary way users send data to a server. A form is a <code>&lt;form&gt;</code> element containing <strong>controls</strong> (inputs, selects, buttons) and a submit button.<br/><br/>Two attributes matter most on <code>&lt;form&gt;</code>:<ul><li><code>action</code> — the URL the form is submitted to.</li><li><code>method</code> — <code>GET</code> (default — values appear in the URL) or <code>POST</code> (values sent in the body).</li></ul><br/>Every control needs a <code>name</code> so the server knows which value belongs to which field.<br/><br/>Every input should be paired with a <code>&lt;label&gt;</code>. Labels:<ul><li>describe the input to sighted users and screen readers,</li><li>let you click the label to focus the input (huge UX win, especially for checkboxes).</li></ul>Two ways to associate a label:<ul><li><code>&lt;label for="email"&gt;Email&lt;/label&gt;&lt;input id="email"&gt;</code></li><li>or wrap the input inside the label: <code>&lt;label&gt;Email &lt;input&gt;&lt;/label&gt;</code></li></ul>`,
    exercises: [
      {
        title: "Login form",
        description: "Build a form with a labelled email and password input, plus a submit button.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <!-- TODO: form with two labelled inputs and a submit button -->
</body></html>
`,
        },
        tests: [
          {
            description: "Has a <form> with email and password inputs",
            runner: "html",
            assertion: `return !!doc.querySelector('form input[type=\"email\"]') && !!doc.querySelector('form input[type=\"password\"]');`,
          },
          {
            description: "Has at least 2 <label> elements",
            runner: "html",
            assertion: `return doc.querySelectorAll('form label').length >= 2;`,
          },
          {
            description: "Has a submit button",
            runner: "html",
            assertion: `return !!doc.querySelector('form button, form input[type=\"submit\"]');`,
          },
        ],
        hints: ["Use <input type=\"email\"> and <input type=\"password\">."],
        solution: {
          code: `<form action="/login" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">Log in</button>
</form>`,
          explanation: "for/id pairs labels with inputs. type=email triggers the right keyboard on mobile and basic validation.",
        },
      },
    ],
    quiz: [
      {
        question: "Why pair a <label> with an <input>?",
        options: [
          "Required for the form to submit",
          "It improves accessibility and lets users click the label to focus the input",
          "It changes the visual style",
          "It's purely decorative",
        ],
        correctAnswerIndex: 1,
        explanation: "Labels are an accessibility and usability feature.",
      },
    ],
  },
  {
    day: 12,
    phase: "Forms & Media",
    title: "Input types & validation",
    topics: ["type variants", "required", "min/max", "pattern", "placeholder"],
    resources: [{ name: "MDN: <input> types", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input" }],
    theory: `<code>&lt;input type="..."&gt;</code> changes <em>everything</em>: the keyboard on mobile, the visible widget, the default validation. Common types:<ul><li><code>text</code>, <code>password</code>, <code>email</code>, <code>url</code>, <code>tel</code>, <code>search</code></li><li><code>number</code>, <code>range</code> (slider)</li><li><code>date</code>, <code>time</code>, <code>datetime-local</code>, <code>month</code>, <code>week</code></li><li><code>color</code> (color picker)</li><li><code>file</code> (file upload)</li><li><code>checkbox</code>, <code>radio</code></li><li><code>hidden</code>, <code>submit</code>, <code>reset</code>, <code>button</code></li></ul><br/>HTML offers built-in validation attributes — use them before reaching for JS:<ul><li><code>required</code> — value can't be empty.</li><li><code>minlength</code> / <code>maxlength</code> — for text inputs.</li><li><code>min</code> / <code>max</code> / <code>step</code> — for numbers and dates.</li><li><code>pattern="..."</code> — a regex the value must match.</li><li><code>placeholder="..."</code> — a hint shown when the field is empty. <strong>Not a label substitute.</strong></li></ul>The browser will block submission and show a native message if validation fails.`,
    exercises: [
      {
        title: "Validated signup",
        description: "Add: a required email, a password with minlength=8, and an age (number, min=13, max=120).",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <form>
    <!-- TODO: required email, password minlength=8, number 13-120 -->
    <button>Sign up</button>
  </form>
</body></html>
`,
        },
        tests: [
          {
            description: "Email input is required",
            runner: "html",
            assertion: `const e = doc.querySelector('input[type=\"email\"]'); return !!e && e.hasAttribute('required');`,
          },
          {
            description: "Password input requires at least 8 characters",
            runner: "html",
            assertion: `const p = doc.querySelector('input[type=\"password\"]'); return !!p && Number(p.getAttribute('minlength')) >= 8;`,
          },
          {
            description: "Number input has min=13 and max=120",
            runner: "html",
            assertion: `const n = doc.querySelector('input[type=\"number\"]'); return !!n && Number(n.getAttribute('min')) === 13 && Number(n.getAttribute('max')) === 120;`,
          },
        ],
        hints: ["required is a boolean attribute — just include it without a value."],
        solution: {
          code: `<form>
  <label>Email <input type="email" required /></label>
  <label>Password <input type="password" minlength="8" required /></label>
  <label>Age <input type="number" min="13" max="120" required /></label>
  <button>Sign up</button>
</form>`,
          explanation: "HTML5 validation runs natively; no JS needed for the common cases.",
        },
      },
    ],
    quiz: [
      {
        question: "Which attribute restricts a text input to match a regular expression?",
        options: ["regex", "match", "pattern", "validate"],
        correctAnswerIndex: 2,
        explanation: "pattern=\"...\" applies a regex to the input value.",
      },
    ],
  },
  {
    day: 13,
    phase: "Forms & Media",
    title: "Checkboxes, radios, selects, textareas",
    topics: ["<select>/<option>", "checkbox", "radio", "<textarea>", "<fieldset>/<legend>"],
    resources: [{ name: "MDN: Form controls", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Other_form_controls" }],
    theory: `Beyond text inputs:<ul><li><strong>Checkbox</strong> (<code>type="checkbox"</code>) — independent on/off. Multiple can be checked.</li><li><strong>Radio</strong> (<code>type="radio"</code>) — one choice from a group. <em>Group them by sharing the same <code>name</code>.</em></li><li><strong>Select</strong> (<code>&lt;select&gt;</code> + <code>&lt;option&gt;</code>) — a dropdown. Add <code>multiple</code> for multi-select.</li><li><strong>Textarea</strong> (<code>&lt;textarea&gt;</code>) — multi-line text. Has <code>rows</code> and <code>cols</code>, but CSS is usually a better way to size it.</li></ul>For grouped controls (like a set of radios), wrap them in <code>&lt;fieldset&gt;</code> with a <code>&lt;legend&gt;</code> describing the group. This makes the form's structure clear to screen readers.`,
    exercises: [
      {
        title: "Survey form",
        description: "Build a fieldset 'Favorite color' with three radio options. Add a select for country (3 options) and a textarea for comments.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <form>
    <!-- TODO -->
    <button>Submit</button>
  </form>
</body></html>
`,
        },
        tests: [
          {
            description: "Has a <fieldset> with a <legend>",
            runner: "html",
            assertion: `const fs = doc.querySelector('fieldset'); return !!fs && !!fs.querySelector('legend');`,
          },
          {
            description: "Has 3 radio buttons with the same name",
            runner: "html",
            assertion: `const radios = doc.querySelectorAll('input[type=\"radio\"]'); if (radios.length < 3) return false; const names = new Set(Array.from(radios).map(r => r.name)); return names.size === 1;`,
          },
          {
            description: "Has a <select> with 3+ <option>s",
            runner: "html",
            assertion: `return (doc.querySelector('select')?.querySelectorAll('option').length || 0) >= 3;`,
          },
          {
            description: "Has a <textarea>",
            runner: "html",
            assertion: `return !!doc.querySelector('textarea');`,
          },
        ],
        hints: [
          "All radios in one group must share the same `name`.",
          "Wrap radios in <fieldset><legend>...</legend>...</fieldset>.",
        ],
        solution: {
          code: `<form>
  <fieldset>
    <legend>Favorite color</legend>
    <label><input type="radio" name="color" value="red"/> Red</label>
    <label><input type="radio" name="color" value="green"/> Green</label>
    <label><input type="radio" name="color" value="blue"/> Blue</label>
  </fieldset>

  <label>Country
    <select name="country">
      <option value="bd">Bangladesh</option>
      <option value="us">USA</option>
      <option value="jp">Japan</option>
    </select>
  </label>

  <label>Comments
    <textarea name="comments" rows="4"></textarea>
  </label>

  <button>Submit</button>
</form>`,
          explanation: "Shared name on radios makes them mutually exclusive. fieldset/legend wraps the group.",
        },
      },
    ],
    quiz: [
      {
        question: "What makes a group of radio buttons mutually exclusive?",
        options: [
          "Wrapping them in a div",
          "They share the same `name` attribute",
          "They share the same `id`",
          "They use type='exclusive'",
        ],
        correctAnswerIndex: 1,
        explanation: "Radios with the same name behave as one choice group.",
      },
    ],
  },
  {
    day: 14,
    phase: "Forms & Media",
    title: "Audio, Video, and Embedded Content",
    topics: ["<audio>", "<video>", "<iframe>", "<source>", "Controls"],
    resources: [{ name: "MDN: <video>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video" }],
    theory: `Modern browsers can play media natively:<ul><li><code>&lt;audio src="..." controls&gt;&lt;/audio&gt;</code> — audio player with native controls.</li><li><code>&lt;video src="..." controls width="600"&gt;&lt;/video&gt;</code> — same for video.</li></ul>Useful attributes: <code>controls</code> (show play/pause UI), <code>autoplay</code>, <code>loop</code>, <code>muted</code>, <code>poster</code> (video thumbnail).<br/><br/>For multiple formats (e.g. mp4 + webm), use child <code>&lt;source&gt;</code> elements — the browser picks one it supports:<br/><code>&lt;video controls&gt;<br/>&nbsp;&nbsp;&lt;source src="movie.webm" type="video/webm"&gt;<br/>&nbsp;&nbsp;&lt;source src="movie.mp4" type="video/mp4"&gt;<br/>&lt;/video&gt;</code><br/><br/><code>&lt;iframe src="..."&gt;</code> embeds another page (YouTube, maps, etc.). Always set <code>title</code> for accessibility.`,
    exercises: [
      {
        title: "Embed a video",
        description: "Add a video element with controls, a poster image, and accept two source formats.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <!-- TODO: <video controls poster="..."> with two <source> children -->
</body></html>
`,
        },
        hints: ["You don't need real video files — placeholder URLs are fine."],
        solution: {
          code: `<video controls width="480" poster="https://picsum.photos/480/270">
  <source src="movie.webm" type="video/webm" />
  <source src="movie.mp4" type="video/mp4" />
  Sorry, your browser doesn't support embedded videos.
</video>`,
          explanation: "Browsers will try sources in order until one is supported; text inside is a fallback message.",
        },
      },
    ],
    quiz: [
      {
        question: "Which attribute on <video> shows native play/pause UI?",
        options: ["autoplay", "controls", "muted", "preview"],
        correctAnswerIndex: 1,
        explanation: "Without `controls`, the video has no visible UI.",
      },
    ],
  },
  {
    day: 15,
    phase: "Modern HTML & Web",
    title: "The <head>: meta, viewport, and SEO",
    topics: ["<meta charset>", "viewport", "description", "Open Graph", "<title>"],
    resources: [{ name: "MDN: <head>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head" }],
    theory: `The <code>&lt;head&gt;</code> is invisible but powerful. It tells browsers, search engines, and social platforms <em>what</em> your page is.<br/><br/>The essentials:<ul><li><code>&lt;meta charset="utf-8"&gt;</code> — character encoding. Always UTF-8.</li><li><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> — makes the page render at a sensible size on mobile. <strong>If you forget this, your site looks broken on phones.</strong></li><li><code>&lt;title&gt;...&lt;/title&gt;</code> — tab title; also the link title in search results.</li><li><code>&lt;meta name="description" content="..."&gt;</code> — the snippet shown in search results.</li></ul>For sharing on social platforms (Twitter, Slack, Discord), add <strong>Open Graph</strong> tags:<br/><code>&lt;meta property="og:title" content="..."&gt;<br/>&lt;meta property="og:description" content="..."&gt;<br/>&lt;meta property="og:image" content="..."&gt;</code><br/><br/>Finally, link CSS with <code>&lt;link rel="stylesheet" href="styles.css"&gt;</code> and a favicon with <code>&lt;link rel="icon" href="..."&gt;</code>.`,
    exercises: [
      {
        title: "Production-quality <head>",
        description: "Build a head with charset, viewport, title, description, and an og:image tag.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- TODO: charset, viewport, title, description, og:image -->
  </head>
  <body><h1>Hi</h1></body>
</html>
`,
        },
        tests: [
          {
            description: "Has <meta charset>",
            runner: "html",
            assertion: `return !!doc.querySelector('meta[charset]');`,
          },
          {
            description: "Has the viewport meta tag",
            runner: "html",
            assertion: `return !!doc.querySelector('meta[name=\"viewport\"]');`,
          },
          {
            description: "Has a non-empty <title>",
            runner: "html",
            assertion: `return doc.title.trim().length > 0;`,
          },
          {
            description: "Has a meta description",
            runner: "html",
            assertion: `const m = doc.querySelector('meta[name=\"description\"]'); return !!m && (m.getAttribute('content') || '').length > 0;`,
          },
          {
            description: "Has an og:image meta tag",
            runner: "html",
            assertion: `return !!doc.querySelector('meta[property=\"og:image\"]');`,
          },
        ],
        hints: ["The viewport meta is the one that makes mobile work."],
        solution: {
          code: `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cat Facts</title>
  <meta name="description" content="A daily dose of fascinating cat facts." />
  <meta property="og:image" content="https://picsum.photos/1200/630" />
</head>`,
          explanation: "These five lines cover encoding, mobile responsiveness, SEO snippet, and link previews.",
        },
      },
    ],
    quiz: [
      {
        question: "Which meta tag is required for sites to render correctly on mobile?",
        options: ["meta description", "meta charset", "meta viewport", "meta keywords"],
        correctAnswerIndex: 2,
        explanation: "Without the viewport meta, mobile browsers render at a desktop width and zoom out.",
      },
    ],
  },
  {
    day: 16,
    phase: "Modern HTML & Web",
    title: "Accessibility & ARIA basics",
    topics: ["Semantic HTML", "alt text", "aria-label", "aria-hidden", "role"],
    resources: [{ name: "MDN: ARIA", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" }],
    theory: `Accessibility (a11y) means your site is usable by people with disabilities — screen readers, keyboard-only users, low-vision users, and many more.<br/><br/><strong>The single best a11y tactic is using the right HTML element.</strong> A real <code>&lt;button&gt;</code> is keyboard-focusable, announces itself as a button to screen readers, and submits forms. A <code>&lt;div onclick&gt;</code> does none of this for free.<br/><br/>When you do need to clarify meaning, ARIA attributes help:<ul><li><code>aria-label="..."</code> — an accessible name for an element that has no visible text (e.g. an icon-only button).</li><li><code>aria-labelledby="other-id"</code> — like above, but reuses another element's text.</li><li><code>aria-hidden="true"</code> — hide an element from screen readers (e.g. decorative icons).</li><li><code>role="..."</code> — override the element's role. <em>Rarely needed if you use real elements.</em></li></ul>Other checks:<ul><li>All form inputs have labels.</li><li>All non-decorative images have alt text.</li><li>Color contrast meets WCAG (light vs dark text on background).</li><li>The page is navigable with Tab/Shift+Tab.</li></ul><br/>The rule: <em>only use ARIA when no native element does the job</em>. Bad ARIA is worse than no ARIA.`,
    exercises: [
      {
        title: "Accessible icon button",
        description: "Build an icon-only button (with the text '✕') that screen readers announce as 'Close dialog'.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html><body>
  <!-- TODO: an icon button with proper accessible name -->
</body></html>
`,
        },
        hints: ["Use aria-label on the button to give it an accessible name."],
        solution: {
          code: `<button aria-label="Close dialog">
  <span aria-hidden="true">✕</span>
</button>`,
          explanation: "aria-label names the button for screen readers; aria-hidden hides the decorative glyph from them.",
        },
      },
    ],
    quiz: [
      {
        question: "When is ARIA most appropriate to use?",
        options: [
          "Always — it improves every element",
          "Only when no native HTML element does the job",
          "Only for forms",
          "Never — semantic HTML is enough by itself",
        ],
        correctAnswerIndex: 1,
        explanation: "Native HTML first, ARIA as a last resort. Bad ARIA harms accessibility.",
      },
    ],
  },
  {
    day: 17,
    phase: "Modern HTML & Web",
    title: "HTML + CSS + JS together",
    topics: ["<link rel=stylesheet>", "<style>", "<script>", "defer/async", "External vs inline"],
    resources: [{ name: "MDN: <script>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script" }],
    theory: `HTML is structure; CSS is style; JS is behavior. You wire them together in the HTML file:<ul><li><code>&lt;link rel="stylesheet" href="styles.css"&gt;</code> in the <code>&lt;head&gt;</code> loads external CSS.</li><li><code>&lt;style&gt;...&lt;/style&gt;</code> embeds CSS directly (use sparingly).</li><li><code>&lt;script src="app.js" defer&gt;&lt;/script&gt;</code> loads external JS.</li><li><code>&lt;script&gt;...&lt;/script&gt;</code> embeds JS inline.</li></ul><br/><strong>Where to put scripts?</strong><ul><li>The classic answer: at the end of <code>&lt;body&gt;</code>, so the DOM exists when JS runs.</li><li>The modern answer: anywhere with the <code>defer</code> attribute. <code>defer</code> tells the browser to download the script in parallel but execute it after the document is parsed.</li><li>Use <code>async</code> for scripts that don't depend on the DOM or other scripts (e.g. analytics).</li></ul><br/>This separation of concerns — structure / style / behavior in their own files — is what makes the web maintainable. Try to keep each one focused.`,
    exercises: [
      {
        title: "Wire styles and a script",
        description:
          "Make a page that links external 'styles.css' and 'app.js' (using defer). The CSS turns h1 red. The JS sets the h1 text to 'Hello from JS'.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Wire it up</title>
  <!-- TODO: link styles.css and load app.js with defer -->
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
`,
          "/styles.css": `h1 { color: red; }`,
          "/app.js": `document.querySelector('h1').textContent = 'Hello from JS';`,
        },
        hints: ["Put the <link> in <head>; put the <script defer> in <head> too — defer is safe there."],
        solution: {
          code: `<head>
  <meta charset="utf-8" />
  <title>Wire it up</title>
  <link rel="stylesheet" href="styles.css" />
  <script defer src="app.js"></script>
</head>`,
          explanation: "defer downloads the script in parallel but waits until the DOM is ready before running it.",
        },
      },
    ],
    quiz: [
      {
        question: "What does the `defer` attribute on a <script> do?",
        options: [
          "Cancels the script entirely",
          "Downloads the script in parallel and runs it after the DOM is parsed",
          "Loads the script before any HTML",
          "Has no effect on loading order",
        ],
        correctAnswerIndex: 1,
        explanation: "defer is the modern preferred way to load scripts that depend on the DOM.",
      },
    ],
  },
  {
    day: 18,
    phase: "Modern HTML & Web",
    title: "Capstone: Build a Mini Personal Site",
    topics: ["Layout", "Semantic HTML", "Forms", "Accessibility"],
    resources: [{ name: "MDN: HTML reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element" }],
    theory: `Congratulations — you've covered the essentials of modern HTML. Today is about <strong>integration</strong>: putting the pieces together into a complete page.<br/><br/>A typical personal site has:<ul><li>A semantic skeleton: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>.</li><li>A clear heading outline (one <code>&lt;h1&gt;</code>, then h2s/h3s).</li><li>An "About" section with text and an image (with alt).</li><li>A list of projects (a real <code>&lt;ul&gt;</code> with links).</li><li>A contact form with labelled inputs and validation.</li><li>A <code>&lt;head&gt;</code> with title, description, viewport meta, and an Open Graph image.</li></ul><br/>Once you have the structure right, styling with CSS in a future course will be easy — because semantic HTML and CSS are friends.<br/><br/>This single page is the foundation for almost every kind of web project. Build it once, and you'll find the same patterns everywhere.`,
    exercises: [
      {
        title: "Personal site",
        description:
          "Build a complete personal homepage with header (your name + tagline), nav (3 anchor links to in-page sections), main with About, Projects (list of 3), and Contact (form), and footer with copyright.",
        template: "static",
        activeFile: "/index.html",
        starter: {
          "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My Site</title>
  </head>
  <body>
    <!-- TODO: capstone layout -->
  </body>
</html>
`,
        },
        tests: [
          {
            description: "Page uses semantic header/nav/main/footer",
            runner: "html",
            assertion: `return ['header','nav','main','footer'].every(t => !!doc.querySelector(t));`,
          },
          {
            description: "Page has exactly one <h1>",
            runner: "html",
            assertion: `return doc.querySelectorAll('h1').length === 1;`,
          },
          {
            description: "<main> contains #about, #projects, and #contact sections",
            runner: "html",
            assertion: `return ['#about','#projects','#contact'].every(s => !!doc.querySelector('main ' + s));`,
          },
          {
            description: "Projects section has a list with 3+ items",
            runner: "html",
            assertion: `return (doc.querySelector('#projects ul, #projects ol')?.querySelectorAll('li').length || 0) >= 3;`,
          },
          {
            description: "Contact section has a labelled form with a submit button",
            runner: "html",
            assertion: `const f = doc.querySelector('#contact form'); return !!f && f.querySelectorAll('label').length >= 2 && !!f.querySelector('button, input[type=\"submit\"]');`,
          },
        ],
        hints: [
          "Reuse what you learned about semantic elements, labels, and meta tags.",
          "Sections can have ids that match nav links (#about, #projects, #contact).",
        ],
        solution: {
          code: `<header>
  <h1>Sara Chowdhury</h1>
  <p>Frontend learner building things on the web.</p>
  <nav>
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

<main>
  <section id="about">
    <h2>About</h2>
    <p>I'm learning HTML, CSS, and JavaScript one day at a time.</p>
    <img src="https://picsum.photos/200" alt="My avatar" width="200" height="200" />
  </section>

  <section id="projects">
    <h2>Projects</h2>
    <ul>
      <li><a href="#">Todo App</a> — my first HTML/JS app.</li>
      <li><a href="#">Recipe Book</a> — semantic content galore.</li>
      <li><a href="#">Portfolio</a> — this page!</li>
    </ul>
  </section>

  <section id="contact">
    <h2>Contact</h2>
    <form action="/contact" method="post">
      <label>Name <input name="name" required /></label>
      <label>Email <input name="email" type="email" required /></label>
      <label>Message <textarea name="message" rows="4" required></textarea></label>
      <button>Send</button>
    </form>
  </section>
</main>

<footer>&copy; 2026 Sara Chowdhury</footer>`,
          explanation: "A semantic, accessible, mobile-friendly page — the foundation every site builds on.",
        },
      },
    ],
    quiz: [
      {
        question: "Which of these is the BEST starting layout for a typical content page?",
        options: [
          "Many nested <div>s with class names like 'header' and 'footer'",
          "<header>, <nav>, <main>, <footer> with semantic content inside",
          "<table> for the overall page layout",
          "A single <section> containing everything",
        ],
        correctAnswerIndex: 1,
        explanation: "Semantic elements communicate meaning to browsers, screen readers, and search engines.",
      },
    ],
  },
]

export const htmlCourse: Course = {
  id: "html",
  slug: "html",
  title: "Master HTML in 18 Days",
  tagline: "From your first page to production-quality semantic markup",
  description:
    "Build a complete foundation in HTML: documents, text, links, lists, tables, forms, media, accessibility, and modern best practices. Every day includes a live, in-browser exercise.",
  level: "Beginner",
  durationLabel: "18 days · ~20 hours",
  coverGradient: "from-orange-500 to-pink-600",
  phases,
  days,
  hasFinalExam: true,
}
