from database import engine, Base
import models
from sqlalchemy import text

def reset_database():
    print("Resetting database...")
    with engine.begin() as conn:
        # Drop all tables
        # Since specify metadata.drop_all doesn't always work with dependencies if not perfectly mapped
        # we can just drop known tables first
        conn.execute(text("DROP TABLE IF EXISTS missions CASCADE;"))
        conn.execute(text("DROP TABLE IF EXISTS consultants CASCADE;"))
        conn.execute(text("DROP TABLE IF EXISTS users CASCADE;"))
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("Database reset successful.")

if __name__ == "__main__":
    reset_database()
