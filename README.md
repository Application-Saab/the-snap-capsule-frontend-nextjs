This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Login (email code + Google)

"Create Capsule" and "Create Now" open a login popup (there is no `/login` page). Users sign in with a 6-digit code sent to their email, or with Google. The popup talks to this app's `/api/auth/*` routes, which forward to the Express backend and keep the session in an httpOnly `sc_session` cookie (browser JavaScript never sees the token).

Create `.env.local` with:

```
# Google OAuth Web client ID (public)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=238383179178-dn4hei0qsd1t5ge037bghbispjr0gsoj.apps.googleusercontent.com
# Where the Express backend runs (server-only)
BACKEND_URL=http://localhost:5000
```

Restart `npm run dev` after changing it. The backend (`the-snap-capsule-backend-nodejs-expressjs`) must be running; locally it prints the email code in its terminal when SMTP isn't set up. For Google, the site's address (e.g. `http://localhost:3000`) must be in the OAuth client's Authorised JavaScript origins.

## Create Event Capsule

After signing in, the same popup shows **"Let's Create Your Capsule"** with two fields: **Event Name** (2–80 characters) and **Event Date** (`YYYY-MM-DD`, from 1900 up to 5 years ahead). Already signed in users go straight to this step.

The form posts to this app's `POST /api/capsules`, which forwards to the backend with the user's session:

```
POST {BACKEND_URL}/api/capsules
Authorization: Bearer <session token>
{ "name": "Rahul's Wedding", "eventDate": "2026-12-05" }

201 { "capsule": { "id": "...", "name": "Rahul's Wedding", "eventDate": "2026-12-05" } }
400 { "message": "...", "field": "name" | "eventDate" }   ← shown under the form
401                                                          ← popup returns to login
```

Until the backend has this endpoint, the popup shows "Creating capsules isn't available yet."

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
