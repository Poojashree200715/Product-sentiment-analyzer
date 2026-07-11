"""
In-memory seed data. Shapes match the mock objects already used in the
frontend (ProductSearch.jsx, Dashboard.jsx, CustomerReviews.jsx, Reports.jsx)
so wiring the frontend to this API is a drop-in replacement for the mocks.

Swap this module for a real database layer (Postgres, Mongo, etc.) later
without changing the route signatures in main.py.
"""

PRODUCTS = [
    {
        "id": "aura-pro-max",
        "name": "Aura Pro Max Headphones",
        "category": "Audio",
        "platform": "Amazon",
        "rating": 4.9,
        "reviews": 15400,
        "positive": 92,
        "price": "$549.00",
        "badge": "92% Positive",
        "badgeType": "positive",
        "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600",
    },
    {
        "id": "sonicpro-x10",
        "name": "SonicPro X10 Wireless",
        "category": "Audio",
        "platform": "Amazon",
        "rating": 4.0,
        "reviews": 12400,
        "positive": 94,
        "price": "$249.00",
        "badge": "94% Positive",
        "badgeType": "positive",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
    },
    {
        "id": "zenith-series-7",
        "name": "Zenith Series 7 Watch",
        "category": "Wearables",
        "platform": "Flipkart",
        "rating": 4.3,
        "reviews": 5800,
        "positive": 78,
        "price": "$399.00",
        "badge": "78% Positive",
        "badgeType": "positive",
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
    },
    {
        "id": "aeroblade-g15",
        "name": "AeroBlade G15 Laptop",
        "category": "Computers",
        "platform": "Amazon",
        "rating": 4.5,
        "reviews": 9000,
        "positive": 88,
        "price": "$1,299.00",
        "badge": "88% Positive",
        "badgeType": "positive",
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600",
    },
    {
        "id": "ergovision-elite",
        "name": "ErgoVision Elite Chair",
        "category": "Furniture",
        "platform": "Flipkart",
        "rating": 4.6,
        "reviews": 2600,
        "positive": 90,
        "price": "$699.00",
        "badge": "90% Positive",
        "badgeType": "positive",
        "image": "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=600",
    },
    {
        "id": "zenith-watch-s3",
        "name": "Zenith Watch S3",
        "category": "Wearables",
        "platform": "Amazon",
        "rating": 3.6,
        "reviews": 2900,
        "positive": 45,
        "price": "$199.00",
        "badge": "45% Positive",
        "badgeType": "negative",
        "image": "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&q=80&w=600",
    },
]

# id -> aggregate counts, used by ProductDetails / CustomerReviews
PRODUCT_STATS = {
    "aura-pro-max": {"positiveCount": 842, "negativeCount": 156, "neutralCount": 250, "total": 1248},
    "sonicpro-x10": {"positiveCount": 420, "negativeCount": 40, "neutralCount": 80, "total": 540},
    "zenith-series-7": {"positiveCount": 380, "negativeCount": 90, "neutralCount": 110, "total": 580},
    "aeroblade-g15": {"positiveCount": 610, "negativeCount": 110, "neutralCount": 180, "total": 900},
    "ergovision-elite": {"positiveCount": 190, "negativeCount": 25, "neutralCount": 45, "total": 260},
    "zenith-watch-s3": {"positiveCount": 110, "negativeCount": 95, "neutralCount": 85, "total": 290},
}

REVIEWS = {
    "aura-pro-max": [
        {
            "id": 1,
            "author": "Alexandra Vance",
            "rating": 5,
            "sentiment": "Positive",
            "date": "2026-06-28",
            "text": (
                "The soundstage is extremely wide, and the active noise "
                "canceling is pristine. Best audio purchase I have made in "
                "years. Battery easily lasts 30+ hours on a single charge."
            ),
            "tags": ["Audio Quality", "Active Noise Canceling", "Battery Life"],
            "verified": True,
            "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        },
        {
            "id": 2,
            "author": "Marcus Chen",
            "rating": 2,
            "sentiment": "Negative",
            "date": "2026-06-20",
            "text": (
                "Clamp force is way too tight and the headband gave me a "
                "headache after an hour. Sound is good but comfort is a "
                "dealbreaker for me."
            ),
            "tags": ["Comfort", "Fit"],
            "verified": True,
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        },
    ],
}

DASHBOARD_SENTIMENT_SPLIT = [
    {"name": "Positive", "value": 68, "color": "#006e4b"},
    {"name": "Neutral", "value": 20, "color": "#777587"},
    {"name": "Negative", "value": 12, "color": "#ba1a1a"},
]

DASHBOARD_GROWTH = [
    {"name": "Week 1", "volume": 100},
    {"name": "Week 2", "volume": 180},
    {"name": "Week 3", "volume": 140},
    {"name": "Week 4", "volume": 290},
    {"name": "Week 5", "volume": 220},
    {"name": "Week 6", "volume": 420},
]

REPORTS = [
    {"id": 1, "name": "Aura Pro Max Q2 Sentiment Audit", "date": "2026-06-28", "type": "PDF Report", "size": "2.4 MB", "status": "Completed"},
    {"id": 2, "name": "SonicPro X10 Performance Summary", "date": "2026-06-24", "type": "CSV Sheet", "size": "420 KB", "status": "Completed"},
    {"id": 3, "name": "Flipkart Competitor Analysis Matrix", "date": "2026-06-15", "type": "Excel Sheet", "size": "1.2 MB", "status": "Completed"},
    {"id": 4, "name": "Wearables Segment Quarterly Report", "date": "2026-06-01", "type": "PDF Report", "size": "8.7 MB", "status": "Archive"},
]
