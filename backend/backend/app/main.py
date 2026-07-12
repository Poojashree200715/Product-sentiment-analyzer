from typing import List, Optional
from datetime import datetime

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from . import data
from .sentiment import analyze_text
from database import get_reviews as db_get_reviews, get_sentiment_summary, save_product, save_reviews, get_products_summary, get_all_reviews
from fastapi.responses import StreamingResponse
import csv
import io

app = FastAPI(
    title="Product Sentiment Analyzer API",
    description="Backend for the Product-sentiment-analyzer React frontend",
    version="1.0.0",
)

# Allow the Vite dev server (default port 5173) to call this API.
# Add your deployed frontend URL here too once you host it.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Schemas ----------

class AnalyzeRequest(BaseModel):
    text: str


class ReviewIn(BaseModel):
    author: str
    rating: int
    text: str


# ---------- Health ----------

@app.get("/api/health")
def health():
    return {"status": "ok", "time": datetime.utcnow().isoformat()}


# ---------- Sentiment Analyzer page ----------

@app.post("/api/analyze")
def analyze(payload: AnalyzeRequest):
    if not payload.text or not payload.text.strip():
        raise HTTPException(status_code=400, detail="text must not be empty")
    return analyze_text(payload.text)


# ---------- Product Search page ----------

@app.get("/api/products")
def get_products(search: str = ""):
    reviews  = db_get_reviews(search)
    products = get_products_summary(search)
    return {
        "reviews" : reviews,
        "summary" : products
    }

# ---------- Product Details / Customer Reviews pages ----------

@app.get("/api/products/{product_id}")
def get_product(product_id: str):
    product = next((p for p in data.PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="product not found")
    stats = data.PRODUCT_STATS.get(product_id, {})
    return {**product, "stats": stats}


@app.get("/api/products/{product_id}/reviews")
def get_reviews(product_id: str, sentiment: Optional[str] = Query(None)):
    if product_id not in data.PRODUCT_STATS:
        raise HTTPException(status_code=404, detail="product not found")
    reviews = data.REVIEWS.get(product_id, [])
    if sentiment and sentiment != "All":
        reviews = [r for r in reviews if r["sentiment"] == sentiment]
    return {
        "product": {
            "id": product_id,
            "name": next((p["name"] for p in data.PRODUCTS if p["id"] == product_id), product_id),
            **data.PRODUCT_STATS[product_id],
        },
        "reviews": reviews,
    }


@app.post("/api/products/{product_id}/reviews")
def add_review(product_id: str, review: ReviewIn):
    if product_id not in data.PRODUCT_STATS:
        raise HTTPException(status_code=404, detail="product not found")

    result = analyze_text(review.text)
    new_review = {
        "id": len(data.REVIEWS.get(product_id, [])) + 1,
        "author": review.author,
        "rating": review.rating,
        "sentiment": result["overall_sentiment"],
        "date": datetime.utcnow().strftime("%Y-%m-%d"),
        "text": review.text,
        "tags": [],
        "verified": False,
        "avatar": "",
    }
    data.REVIEWS.setdefault(product_id, []).append(new_review)

    stats = data.PRODUCT_STATS[product_id]
    stats["total"] += 1
    key = f"{result['overall_sentiment'].lower()}Count"
    if key in stats:
        stats[key] += 1

    return new_review


# ---------- Dashboard page ----------

@app.get("/api/dashboard")
def dashboard():
    return {
        "sentimentSplit": data.DASHBOARD_SENTIMENT_SPLIT,
        "growth": data.DASHBOARD_GROWTH,
        "topProducts": data.PRODUCTS[:4],
    }


# ---------- Reports page ----------

@app.get("/api/reports")
def list_reports():
    return data.REPORTS


@app.post("/api/reports/generate")
def generate_report(product_id: str = Query("aura-pro-max")):
    product = next((p for p in data.PRODUCTS if p["id"] == product_id), None)
    name = product["name"] if product else product_id
    stats = data.PRODUCT_STATS.get(product_id, {})
    total = stats.get("total", 0)
    positive_pct = round((stats.get("positiveCount", 0) / total) * 100) if total else 0

    return {
        "title": f"SentientAI Executive Brief - {name}",
        "date": datetime.utcnow().strftime("%Y-%m-%d"),
        "summary": (
            f"AI-driven audit of {total} customer reviews for {name}. "
            f"Overall sentiment is {positive_pct}% positive."
        ),
        "bullets": [
            "Generated from live review data.",
            "Replace this stub with a call to your LLM of choice for a richer narrative.",
        ],
        "conclusion": "Recommendation: review the flagged negative feedback for common failure themes.",
    }
@app.get("/api/reports/export-csv")
def export_csv(search: str = ""):
    reviews = db_get_reviews(search) if search else get_all_reviews()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Product Name", "Source", "Review Title", "Review Body", "Rating", "Date", "Sentiment", "Sentiment Score", "Created At"])
    for r in reviews:
        writer.writerow([
            r.get("id"), r.get("product_name"), r.get("source"),
            r.get("review_title"), r.get("review_body"), r.get("review_rating"),
            r.get("review_date"), r.get("sentiment"), r.get("sentiment_score"), r.get("created_at")
        ])

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=reviews_export.csv"}
    )