# Admin editor (`/admin`)

`/admin` lets you edit every piece of text and every image on the site from the browser. Edits are stored in Supabase and go live as soon as you press **Save**, with no redeploy needed.

Until Supabase is connected, the site runs on the defaults in `src/content/defaultContent.js` and `/admin` shows setup instructions.

## One-time setup

1. **Create a project** at [supabase.com](https://supabase.com) (the free tier is enough).
2. **Create your login.** Go to Authentication > Users > Add user > Create new user, and enter your email and a strong password. Then, under Authentication > Sign In / Providers, turn off **Allow new users to sign up** so nobody else can create an account.
3. **Create the table and image bucket.** Open `supabase/setup.sql`, replace the three `YOUR_ADMIN_EMAIL` placeholders with the email from step 2, then paste the file into SQL Editor > New query and click **Run**.
4. **Add the keys locally.** Copy `.env.example` to `.env.local`, then fill in the Project URL and the `anon` public key from Project Settings > API.
5. **Add the keys on Vercel.** Add the same two variables under Project > Settings > Environment Variables, then redeploy once.

## Using it

- Open `yoursite.com/admin` and sign in.
- Choose a section in the sidebar and edit the fields.
- To add or replace an image, drop it onto an image box (or click the box). Uploads go to the public `media` bucket. Images over 20 MB are rejected.
- Use the arrows to reorder services, steps, projects and gallery images. The first project is shown large on the home page.
- Click **Save changes** to publish your edits, or **Discard** to throw them away. The editor warns you before you leave with unsaved changes.
- **Reset to original content** loads the built-in defaults into the editor. Nothing changes on the site until you save.

## How it works

- All site content is a single JSON document in the `site_content` table, in the row with id `main`.
- Visitors read that row through Supabase's REST API (`src/lib/supabase.js`), which keeps the main bundle small. The full Supabase client only loads on `/admin`.
- Row Level Security lets anyone read the content, but only your email can write to it or upload images.
- An image value is either a path inside `src/assets` (for the original bundled images) or a full URL (for uploads). See `resolveImage` in `src/content/assets.js`.
- When you add a new field to `defaultContent.js`, it appears automatically even if older saved content doesn't include it yet: saved sections are merged over the defaults one level deep.
