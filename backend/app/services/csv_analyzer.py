
import re
import pandas as pd

from datetime import datetime
from decimal import Decimal, InvalidOperation


class CSVAnalyzer:

    REQUIRED_COLUMNS: list[str] = [
        "date",
        "product",
        "category",
        "quantity",
        "price",
    ]

    MAX_RECORDS = 50000

    def analyze(self, file):
        try:
            df = pd.read_csv(
                file,
                encoding="utf-8-sig",
                on_bad_lines="error",
                dtype=str,
                keep_default_na=False
            )

        except pd.errors.EmptyDataError:
            raise ValueError("O ficheiro CSV está vazio.")

        except pd.errors.ParserError:
            raise ValueError("O ficheiro CSV possui uma estrutura inválida.")

        except UnicodeDecodeError:
            raise ValueError("O ficheiro deve utilizar codificação UTF-8.")

        if df.empty:
            raise ValueError("O ficheiro CSV não contém registos.")

        missing_columns = [
            column for column in self.REQUIRED_COLUMNS
            if column not in df.columns
        ]

        if missing_columns:
            raise ValueError(
                f"Colunas obrigatórias em falta: {missing_columns}"
            )

        if len(df) > self.MAX_RECORDS:
            raise ValueError(
                f"O ficheiro não pode ultrapassar {self.MAX_RECORDS} registos."
            )

        df["product"] = df["product"].str.strip()
        df["category"] = df["category"].str.strip()

        self.validate_data(df)

        return self.calculate_metrics(df)

    def validate_data(self, df):
        errors = []

        normalized_quantities = []
        normalized_prices = []

        for index, row in df.iterrows():
            row_errors = []

            date = row["date"].strip()
            product = row["product"]
            category = row["category"]

            # Validar data
            if not date:
                row_errors.append("Data obrigatória")
            else:
                try:
                    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date):
                        raise ValueError()

                    datetime.strptime(date, "%Y-%m-%d")

                except ValueError:
                    row_errors.append("Data inválida. Use YYYY-MM-DD.")

            # Validar produto
            if not product:
                row_errors.append("Produto obrigatório")

            # Validar categoria
            if not category:
                row_errors.append("Categoria obrigatória")

            # Validar quantidade
            try:
                quantity = Decimal(row["quantity"].strip())

                if (
                    not quantity.is_finite()
                    or quantity != quantity.to_integral_value()
                    or not 1 <= quantity <= 100000
                ):
                    raise ValueError()

                normalized_quantities.append(int(quantity))

            except (InvalidOperation, ValueError):
                row_errors.append("Quantidade inválida")
                normalized_quantities.append(None)

            # Validar preço
            try:
                price = Decimal(row["price"].strip())

                if (
                    not price.is_finite()
                    or not 0 <= price <= 10000000
                ):
                    raise ValueError()

                normalized_prices.append(price)

            except (InvalidOperation, ValueError):
                row_errors.append("Preço inválido")
                normalized_prices.append(None)

            if row_errors:
                errors.append({
                    "line": index + 2,
                    "errors": row_errors
                })

        if errors:
            raise ValueError(errors[:20])

        df["quantity"] = normalized_quantities
        df["price"] = normalized_prices

    def calculate_metrics(self, df):
        df["revenue"] = [
            Decimal(quantity) * price
            for quantity, price in zip(
                df["quantity"],
                df["price"]
            )
        ]

        total_revenue = sum(df["revenue"], Decimal("0"))

        revenue_by_category = (
            df.groupby("category")["revenue"]
            .sum()
            .to_dict()
        )

        top_products = (
            df.groupby("product")["quantity"]
            .sum()
            .sort_values(ascending=False)
            .head(5)
            .to_dict()
        )

        return {
            "total_records": len(df),

            "total_quantity": int(df["quantity"].sum()),

            "total_revenue": total_revenue.quantize(
                Decimal("0.01")
            ),

            "average_value": (
                total_revenue / Decimal(len(df))
            ).quantize(Decimal("0.01")),

            "revenue_by_category": [
                {
                    "category": str(category),
                    "revenue": float(value)
                }
                for category, value in revenue_by_category.items()
            ],

            "top_products": [
                {
                    "product": str(product),
                    "quantity": int(quantity)
                }
                for product, quantity in top_products.items()
            ]
        }
