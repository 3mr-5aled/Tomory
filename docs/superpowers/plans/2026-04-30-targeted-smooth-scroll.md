# Targeted Smooth Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable programmatic smooth scrolling using Lenis, specifically for the Hero "Scroll" button.

**Architecture:** Create a React Context in `SmoothScroll.jsx` to share the Lenis instance. Update `ImmersiveHero.jsx` to consume this context via a custom hook and trigger the scroll.

**Tech Stack:** React (Context, Hooks), Lenis.

---

### Task 1: Expose Lenis Instance via Context

**Files:**
- Modify: `src/components/features/SmoothScroll.jsx`

- [ ] **Step 1: Define LenisContext and useLenis hook**

```javascript
import React, { useEffect, createContext, useContext, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext({
  lenis: null
})

export const useLenis = () => useContext(LenisContext)
```

- [ ] **Step 2: Update SmoothScroll to provide the instance**

```javascript
const SmoothScroll = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState(null)

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

    setLenisInstance(lenis)

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
      setLenisInstance(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/features/SmoothScroll.jsx
git commit -m "feat: expose lenis instance via context and useLenis hook"
```

---

### Task 2: Implement Targeted Scroll in ImmersiveHero

**Files:**
- Modify: `src/components/Home/ImmersiveHero.jsx`

- [ ] **Step 1: Import useLenis hook**

```javascript
import { useLenis } from "../features/SmoothScroll"
```

- [ ] **Step 2: Get lenis instance in the component**

```javascript
const ImmersiveHero = () => {
  const { lenis } = useLenis()
  // ... rest of refs
```

- [ ] **Step 3: Update Scroll button to use lenis.scrollTo**

Find the "Scroll" anchor at the bottom:
```javascript
      <button
        onClick={() => lenis?.scrollTo('#story', { duration: 1.5 })}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900 shadow-lg backdrop-blur transition hover:-translate-y-1"
      >
        Scroll
        <BsArrowDown className="text-base" />
      </button>
```
*Note: Changed from `<a>` to `<button>` to avoid default anchor behavior and use the programmatic scroll.*

- [ ] **Step 4: Commit**

```bash
git add src/components/Home/ImmersiveHero.jsx
git commit -m "feat: update hero scroll button to use lenis smooth scroll"
```

---

### Task 3: Verification

- [x] **Step 1: Run build to ensure no errors**

Run: `npm run build`

- [x] **Step 2: Commit**

```bash
git commit --allow-empty -m "chore: verify targeted smooth scroll implementation"
```
