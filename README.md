# Mind Heal (Bach Flower)

React Router v7 full-stack app with file-based routing, SSR, and Vite.

- [React Router docs](https://reactrouter.com)

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm start
```

Deploy the `build/server` and `build/client` output directories.

### Vercel + separate API (`server/`)

The frontend SSR calls the Express API during page load. On Vercel there is **no** API on `localhost:4000`.

1. Deploy `server/` somewhere public (Railway, Render, VPS, etc.) with MySQL and `DATABASE_URL`.
2. On the API host, set `CLIENT_URL` to your Vercel site (e.g. `https://your-app.vercel.app`).
3. In **Vercel → Project → Settings → Environment Variables**, add:

   | Variable | Example |
   |----------|---------|
   | `VITE_API_URL` | `https://api.your-domain.com/api` |
   | `API_INTERNAL_URL` | `https://api.your-domain.com/api` |

   Use the same value for both. The name must be `VITE_API_URL` (not `VITE_API_BASE_URL` alone unless you set both).

4. Redeploy after saving env vars.

**Alternative:** proxy `/api` on Vercel to your backend with `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://YOUR_API_HOST/api/:path*" }
  ]
}
```

Then you can omit `API_INTERNAL_URL`; SSR will call `https://your-vercel-site/api/...` via the rewrite.

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/healing_stories` | Healing Stories |
| `/buy_mh_mix` | Buy MH Mix |
| `/blog` | Blog |
| `/contact` | Contact |
