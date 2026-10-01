# 1M Checkboxes

A distributed real-time checkbox system inspired by the original "1 Million Checkboxes" experiment.

This project demonstrates large-scale state management, real-time communication, Redis coordination and custom rate limitin.

---

# Features

- Real-time checkbox synchronization
- WebSocket-based communication
- Redis-backed state management
- Redis Pub/Sub for multi-instance communication
- Custom rate limiting
- Horizontal scaling support

---

# Tech Stack

## Frontend

- HTML
- CSS
- JS
  
## Backend

- Node.js
- Express
- WebSockets (Socket.IO / ws)
- Redis

## Infrastructure

- Redis
- Docker
- Vercel
- Render

---

# System Architecture

```text
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
       │ WebSocket
       ▼
┌─────────────────┐
│ Express Server  │
│ + Socket Layer  │
└──────┬──────────┘
       │
       │
       ▼
┌─────────────────┐
│     Redis       │
│ Bitmap Storage  │
└──────┬──────────┘
       │
       │ Pub/Sub
       ▼
┌─────────────────┐
│ Other Instances │
└─────────────────┘
```

---

# Problem Statement

The application manages a very large number of checkboxes while keeping all connected users synchronized in real time.

Challenges include:

- Efficient storage
- Real-time updates
- High-frequency events
- Multi-server coordination
- Authentication
- Rate limiting
- Browser performance

---

# Redis Pub/Sub

The application supports multiple backend instances.

When a checkbox is updated:

1. State is updated in Redis.
2. Update is published to Redis Pub/Sub.
3. All backend instances receive the update.
4. Each instance broadcasts to its connected clients.

---

# Scalability Considerations

The backend is stateless.

State is stored in Redis which allows:

- Horizontal scaling
- Multiple instances
- Load balancing
- Shared state

---

# Project Structure

```text
1M-Checkboxes/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── redis/
│   │   ├── socket/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── package.json
│
├── docs/
├── docker-compose.yml
├── .env.example
└── README.md
```

---



---

# Future Improvements

- Region-based loading
- Presence indicators
- Cursor tracking
- Batch updates
- CRDT-based synchronization
- Redis Cluster
- Kubernetes deployment
- Metrics and observability
- Distributed tracing
