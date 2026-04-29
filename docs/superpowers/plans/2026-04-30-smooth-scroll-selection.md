# Smooth Scroll & Selection Control Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement premium momentum scrolling and global "Smart" text selection locking.

**Architecture:** Use `lenis` for smooth scrolling via a React provider/wrapper. Use global CSS for selection control with selective overrides for form elements.

**Tech Stack:** React, Lenis, Tailwind CSS.

---

### Task 1: Install Dependencies and Global CSS [COMPLETED]

**Files:**
- Modify: `package.json`
- Modify: `src/index.css`

- [x] **Step 1: Install Lenis**

Run: `npm install lenis`

- [x] **Step 2: Add global selection rules to `src/index.css`**

Add at the end of `src/index.css`:
```css
/* Global Content Protection */
@layer base {
  body {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Allow selection for form elements and interactive areas */
  input, 
  textarea, 
  [contenteditable="true"],
  .selectable {
    -webkit-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
}
```

- [x] **Step 3: Commit**

```bash
git add package.json src/index.css
git commit -m "feat: install lenis and add global selection lock"
```

---

### Task 2: Create SmoothScroll Component [COMPLETED]

**Files:**
- Create: `src/components/features/SmoothScroll.jsx`

- [x] **Step 1: Implement SmoothScroll component**

```javascript
import React, { useEffect } from 'react'
import Lenis from 'lenis'

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
```

- [x] **Step 2: Commit**

```bash
git add src/components/features/SmoothScroll.jsx
git commit -m "feat: add SmoothScroll component using Lenis"
```

---

### Task 3: Integrate SmoothScroll in App

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Import SmoothScroll in `src/App.jsx`**

```javascript
import SmoothScroll from "./components/features/SmoothScroll"
```

- [ ] **Step 2: Wrap AppContent with SmoothScroll**

Update `App` component in `src/App.jsx`:
```javascript
function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <div
        className={`${localStorage.getItem("darkMode") === "true" ? "dark" : "light"} dark:bg-slate-800 transition-colors duration-500`}
      >
        <BrowserRouter>
          <SmoothScroll>
            <ToastContainer />
            <AppContent />
          </SmoothScroll>
        </BrowserRouter>
      </div>
    </PersistGate>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: integrate SmoothScroll into App"
```

---

### Task 4: Verification

- [ ] **Step 1: Run build to ensure no errors**

Run: `npm run build`

- [ ] **Step 2: Commit**

```bash
git commit --allow-empty -m "chore: verify smooth scroll and selection lock implementation"
```
