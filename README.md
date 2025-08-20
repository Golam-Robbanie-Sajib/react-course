# 25-Day React Course Platform

A comprehensive, interactive learning platform that transforms developers from JavaScript fundamentals to production-ready React applications in 25 structured days. Built with modern web technologies and designed for an optimal learning experience.

<p align="center">
  <a href="https://react-course-sjb.vercel.app/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=%E2%96%B2%20DEPLOYED%20ON&message=VERCEL&color=black&style=for-the-badge&labelColor=555" alt="Deployed on Vercel">
  </a>
  <img src="https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.0+-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Supabase-Auth-green?style=for-the-badge&logo=supabase" alt="Supabase">
</p>

**[🚀 View Live Demo](https://react-course-sjb.vercel.app/)**

## ✨ Key Features

### 📚 **Comprehensive Learning Experience**
- **25 Structured Lessons:** Carefully crafted curriculum from JS basics to advanced React patterns
- **5 Learning Phases:** JavaScript Fundamentals → Advanced JS → React Basics → Advanced React → Production Ready
- **Interactive Exercises:** 50+ hands-on coding challenges with detailed solutions and explanations
- **Knowledge Quizzes:** Built-in quiz system for each lesson to reinforce learning
- **Final Exam:** Comprehensive 50-question exam covering all course materials

### 🎯 **User Experience**
- **Progress Tracking:** Real-time progress visualization with phase-based completion tracking
- **Personal Notes:** Take and save notes for each lesson (authenticated users)
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode:** Beautiful theme switching with persistent preferences
- **Search Functionality:** Powerful search (`Ctrl+K`) across all lessons and topics

### 🔐 **Authentication & Data Persistence**
- **Supabase Integration:** Secure user authentication with GitHub/Google OAuth
- **Progress Synchronization:** Course progress synced across all devices
- **Exam Scoring:** Track highest and most recent exam scores
- **User Profiles:** Personal dashboard with progress analytics

### 🛠 **Developer Experience**
- **Modern Architecture:** Built with Next.js 15 App Router and TypeScript
- **Component Library:** Powered by Shadcn/UI for consistent, accessible design
- **Performance Optimized:** Code splitting, lazy loading, and efficient state management
- **Production Ready:** Comprehensive error handling and loading states

## 📋 Curriculum Structure

### Phase 1: JavaScript Fundamentals (Days 1-7)
- Variables & Data Types
- Functions & Scope
- Objects & Arrays
- Control Flow & Loops
- DOM Manipulation
- Asynchronous Basics
- ES6+ Features

### Phase 2: Advanced JavaScript (Days 8-11)
- Advanced Functions & Closures
- Prototypes & Classes
- Async/Await & Error Handling
- Advanced DOM & Performance

### Phase 3: React Fundamentals (Days 12-16)
- React Basics & JSX
- State & Event Handling
- Effects & Lifecycle
- Lists & Keys
- Forms & Validation

### Phase 4: Advanced React (Days 17-22)
- Advanced Hooks (useReducer, useRef, useMemo, useCallback)
- Context & Global State
- Component Patterns & Custom Hooks
- React Router
- State Management Libraries (Redux Toolkit, Zustand)
- Data Fetching & APIs (TanStack Query)

### Phase 5: Production Ready (Days 23-25)
- Testing (Jest, React Testing Library)
- Performance & Build Optimization
- Final Project Integration

## 🛠 Tech Stack

### **Core Framework**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **React 18** - Latest React features with concurrent rendering

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons

### **Backend & Authentication**
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Supabase Auth** - Authentication with social providers
- **Row Level Security** - Database-level security policies

### **State Management**
- **TanStack Query** - Server state management and caching
- **React Context** - Client-side global state
- **Zustand** - Lightweight state management (examples)

### **Code Quality & Performance**
- **React Syntax Highlighter** - Beautiful code blocks with Prism.js
- **React Hook Form** - Performant forms with easy validation
- **Next Themes** - Seamless dark/light mode switching

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or later
- **pnpm** (recommended) or npm/yarn

### Environment Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Golam-Robbanie-Sajib/course.git
   cd course
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials to `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup (Supabase)

1. Create a new Supabase project
2. Run the following SQL to create the profiles table:
   ```sql
   create table profiles (
     id uuid references auth.users on delete cascade primary key,
     completed_days integer[] default '{}',
     notes jsonb default '{}',
     exam_highest_score integer,
     exam_last_score integer,
     updated_at timestamp with time zone default now()
   );
   
   -- Enable RLS
   alter table profiles enable row level security;
   
   -- Policy for users to access their own data
   create policy "Users can access their own profile" on profiles
     for all using (auth.uid() = id);
   ```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── day/[day]/         # Dynamic lesson pages
│   ├── exam/              # Final exam page
│   ├── profile/           # User profile page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── ui/               # Shadcn/UI components
│   ├── course-layout.tsx # Main course layout
│   ├── day-page.tsx      # Lesson page component
│   └── ...
├── hooks/                # Custom React hooks
│   ├── use-progress.ts   # Progress tracking
│   ├── use-countdown.ts  # Exam timer
│   └── ...
├── lib/                  # Utility functions and data
│   ├── course-data.tsx   # Complete curriculum data
│   ├── exam-data.ts      # Final exam questions
│   ├── supabase/         # Supabase configuration
│   └── utils.ts          # Helper utilities
└── public/               # Static assets
```

## 🎨 Key Components

### **CourseLayout**
Main layout component with sidebar navigation, progress tracking, and theme switching.

### **DayPage**
Individual lesson component with theory, exercises, quizzes, and notes.

### **ExamPage**
Comprehensive final exam with timer, progress tracking, and score persistence.

### **UserProfile**
Authentication and profile management with OAuth integration.

## 🔧 Configuration

### **Custom Hooks**
- `useProgress` - Manages course progress and user data
- `useCountdown` - Handles exam timer functionality
- `useDebounce` - Optimizes note-taking performance

### **Database Schema**
```sql
profiles {
  id: uuid (primary key, references auth.users)
  completed_days: integer[]
  notes: jsonb
  exam_highest_score: integer
  exam_last_score: integer
  updated_at: timestamp
}
```

## 📊 Features in Detail

### **Progress System**
- Visual progress bars for overall completion
- Phase-based progress tracking
- Persistent progress across devices
- Completion certificates (planned)

### **Examination System**
- Timed final exam (1 hour)
- 50 comprehensive questions covering all phases
- Score tracking and analytics
- Retry functionality with score comparison

### **Note-Taking**
- Rich text notes for each lesson
- Auto-save functionality with debouncing
- Synchronized across devices
- Export capabilities (planned)

## 🚀 Deployment

### **Vercel (Recommended)**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FGolam-Robbanie-Sajib%2Fcourse)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push

### **Manual Deployment**
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📈 Performance Optimizations

- **Code Splitting** - Route-based and component-based splitting
- **Image Optimization** - Next.js automatic image optimization
- **Bundle Analysis** - Webpack bundle analyzer integration
- **Caching Strategy** - Efficient API caching with TanStack Query
- **Database Optimization** - Optimized Supabase queries with RLS

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful component library
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Vercel](https://vercel.com/) for seamless deployment

---

<p align="center">
  <strong>Ready to master React in 25 days?</strong><br>
  <a href="https://react-course-sjb.vercel.app/">Start your journey today! 🚀</a>
</p>