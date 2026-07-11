"""
Lightweight lexicon-based sentiment engine.

No heavyweight ML dependencies are required, so it installs fast and runs
anywhere. It mirrors (and improves on) the logic that used to live only in
the frontend's mock `handleAnalyze` function, but now runs server-side so
multiple clients / pages can reuse it.
"""
import re
from typing import Dict, List

POSITIVE_WORDS = {
    "incredible", "amazing", "fast", "good", "excellent", "great", "love",
    "perfect", "best", "awesome", "comfortable", "smooth", "responsive",
    "reliable", "sturdy", "beautiful", "impressive", "recommend", "happy",
    "durable", "crisp", "clear", "premium", "worth", "fantastic", "solid",
}

NEGATIVE_WORDS = {
    "delayed", "worse", "bad", "slow", "bulky", "heavy", "tight",
    "headache", "disappointed", "defect", "limited", "broken", "cheap",
    "flimsy", "laggy", "overpriced", "uncomfortable", "poor", "terrible",
    "awful", "faulty", "annoying", "difficult", "return", "refund",
}

INTENSIFIERS = {"very", "extremely", "really", "so", "incredibly", "super"}
NEGATIONS = {"not", "no", "never", "n't", "isn't", "wasn't", "doesn't", "didn't"}

TOKEN_RE = re.compile(r"[a-zA-Z']+")


def _tokenize(text: str) -> List[str]:
    return TOKEN_RE.findall(text.lower())


def analyze_text(text: str) -> Dict:
    tokens = _tokenize(text)

    pos_score = 0.0
    neg_score = 0.0
    matched_positive: List[str] = []
    matched_negative: List[str] = []

    for i, tok in enumerate(tokens):
        weight = 1.0
        # Look back up to 2 tokens for negation / intensifiers
        window = tokens[max(0, i - 2):i]
        negated = any(w in NEGATIONS for w in window)
        if any(w in INTENSIFIERS for w in window):
            weight = 1.5

        if tok in POSITIVE_WORDS:
            if negated:
                neg_score += weight
                matched_negative.append(tok)
            else:
                pos_score += weight
                matched_positive.append(tok)
        elif tok in NEGATIVE_WORDS:
            if negated:
                pos_score += weight
                matched_positive.append(tok)
            else:
                neg_score += weight
                matched_negative.append(tok)

    total = pos_score + neg_score

    if total > 0:
        positive_percent = round((pos_score / total) * 85)
        negative_percent = round((neg_score / total) * 85)
        if positive_percent + negative_percent > 100:
            diff = (positive_percent + negative_percent) - 100
            positive_percent -= diff
        neutral_percent = 100 - positive_percent - negative_percent
    else:
        positive_percent, negative_percent, neutral_percent = 60, 15, 25

    if positive_percent >= negative_percent and positive_percent >= neutral_percent:
        overall = "Positive"
    elif negative_percent >= positive_percent and negative_percent >= neutral_percent:
        overall = "Negative"
    else:
        overall = "Neutral"

    confidence = max(positive_percent, negative_percent, neutral_percent)

    return {
        "overall_sentiment": overall,
        "confidence": confidence,
        "scores": {
            "positive": positive_percent,
            "negative": negative_percent,
            "neutral": neutral_percent,
        },
        "keywords": {
            "positive": sorted(set(matched_positive)),
            "negative": sorted(set(matched_negative)),
        },
        "word_count": len(tokens),
    }
