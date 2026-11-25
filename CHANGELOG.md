# Changelog

All notable changes to this project will be documented in this file.
This project follows [Keep a Changelog](https://keepachangelog.com/pt-PT/1.1.0/)
and uses [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added
- GitHub stars badge in the public and app headers (server-side fetch with 1h revalidate).
- `web/lib/github.ts` with `getRepoStars()` for the GitHub API.
- `web/shared/config/api.config.ts` and `web/services/analyses.service.ts` as the centralized API layer.
- `loading.tsx` skeleton for the history route.

### Changed
- Dashboard, analysis detail, and history pages now consume the real Flask API (`GET /api/analyses`, `GET /api/analyses/{id}`, `POST /api/analyses/upload`).
- `DashboardView` and `HistoryView` receive data via props instead of hardcoded mocks.
- Upload flow sends the CSV to the API and redirects to `/analyses/{id}` on success.
- Replaced the `generateMetadata` fetch in `/analyses/[id]` with static metadata to avoid a prerender block.
- Root layout uses `data-scroll-behavior="smooth"` instead of `scroll-smooth` on `<html>`.
- `package.json` build uses `--webpack` to work around a Turbopack `next/font/google` resolution bug.
- The app layout uses `export const instant = false` to allow blocking navigation for `usePathname`.

### Fixed
- Close the mobile menu when clicking outside it or on a link inside it (both public and app headers).
- Silence Recharts `-1` width/height warnings by adding `minWidth={0}` and `initialDimension` to `ResponsiveContainer`.
- Raise the API request timeout to 60s to tolerate Render cold starts.
- Handle the Flask trailing-slash `307` redirect with `redirect: "follow"`.
- Remove unused imports and dead simulator constants flagged by ESLint.
- Replace the `useEffect` + `setState` pattern in `use-mobile` with `useSyncExternalStore`.

### Removed
- `MOCK_ANALYSES` / `MOCK_ANALYSIS` and `web/lib/analyses.ts`.
- The dev state simulator in the upload workspace and the history page.
- Hardcoded changelog releases and non-functional CTAs.
- Claims in the terms page that did not match the v1 architecture (WASM, IndexedDB, Zero-Knowledge).
- Unused `NavLinks` extraction and the `Suspense` wrapper in the app header.

## [0.1.0] - 2026-11-11

### Added
- Initial project scaffolding for the DataLens platform, including the frontend application.
- CSV upload with validation for required columns, data types, and value constraints.
- Metrics for total records, quantity, revenue, average order value, revenue by category, and the top five products.
- Persistent analysis history stored in PostgreSQL.
- FastAPI backend with OpenAPI documentation available at `/docs`.
- Docker configuration for the API and PostgreSQL services, with Docker Compose support.
- API deployment to Render.
