# Jericho Andren — Portfolio

A professional single-page portfolio for a BSIT student and aspiring software developer, built to
present work clearly to professors, internship coordinators, recruiters, and technical interviewers.

**Live site:** `https://jriku47-a11y.github.io/Portfolio/`
**Repository:** `https://github.com/jriku47-a11y/Portfolio`
**Author:** Jericho Andren — [GitHub](https://github.com/jriku47-a11y) · [LinkedIn](https://www.linkedin.com/in/jriku)

---

## Technology stack

Everything used is listed here because it is genuinely present in this repository.

| Layer | Technology | Where it is used |
|---|---|---|
| Markup | HTML5 (semantic elements, ARIA) | `index.html` |
| Styling | CSS3 (custom properties, grid, flexbox) | `css/style.css` |
| Typography | Newsreader (display), Instrument Sans (body), JetBrains Mono (labels) | Google Fonts |
| Interactivity | Vanilla JavaScript (ES5-compatible, no framework, no build step) | `js/main.js` |
| Content | Single JS config object | `js/content.js` |
| Backend | PHP 8 | `api/contact.php` |
| Email delivery | PHPMailer (bundled) — Resend HTTPS API or Gmail SMTP | `api/lib/`, `api/contact.php` |
| Version control | Git / GitHub | repository |
| Hosting | GitHub Pages (static site) | `.nojekyll` |

There is **no build step, no bundler, and no npm dependency**. Clone it and it runs.

---

## Design system

A deliberately **light editorial** direction, built to read like a technical journal rather than a
neon dev template.

| Token group | Choice |
|---|---|
| Ground | Warm paper `#faf7f2`, white surfaces |
| Ink | Near-black warm `#15130f`, with two muted steps |
| Accent | Burnt orange `#c2410c` (kickers, rules, tags, active nav underline) |
| Support | Olive for intermediate skill levels, deep green/red for form status |
| Rules | Hairline 1px borders instead of heavy shadows or glassmorphism |
| Radii | Tight — 5px controls, 8px cards, 12px large panels |
| Display type | Newsreader serif, italic used for the name |
| Body type | Instrument Sans |
| Labels | JetBrains Mono, uppercase, wide letter-spacing |

Design decisions worth noting:

- **No gradients on text.** The name is solid accent orange, not a gradient fill.
- **No glassmorphism, no blurred glow orbs, no grid backdrops.** A single faint warm tint keeps
  the page from reading as a flat sheet.
- **The hero uses a portrait slot**, not a code window. It holds a single circular avatar, a
  name caption, and a typographic "Currently" panel. The avatar file lives in `assets/`.
- **Motion is restrained**: one 14px fade-up on scroll reveal, disabled entirely under
  `prefers-reduced-motion`.
- **The header collapses to the mobile menu below 900px**, which is what prevents horizontal
  overflow on tablets.
- **A print stylesheet** strips the chrome so the page prints cleanly.

### Dark mode

The site ships with a dark theme that keeps the same identity — **warm charcoal, not navy**, with
the orange accent carried through.

- Every colour is a CSS custom property. There are **no hardcoded colours** outside the token
  blocks, so both themes stay consistent when you edit the stylesheet.
- `:root[data-theme="dark"]` overrides 42 of the 50 tokens. Light and dark define the **same**
  variable names, so nothing can leak through unstyled.
- A small inline script in `<head>` sets `data-theme` **before first paint**, so the page never
  flashes the wrong colours on load.
- On a first visit the theme follows the visitor's OS `prefers-color-scheme`. Once they press the
  toggle, their explicit choice is stored in `localStorage` and wins from then on.
- `color-scheme` is declared in both themes, so scrollbars and native form controls match.
- Printing always uses the light theme.

The toggle is the sun/moon button in the header. It updates its `aria-label` and `aria-pressed`
to match, so screen readers announce the current state.

---

## Sections

1. Home / Hero
2. About Me
3. Education
4. Technical Skills
5. Projects
6. Problem-Solving Cases
7. Cybersecurity Awareness
8. AI Literacy
9. Professional Presence (GitHub & LinkedIn)
10. Resume
11. Career Plan
12. Final Reflection
13. Contact

---

## Project structure

```
index.html            All 13 sections (semantic markup + accessibility)
css/style.css         Design system: tokens, layout, components, light + dark themes
js/content.js         SINGLE SOURCE OF TRUTH — edit this to change content
js/main.js            Renders content from config + all interactions
api/contact.php       Contact endpoint (validation, honeypot, rate limiting, sending)
api/config.example.php Safe config template (all values empty)
api/config.local.php  YOUR mail credentials — gitignored, never committed
api/lib/              Bundled PHPMailer (Exception, PHPMailer, SMTP)
projects/             Runnable project artifacts (e.g. the inventory SQL)
assets/               Your images and resume.pdf go here
.nojekyll             Tells GitHub Pages to serve the files as-is
```

---

## Project artifacts

Some projects ship a runnable artifact inside this repository so the work can be
inspected without leaving the page.

```
projects/it-equipment-inventory/inventory_analytics.sql
projects/it-equipment-inventory/IT_Equipment_Inventory_Analytics.xlsx
assets/vendor/sql-wasm.js, sql-wasm.wasm   SQLite compiled to WebAssembly
assets/resume.pdf                         one-page resume
```

The **Excel workbook** is the primary way to look at this project. It has six
sheets and stores values as real numbers, not text, so columns sort and total
correctly:

| Sheet | Contents |
|---|---|
| `inventory_assets` | the 50 records exactly as stored |
| `with_acquisition_value` | the same records plus the computed `quantity * unit_cost`, biggest first |
| `Query1_KPIs` | headline totals across the estate |
| `Query2_by_type` | equipment types ranked by acquisition value |
| `Query3_risk` | records that are both broken and out of warranty |
| `Query3_ageing` | the 6-years-or-older asset base |

The `.sql` file remains the source of truth: schema, constraints, records and
queries, runnable in the SQLite CLI or DB Browser for SQLite. Every figure quoted
in that project's case study was produced by executing it, so the claims on the
site are reproducible rather than asserted.

### Live database explorer

The **Live Database** section runs that SQL file in the visitor's browser using
SQLite compiled to WebAssembly (`sql.js`). It is not a mock-up and not a
screenshot — the runtime is downloaded on demand, the `.sql` file is fetched from
this repository, and the queries are executed locally.

- Nothing is pre-rendered; every number is computed by SQLite at page load
- Nothing is sent to a server, and the database is discarded when the visitor leaves
- The runtime loads only when the visitor presses **Open the live database**
- Figures match the case study exactly because both come from the same file

If the runtime cannot load, the section says so plainly and points to the SQL
file rather than showing a stale or invented result.

---

## Running locally

The site is static, so opening `index.html` directly works for most of the page.

To serve it properly (recommended, so fonts and fetch behave normally):

```bash
# Python
python -m http.server 8000

# or PHP
php -S localhost:8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

To test the contact form you need PHP. Using XAMPP, copy this folder into `htdocs/`
and browse to `http://localhost/portfolio set b/` — but see the contact section below first.

---

## How to edit the content

**Almost everything lives in `js/content.js`.** You do not need to touch `index.html` to change
names, links, projects, skills, career steps, or the AI log.

### Personal details

```js
personal: {
  name: "Jericho Andren",
  role: "BSIT Student / Aspiring Software Developer",
  location: "Pasay City, Philippines",
  github: "https://github.com/jriku47-a11y",
  linkedin: "https://www.linkedin.com/in/jriku",
  portfolioRepo: "https://github.com/jriku47-a11y/Portfolio",

  photo: "assets/profile.jpg",
  photoAlt: "Portrait of Jericho Andren",
  email: "jriku47@gmail.com",
  phone: "",
  showEmail: true,
  showPhone: false
}
```

`email` is **published on purpose** — a recruiter needs a way to reach you, and it appears in the
hero, in the contact channels and as the reply address in the form success message. `phone` ships
**empty**; fill it in only if you decide to publish it, then set `showPhone` to `true`. Nothing
else on the site hardcodes your contact details.

The hero avatar reads `personal.photo`. Point it at any image inside the repo, or set it to `""`
to drop the picture and show the initials badge instead.

### Adding a project

Projects are reserved slots. A slot with `published: false` renders **nothing**, so the page can
never advertise work that does not exist yet.

```js
{
  number: 2,
  published: true,          // flip to true once the details below are real
  title: "Your Project Name",
  category: "Web Application",
  type: "Personal Project",
  role: "What YOU actually did",
  overview: "Two to four sentences.",
  problem: "The problem it addresses.",
  solution: "What you built.",
  process: ["Step one", "Step two"],
  challenges: [{ challenge: "What went wrong", solution: "How you fixed it" }],
  features: ["Real feature", "Another real feature"],
  technologies: ["HTML", "CSS"],   // only what is genuinely used
  repo: "https://github.com/you/repo",
  demo: "https://your-demo.example",
  docs: "",
  screenshot: "assets/projects/yourproject.png",
  lessons: "What you actually learned."
}
```

Screenshots go in `assets/projects/`. If a screenshot is missing, the page shows a neutral
wireframe placeholder instead of a broken image.

### Adding a problem-solving case

```js
{
  published: true,
  title: "Short title of the bug",
  symptoms: "What you observed — exact error text is better than a paraphrase.",
  investigation: "What you did to narrow it down, in order.",
  rootCause: "The real cause, not the first guess.",
  solution: "The fix, and how you confirmed it.",
  tools: "Browser DevTools, PHP error log, Git",
  lesson: "What you would do differently next time."
}
```

### Profile photo

Drop a photo at `assets/profile.jpg`, then set `personal.photo: "assets/profile.jpg"` in
`js/content.js`. The initials slot in the hero is replaced automatically. Until then the hero
shows a clean framed placeholder rather than a broken image.

### Adding a resume

1. Export a single-page PDF resume.
2. Save it as `assets/resume.pdf`.
3. In `js/content.js`, set `personal.resume.available` to `true`.

The download button and the inline preview appear automatically. Until then the page shows an
honest "no resume uploaded yet" panel rather than a broken download link.

---

## Contact form setup

The contact form has **two routes** and picks the right one automatically.

### Route 1 — Web3Forms (recommended, works on GitHub Pages)

GitHub Pages only serves static files, so it **cannot run PHP**. A form-relay service
sends the message straight from the visitor's browser to your inbox instead.

1. Sign up free at **<https://app.web3forms.com/onboarding/create>** (250 submissions/month, no card).
2. Verify your email and copy the **access key**.
3. Paste it into `js/content.js`:
   ```js
   contact: {
     relay: {
       enabled: true,
       provider: "web3forms",
       endpoint: "https://api.web3forms.com/submit",
       accessKey: "PASTE_YOUR_KEY_HERE"
     }
   }
   ```
4. Push. That is all — **no PHP host needed**.

The access key is designed to be public: it is meant to sit in the page source of a
client-side form. It can only submit a message to your inbox; it cannot read or change
anything in your Web3Forms account.

Leave `accessKey` empty and the form falls back to Route 2 automatically.

### Route 2 — own PHP endpoint

Requires a host that runs PHP (shared hosting, cPanel, Railway, Render, a VPS). Copy
`api/config.example.php` to `api/config.local.php` and fill it in.

`api/config.local.php` is gitignored. Never commit it.

**Option A — Resend (recommended, port 443).** Sign up at <https://resend.com>, copy the API
key, verify your sending domain, then set `RESEND_API_KEY` and `MAIL_FROM`.

**Option B — Gmail SMTP.** Needs 2-Step Verification and an App password: Google Account →
Security → 2-Step Verification → App passwords. Then set `GMAIL_USER` and `GMAIL_APP_PASSWORD`.

**`MAIL_TO` is required** in both cases — it is the inbox that receives inquiries. Without it
the endpoint returns **HTTP 501** and the page tells visitors the form is not connected rather
than faking a success message.

> You do **not** need a Gmail address to receive messages. `MAIL_TO` accepts any inbox —
> Outlook, Yahoo, ProtonMail or your school email. Gmail is only one possible transport.

### Behaviour on failure

A success message appears **only** when the service confirms it accepted the message. If
sending fails, the visitor is told the message was not sent and offered LinkedIn instead.
No fake success states. The existing honeypot still runs and maps to the relay's
`botcheck` field, so bots are dropped silently.

Because the site is static, the PHP endpoint is deployed separately from GitHub Pages —
having both configured is fine, the relay simply wins while a key is present.

---

## Deployment

### Static site — GitHub Pages (recommended)

This portfolio is static and is already prepared for GitHub Pages (`.nojekyll` is included, so
files beginning with `_` are served untouched).

```bash
git remote add origin https://github.com/jriku47-a11y/Portfolio.git
git push -u origin main
```

Then enable it:

1. Repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / root
4. Wait for the build, then open `https://jriku47-a11y.github.io/Portfolio/`

> **Important:** GitHub Pages runs static files only, so it **cannot execute PHP**. That is why
> the form uses the Web3Forms relay by default — the contact form works on Pages as-is. If you
> clear `contact.relay.accessKey`, the page detects that no relay is configured, checks whether
> `api/contact.php` exists, and tells visitors honestly which route is live instead of faking a
> success message.

### Contact form — a PHP host

To have a working contact form, deploy to any host that runs PHP (shared hosting, cPanel,
Railway, Render, or a small VPS) with the repository's `api/` folder inside the web root.
Everything else is unchanged. Do not put mail credentials in client-side code.

---

## Privacy

This repository is public. The following rules are applied:

- **Only one photograph is published: the hero avatar** (`assets/profile.jpg`, set by
  `personal.photo` in `js/content.js`). There are no project screenshots, no gallery, and no
  photographs of other people. Set `personal.photo` to `""` to remove the avatar entirely — the
  hero then shows the initials badge instead.
- **No residential address is published or committed.** Only "Pasay City, Philippines" appears.
- **Email is published** (`jriku47@gmail.com`, set in `js/content.js` behind `showEmail`). It is a
  public inbox address, nothing more.
- **Phone ships empty.** It is configurable in `js/content.js` and hidden behind `showPhone`,
  which defaults to `false`.
  Note: the downloadable **resume PDF does contain the phone number and email address**,
  because a resume without contact details is not usable by a recruiter. Remove them from
  the PDF if that is not what you want.
- **No credentials are committed.** Mail secrets belong in `api/config.local.php` (gitignored) or
  in server environment variables.
- `.gitignore` blocks `api/config.local.php`, `*.local.php`, `.env*`, and key/certificate files.

---

## Accessibility and responsiveness

- Semantic HTML with one `<h1>` and ordered headings per section
- Skip-to-content link, visible `:focus-visible` rings, full keyboard operation
- ARIA labels, `aria-expanded` on the mobile menu and accordions, `role="status"` live region on the form
- Tables use `<caption>`, `scope="col"`, and scroll inside their own container
- Colour contrast designed against the dark theme
- `prefers-reduced-motion` disables reveal animations, the typing effect, and smooth scrolling
- Dark mode follows the OS preference by default, with a labelled toggle for manual control
- Tested at 320, 375, 390, 414, 768, 1024, and 1366+ px with no horizontal overflow
- Tap targets are at least 44 px

---

## Before you present this

- [ ] Replaced every `[placeholder]` in `js/content.js` with real content
- [ ] Removed the two yellow **editor notes** once your own content is in place
- [ ] Added your resume PDF and set `resume.available` to `true`
- [ ] Opened every GitHub / LinkedIn / project link and confirmed it works
- [x] Filled in `email` and set `showEmail` to `true`
- [ ] Added the avatar image at `assets/profile.jpg`
- [ ] Confirmed a real test message arrives in the Web3Forms inbox (spam folder included)
- [ ] Confirmed no residential address appears anywhere
- [ ] Checked the page at 375 px with no horizontal scroll
- [ ] Tabbed through the page with only the keyboard
- [ ] Opened the browser console and confirmed there are no errors

---

## License

Personal portfolio. All content belongs to the author.