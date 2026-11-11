import pandas as pd
from decimal import Decimal

class CSVAnalyzer: 
    
    REQUIRED_COLUMNS: list[str] = [
        "date",
        "product",
        "category",
        "quantity",
        "price",
    ]
    
    def analyze(self, file):
        df = pd.read_csv(file)
        # Lista as colunas obrigatórias que não existem no CSV.
        missing_columns = [
            column
            for column in self.REQUIRED_COLUMNS
            if column not in df.columns
        ]
        
        if missing_columns:
            raise ValueError(
                f"Colunas em falta: {missing_columns}"
            )
        if df.empty:
            raise ValueError("O ficheiro CSV está vazio.")
        
        self.validate_data(df)
        
        return self.calculate_metrics(df)
    
    def validate_data(self, df):
        errors = []

        for index, row in df.iterrows():
            row_errors = []

            if pd.isna(row["date"]):
                row_errors.append("Data obrigatória")
            else:
                try:
                    pd.to_datetime(row["date"], format="%Y-%m-%d")
                except ValueError:
                    row_errors.append("Data inválida")

            if pd.isna(row["product"]) or not str(row["product"]).strip():
                row_errors.append("Produto obrigatório")

            if pd.isna(row["category"]) or not str(row["category"]).strip():
                row_errors.append("Categoria obrigatória")

            try:
                quantity = int(row["quantity"])

                if quantity != row["quantity"] or not 1 <= quantity <= 100000:
                    row_errors.append("Quantidade inválida")
            except (ValueError, TypeError, OverflowError):
                row_errors.append("Quantidade inválida")

            try:
                price = float(row["price"])

                if not 0 <= price <= 10000000:
                    row_errors.append("Preço inválido")
            except (ValueError, TypeError, OverflowError):
                row_errors.append("Preço inválido")

            if row_errors:
                errors.append({
                    "line": index + 2,
                    "errors": row_errors
                })

        if errors:
            raise ValueError(errors[:20])
        
    def calculate_metrics(self, df):
        df["revenue"] = df["quantity"] * df["price"]

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
            "total_revenue": Decimal(
                str(df["revenue"].sum())
            ).quantize(Decimal("0.01")),

            "average_value": Decimal(
                str(df["revenue"].mean())
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