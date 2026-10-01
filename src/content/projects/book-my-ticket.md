# 🎬 Book My Ticket

A simplified movie seat booking platform built with **Express.js**, **PostgreSQL**, and **JWT authentication**. Built as part of the ChaiCode Web Dev Cohort 2026 Hackathon.

## ✨ Features

- **User Registration & Login** — Secure auth with bcrypt password hashing & JWT tokens
- **Protected Endpoints** — Auth middleware guards booking routes; only logged-in users can book
- **Movie Listing** — Browse available movies with seat availability counts
- **Seat Booking** — Interactive seat map with real-time visual feedback
- **Duplicate Prevention** — Database-level constraints + transactional locking (`SELECT ... FOR UPDATE`) prevent double-booking
- **User-Associated Bookings** — Every booking is tied to the authenticated user
- **Booking Management** — View and cancel your bookings
- **Backward Compatible** — All original starter code endpoints are preserved and functional

## 🛠️ Tech Stack

| Layer         | Technology            |
| ------------- | --------------------- |
| Runtime       | Node.js               |
| Framework     | Express.js 5          |
| Database      | PostgreSQL 17         |
| Auth          | JWT + bcrypt          |
| Frontend      | HTML + Tailwind CSS   |

## 📂 Project Structure

```
book-my-ticket/
├── db/
│   └── init.sql              # Database schema & seed data
├── src/
│   ├── config/
│   │   └── db.mjs            # PostgreSQL connection pool
│   ├── middleware/
│   │   └── auth.mjs          # JWT authentication middleware
│   └── routes/
│       ├── auth.mjs           # Register, Login, Profile routes
│       ├── booking.mjs        # Protected booking CRUD routes
│       └── movies.mjs         # Movie listing routes
├── index.mjs                  # Main Express server (original + new routes)
├── index.html                 # Frontend UI
├── package.json
├── .env                       # Environment variables (Add yours)
└── README.md
```

## 🚀 Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18+

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/book-my-ticket.git
cd book-my-ticket
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

Create a `.env` file in the root (or use the provided one):

```env
# Port
PORT=8080

# DB
DATABASE_URL=your_postgresql_connection_string

# JWT Config
JWT_SECRET=replace-with-a-strong-secret
```

## ☁️ Deploying to Production

Recommended production setup:

- App: Versel (Node web service)
- Database: Managed PostgreSQL (Neon DB, Aiven, Supabase, etc.)

### App Service Settings

- Build command: `npm install`
- Start command: `npm start`
- Runtime: Node.js 18+

## 🔐 Authentication Flow

```
[Register] POST /api/auth/register → Returns JWT token
     ↓
[Login]    POST /api/auth/login    → Returns JWT token
     ↓
[Use Token] Authorization: Bearer <token>
     ↓
[Access]   Protected routes (bookings) now accessible
```

### How it works:

1. **Register** with username, email, and password. Password is hashed with bcrypt (10 salt rounds).
2. **Login** with email + password. Server verifies the hash and returns a JWT (24h expiry).
3. **Protected routes** require the `Authorization: Bearer <token>` header. The auth middleware verifies the JWT and attaches user info to the request.

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint          | Description                       |
| ------ | ----------------- | --------------------------------- |
| GET    | `/`               | Serve frontend HTML               |
| GET    | `/seats`          | List all seats (original)         |
| PUT    | `/:id/:name`      | Book a seat by name (original)    |
| POST   | `/api/auth/register` | Register a new user            |
| POST   | `/api/auth/login`    | Login and get JWT token         |
| GET    | `/api/movies`        | List all movies with availability |
| GET    | `/api/movies/:id`    | Get movie details with seat map |

### Protected Endpoints (require JWT)

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/api/auth/profile`    | Get current user's profile     |
| POST   | `/api/bookings`        | Book a seat for a movie        |
| GET    | `/api/bookings`        | List current user's bookings   |
| DELETE | `/api/bookings/:id`    | Cancel a booking               |

### Example: Register

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "email": "john@example.com", "password": "pass123"}'
```

### Example: Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "pass123"}'
```

### Example: Book a Seat (Protected)

```bash
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"movieId": 1, "seatNumber": 5}'
```

## 🔒 Duplicate Booking Prevention

Duplicate bookings are prevented at two levels:

1. **Database Level** — `UNIQUE(seat_number, movie_id)` constraint on `movie_seats`
2. **Application Level** — Transactional `SELECT ... FOR UPDATE` locks the row during booking, preventing race conditions from concurrent requests

## 🧯 Troubleshooting

### `28P01: password authentication failed for user "avnadmin"`

Possible causes:

1. Wrong DB password copied from provider
2. Password parsing issue in `.env` (wrap value in quotes)
3. Wrong `DB_HOST` / `DB_PORT` / `DB_NAME` combination
4. App not restarted after `.env` change

### `42P01: relation "users" does not exist`

Cause:

- Schema not initialized in managed database.

Fix:

1. Run `db/init.sql` against the target database.
2. Verify with `SELECT to_regclass('public.users');`.

### SSL / TLS Notes

- Current DB client config supports SSL.
- For strict certificate validation in production, configure CA certificate usage in DB client configuration and set `rejectUnauthorized` appropriately.

## 📜 License

ISC License © 2026 ChaiCode Web Dev Cohort 2026
