# Santiago Lopez — Data Analyst Portfolio

Personal portfolio website showcasing data analysis case studies, built as a static site for Vercel.

## Stack

- Vanilla HTML, CSS, JavaScript (no framework, no build step)
- [Chart.js](https://www.chartjs.org/) via CDN for interactive visualizations
- [Fraunces](https://fonts.google.com/specimen/Fraunces) (titles) + [Switzer](https://www.fontshare.com/fonts/switzer) (body)
- Hosted on [Vercel](https://vercel.com)

## Local development

Serve the directory with any static file server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

## Deploy

```bash
npx vercel
```

Or connect the repo to Vercel via the web UI for automatic deploys on every push to `main`.

## Structure

```
.
├── index.html              # Home
├── styles.css              # Global stylesheet
├── script.js               # Global behavior (nav, scroll, i18n bootstrap)
├── lib/i18n.js             # EN/ES dictionary and toggle logic
├── projects/
│   ├── showz-marketing-performance/
│   ├── video-game-sales/
│   └── megaline-revenue/
└── vercel.json
```

## License

Content © Santiago Lopez. Code is free to learn from.
