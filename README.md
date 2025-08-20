# 25-Day React Course Platform

This is a modern, self-paced learning platform designed to take a developer from JavaScript fundamentals to building production-ready React applications in 25 days. The application is built with Next.js, TypeScript, and Tailwind CSS.

<p align="center">
  <a href="https://react-course-sjb.vercel.app/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=%E2%96%B2%20DEPLOYED%20ON&message=VERCEL&color=black&style=for-the-badge&labelColor=555" alt="Deployed on Vercel">
  </a>
</p>

**[➡️ View Live Demo](https://react-course-sjb.vercel.app/)**

## Key Features

-   **Structured Curriculum:** 25 days of lessons covering everything from JS basics to advanced React patterns.
-   **Interactive UI:** A beautiful, responsive interface with a slide-in sidebar for navigation.
-   **Code Highlighting:** Clear and readable code blocks for all examples and solutions using `react-syntax-highlighter`.
-   **Progress Tracking:** Users can mark lessons as "complete" and have their progress saved in their browser via `localStorage`.
-   **Light & Dark Mode:** A theme toggle to switch between light and dark modes, with styles defined in Tailwind CSS.
-   **Search Functionality:** A searchable dialog (`CMD+K`) to quickly find lessons by title, topic, or content.
-   **Syllabus Download:** A functional "Download Syllabus" button that links directly to the course PDF.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** Built with [Shadcn/UI](https://ui.shadcn.com/) primitives.
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Syntax Highlighting:** [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
-   **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later)
-   [pnpm](https://pnpm.io/) (or your package manager of choice: npm, yarn)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Golam-Robbanie-Sajib/course.git
    cd course
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/), the platform from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FGolam-Robbanie-Sajib%2Fcourse)

To deploy, simply push your repository to GitHub and link it in your Vercel dashboard. Ensure the **Framework Preset** in your Vercel project settings is set to **"Next.js"** to automatically configure the build commands and output directory.
