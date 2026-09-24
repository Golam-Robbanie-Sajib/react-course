# Database setup — per-course progress

The platform now has three courses (HTML, C, React). Per-course progress is
stored in a `course_progress` JSON column on `public.profiles`.

**Until you run the migration below**, the app keeps working but:

- React progress is saved in the old columns (as before).
- HTML and C progress is saved **only on the learner's device**, and the
  dashboard shows a notice saying so.

After the migration, everything syncs to the learner's account, and any
progress already saved on a device is merged in automatically the next time
they open the site signed in.

## Run the migration (one time, ~1 minute)

1. Open your Supabase project → **SQL Editor** → **New query**.
2. Paste the contents of
   [`supabase/migrations/20260924000000_course_progress.sql`](supabase/migrations/20260924000000_course_progress.sql).
3. Click **Run**.

It is safe to run more than once. It adds the column and copies each
learner's existing React progress into it, so nothing is lost.

No environment variables or redeploys are needed — the app detects the new
column automatically.

## Verifying the C exercises

C exercises are graded by running the learner's program in the browser and
comparing its output. To confirm every test is correct (each reference
solution passes, and no untouched starter does):

```bash
pnpm verify:c
```
