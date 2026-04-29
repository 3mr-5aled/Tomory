# Hero Parallax Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a playful, high-performance mouse parallax effect to the `ImmersiveHero` component.

**Architecture:** Use `useRef` and a `mousemove` listener to update CSS custom properties directly on the DOM, avoiding React re-renders. Elements will use `translate3d` bound to these variables for smooth, hardware-accelerated motion.

**Tech Stack:** React, Tailwind CSS, Native DOM Events.

---

### Task 1: Setup Infrastructure in ImmersiveHero

**Files:**
- Modify: `src/components/Home/ImmersiveHero.jsx`

- [ ] **Step 1: Add `useRef` and `useEffect` imports**

```javascript
import React, { useRef, useEffect } from "react"
```

- [ ] **Step 2: Initialize the container ref**

```javascript
const ImmersiveHero = () => {
  const containerRef = useRef(null)
  // ...
```

- [ ] **Step 3: Update JSX to use the ref**

```javascript
<section 
  ref={containerRef}
  className="relative overflow-hidden bg-amber-50 dark:bg-slate-900"
>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Home/ImmersiveHero.jsx
git commit -m "feat(hero): add container ref to ImmersiveHero"
```

---

### Task 2: Implement Mouse Tracking Logic

**Files:**
- Modify: `src/components/Home/ImmersiveHero.jsx`

- [ ] **Step 1: Add the `mousemove` and `mouseleave` handlers**

```javascript
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()
      
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      container.style.setProperty('--mouse-x', x.toFixed(4))
      container.style.setProperty('--mouse-y', y.toFixed(4))
    }

    const handleMouseLeave = () => {
      container.style.setProperty('--mouse-x', '0')
      container.style.setProperty('--mouse-y', '0')
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Home/ImmersiveHero.jsx
git commit -m "feat(hero): implement mouse position tracking logic"
```

---

### Task 3: Define Layer Multipliers and Transition

**Files:**
- Modify: `src/components/Home/ImmersiveHero.jsx`

- [ ] **Step 1: Add base transition styles to the container**

Update the `<section>` style attribute:
```javascript
<section 
  ref={containerRef}
  style={{ 
    '--mouse-x': 0, 
    '--mouse-y': 0,
    transition: 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)'
  }}
  className="relative overflow-hidden bg-amber-50 dark:bg-slate-900"
>
```

- [ ] **Step 2: Apply parallax to Background Blobs (Multiplier: 30)**

Modify the two blur divs:
```javascript
<div
  className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-amber-200/70 blur-3xl motion-safe:animate-drift"
  style={{ transform: 'translate3d(calc(var(--mouse-x) * 30px), calc(var(--mouse-y) * 30px), 0)' }}
  aria-hidden="true"
></div>
<div
  className="absolute -right-16 top-20 h-72 w-72 rounded-full bg-orange-300/40 blur-3xl motion-safe:animate-float-slow"
  style={{ transform: 'translate3d(calc(var(--mouse-x) * -30px), calc(var(--mouse-y) * -30px), 0)' }}
  aria-hidden="true"
></div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Home/ImmersiveHero.jsx
git commit -m "feat(hero): apply parallax to background blobs"
```

---

### Task 4: Apply Parallax to Main Product and Badges

**Files:**
- Modify: `src/components/Home/ImmersiveHero.jsx`

- [ ] **Step 1: Apply to Red Dates SVG (Multiplier: 50)**

```javascript
<img
  src={redDates}
  alt=""
  className="pointer-events-none absolute right-0 top-0 h-full w-1/2 object-cover opacity-20"
  style={{ transform: 'translate3d(calc(var(--mouse-x) * 50px), calc(var(--mouse-y) * 50px), 0)' }}
  aria-hidden="true"
/>
```

- [ ] **Step 2: Apply to Main Product Plate (Multiplier: 80)**

```javascript
<img
  src={datesPlate}
  alt="Dates platter"
  className="relative z-10 w-full rounded-[48px] border-4 border-amber-200/70 bg-white/80 p-6 shadow-2xl"
  style={{ transform: 'translate3d(calc(var(--mouse-x) * 80px), calc(var(--mouse-y) * 80px), 0)' }}
/>
```

- [ ] **Step 3: Apply to Badges (Multiplier: 100)**

Top Badge:
```javascript
<div 
  className="absolute -top-6 left-6 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900 shadow-lg"
  style={{ transform: 'translate3d(calc(var(--mouse-x) * 100px), calc(var(--mouse-y) * 100px), 0)' }}
>
  Harvest 2026
</div>
```

Bottom Badge:
```javascript
<div 
  className="absolute -bottom-8 right-0 rounded-3xl bg-amber-800/90 px-6 py-4 text-sm text-amber-50 shadow-xl"
  style={{ transform: 'translate3d(calc(var(--mouse-x) * 110px), calc(var(--mouse-y) * 110px), 0)' }}
>
  48-hour freshness seal
</div>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Home/ImmersiveHero.jsx
git commit -m "feat(hero): apply parallax to product plate and badges"
```

---

### Task 5: Apply Subtle Parallax to UI Content

**Files:**
- Modify: `src/components/Home/ImmersiveHero.jsx`

- [ ] **Step 1: Apply to Content Column (Multiplier: 16)**

Wrap the left column content in a div with parallax:
```javascript
<div 
  className="flex-1"
  style={{ transform: 'translate3d(calc(var(--mouse-x) * 16px), calc(var(--mouse-y) * 16px), 0)' }}
>
  {/* UI content */}
</div>
```

- [ ] **Step 2: Verify and Finalize**

Check that elements transition smoothly back to 0 on mouse leave.
Verify the "playful" intensity feels balanced.

- [ ] **Step 3: Commit**

```bash
git add src/components/Home/ImmersiveHero.jsx
git commit -m "feat(hero): finalize parallax for UI and cleanup"
```
