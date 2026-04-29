# Design Spec: Targeted Smooth Scroll for Hero Button

Providing a programmatic way to trigger smooth, momentum-based scrolling for specific UI elements, starting with the Hero "Scroll" button.

## 1. Objective
Enable precise control over scroll transitions using the Lenis instance, ensuring that the "Scroll" button in the Hero section provides the same "buttery" feel as the rest of the site's scrolling.

## 2. Architecture: Lenis Context
To allow components to interact with the scroll instance without prop-drilling:
- **`LenisContext`**: A React Context defined within `src/components/features/SmoothScroll.jsx`.
- **`useLenis` Hook**: A custom hook exported from the same file to provide easy access to the `lenis` instance.
- **Provider Pattern**: The `SmoothScroll` component will act as the provider, passing the `lenis` instance down once initialized.

## 3. Implementation Details
### `SmoothScroll.jsx`
- Define `LenisContext`.
- Store the `lenis` instance in a `useState` or `useRef` (and sync to state for context consumption).
- Export `useLenis`.

### `ImmersiveHero.jsx`
- Import `useLenis`.
- Update the "Scroll" button to use `lenis.scrollTo('#story')`.
- Prevent default anchor behavior to ensure Lenis takes full control.

## 4. Interaction Polish
- **Duration**: Set to `1.5s` for a smooth, cinematic transition into the Story section.
- **Easing**: Use the same easing as the global scroll for consistency.

## 5. Success Criteria
- [ ] Clicking the Hero "Scroll" button triggers a smooth scroll to the Story section.
- [ ] The scroll transition is smooth (no jumping).
- [ ] The feature degrades gracefully if Lenis is unavailable.
