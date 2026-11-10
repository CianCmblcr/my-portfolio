# Architecture

## Runtime flow

`src/main.jsx` wraps the app in `ContentProvider` and `BrowserRouter`.

| Path | Component | Purpose |
| --- | --- | --- |
| `/` | `App` | Home page: hero, about, services, process, work, contact |
| `/projects/:slug` | `pages/ProjectPage` | Case study for the project with that slug |
| `/admin` | `admin/AdminPage` (lazy-loaded) | Content editor, see [admin.md](admin.md) |
| `*` | `pages/NotFound` | 404 |

`GlobalEffects` is the layout for the public routes. It waits for saved content to load, handles scrolling (hash links, back/forward restore, scroll to top on new pages), and renders the ambient sage background. `vercel.json` rewrites every path to `index.html` so deep links work.

## Content

- `content/defaultContent.js`: every text and image on the site.
- `content/ContentProvider.jsx`: loads saved edits from Supabase (cached in `localStorage`) and merges them over the defaults. Use `useContent()` to read them.
- `content/assets.js`: maps bundled image names to their built URLs.

## Motion

Everything uses one ease-out curve (`--ease`). `components/Reveal.jsx` adds `is-in` when an element scrolls into view, and `motion.css` defines one transition per variant:

| Section | Variant | Effect |
| --- | --- | --- |
| Hero | `RiseText` (`rise--auto`) | Characters rise out of a mask on load |
| About | `curtain` | Sage, then black, panels swipe up |
| Services | `tilt` | Cards fan up from a 3D tilt |
| Process | `draw` | Line draws across; steps light up in turn |
| Work | `ProjectSpread` | Cards deal out of a deck into a fan (5 on desktop, 3 on phones). Extra projects wait as faint cards behind the fan; arrows, swipes, horizontal trackpad scrolls and arrow keys cycle the deck |
| Case study images | `wipe` | Images open out from their center |
| Contact | `useScrollProgress` | Panel zooms to full-bleed black as you scroll |
| Footer | `RiseText` + `FitText` | Full-width name rises into place |

Page transitions use the View Transitions API: the cover image shares a `view-transition-name` (`lib/transitions.js`), so it morphs between the project card and the case study hero. Browsers without support get a simple fade instead. All motion respects `prefers-reduced-motion`.

## Styling

- `index.css`: tokens (white, ink, sage, shadows), the Satoshi `@font-face` rules, and component styles. Use shadows for depth, never borders. Frosted glass is the `.glass` class.
- `motion.css`: keyframes, reveal variants and view-transition rules.
- `admin/admin.css`: editor-only styles, loaded with the admin chunk.
- Tailwind is imported for its reset (preflight).
