# example-microservice

A containerized microservice demo with a Node.js API gateway, Python backend services, and a jQuery frontend built with Webpack. All services run via Docker Compose with live code reloading via volume mounts.

## Architecture

| Service | Language | Internal Port | Host Port |
|---------|----------|--------------|-----------|
| FrontendApplication | Nginx (static HTML/JS) | 80 | 8000 |
| ApiGateway | Node.js (Express) | 3030 | 3030 |
| ServiceQuote | Python (Flask) | 5000 | — |
| ServiceTest | Python (Flask) | 5001 | — |
| ServiceNews | Python (Flask) | 5002 | — |

Backend services are only accessible internally (via Docker hostnames: `servicequote`, `servicetest`, `servicenews`). All external traffic goes through the API gateway.

## Running the App

```bash
docker compose up
```

- Frontend UI: http://localhost:8000
- API gateway: http://localhost:3030

For a full clean rebuild (removes all images/containers, rebuilds frontend dist, restarts):

```bash
export API_GATEWAY=http://localhost:3030
./go.sh
```

## Frontend Build

The frontend must be built before Docker can serve it — the Nginx container mounts `dist/` directly.

```bash
cd FrontendApplication
npm install
export API_GATEWAY=http://localhost:3030  # required — omitting this breaks API calls
npm run build                              # outputs to dist/
```

Webpack entry: `src/script.js` → output: `dist/main.js` + `dist/index.html`.

## API Gateway Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/status` | Health check |
| GET | `/api/randomquote` | Proxies to ServiceQuote |
| GET | `/api/test` | Proxies to ServiceTest |
| GET | `/api/news` | Proxies to ServiceNews |

## Live Code Reloading

Docker Compose mounts source files as volumes, so changes to Python and JS files take effect on reload without rebuilding images. Rebuild images only when dependencies change (requirements.txt, package.json).

## Port Notes

Chrome blocks port 6000 (reserved for X11). Use port 3030 or another non-blocked port for the API gateway.
