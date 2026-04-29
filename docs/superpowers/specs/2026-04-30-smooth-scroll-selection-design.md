# Design Spec: Smooth Momentum Scroll & Global Selection Control

Adding a high-end "momentum" scrolling experience and global content protection through unselectable text.

## 1. Objective
Enhance the site's premium feel with buttery-smooth inertial scrolling and prevent accidental text selection/copying across the entire application.

## 2. Momentum Scrolling (Lenis)
We will use **Lenis** to provide a consistent, smooth scrolling experience.
- **Library:** `@studio-freight/lenis` (or the latest equivalent).
- **Architecture:** 
    - A `SmoothScroll` provider component that wraps the main application.
    - Uses `requestAnimationFrame` to sync with the browser's refresh rate.
    - Configuration: Focused on "momentum" (slightly longer duration, smooth easing).

## 3. Global Selection Lock
Global CSS will be used to restrict text selection.
- **Default Behavior:** `user-select: none` on `body`.
- **Exclusions:**
    - Form elements (`input`, `textarea`) will remain selectable (`user-select: auto`).
    - Administrative views (if needed) can be unlocked via a specific class.
- **Visuals:** Maintain the custom `::selection` color for allowed areas.

## 4. Components & Files
- **`src/components/features/SmoothScroll.jsx`**: Initialization and management of the Lenis instance.
- **`src/App.jsx`**: Integration of the `SmoothScroll` component.
- **`src/index.css`**: Global selection rules.

## 5. Success Criteria
- [ ] Scrolling feels smooth and "weighty" (momentum).
- [ ] Text cannot be highlighted on the landing page, product lists, or headers.
- [ ] Users can still click and type in input fields without issues.
- [ ] No regressions in scroll-based animations (like the hero parallax).
