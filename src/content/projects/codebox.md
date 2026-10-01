# CodeBox | ChaiCode

**A blazing-fast, Judge0-compatible code execution engine built for the ChaiCode platform.**

> Part of the [ChaiCode](https://chaicode.com) ecosystem - Home for Programmers

---

## What is CodeBox?

CodeBox is a self-hosted code execution service that powers the coding challenges and practice problems on ChaiCode. It securely runs user-submitted code in isolated environments and returns the results - just like LeetCode or HackerRank.

### Key Features

- **Judge0 API Compatible** - Drop-in replacement, works with existing integrations
- **Dual Execution Engines** - Firecracker microVMs (125ms) or Docker containers (500ms)
- **Auto-Detection** - Automatically picks the fastest available executor
- **5 Languages** - Python, JavaScript, C, C++, Java (easily extensible)
- **Batch Submissions** - Run multiple test cases in one request
- **Production Ready** - Redis queue, Prometheus metrics, auto-SSL with Caddy

---

## How It Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   ChaiCode   │────▶│   CodeBox    │────▶│    Redis     │────▶│   Workers    │
│   Frontend   │     │     API      │     │    Queue     │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────┬───────┘
                                                                      │
                                                    ┌─────────────────┴─────────────────┐
                                                    │                                   │
                                             ┌──────▼──────┐                    ┌───────▼──────┐
                                             │ Firecracker │                    │    Docker    │
                                             │  (microVM)  │        OR          │  (container) │
                                             └──────┬──────┘                    └───────┬──────┘
                                                    │                                   │
                                                    └─────────────┬─────────────────────┘
                                                                  │
                                                    ┌─────────────▼─────────────┐
                                                    │  Sandboxed Code Execution │
                                                    │  (isolated, time-limited) │
                                                    └───────────────────────────┘
```

---

## Local Development

### Prerequisites

- Docker Desktop
- Node.js 20+

### Quick Start

```bash
# Clone the repo
git clone https://github.com/chaicode/codebox.git
cd codebox

# Install dependencies
npm install

# Build language runtime images
./scripts/build-images.sh

# Start services (API + Worker + Redis)
docker-compose up -d

# Verify it's running
curl http://localhost:3000/health
```

### Test Code Execution

```bash
# Run Python code
curl -X POST "http://localhost:3000/submissions?wait=true" \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: dev-token" \
  -d '{"source_code": "print(\"Chai aur Code!\")", "language_id": 71}'
```

---

## Production Deployment (DigitalOcean)

### Recommended Droplet Size

| Load | Droplet | Specs | Cost |
|------|---------|-------|------|
| **Light** (< 100 submissions/hr) | Basic | 2 vCPU, 4GB RAM | $24/mo |
| **Medium** (< 1000 submissions/hr) | General Purpose | 4 vCPU, 8GB RAM | $48/mo |
| **Heavy** (> 1000 submissions/hr) | CPU-Optimized | 8 vCPU, 16GB RAM | $96/mo |

> **Tip:** Start with 4GB RAM. The worker concurrency can be tuned via `WORKER_CONCURRENCY` env variable. For Firecracker support, choose a droplet with dedicated vCPU (not shared).

### One-Command Setup

```bash
# SSH into your droplet
ssh root@your-droplet-ip

# Clone and setup
git clone https://github.com/chaicode/codebox.git /opt/codebox
cd /opt/codebox

# Run setup with your domain
./scripts/setup-production.sh api.yourdomain.com
```

The script automatically:
1. Installs Docker & dependencies
2. Configures firewall (ports 22, 80, 443)
3. Detects Firecracker support (uses it if available)
4. Generates secure API tokens
5. Sets up Caddy with auto-SSL
6. Builds and starts all services

### After Setup

```
========================================
  Setup Complete!
========================================

Domain:        https://api.yourdomain.com
API Token:     <your-secure-token>
Grafana Pass:  <your-grafana-password>

Test: curl https://api.yourdomain.com/health
```

---

## Production Hardening (Optional)

Secure your droplet before deploying. Run these commands as `root`.

### 1. Create Deploy User

```bash
# Create user with sudo access
adduser deploy
usermod -aG sudo deploy
usermod -aG docker deploy

# Copy SSH keys to new user
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

### 2. Disable Root & Password Login

```bash
# Edit SSH config
nano /etc/ssh/sshd_config
```

Update these lines:
```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

```bash
# Restart SSH
systemctl restart sshd
```

> **Warning:** Make sure you can login as `deploy` user before disabling root!

### 3. Configure Firewall

```bash
# Allow only essential ports
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

### 4. Enable Automatic Security Updates

```bash
apt install unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

### 5. Install Fail2Ban (Block Brute Force)

```bash
apt install fail2ban
systemctl enable fail2ban
systemctl start fail2ban
```

### 6. Run Setup as Deploy User

```bash
# Login as deploy user
ssh deploy@your-droplet-ip

# Clone and setup
sudo git clone https://github.com/chaicode/codebox.git /opt/codebox
sudo chown -R deploy:deploy /opt/codebox
cd /opt/codebox

# Run production setup
./scripts/setup-production.sh api.yourdomain.com
```

### Quick Security Checklist

- [ ] Non-root user created (`deploy`)
- [ ] SSH key authentication only
- [ ] Root login disabled
- [ ] Password login disabled
- [ ] Firewall enabled (UFW)
- [ ] Fail2Ban installed
- [ ] Auto-updates enabled

---

## API Reference

### Submissions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/submissions` | Create submission (async) |
| `POST` | `/submissions?wait=true` | Create and wait for result |
| `GET` | `/submissions/:token` | Get result by token |
| `POST` | `/submissions/batch` | Submit multiple (up to 20) |
| `GET` | `/submissions/batch?tokens=a,b,c` | Get multiple results |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/languages` | List supported languages |
| `GET` | `/statuses` | List status codes |
| `GET` | `/executor` | Show executor info |
| `GET` | `/metrics` | Prometheus metrics |

---

## Supported Languages

| ID | Language | Image |
|----|----------|-------|
| 50 | C (GCC 9) | `codebox/gcc:9` |
| 54 | C++ (GCC 9) | `codebox/gcc:9` |
| 62 | Java (OpenJDK 17) | `codebox/java:17` |
| 63 | JavaScript (Node 18) | `codebox/node:18` |
| 71 | Python (3.8) | `codebox/python:3.8` |

---

## Status Codes

| ID | Description |
|----|-------------|
| 1 | In Queue |
| 2 | Processing |
| 3 | Accepted |
| 4 | Wrong Answer |
| 5 | Time Limit Exceeded |
| 6 | Compilation Error |
| 7-12 | Runtime Errors |
| 13 | Internal Error |

---

## Important URLs

### Local Development

| Service | URL |
|---------|-----|
| API | http://localhost:3000 |
| Health Check | http://localhost:3000/health |
| Metrics | http://localhost:3000/metrics |

### Production

| Service | URL |
|---------|-----|
| API | https://your-domain.com |
| Prometheus | http://localhost:9090 (SSH tunnel) |
| Grafana | http://localhost:3001 (SSH tunnel) |

**Access Grafana via SSH tunnel:**
```bash
ssh -L 3001:localhost:3001 user@your-server
# Then open http://localhost:3001
```

---

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTH_TOKEN` | - | API authentication token |
| `EXECUTOR_TYPE` | `auto` | `auto`, `docker`, or `firecracker` |
| `WORKER_CONCURRENCY` | `4` | Parallel workers |
| `DEFAULT_CPU_TIME_LIMIT` | `5` | Seconds |
| `DEFAULT_MEMORY_LIMIT` | `128000` | KB |

See `.env.example` for all options.

---

## Security

- **Sandboxed Execution** - Each submission runs in isolation
- **Network Disabled** - No internet access from user code
- **Resource Limits** - CPU, memory, and process limits
- **Time Limits** - Prevents infinite loops
- **Non-root** - Code runs as unprivileged user

---

## Project Structure

```
codebox/
├── src/
│   ├── api/           # Express routes & middleware
│   ├── executor/      # Docker & Firecracker executors
│   ├── queue/         # BullMQ job processing
│   ├── languages/     # Language configurations
│   └── utils/         # Config, logger, helpers
├── docker/
│   └── images/        # Language runtime Dockerfiles
├── scripts/
│   ├── setup.sh                # Local setup
│   ├── setup-production.sh     # Production setup
│   └── build-images.sh         # Build Docker images
├── docker-compose.yml          # Local development
├── docker-compose.prod.yml     # Production with Caddy
└── Caddyfile                   # Auto-SSL config
```

---

## Postman Collections

Import these into Postman for testing:

- `postman_collection.json` - Basic API tests
- `postman_leetcode_tests.json` - LeetCode-style test cases

---

## Contributing

We welcome contributions! Please check out the [ChaiCode GitHub](https://github.com/chaicode) for guidelines.

---

## License

MIT

---

<p align="center">
  <b>Built with ☕ by <a href="https://chaicode.com">ChaiCode</a></b><br>
  <i>Home for Programmers</i>
</p>
