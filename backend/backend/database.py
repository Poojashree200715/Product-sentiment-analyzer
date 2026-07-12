import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

DB_CONFIG = {
    "host":     "localhost",
    "database": "sentipulse_db",
    "user":     "postgres",
    "password": "warrobots",
    "port":     "5432"
}

def get_connection():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("[DB] Connected to Supabase PostgreSQL")
        return conn
    except Exception as e:
        print(f"[DB] Connection failed: {e}")
        return None

def create_tables():
    conn = get_connection()
    if not conn:
        return
    try:
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY, product_name VARCHAR(255) NOT NULL,
                source VARCHAR(50), title TEXT, price VARCHAR(50),
                overall_rating VARCHAR(20), total_reviews VARCHAR(50),
                image_url TEXT, scraped_at TIMESTAMP DEFAULT NOW()
            );
        """)
        cur.execute("ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;")
        cur.execute("""
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY, product_id INT REFERENCES products(id) ON DELETE CASCADE,
                product_name VARCHAR(255), source VARCHAR(50), review_title TEXT,
                review_body TEXT, review_rating VARCHAR(20), review_date VARCHAR(50),
                sentiment VARCHAR(20), sentiment_score FLOAT, created_at TIMESTAMP DEFAULT NOW()
            );
        """)
        conn.commit()
        print("[DB] Tables created successfully")
    except Exception as e:
        print(f"[DB] Error creating tables: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

def save_product(product_name, source, title, price, overall_rating, total_reviews, image_url="N/A", specs=None):
    conn = get_connection()
    if not conn:
        return None
    try:
        cur = conn.cursor()
        cur.execute("SELECT id FROM products WHERE product_name = %s AND source = %s", (product_name, source))
        existing = cur.fetchone()
        if existing:
            print(f"[DB] Product already exists, ID: {existing[0]}")
            return existing[0]
        cur.execute("""
            INSERT INTO products (product_name, source, title, price, overall_rating, total_reviews, image_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id
        """, (product_name, source, title, price, overall_rating, total_reviews, image_url))
        product_id = cur.fetchone()[0]
        conn.commit()
        print(f"[DB] Product saved, ID: {product_id}")
        return product_id
    except Exception as e:
        print(f"[DB] Error saving product: {e}")
        conn.rollback()
        return None
    finally:
        cur.close()
        conn.close()

def save_reviews(product_id, product_name, source, reviews):
    conn = get_connection()
    if not conn:
        return False
    try:
        cur = conn.cursor()
        saved_count = 0
        for review in reviews:
            cur.execute("""
                INSERT INTO reviews (product_id, product_name, source, review_title, review_body, review_rating, review_date, sentiment, sentiment_score)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (product_id, product_name, source, review.get("title", ""), review.get("body", ""),
                  review.get("rating", ""), review.get("date", ""), review.get("sentiment", "Neutral"),
                  review.get("sentiment_score", 0.0)))
            saved_count += 1
        conn.commit()
        print(f"[DB] {saved_count} reviews saved")
        return True
    except Exception as e:
        print(f"[DB] Error saving reviews: {e}")
        conn.rollback()
        return False
    finally:
        cur.close()
        conn.close()

def get_reviews(product_name, source=None):
    conn = get_connection()
    if not conn:
        return []
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        if source:
            cur.execute("SELECT * FROM reviews WHERE product_name ILIKE %s AND source = %s ORDER BY created_at DESC", (f"%{product_name}%", source))
        else:
            cur.execute("SELECT * FROM reviews WHERE product_name ILIKE %s ORDER BY created_at DESC", (f"%{product_name}%",))
        reviews = cur.fetchall()
        print(f"[DB] Found {len(reviews)} reviews for '{product_name}'")
        return [dict(r) for r in reviews]
    except Exception as e:
        print(f"[DB] Error fetching reviews: {e}")
        return []
    finally:
        cur.close()
        conn.close()

