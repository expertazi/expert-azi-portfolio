# Expert Azi Portfolio — Demo

A demo portfolio site built for a YouTube tutorial. If you want to learn how it was made, watch the video and follow along with this code.

- **Watch the video:** https://youtu.be/xyAh9RB1kPU
- **More videos on CRO and design:** https://www.youtube.com/@expertazi

## What this is

A responsive, single-page portfolio for a CRO and design freelancer: hero, client logos, selected work (with filter tabs), process, reviews slider, services, about, FAQ and a booking CTA. It has a desktop layout and a mobile layout (mobile menu, stacked sections).

It is plain HTML, CSS and JavaScript. There is no framework and no build step.

```
index.html   page markup
styles.css   all styles (design tokens are CSS variables at the top)
script.js    header hide-on-scroll, mobile menu, work filter, reviews slider
assets/      images and the client-logo placeholder
vercel.json  Vercel config (clean URLs, asset caching)
```

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel choose **Add New → Project** and import the repo.
3. Set Framework Preset to **Other**. Leave build command and output directory empty.
4. Click **Deploy**.

## Make it yours

This is a demo, so the content is placeholder. Replace these before using it for real:

- Reviews, founder names and results in `script.js` (the bracketed text).
- FAQ answers in `index.html`.
- Client logos: swap `assets/logo.svg` for real logos.
- Project images in `assets/`.
- Booking link (`https://cal.com/expertazi`), social links and the footer email in `index.html`.

## Credits

Design and tutorial by [Expert Azi](https://www.youtube.com/@expertazi).
