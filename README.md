# Steam Achievement Dashboard

A FastAPI web app that displays your Steam game library and achievement progress.

## Requirements

- Python 3.10+
- A [Steam API key](https://steamcommunity.com/dev/apikey)
- Your Steam ID (64-bit format)

## Setup

1. **Install dependencies**
   ```bash
   pip install fastapi uvicorn httpx jinja2 python-multipart
   ```

2. **Configure the app**
   ```bash
   cp config.template.json config.json
   ```
   Open `config.json` and fill in your values:
   ```json
   {
       "steam_api_key": "YOUR_STEAM_API_KEY",
       "steam_id": "YOUR_STEAM_ID",
       ...
   }
   ```

3. **Run the server**
   ```bash
   python main.py
   ```

4. Open your browser at `http://localhost:8000`

## Configuration

All settings live in `config.json`:

| Key | Description | Default |
|-----|-------------|---------|
| `steam_api_key` | Your Steam API key | — |
| `steam_id` | Your 64-bit Steam ID | — |
| `dashboard_game_limit` | Max games shown on dashboard | `20` |
| `server_host` | Host to bind the server to | `0.0.0.0` |
| `server_port` | Port to run the server on | `8000` |
| `badge_perfect` | Completion % for PERFECT badge | `100` |
| `badge_master_min` | Completion % for MASTER badge | `75` |
| `badge_expert_min` | Completion % for EXPERT badge | `50` |

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /dashboard` | Achievement dashboard UI |
| `GET /games` | JSON list of all owned games |
| `GET /achievements/{app_id}` | JSON achievements for a specific game |
