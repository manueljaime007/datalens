# DataLens

Sales CSV file analyzer. Upload a file, validate its data, and view a summary with metrics, revenue by category, and the best-selling products. Each analysis is available in the history.

> The project is under development.

## Features

- CSV upload with validation of structure, types, and values.
- Summary of records, quantity, revenue, and average value per row.
- Revenue by category and top 5 products by quantity.
- Persisted analysis history.
- Responsive interface in English.

## Tech Stack

- **API:** FastAPI, Pandas, SQLAlchemy, Alembic, and PostgreSQL.
- **Web:** Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
- **Development:** Docker Compose.
- **Planned deployment:** Vercel (web), Render (API), and managed PostgreSQL with persistence.

## CSV Format

The file must have a `.csv` extension, be UTF-8 encoded (with or without a BOM), and contain the following columns:

| Column | Rule |
|---|---|
| `date` | Valid date in `YYYY-MM-DD` format |
| `product` | Non-empty text |
| `category` | Non-empty text |
| `quantity` | Integer between 1 and 100,000 |
| `price` | Number between 0 and 10,000,000 Kz |

The limit is 5 MB and 50,000 rows. The revenue for each row is `quantity * price`. If any row is invalid, the entire file is rejected, and the API returns up to 20 errors, including the row, column, and message. No automatic corrections are made.

Example available at [`samples/sales.csv`](./samples/sales.csv):

```csv
date,product,category,quantity,price
2026-01-02,Telemóvel,Tecnologia,3,85000
2026-01-03,Auriculares,Acessórios,10,7500
2026-01-03,Teclado,Acessórios,5,12000
2026-01-05,Monitor,Tecnologia,2,150000
2026-01-06,Rato,Acessórios,8,4500
2026-01-07,Telemóvel,Tecnologia,1,85000
```

The example produces 6 records, a total quantity of 29, total revenue of 811,000 Kz, and an average value per row of 135,166.67 Kz. Revenue by category is Technology: 640,000 Kz and Accessories: 171,000 Kz. Products are ranked by quantity.

## Quick Start

### Docker Compose

1. Copy `api/.env.example` to `api/.env` and `web/.env.example` to `web/.env`.
2. Set the required environment variables, including the database connection.
3. From the project root, run:

	```bash
	docker compose up --build
	```

4. Open the application at the address configured in Docker Compose. The API provides `/docs` for interactive documentation and `/health` for the health check.

### API Tests

In the `api` directory, install the dependencies and run the tests:

<!-- # pytest -->

```bash
pip install -r requirements.txt
```

The analyzer tests verify validation and calculations without HTTP or a database. Endpoint tests require the test database configuration defined by the project.

## API

| Method | Route | Description | Success |
|---|---|---|---|
| `POST` | `/api/analyses` | Accepts the `file` field in `multipart/form-data`, validates it, calculates, and saves the analysis. | `201` |
| `GET` | `/api/analyses` | Lists analyses from newest to oldest. | `200` |
| `GET` | `/api/analyses/{id}` | Returns a complete analysis. | `200` |
| `DELETE` | `/api/analyses/bulk` | Delete a set of analyses resources. | `204` |
| `DELETE` | `/api/analyses/{id}` | Delete a complete analysis. | `204` |
| `GET` | `/health` | Health check. | `200` |
| `GET` | `/docs` | FastAPI OpenAPI documentation. | `200` |

Expected errors:

| Scenario | Code |
|---|---:|
| File that is not `.csv` | `415` |
| File larger than 5 MB | `413` |
| Empty, malformed, or invalid CSV data | `422` |
| Analysis not found | `404` |

Validation errors include a message and up to 20 entries with the row, column, and reason. Counting starts at the header; blank lines may cause the count to differ from the physical line number in the file.

## Project Structure

```text
api/       API, analysis logic, persistence, migrations, and tests
web/       Next.js application and interface components
samples/   Sample CSV and invalid files
```

<!-- ## Privacy

Do not upload sensitive or personal information. See the application's [Terms](./web/app/termos/page.tsx) and [Privacy](./web/app/privacidade/page.tsx) pages for information about data handling and retention. -->

## Scope and Roadmap

Machine learning, forecasting, configurable dashboards, formats other than CSV, PDF export, accounts, permissions, and background processing are out of scope for now.

<!-- ## License

See [`LICENSE`](./LICENSE). -->
