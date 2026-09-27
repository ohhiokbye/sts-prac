# STS Practice — Project Description

## Overview
STS Practice is a LeetCode-inspired web platform for practicing Java coding problems specifically designed for the STS (Software Testing & Skills) exam. Students sign in with Google, solve curated Java problems, and track their progress.

## Tech Stack
| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Vite + React | Fast dev server, modern tooling |
| Styling | Vanilla CSS with design tokens | No framework lock-in, full control |
| Auth | Firebase Authentication (Google Sign-in) | Free tier, no backend needed |
| Database | Cloud Firestore | Free tier (50k reads/20k writes per day) |
| Code Editor | Monaco Editor (@monaco-editor/react) | VS Code quality editor in browser |
| Routing | React Router DOM v7 | Standard React routing |
| Fonts | Inter + JetBrains Mono (Google Fonts) | Clean UI + monospace for code |

## Architecture

```
src/
├── main.jsx                    # Entry point — wraps App in AuthProvider
├── App.jsx                     # Root component with routing
├── index.css                   # Design system (tokens, components, responsive)
├── firebase/
│   ├── config.js               # Firebase config (reads .env vars)
│   └── init.js                 # Firebase app/auth/db initialization
├── context/
│   └── AuthContext.jsx          # Auth state, Google login/logout, user sync
├── components/
│   ├── Navbar.jsx               # Top navigation bar
│   ├── ThemeToggle.jsx          # Light/dark mode toggle
│   └── GoogleSignInButton.jsx   # Google OAuth sign-in button
├── pages/
│   ├── LoginPage.jsx            # Landing/login page
│   ├── ProblemListPage.jsx      # Problem table with filters/search
│   ├── ProblemPage.jsx          # Split-panel IDE workspace
│   └── ProgressPage.jsx         # User progress dashboard
└── data/
    └── problems.js              # Problem data store (static, easily extendable)
```

## Design System
- **Color scheme**: Modern Tech & LeetCode Dark/Light — crisp slate (#f8fafc) and pure white in light mode; deep midnight charcoal (#0a0d14) and slate panels (#101626, #192237) in dark mode, paired with vibrant amber/gold (#f59e0b) accents.
- **Frontend Animations**:
  - Glassmorphic navbar with frosted backdrop-filter blur (`16px`)
  - Staggered problem list row entrance animation (`@keyframes rowEntrance`)
  - Problem row hover slide (`translateX(4px)`) and accent border indicators
  - Dynamic button hover physics (`translateY(-1.5px)` and active press)
  - Animated glowing gradient sheen sweeping across the progress bar
  - Interactive pulsing status dot and checkmarks for solved problems
  - Popping badge reveal for test results (`@keyframes badgePop`) and running indicator pulses
- **Dark mode**: Toggle persisted to localStorage, respects system preference

## Key Features
1. **Zero-Barrier Practice & Code Execution** — Anyone can browse problems, code in the Monaco editor, and click "Run Code" to test against test cases immediately without logging in.
2. **Dual-Mode Progress Tracking** — Guest students have their solved problems remembered in `localStorage`. Signing in with Google automatically merges local solves into their Cloud Firestore account.
3. **Flexible Submissions** — Submitting code prompts to sync with Google for cross-device tracking, or allows instant local saving as a guest.
4. **Code Preservation** — Signing in via popup never refreshes the page or wipes the code typed in the editor.
5. **LeetCode-Style Test Runner** — Dedicated testcase and test-result tabs with execution time and expected vs actual output comparison.
6. **Solution Reveal** — Optional reference solution toggle.
7. **Dark/Light Mode** — Crisp slate/white light mode and deep midnight LeetCode dark mode with instant toggle.

## Data Model

### Firestore: `users/{uid}`
```json
{
  "uid": "string",
  "displayName": "string",
  "email": "string",
  "photoURL": "string",
  "createdAt": "timestamp",
  "lastLogin": "timestamp",
  "solvedProblems": ["problem-id-1", "problem-id-2"]
}
```

### Problem Structure (in `src/data/problems.js`)
```json
{
  "id": "hello-world",
  "number": 1,
  "title": "Hello World",
  "topic": "Basics",
  "difficulty": "Easy",
  "description": "markdown-like description text",
  "starterCode": "public class Main { ... }",
  "expectedOutput": "Hello, World!",
  "solution": "public class Main { ... }"
}
```

## Problem Catalog (24 Problems)
- **Foundational Topics**: Basics (1, 2), Conditionals (3), Loops (4, 5), Strings (6, 7), Arrays (8, 9), OOP (10, 11), Exceptions (12)
- **STS Exam Technical Topics**:
  1. Booth's Algorithm (#13 - `booths-algorithm`)
  2. Euclid's Algorithm (#14 - `euclids-algorithm`)
  3. Karatsuba Algorithm (#15 - `karatsuba-algorithm`)
  4. Longest Sequence of 1 after flipping a bit (#16 - `longest-sequence-of-1-after-flipping-a-bit`)
  5. Swap two nibbles in a byte (#17 - `swap-two-nibbles-in-a-byte`)
  6. Block Swap Algorithm (#18 - `block-swap-algorithm`)
  7. Max product subarray (#19 - `max-product-subarray`)
  8. Maximum sum of hour glass in matrix (#20 - `maximum-sum-of-hour-glass-in-matrix`)
  9. Max Equilibrium Sum (#21 - `max-equilibrium-sum`)
  10. Leaders in array (#22 - `leaders-in-array`)
  11. Majority element (#23 - `majority-element`)
  12. Lexicographically first palindromic string (#24 - `lexicographically-first-palindromic-string`)

## Adding New Problems
Add a new object to the `problems` array in `src/data/problems.js`:
```javascript
{
  id: 'unique-slug',           // URL-safe identifier
  number: 25,                  // Sequential number
  title: 'Problem Title',
  topic: 'Topic Name',         // Used for filtering — auto-extracted into filter UI
  difficulty: 'Easy',          // Easy | Medium | Hard
  description: `Description with markdown-like formatting...`,
  starterCode: `public class Main { ... }`,
  expectedOutput: 'Expected output text',
  solution: `Full solution code`,
}
```

## Code Execution
Java cannot run in the browser. Current approach:
- Users write code in the editor
- "Check Output" shows expected output for comparison
- Users self-verify and click "Mark as Solved"
- **Future**: Integrate with a free Java compilation API (e.g., JDoodle, Compilebox) or set up a simple backend

## Environment Variables
Copy `.env.example` to `.env` and fill in Firebase project credentials:
```
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Firebase Setup Instructions
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (free Spark plan)
3. Enable **Authentication** → Sign-in method → Google
4. Enable **Cloud Firestore** → Create database → Start in test mode
5. Go to **Project Settings** → Add a Web app → Copy config values
6. Paste values into your `.env` file

### Firestore Security Rules (for production)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Development
```bash
npm install
npm run dev     # Starts dev server on localhost:5173
```

## Deployment
Build and deploy to any static hosting:
```bash
npm run build   # Creates dist/ folder
```
Deploy `dist/` to Firebase Hosting, Vercel, Netlify, or GitHub Pages.

## Scalability Notes
- Problems are currently static in JS — can migrate to Firestore collection when needed
- Auth is already scalable via Firebase
- Add admin panel later to manage problems via Firestore
- Code execution can be added via serverless functions or external APIs
- The CSS design system scales well — just extend tokens as needed
