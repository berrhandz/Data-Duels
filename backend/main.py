from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI()

# Allow Vite dev server and localhost
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PlayerQuery(BaseModel):
    name: str


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/player/{player_name}")
async def get_player(player_name: str):
    """
    Fetch basic player info and recent stats for `player_name`.
    This wrapper uses `nba_api` if available. If the environment doesn't
    have network access to the official NBA endpoints, the endpoint will
    return an informative error.
    """
    try:
        # lazy import so frontend can run without python deps
        from nba_api.stats.static import players
        from nba_api.stats.endpoints import playercareerstats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"nba_api import error: {e}")

    matches = players.find_players_by_full_name(player_name)
    if not matches:
        raise HTTPException(status_code=404, detail="player not found")

    player = matches[0]
    player_id = player.get('id')

    try:
        career = playercareerstats.PlayerCareerStats(player_id=player_id)
        df = career.get_data_frames()[0]
        # convert to list of dicts (JSON serializable)
        stats = df.fillna(0).to_dict(orient='records')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"error fetching career stats: {e}")

    return {"player": player, "career_stats": stats}


@app.get("/api/team/{team_name}/players")
async def get_team_players(team_name: str):
    try:
        from nba_api.stats.static import teams as teams_mod
        from nba_api.stats.static import players as players_mod
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"nba_api import error: {e}")

    all_teams = teams_mod.get_teams()
    team = next((t for t in all_teams if t['full_name'].lower() == team_name.lower() or t['abbreviation'].lower() == team_name.lower()), None)
    if not team:
        # try by partial match
        team = next((t for t in all_teams if team_name.lower() in t['full_name'].lower()), None)
    if not team:
        raise HTTPException(status_code=404, detail="team not found")

    # This static mapping in nba_api doesn't include roster. We'll return players by team id by filtering players
    all_players = players_mod.get_players()
    team_players = [p for p in all_players if p.get('team_id') == team.get('id')]

    # Fallback: if team_id isn't present in player records, return empty list but still a 200
    return {"team": team, "players": team_players}
