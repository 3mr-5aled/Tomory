# Navbar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Navbar in `src/components/Nav/Header.jsx` with a glassmorphism effect, refined typography (Manrope/Cormorant Garamond), and an amber/stone palette.

**Architecture:** Update the `Header` component to use a sticky glassmorphic container, refine the `activeLink` helper function for consistent styling, and update all sub-components (Logo, NavLinks, Cart, User Menu, Mobile Menu) to match the new organic design language.

**Tech Stack:** React, Tailwind CSS, Lucide React (or existing react-icons), Redux, Firebase Auth.

---

### Task 1: Update `activeLink` Function and Header Container

**Files:**
- Modify: `src/components/Nav/Header.jsx`

- [ ] **Step 1: Update `activeLink` function**

```javascript
  const activeLink = ({ isActive }) => {
    const baseClasses = "px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out"
    return isActive
      ? `${baseClasses} text-amber-900 bg-amber-100 rounded-full dark:bg-amber-900/30 dark:text-amber-100`
      : `${baseClasses} text-stone-600 rounded-full hover:bg-amber-50 md:hover:text-amber-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white`
  }
```

- [ ] **Step 2: Update the `header` element and its main container**

```jsx
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/30 bg-white/80 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/80 font-body">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
```

### Task 2: Redesign Logo and Navigation Links

**Files:**
- Modify: `src/components/Nav/Header.jsx`

- [ ] **Step 1: Redesign the Logo area**

```jsx
          <div className="md:flex md:items-center md:gap-12">
            <Link className="flex items-center gap-3 group" to="/">
              <span className="sr-only">Home</span>
              <div className="p-1 bg-white rounded-full shadow-sm border border-amber-100 group-hover:border-amber-200 transition-colors">
                <img
                  className="h-10 w-10 object-contain rounded-full transition-transform group-hover:scale-110"
                  src={logo}
                  alt="Tomory Logo"
                />
              </div>
              <span className="font-display text-2xl font-semibold tracking-tight text-stone-800 dark:text-white">
                Tomory
              </span>
            </Link>
          </div>
```

- [ ] **Step 2: Update Desktop Navigation list styling**

```jsx
          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              <ul className="flex items-center gap-2">
                <li>
                  <NavLink className={activeLink} to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className={activeLink} to="/products">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink className={activeLink} to="/contact">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
```

### Task 3: Redesign Cart, User Menu, and Auth Buttons

**Files:**
- Modify: `src/components/Nav/Header.jsx`

- [ ] **Step 1: Redesign Cart icon and badge**

```jsx
                <NavLink
                  className="relative p-2 text-stone-600 hover:text-amber-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                  to="/cart"
                >
                  <BsFillCartFill size={22} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>
```

- [ ] **Step 2: Redesign User Profile Button and Dropdown**

```jsx
                <button 
                  onClick={collapsePMenu}
                  className="flex items-center gap-2 p-1 rounded-full border border-amber-100 hover:border-amber-300 transition-all dark:border-slate-700 dark:hover:border-slate-500"
                >
                  <img
                    className="h-9 w-9 rounded-full object-cover"
                    src={userPhoto || avatar}
                    alt="User avatar"
                  />
                </button>
                <div
                  className={`z-50 ${
                    !CollapsedPMenu ? "hidden" : "block"
                  } absolute right-0 top-full mt-2 w-56 divide-y divide-amber-100 rounded-2xl border border-amber-100 bg-white/95 p-2 shadow-xl backdrop-blur-sm dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800/95`}
                >
```

- [ ] **Step 3: Redesign Auth buttons**

```jsx
            <ShowOnLogout>
              <div className="flex items-center gap-3">
                <NavLink
                  className="text-sm font-medium text-stone-600 hover:text-amber-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                  to="/login"
                >
                  Log in
                </NavLink>
                <NavLink
                  className="hidden sm:block rounded-full bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-amber-700 transition-all hover:shadow-lg active:scale-95"
                  to="/register"
                >
                  Join Tomory
                </NavLink>
              </div>
            </ShowOnLogout>
```

### Task 4: Redesign Mobile Menu and Final Polish

**Files:**
- Modify: `src/components/Nav/Header.jsx`

- [ ] **Step 1: Redesign Mobile Toggle Button**

```jsx
            <div className="block md:hidden">
              <button
                className="rounded-full bg-amber-50 p-2 text-amber-900 transition hover:bg-amber-100 dark:bg-slate-800 dark:text-amber-100 dark:hover:bg-slate-700"
                onClick={collapse}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={Collapsed ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
```

- [ ] **Step 2: Redesign Mobile Menu content**

```jsx
      {/* Mobile Menu */}
      <div className={`${!Collapsed ? "hidden" : "block"} md:hidden border-t border-amber-100/50 bg-white/90 backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/90`}>
        <nav aria-label="Mobile Nav" className="p-4">
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink className={activeLink} to="/" onClick={() => setCollapsed(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={activeLink} to="/products" onClick={() => setCollapsed(false)}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className={activeLink} to="/contact" onClick={() => setCollapsed(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
```

- [ ] **Step 3: Commit the changes**

Run: `git add src/components/Nav/Header.jsx`
Run: `git commit -m "style: redesign navbar with glassmorphism and organic theme"`
