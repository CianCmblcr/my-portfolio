# Development

## Prerequisites

- Node.js and npm
- A modern browser with support for `IntersectionObserver`

## Install dependencies

From the repository root:

```bash
npm install
```

## Run locally

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

Vite prints the local URL in the terminal. Open that URL in a browser.

## Validation

Run the available checks before sharing changes:

```bash
npm run lint
npm run build
```

`npm run preview` serves the production build locally after `npm run build` completes.

## Adding a project

The easiest way is from `/admin`: open Projects, click **Add project**, drop in a cover and gallery images, and save. To add one to the built-in defaults instead, put the images under `src/assets/<project>/` and add an entry to `projects` in `src/content/defaultContent.js`, using image paths relative to `src/assets`.

## Environment

Copy `.env.example` to `.env.local` to connect Supabase. The site works without it, using the default content. See [admin.md](admin.md).

## Styling notes

See [architecture.md](architecture.md#styling). Satoshi is loaded from `src/assets/fonts/WEB/fonts/` (woff2).
