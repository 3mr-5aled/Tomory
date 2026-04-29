# Redesign Auth Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Login, Register, and Reset pages with an immersive, glassmorphic theme.

**Architecture:** Use a centered glassmorphic card layout with grain backgrounds and floating blurs. Use Cormorant Garamond for headings and Manrope for body text. Apply `animate-fadeUp` for entry transitions.

**Tech Stack:** React, Tailwind CSS, Firebase Auth, React Icons.

---

### Task 1: Redesign `Login.jsx`

**Files:**
- Modify: `src/pages/auth/Login.jsx`

- [ ] **Step 1: Apply the immersive background system.**
Replace the current section background with the new `relative` wrapper, grain overlay, and floating blurs.

- [ ] **Step 2: Implement the glassmorphic form card.**
Wrap the form content in the new card style: `rounded-[2.5rem] border border-amber-200/60 bg-white/70 p-8 shadow-2xl backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80`.

- [ ] **Step 3: Apply theme typography and style components.**
Update headings to `font-display`, labels to `font-body`, and style inputs and buttons according to the theme.

- [ ] **Step 4: Verify functionality and commit.**

### Task 2: Redesign `Register.jsx`

**Files:**
- Modify: `src/pages/auth/Register.jsx`

- [ ] **Step 1: Apply the immersive background system.**
Replace the current layout with the centered glassmorphic background system.

- [ ] **Step 2: Implement the glassmorphic form card.**
Wrap the registration form in the glassmorphic card.

- [ ] **Step 3: Apply theme typography and style components.**
Update headings, labels, inputs, and buttons.

- [ ] **Step 4: Verify functionality and commit.**

### Task 3: Redesign `Reset.jsx`

**Files:**
- Modify: `src/pages/auth/Reset.jsx`

- [ ] **Step 1: Apply the immersive background system.**
Apply the background elements to the Reset page.

- [ ] **Step 2: Implement the glassmorphic form card.**
Wrap the reset form in the glassmorphic card.

- [ ] **Step 3: Apply theme typography and style components.**
Update headings, labels, inputs, and buttons.

- [ ] **Step 4: Verify functionality and commit.**

---
