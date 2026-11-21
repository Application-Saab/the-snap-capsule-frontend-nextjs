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

1. The user clicks **Create Capsule** (or **Create Now**) and signs in in the popup, if they aren't already.
2. The popup shows **"Let's Create Your Capsule"**: **Event Name** (2–80 characters) and **Event Date** (`YYYY-MM-DD`).
3. **Create Event Capsule** posts to this app's `POST /api/capsules`. That route adds the signed-in user's id and calls the backend:

```
POST {BACKEND_URL}/api/internal/create-event-capsule
Authorization: Bearer <session token>
{ "eventName": "Rahul's Wedding", "eventDate": "2026-12-05", "customerId": "<signed-in user's id>" }

→ 201 { "error": false, "data": { "folderId", "eventName", "eventDate", "shortCode", "status", "webLink" } }
```

4. On success the user is taken to **`/weblink-gallery?galleryId=<folderId>`**, the page the backend's `webLink` points to. It loads the capsule from `GET {BACKEND_URL}/api/internal/event-capsule/<galleryId>` and shows the event name, date, actions and the photo area.

`/weblink-gallery` is for the signed-in owner for now: signed-out visitors go to the home page, and other users' capsules show 404. Photo uploads, albums, sharing and QR show "coming soon".

## Languages, prices and dates

A **language / region dropdown with flags** in the header (landing page and capsule page). The choice changes three things:

1. **Text:** the whole page, including popups opened later, is translated with Google's website translator. Nothing is hard-coded per language, so new content is translated automatically.
2. **Prices:** plans show the region's currency (prices per currency in `PLANS[].prices`, `components/landing/data.js`).
3. **Dates:** shown in the language's format, e.g. 5 December 2026 / December 5, 2026 / 5. Dezember 2026 / 2026年12月5日.

| Region | Entry | Currency | Date example |
|---|---|---|---|
| Asia | English (India) **(default)**, हिन्दी | INR ₹199/- | 5 December 2026 |
| Asia | 中文, 日本語, 한국어, ไทย, Bahasa Indonesia, Bahasa Melayu | CNY, JPY, KRW, THB, IDR, MYR | 2026年12月5日 … |
| USA | English (US), Español (EE. UU.) | USD $2.49 | December 5, 2026 |
| Europe | Français, Deutsch, Italiano, Português | EUR 1,99 € | 5. Dezember 2026 |
| Saudi Arabia | العربية (right-to-left) | SAR | Gregorian calendar |

- The choice is saved in the `sc_lang` cookie, plus Google's `googtrans` cookie (`/en/<code>`) for translated languages. It's kept across pages and visits.
- Google's script loads only for translated languages. English (India) ↔ English (US) switches prices/dates without reloading; going back to English from a translated language reloads the original text.
- Pages are rendered with the default (₹, English) on the server, and the saved choice is applied right after loading.
- Prices and dates are marked `notranslate`, so Google doesn't change them. Use `className="notranslate"` (or `translate="no"`) for anything else that must not be translated.
- **To add a language:** add an entry to `LANGUAGES` in `lib/translate.js` (id, label, region, `country` for the flag, Google `translate` code, `locale`, `currency`). Copy its flag SVG into `public/flags/`, and add the currency to each plan's `prices`.
- Text typed into form fields and placeholders isn't translated; machine translations can be imperfect.
- **TODO (pricing):** prices other than INR are placeholders, roughly the INR price rounded. Set the real prices before launch.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
