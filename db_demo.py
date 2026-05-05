from __future__ import annotations

from sqlalchemy import text

from database import engine, init_db


def run_sql(query: str):
    """run a raw SQL query on the same DB used by `database.py`.
    
    Example:
        row = run_sql("SELECT * FROM appointments")
        print(row)
    """
    with engine.begin() as conn:
        result = conn.execute(text(query))
        return result.fetchall() if result.returns_rows else result.rowcount

# init_db() # ensure the appointments table exists
query = """SELECT * FROM appointments"""

print(run_sql(query))   
    