def get_sentiment_summary(product_name):
    conn = get_connection()
    if not conn:
        return {}
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT sentiment, COUNT(*) as count FROM reviews WHERE product_name ILIKE %s GROUP BY sentiment", (f"%{product_name}%",))
        rows = cur.fetchall()
        summary = {"Positive": 0, "Negative": 0, "Neutral": 0, "total": 0}
        for row in rows:
            summary[row["sentiment"]] = row["count"]
            summary["total"] += row["count"]
        print(f"[DB] Sentiment summary: {summary}")
        return summary
    except Exception as e:
        print(f"[DB] Error fetching summary: {e}")
        return {}
    finally:
        cur.close()
        conn.close()

def get_all_products():
    conn = get_connection()
    if not conn:
        return []
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM products ORDER BY scraped_at DESC")
        products = cur.fetchall()
        return [dict(p) for p in products]
    except Exception as e:
        print(f"[DB] Error fetching products: {e}")
        return []
    finally:
        cur.close()
        conn.close()

def get_products_summary(search_term=""):
    conn = get_connection()
    if not conn:
        return []
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""
            SELECT p.id, p.product_name, p.source, p.title, p.price, p.overall_rating,
                p.total_reviews, p.image_url, COUNT(r.id) as review_count,
                SUM(CASE WHEN r.sentiment = 'Positive' THEN 1 ELSE 0 END) as positive_count,
                SUM(CASE WHEN r.sentiment = 'Negative' THEN 1 ELSE 0 END) as negative_count,
                SUM(CASE WHEN r.sentiment = 'Neutral' THEN 1 ELSE 0 END) as neutral_count
            FROM products p
            LEFT JOIN reviews r ON p.id = r.product_id
            WHERE p.product_name ILIKE %s
            GROUP BY p.id, p.product_name, p.source, p.title, p.price, p.overall_rating, p.total_reviews, p.image_url
            ORDER BY p.scraped_at DESC
        """, (f"%{search_term}%",))
        products = cur.fetchall()
        result = []
        for p in products:
            total = p['review_count'] or 1
            positive_pct = round((p['positive_count'] / total) * 100)
            result.append({
                "id": p['id'], "name": p['product_name'], "source": p['source'],
                "title": p['title'], "price": p['price'], "rating": p['overall_rating'],
                "reviews": p['review_count'],
                "image_url": p['image_url'] if p['image_url'] and p['image_url'] != "N/A" else None,
                "positive": positive_pct, "badge": f"{positive_pct}% Positive",
                "badgeType": "positive" if positive_pct >= 60 else "negative" if positive_pct < 40 else "trending"
            })
        return result
    except Exception as e:
        print(f"[DB] Error fetching product summary: {e}")
        return []
    finally:
        cur.close()
        conn.close()

def get_all_reviews():
    conn = get_connection()
    if not conn:
        return []
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM reviews ORDER BY created_at DESC")
        reviews = cur.fetchall()
        return [dict(r) for r in reviews]
    except Exception as e:
        print(f"[DB] Error fetching all reviews: {e}")
        return []
    finally:
        cur.close()
        conn.close()

def save_scraped_data(scraped_data, sentiment_results):
    product_name = scraped_data.get("product_name", "")
    source = scraped_data.get("source", "")
    info = scraped_data.get("product_info", {})
    reviews = scraped_data.get("reviews", [])
    product_id = save_product(product_name=product_name, source=source, title=info.get("title", ""),
        price=info.get("price", ""), overall_rating=info.get("overall_rating", ""), total_reviews=info.get("total_ratings", ""))
    if not product_id:
        return False
    for i, review in enumerate(reviews):
        if i < len(sentiment_results):
            review["sentiment"] = sentiment_results[i].get("sentiment", "Neutral")
            review["sentiment_score"] = sentiment_results[i].get("sentiment_score", 0.0)
    return save_reviews(product_id, product_name, source, reviews)
