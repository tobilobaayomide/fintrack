# FinTrack – Personal Finance Tracker

A simple personal finance tracker built with React and Vite. It lets users log income/expenses, visualize spending, manage category budgets, and filter transactions—all persisted in localStorage so it works offline.

## What I built & why
- **Dashboard-first UX:** At-a-glance cards (income, expenses, net), budget health, and spending breakdown to answer “How am I doing this month?” quickly.
- **Fast entry:** Slide-in transaction drawer, quick-add presets, and inline edit/delete keep flow snappy.
- **Budgets per category:** Simple limits with over/near-safe states to encourage awareness without heavy setup.
- **Filters & search:** Category/type/text/date filters to quickly locate transactions; designed to stay useful even as data grows.
- **Persistence without backend:** `useLocalStorage` keeps everything on-device—no setup required.
- **Responsive layout:** Sticky mobile top bar + drawer sidebar, collapsing filters for small screens.

## What I’d improve with more time
- CSV/Excel export and printable monthly summary.
- Recurring/templated transactions (salary, rent) with auto-rollover.
- Savings goals with target/date progress.
- Multi-currency display with user-provided FX rates.
- Light/dark theme toggle with persisted preference.
- Accessibility audit (focus order, reduced motion, high-contrast pass) and keyboard shortcuts.

## Challenges
- Balancing a compact mobile layout with rich controls (filters, budgets, charts) required careful responsive tweaks (drawer nav, collapsible date filters, fixed mobile bar).
- Managing form state for add/edit while avoiding React lint warnings around effects and setState timing.

## Time spent (approx.)
~6–7 hours across design, implementation, responsive polish, and linting.
