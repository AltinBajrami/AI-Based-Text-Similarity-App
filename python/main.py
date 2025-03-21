from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import numpy as np
import logging

logging.basicConfig(
    level=logging.INFO,  # Show INFO, WARNING, ERROR logs
    format="%(asctime)s - %(levelname)s - %(message)s",
    force=True  # Force reconfiguration (important if logs are not showing)
)

logging.info("FastAPI server is starting...")

app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")

class TextPair(BaseModel):
    text1: str
    text2: str

@app.post("/compute-embeddings")
def compute_similarity(text_pair: TextPair):
    logging.info(f"Data: {text_pair.text1} | {text_pair.text2}")
    emb1 = model.encode(text_pair.text1)
    emb2 = model.encode(text_pair.text2)
    similarity = np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))
    # similarity = 3
    similarity = float(similarity) * 100
    logging.info(f"similarity: {similarity}")
    return {"similarityScore": similarity}
