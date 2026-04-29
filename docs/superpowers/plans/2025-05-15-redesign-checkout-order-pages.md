# Redesign Checkout and Order Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `Checkout.jsx`, `CheckoutStatus.jsx`, `Orders.jsx`, and `OrderDetails.jsx` using the immersive, organic design language of Tomory.

**Architecture:** Apply a consistent immersive wrapper to all pages, use glassmorphic containers for content, and refine typography to use `font-display` for headers and `font-body` for content. Ensure responsiveness and maintain all existing Firebase and Redux integrations.

**Tech Stack:** React, Tailwind CSS, Redux Toolkit, Firebase Firestore.

---

### Task 1: Redesign `Checkout.jsx`

**Files:**
- Modify: `src/pages/Checkout/Checkout.jsx`

- [ ] **Step 1: Update the page wrapper and background elements.**
Replace the existing section and its contents with the immersive wrapper, grain overlay, and floating blurs.

- [ ] **Step 2: Implement the split glassmorphic layout.**
Create a two-column layout on medium screens and larger.
Left column: Order Summary in a glassmorphic container.
Right column: Checkout Form in a glassmorphic container.

- [ ] **Step 3: Refine the Order Summary.**
Style the cart items list with better typography and colors. Use `font-display` for the total amount.

- [ ] **Step 4: Refine the Checkout Form.**
Style the form inputs, labels, and radio buttons to match the theme. Use the premium amber button for "Pay Now".

### Task 2: Redesign `CheckoutStatus.jsx`

**Files:**
- Modify: `src/pages/Checkout/CheckoutStatus.jsx`

- [ ] **Step 1: Update the page wrapper and background elements.**
Apply the same immersive wrapper and background elements as in Task 1.

- [ ] **Step 2: Implement the centered glassmorphic status card.**
Wrap the `SuccessComponent` and `FailComponent` in a centered glassmorphic container.

- [ ] **Step 3: Refine Success/Fail components.**
Update icons, typography, and button styling to match the theme.

### Task 3: Redesign `Orders.jsx`

**Files:**
- Modify: `src/pages/main/Orders/Orders.jsx`

- [ ] **Step 1: Update the page wrapper and background elements.**
Apply the immersive wrapper and background elements.

- [ ] **Step 2: Implement the large glassmorphic container for orders.**
Center the order history in a large glassmorphic container. Use `font-display` for the "Orders" title.

- [ ] **Step 3: Verify the `OrderTable` integration.**
Ensure the existing `OrderTable` component still works correctly within the new layout.

### Task 4: Redesign `OrderDetails.jsx`

**Files:**
- Modify: `src/pages/main/Orders/OrderDetails.jsx`

- [ ] **Step 1: Update the page wrapper and background elements.**
Apply the immersive wrapper and background elements.

- [ ] **Step 2: Implement the centered glassmorphic container for details.**
Wrap the order details in a centered glassmorphic container. Use `font-display` for the "Order Details" title.

- [ ] **Step 3: Refine the "Back to Orders" link.**
Style the back link to be more elegant and consistent with the theme.

### Task 5: Verification and Final Polish

- [ ] **Step 1: Verify all forms and buttons.**
Ensure checkout form validation, Paymob integration, and navigation still work perfectly.

- [ ] **Step 2: Check responsiveness.**
Verify all pages look great on mobile, tablet, and desktop.

- [ ] **Step 3: Commit changes.**
`git commit -m "style: complete redesign of checkout and order pages with immersive theme"`
