# Changelog

All notable changes to this project will be documented in this file.
This project follows [Keep a Changelog](https://keepachangelog.com/pt-PT/1.1.0/)
and uses [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

## [1.0.0] - 2026-11-26

### Added
- GitHub stars badge in the public and app headers.
- Centralized API layer (`api.config.ts` and `analyses.service.ts`).
- Loading skeleton for the history route.

### Changed
- Dashboard, analysis detail, and history pages now consume the real API.
- Upload flow sends the CSV to the API and redirects to the analysis page.
- Root layout uses `data-scroll-behavior="smooth"`.

### Fixed
- Mobile menu now closes when clicking outside or on a link.
- Recharts sizing warnings silenced.
- API request timeout raised to 60s.
- Flask trailing-slash `307` redirect handled.
- ESLint unused imports and `use-mobile` hook fixed.

### Removed
- Hardcoded mock data (`MOCK_ANALYSES`, `lib/analyses.ts`).
- Dev state simulator in the upload workspace.
- Hardcoded changelog releases and dead CTAs.
- False claims in the terms page (WASM, IndexedDB, Zero-Knowledge).

## [0.1.0] - 2026-11-11

### Added
- Initial project scaffolding for the DataLens platform.
- CSV upload with validation.
- Metrics for records, quantity, revenue, and top products.
- Persistent analysis history in PostgreSQL.
- FastAPI backend with OpenAPI docs.
- Docker configuration and API deployment to Render.