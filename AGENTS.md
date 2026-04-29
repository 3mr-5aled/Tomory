# Agent Notes

## Project quickstart
- Install: `npm install`
- Dev server: `npm run dev` (Vite, uses `--host`)
- Payments server: `npm start` (Express on `PORT` or 4242)
- Build: `npm run build`
- Preview: `npm run preview`

## Structure and conventions
- Entry: `src/main.jsx` -> `src/App.jsx`
- Pages: `src/pages/` (admin, auth, checkout, orders, main)
- Components by domain: `src/components/` (Admin, Home, Nav, Products, features)
- Redux slices: `src/redux/slice/` and store in `src/redux/store.jsx`
- Firebase client config: `src/firebase/config.jsx`

## Environment variables
- Frontend Firebase config uses Vite env vars: `VITE_API_KEY`, `VITE_AUTH_DOMAIN`, `VITE_PROJECT_ID`, `VITE_STORAGE_BUCKET`, `VITE_MESSAGING_SENDER_ID`, `VITE_APP_ID`.
- Server payments require `STRIPE_PRIVATE_KEY` in `.env` for `server.cjs`.

## Notes and pitfalls
- Add new redux slices to the persist whitelist in `src/redux/store.jsx` if they should survive reloads.
- Payment amount is calculated server-side in `server.cjs`; keep it consistent with cart logic.

## Reference
- See README for full setup and feature overview: ./README.md
