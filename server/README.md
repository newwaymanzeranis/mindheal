# Mind Heal API (Express + Prisma)

Backend for the Bach Flower / Mind Heal project.

## Database tables

- `users` — login & admin
- `blog_category`
- `posts`
- `posts_category` (post ↔ category many-to-many)
- `emotional_tags`
- `product` (`mind_heal_no`, `emotional_tag_id` on product)
- `testimonials`
- `home_slides`

## Setup

```bash
cd server
cp .env.example .env
# Edit DATABASE_URL for your MySQL mind_heal database
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

API runs at `http://localhost:4000`

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
- `GET /api/emotional-tags`
- `GET /api/products`
- `GET /api/products/slug/:slug`
- `GET /api/testimonials`

## Admin API (Bearer + ADMIN role)

POST, PUT, DELETE on all resources above.

## Default seed admin

- Email: `admin@mindheal.com`
- Password: `admin123`

Change via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` before seeding.
