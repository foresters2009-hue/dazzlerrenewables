# Dazzler Renewables

Static website for Dazzler Renewables, an engineer-led solar company with an in-house installation crew.

The site is designed as a polished solar quote portal with compressed project photos, stream-ready video previews, a refined project icon, and responsive layouts for desktop and mobile.

## Local Preview

Run a local server from this folder:

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:4174/
```

## Project Structure

- `index.html` - page content and layout
- `styles.css` - responsive visual design
- `script.js` - mobile navigation, quote form confirmation, and video lightbox
- `site.webmanifest` - installable site metadata and app icons
- `assets/brand/` - refined logo, favicon, and touch icons
- `assets/images/` - optimized page images
- `assets/gallery/photos/` - selected compressed WebP project photos
- `assets/gallery/videos/` - compressed MP4 project clips and WebP posters

## Media

- Public gallery: 8 selected project photos and 4 selected video clips.
- Videos are not downloaded on page open. The site loads poster images first and only loads an MP4 clip after a visitor clicks a video.
- Root-level original media files are intentionally ignored by git; only optimized web assets under `assets/` are committed.

## Production Notes

- The quote form currently shows a front-end confirmation message. Connect it to email, CRM, or a backend endpoint before production lead capture.
- Confirm final email routing, certification/license language, rebate/incentive wording, and financing details before launch.
