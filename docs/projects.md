# Portfolio Projects

Projects live in the `projects` array of the content, which you can edit at `/admin` or in `src/content/defaultContent.js`. Each one gets a card on the home page and a case study at `/projects/<slug>`, both rendered by `pages/ProjectPage.jsx` and `components/ProjectCard.jsx`.

| Project | Slug | Bundled images |
| --- | --- | --- |
| Spotify Desktop Reimagined | `spotify` | `src/assets/spotify/` + `spotify-cover.png` |
| GlowNest Interior Website | `glownest` | `src/assets/glownest/` + `glownest-cover.png` |
| LifeLane | `lifelane` | `src/assets/lifelane/` + `lifelane-cover.png` |

Each project has a `cover` (used on the card and as the case-study hero, cropped to 16:9) and a `gallery` of `{ src, alt }` images shown in order below it. The case study ends with a link to the next project.
