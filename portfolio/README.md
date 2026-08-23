# Ashwani Raj — Portfolio

Personal portfolio site. React + Vite + Tailwind CSS v4, no UI library, no runtime
dependencies beyond React itself.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Editing content

Everything you'd want to change lives in **`src/data/profile.js`** — headline, intro,
experience, projects, skills, hackathon record, certificates, photos, education, contact
details. The components read from it, so you never need to touch JSX to update the site.

### Project links

Each project has `demo` and `code` fields:

```js
{
  name: 'Wanderlust',
  demo: 'https://wanderlust-ilyi.onrender.com/listings',
  code: '',   // ← paste the GitHub URL
}
```

The Live demo / Source buttons stay hidden until a field is filled in, so the page never
shows a dead link. The deployment links came out of the résumé PDF; the GitHub URLs and
the AI Interview Copilot links are still blank and are the one thing left to add by hand.

### Add a photo to `~/moments`

Two steps, no component changes:

1. Drop the image into `public/moments/`
2. Copy the template in the MOMENTS comment block in `src/data/profile.js`, paste it into
   the list, and fill it in:

```js
{
  file: 'my-new-photo.jpg',   // filename inside public/moments/
  group: 'hackathons',        // must match a `kind` in momentGroups
  caption: 'What happened',   // one line, shown under the photo
  date: 'Sept 2026',
  alt: 'Plain description of what is in the frame',
  wide: false,                // true = a wider frame, for panoramas
}
```

Each group is a strip that scrolls sideways, so adding photos makes the strip longer,
never the page taller. An empty group disappears on its own, and a photo whose `group`
doesn't match anything still shows up in a "More" strip at the end rather than vanishing.
To add a whole new group, add a line to `momentGroups` and use its `kind`.

### Add a certificate

Same shape: drop the scan into `public/certificates/`, add an entry to `certifications`
with a `kind` from `certificationGroups` (`industry`, `competition`, `campus`). Thumbnails
are fitted rather than cropped, so nothing on the document gets cut off, and the lightbox
shows it full size.

### Swap the photo or résumé

Replace `public/ashwani.jpg` and `public/Ashwani-Raj-Resume.pdf`, keeping the filenames.
The portrait is composited with `mix-blend-mode: multiply` over a near-white plate, which
drops a white studio background out cleanly — so a white or very light background works
best.

## Contact form

By default the form opens the visitor's mail app with the message pre-filled. No backend,
no API keys, works as soon as you deploy.

To receive submissions directly instead, create a free form at
[formspree.io](https://formspree.io), then set the endpoint at the top of
`src/components/Contact.jsx`:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/your-form-id'
```

## Deploying

**Vercel or Netlify** — import the repo; both detect Vite automatically. Build command
`npm run build`, output directory `dist`.

**GitHub Pages** — set `base` in `vite.config.js` to `'/<repo-name>/'` first, then deploy
the `dist` folder.

## Design notes

The direction is an amber-phosphor terminal crossed with a code editor: a near-black base
with a blue undertone, amber for emphasis, and a muted cyan reserved strictly for
interactive elements — so colour alone tells you what's clickable. Type is Archivo
(display, slightly expanded), IBM Plex Sans (body) and JetBrains Mono (labels and data).

The centrepiece is the hackathon tally in `~/record`: ten cells for ten hackathons
entered, seven filling in as it scrolls into view. The three unfilled cells are kept
visible deliberately — the ratio is the claim, and hiding the losses would turn it into a
boast.

Theming works through CSS custom properties mapped into Tailwind with `@theme inline`, so
flipping `data-theme` on `<html>` re-themes everything without a single `dark:` variant in
the markup.

The two image walls — 17 certificates and 19 photos — are film strips rather than grids
(`src/components/Carousel.jsx`). Each group stays one row tall and scrolls sideways, which
keeps the page short and means the sections never outgrow their space. Native overflow
scrolling does the moving, so trackpad, touch and arrow keys all work; the buttons and the
hairline underneath are the visible affordance on top of it. Both walls share one
accessible lightbox, and its arrows walk every image in the section, not just the strip you
opened from.

## Accessibility

Skip link, visible focus rings on every interactive element, semantic landmarks, form
errors tied to inputs with `aria-describedby`, a text alternative for the tally, focusable
scroll regions with labels, a lightbox that traps and restores focus, and full
`prefers-reduced-motion` support.
