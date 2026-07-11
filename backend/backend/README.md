# Product Sentiment Analyzer — Backend

A FastAPI backend built to match your React frontend
(`Poojashree200715/Product-sentiment-analyzer`), which currently uses hardcoded
mock data in `AISentimentAnalyzer.jsx`, `ProductSearch.jsx`, `Dashboard.jsx`,
`CustomerReviews.jsx`, and `Reports.jsx`. This API provides real endpoints
with the same data shapes so you can swap out the mocks.

## Endpoints

| Method | Path                                | Used by                     |
|--------|--------------------------------------|------------------------------|
| GET    | `/api/health`                        | sanity check                 |
| POST   | `/api/analyze`                       | AISentimentAnalyzer.jsx      |
| GET    | `/api/products?q=&platform=&min_rating=` | ProductSearch.jsx        |
| GET    | `/api/products/{id}`                 | ProductDetails.jsx           |
| GET    | `/api/products/{id}/reviews?sentiment=` | CustomerReviews.jsx       |
| POST   | `/api/products/{id}/reviews`         | submit a new review          |
| GET    | `/api/dashboard`                     | Dashboard.jsx                |
| GET    | `/api/reports`                       | Reports.jsx                  |
| POST   | `/api/reports/generate?product_id=`  | Reports.jsx "Generate" button|

Interactive docs are auto-generated at `http://127.0.0.1:8000/docs`.

## Run it in VS Code

1. **Open the folder.** In VS Code: `File → Open Folder…` and select this
   `backend` folder (keep it as a sibling folder next to your frontend repo,
   or put it inside the frontend repo — either works).

2. **Install the Python extension** (if you don't have it): open the
   Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`) and install
   **Python** (by Microsoft).

3. **Create a virtual environment** (recommended). Open a terminal in VS Code
   (`` Ctrl+` ``) and run:

   ```bash
   python3 -m venv .venv
   ```

   VS Code will usually pop up a prompt: *"Select this environment for the
   workspace?"* — click **Yes**. If it doesn't ask, press `Ctrl+Shift+P` →
   type **Python: Select Interpreter** → choose the one at `.venv`.

4. **Activate the environment and install dependencies:**

   - macOS / Linux:
     ```bash
     source .venv/bin/activate
     pip install -r requirements.txt
     ```
   - Windows (PowerShell):
     ```powershell
     .venv\Scripts\Activate.ps1
     pip install -r requirements.txt
     ```

5. **Run the server:**

   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

   You should see `Uvicorn running on http://127.0.0.1:8000`. The `--reload`
   flag restarts the server automatically whenever you save a file.

6. **Verify it's working:** open `http://127.0.0.1:8000/docs` in your
   browser — you'll get an interactive Swagger UI to try every endpoint.

   (Optional) You can also just press **F5** in VS Code with the Python
   extension installed, using this `.vscode/launch.json`, already included:
   it launches uvicorn directly under the debugger so you can set breakpoints.

## Connect the React frontend

CORS is already enabled for `http://localhost:5173` (Vite's default dev
port). In your frontend, create a small API client, e.g. `src/api.js`:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export default api;
```

Then in `AISentimentAnalyzer.jsx`, replace the mock `handleAnalyze` timeout
logic with:

```js
import api from '../api';

const handleAnalyze = async () => {
  setIsAnalyzing(true);
  setAnalyzed(false);
  const { data } = await api.post('/analyze', { text: inputText });
  setResults(data);
  setAnalyzed(true);
  setIsAnalyzing(false);
};
```

Do the same pattern for `ProductSearch.jsx` (`api.get('/products', { params: { q, platform, min_rating: minRating } })`),
`Dashboard.jsx` (`api.get('/dashboard')`), `CustomerReviews.jsx`
(`api.get(/products/${productId}/reviews)`), and `Reports.jsx`
(`api.get('/reports')` / `api.post('/reports/generate', null, { params: { product_id } })`).

## Run frontend + backend together

Terminal 1 (backend):
```bash
cd backend
source .venv/bin/activate   # Windows: .venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

Terminal 2 (frontend, inside your React repo):
```bash
npm install
npm run dev
```

Visit the frontend at `http://localhost:5173` — it will call the backend at
`http://127.0.0.1:8000`.

## Project structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py        # FastAPI app + routes
│   ├── sentiment.py   # lexicon-based sentiment engine
│   └── data.py         # in-memory seed data (swap for a real DB later)
├── requirements.txt
└── README.md
```
