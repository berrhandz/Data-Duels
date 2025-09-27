FastAPI wrapper for nba_api used by the Data Duels frontend

Getting started

1) Local (recommended for development)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

2) Docker

```bash
docker build -t data-duels-backend .
docker run -p 8000:8000 data-duels-backend
```

Endpoints

- GET /health -> {"status": "ok"}
- GET /api/player/{player_name} -> { player: {...}, career_stats: [...] }
- GET /api/team/{team_name}/players -> { team: {...}, players: [...] }

Notes

- This wrapper uses the `nba_api` Python package. If you meant a different `nba_stats` package, rename imports in `main.py` accordingly.
- `nba_api` may perform HTTP calls to NBA endpoints which can be slow or rate-limited. For production, consider caching and error handling.

Frontend (Vite) CORS

The server allows CORS from `http://localhost:5173` so the dev frontend can make requests to `http://localhost:8000`.
