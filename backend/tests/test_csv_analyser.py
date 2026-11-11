
from io import BytesIO

import pytest

from app.services.csv_analyzer import CSVAnalyzer


@pytest.fixture
def analyzer():
    return CSVAnalyzer()


def make_csv(content: str):
    return BytesIO(content.encode("utf-8"))


def test_valid_csv(analyzer):
    content = (
        "date,product,category,quantity,price\n"
        "2026-01-02,Telemovel,Tecnologia,3,85000\n"
        "2026-01-03,Rato,Acessorios,2,4500\n"
    )

    result = analyzer.analyze(make_csv(content))

    assert result["total_records"] == 2
    assert result["total_quantity"] == 5
    assert result["total_revenue"] == 264000


def test_empty_csv(analyzer):
    with pytest.raises(ValueError):
        analyzer.analyze(make_csv(""))


def test_csv_without_records(analyzer):
    content = "date,product,category,quantity,price\n"

    with pytest.raises(ValueError):
        analyzer.analyze(make_csv(content))


def test_missing_columns(analyzer):
    content = (
        "date,product,category,quantity\n"
        "2026-01-02,Telemovel,Tecnologia,3\n"
    )

    with pytest.raises(ValueError, match="Colunas obrigatórias"):
        analyzer.analyze(make_csv(content))


def test_invalid_date(analyzer):
    content = (
        "date,product,category,quantity,price\n"
        "2026-13-40,Telemovel,Tecnologia,3,85000\n"
    )

    with pytest.raises(ValueError, match="Data inválida"):
        analyzer.analyze(make_csv(content))


def test_invalid_quantity(analyzer):
    content = (
        "date,product,category,quantity,price\n"
        "2026-01-02,Telemovel,Tecnologia,1.5,85000\n"
    )

    with pytest.raises(ValueError, match="Quantidade inválida"):
        analyzer.analyze(make_csv(content))


def test_invalid_price(analyzer):
    content = (
        "date,product,category,quantity,price\n"
        "2026-01-02,Telemovel,Tecnologia,3,-100\n"
    )

    with pytest.raises(ValueError, match="Preço inválido"):
        analyzer.analyze(make_csv(content))


def test_empty_product(analyzer):
    content = (
        "date,product,category,quantity,price\n"
        "2026-01-02,,Tecnologia,3,85000\n"
    )

    with pytest.raises(ValueError, match="Produto obrigatório"):
        analyzer.analyze(make_csv(content))


def test_empty_category(analyzer):
    content = (
        "date,product,category,quantity,price\n"
        "2026-01-02,Telemovel,,3,85000\n"
    )

    with pytest.raises(ValueError, match="Categoria obrigatória"):
        analyzer.analyze(make_csv(content))


def test_utf8_bom(analyzer):
    content = (
        "\ufeffdate,product,category,quantity,price\n"
        "2026-01-02,Telemovel,Tecnologia,3,85000\n"
    )

    result = analyzer.analyze(make_csv(content))

    assert result["total_records"] == 1


def test_nan_price(analyzer):
    content = (
        "date,product,category,quantity,price\n"
        "2026-01-02,Telemovel,Tecnologia,3,NaN\n"
    )

    with pytest.raises(ValueError, match="Preço inválido"):
        analyzer.analyze(make_csv(content))


def test_zero_quantity(analyzer):
    content = (
        "date,product,category,quantity,price\n"
        "2026-01-02,Telemovel,Tecnologia,0,85000\n"
    )

    with pytest.raises(ValueError, match="Quantidade inválida"):
        analyzer.analyze(make_csv(content))
