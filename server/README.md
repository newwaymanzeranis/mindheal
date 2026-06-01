# Mind Heal API (Express + Prisma)

Backend for the Bach Flower / Mind Heal project.

## Database tables

- `users` — login & admin
- `blog_category`
- `posts`
- `posts_category` (post ↔ category many-to-many)
- `product` (`mind_heal_no`, `short_description`, `emotional_tags` comma-separated text on product)
- `testimonials`
- `home_slides`

## Setup

```bash
cd server
cp .env.example .env
# .env = localhost MySQL for local dev (do not change for day-to-day dev)
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

API runs at `http://localhost:4000`

## Production DB (remote MySQL)

Local `.env` stays on **localhost**. Production uses `server/.env.production` (gitignored).

```bash
# Run API against remote DB (same credentials as Vercel API env)
npm run dev:remote
# or
npm run start:production
```

### Vercel / hosted API environment variables

Set on the **API** deployment (not only the frontend):

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | `mysql://u108457690_mhdb:Root%21%40%23123mhdb@194.59.164.73:3306/u108457690_mhdb` |
| `CLIENT_URL` | Your Vercel site URL |
| `JWT_SECRET` | Same as local or a new production secret |

Password in URL must be encoded: `Root!@#123mhdb` → `Root%21%40%23123mhdb`

Remote DB already has tables (`users`, `product`, `posts`, etc.).

## Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register (first user = ADMIN) |
| POST | `/api/auth/login` | Login → JWT token |
| GET | `/api/auth/me` | Current user (Bearer token) |

### Login example

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mindheal.com","password":"admin123"}'
```

Use header: `Authorization: Bearer <token>` for admin routes.

## Public API (no auth)

- `GET /api/blog-categories`
- `GET /api/posts?published=true`
- `GET /api/posts/slug/:slug`
- `GET /api/products` (optional filter: `?tag=anxiety` searches `emotional_tags` text)
- `GET /api/products/slug/:slug`
- `GET /api/testimonials`

## Admin API (Bearer + ADMIN role)

POST, PUT, DELETE on all resources above.

## Default seed admin

- Email: `admin@mindheal.com`
- Password: `admin123`

Change via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` before seeding.
