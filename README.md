# Server Load Test API

Node.js Express server with CPU monitoring and zero-downtime restarts.

## Quick Start

```bash
npm install
npm start
```

## API Documentation

- **Swagger UI**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health

## Endpoints

### Health Check

```http
GET /health
```

### Create Message

```http
POST /api/message/createMessage
```

```json
{
  "message": "Hello World",
  "day": "Monday",
  "time": "14:30"
}
```

## PM2 Commands

```bash
npm start          # Start
npm run stop       # Stop
npm run restart    # Restart
npm run reload     # Zero-downtime
npm run status     # Status
npm run logs       # Logs
```

## Load Test

```bash
npm run load-test
```
