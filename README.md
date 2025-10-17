# Snake (Offline PWA)

This is a tiny Progressive Web App that plays Snake and works **offline** via a service worker.

## Files
- `index.html` — the entire game (canvas + JS)
- `manifest.json` — PWA metadata (name, icons, theme)
- `sw.js` — service worker for offline caching
- `icons/` — app icons (192px & 512px)

## How to run locally (quick test)
You need to serve the folder over HTTP(S). From a terminal in this folder:

**Python 3**
```
python -m http.server 5173
```

Then open `http://localhost:5173` in your browser.

## Deploy for iPhone install
To install on an iPhone, the site must be served over **HTTPS** (except `localhost`). Easiest options:

- **GitHub Pages**: push this folder to a repo, enable Pages.
- **Netlify** or **Vercel**: drag-and-drop the folder to create a site.
- **Cloudflare Pages** or **Firebase Hosting**: similarly simple.

Once deployed, on your iPhone open the URL in **Safari**, tap **Share** → **Add to Home Screen**.

## Offline notes
The service worker caches the core files on first visit and serves them offline. When you publish updates, bump `CACHE_NAME` in `sw.js` to refresh the cache.
