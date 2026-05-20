# Vercel deploy — data / DB fix

API ab React Router ke through chalti hai (`app/routes/api.$.jsx` + `entry.server.tsx`),  
**`api/` folder Vercel par kaam nahi karti** jab React Router deploy ho.

## Vercel → Settings → Environment Variables

**Production** (aur Preview) ke liye ye **zaroor** add karo:

| Name | Value |
|------|--------|
| `DATABASE_URL` | `mysql://u108457690_mhdb:Root%21%40%23123mhdb@194.59.164.73:3306/u108457690_mhdb` |
| `JWT_SECRET` | `mind-heal-secret-key` (ya naya strong secret) |
| `CLIENT_URL` | `https://mindheal-psi.vercel.app` |

Optional (same-origin `/api` use hota hai, usually skip):

| `VITE_API_URL` | `/api` ya `https://your-site.vercel.app/api` |

**Save → Redeploy** (purani deploy par naye env apply nahi hote).

## Check after deploy

1. Browser: `https://YOUR-SITE.vercel.app/api/health`  
   → `{"success":true,"message":"Mind Heal API is running"}`

2. `https://YOUR-SITE.vercel.app/api/home-slides`  
   → JSON with `success: true`

3. Home page par slides / products dikhne chahiye.

## Local dev (unchanged)

- `server/.env` → localhost MySQL  
- `npm run dev` (frontend) + `cd server && npm run dev` (API)

## Agar ab bhi fail ho

- Hostinger MySQL **Remote MySQL** mein Vercel / `%` host allow ho.
- Vercel **Functions** logs mein `Prisma` / `connect` error dekho.
- `CLIENT_URL` exact Vercel domain ho (https, no trailing slash).
