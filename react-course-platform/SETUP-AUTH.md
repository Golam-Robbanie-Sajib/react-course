# Authentication setup

The platform now gates every route behind sign-in. There is one public route
(`/login`) and one OAuth code-exchange route (`/auth/callback`). All other
URLs redirect anonymous users to `/login?next=<original-path>`.

To make Google sign-in work end-to-end, three things must be configured:

## 1. Environment variables (Vercel + local `.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<the public anon key>
```

These already exist for the production deploy. No changes here.

## 2. Supabase dashboard

In your Supabase project:

1. **Authentication → URL Configuration**
   - **Site URL:** the canonical app URL, e.g. `https://react-course-sjb.vercel.app`
   - **Redirect URLs (allow list):** add every host you sign in from. At minimum:
     - `https://react-course-sjb.vercel.app/auth/callback`
     - `https://*-vercel.app/auth/callback` (Vercel preview deploys)
     - `http://localhost:3000/auth/callback` (local dev)

2. **Authentication → Providers → Google**
   - Toggle **Enable**.
   - Paste the **Client ID** and **Client Secret** from Google Cloud Console
     (see step 3).
   - Save.

> The same dashboard panel shows the Supabase **callback URL** you must paste
> into Google's "Authorized redirect URIs" — it looks like
> `https://<project-ref>.supabase.co/auth/v1/callback`. Copy that.

## 3. Google Cloud Console

1. Open https://console.cloud.google.com/ and select (or create) the project
   that owns the OAuth client.
2. **APIs & Services → OAuth consent screen**
   - User type: **External** (unless you're using Google Workspace internally).
   - App name, support email, developer contact email: fill these in.
   - On the **Scopes** step, the defaults (`openid`, `email`, `profile`) are
     enough. No extra scopes needed.
   - Publish the app (or add the user emails you want to test with under
     "Test users" while it's in testing mode).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**
   - Application type: **Web application**.
   - **Authorized JavaScript origins:**
     - `https://react-course-sjb.vercel.app`
     - `http://localhost:3000` (for local dev)
   - **Authorized redirect URIs:** the one URL from Supabase's Google
     provider panel, e.g.
     `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. Copy the generated **Client ID** and **Client Secret** and paste them
   into the Supabase Google provider panel (step 2 above).

That's it. The sign-in flow is then:

```
User clicks "Google" on /login
  → Supabase redirects to accounts.google.com
  → Google redirects back to <project-ref>.supabase.co/auth/v1/callback
  → Supabase redirects to https://<your-app>/auth/callback?code=...
  → Our /auth/callback route exchanges the code for a session cookie
  → User lands on the page they originally requested (or "/" if none)
```

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Clicking Google does nothing | Google provider is disabled in Supabase, or no Client ID/Secret saved. |
| `redirect_uri_mismatch` on Google's screen | The Supabase callback URL isn't listed under Google → Authorized redirect URIs. |
| Back at `/login?error=...` after Google | The Supabase redirect URLs allow list doesn't include `<your-app>/auth/callback`. |
| Stuck on a redirect loop after sign-in | Cookies aren't being set — check that `NEXT_PUBLIC_SUPABASE_URL` and the anon key match the project that issued the session. |
