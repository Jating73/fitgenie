# FitGenie — Premium Next.js Fitness Platform

A full-stack fitness website built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS** with **real Supabase authentication**, per-user workout tracking, and live dashboard charts.

---

## Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Framework  | Next.js 14 (App Router)    |
| Language   | TypeScript                 |
| Styling    | Tailwind CSS               |
| Animations | Framer Motion              |
| Charts     | Chart.js + react-chartjs-2 |
| Icons      | Lucide React               |
| Storage    | localStorage (client-side) |

---

## Features

| #   | Feature                | Description                                                    |
| --- | ---------------------- | -------------------------------------------------------------- |
| 1   | **Exercise Library**   | 22+ detailed exercises — instructions, muscles, mistakes, tips |
| 2   | **Workout Splits**     | 9 pre-built programs (PPL, Bro Split, Arnold Split, etc.)      |
| 3   | **Workout Builder**    | Drag-and-drop routine creator with save/load                   |
| 4   | **Workout Tracker**    | Log sets, reps, weight — view daily + 7-day history            |
| 5   | **Progress Dashboard** | PR tracker, body measurements, streak, volume charts           |
| 6   | **Muscle Map**         | Clickable SVG front/back body diagram                          |
| 7   | **Timers**             | Rest, Interval, HIIT (Tabata/AMRAP/EMOM), Stopwatch            |
| 8   | **AI Plan Generator**  | 4-step customizer → full weekly workout plan                   |
| 9   | **Daily Challenges**   | 5 challenges with completion tracking                          |
| 10  | **Beginner's Guide**   | 4-tab guide: start, form, warm-up, recovery                    |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:3000
```

---

## Project Structure

```
fitgenie/
├── app/
│   ├── layout.tsx          # Root layout (Navbar, MobileNav, fonts)
│   ├── globals.css         # Tailwind + custom CSS variables
│   ├── page.tsx            # Home page
│   ├── exercises/page.tsx  # Exercise library with search & filter
│   ├── splits/page.tsx     # Workout split programs
│   ├── builder/page.tsx    # Custom routine builder
│   ├── tracker/page.tsx    # Workout logging & history
│   ├── progress/page.tsx   # Dashboard with Chart.js graphs
│   ├── musclemap/page.tsx  # SVG clickable muscle diagram
│   ├── timer/page.tsx      # Rest / Interval / HIIT / Stopwatch
│   ├── ai/page.tsx         # AI workout plan generator
│   ├── challenges/page.tsx # Daily fitness challenges
│   └── guide/page.tsx      # Beginner's guide (4 tabs)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky top navigation
│   │   └── MobileNav.tsx   # Fixed bottom mobile nav
│   ├── sections/
│   │   ├── ExerciseCard.tsx # Exercise grid card
│   │   └── ExerciseModal.tsx# Exercise detail modal
│   └── ui/
│       └── index.tsx       # Shared UI components (Card, Badge, etc.)
│
├── lib/
│   ├── data.ts             # All exercises, splits, challenges, AI data
│   ├── useLocalStorage.ts  # Typed localStorage hook
│   └── utils.ts            # cn() utility
│
├── types/
│   └── index.ts            # TypeScript interfaces
│
├── tailwind.config.ts      # Custom colors, fonts, animations
└── package.json
```

---

## Color Palette

| Token            | Value     | Usage            |
| ---------------- | --------- | ---------------- |
| `--bg-dark-900`  | `#0a0a0a` | Main background  |
| `--brand-red`    | `#e63946` | Primary actions  |
| `--brand-red2`   | `#ff4d5a` | Hover / accents  |
| `--brand-green`  | `#39d353` | Success / streak |
| `--brand-accent` | `#ff6b35` | Secondary accent |

---

## Extending the App

### Add more exercises

Edit `lib/data.ts` → `EXERCISES` array. Each exercise follows the `Exercise` interface.

### Connect a real backend

Replace `useLocalStorage` with API calls to any backend (Express, Supabase, Firebase, etc.).

### Add authentication

Integrate **NextAuth.js** or **Clerk** with the existing layout — no structural changes needed.

### Connect Exercise DB API

Replace the emoji placeholders in `ExerciseCard` with real GIF URLs from:

- `https://api.exercisedb.io` (free)
- `https://v2.exercisedb.io`

---

## Scripts

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

---

## License

MIT — free to use, modify, and distribute.
