/* ============================================================
   PORTFOLIO CONTENT CONFIG
   ------------------------------------------------------------
   This is the single source of truth for the portfolio.
   Edit the values below and the page updates — no other file
   needs to change to add content.

   PRIVACY RULES (please keep these)
   - Do NOT put a residential address anywhere in this file.
   - `email` is published on purpose. `phone` ships EMPTY — add it only
     if you consciously decide to publish it, then set
     `showPhone` to true. `showEmail` controls the hero link.
   - Never put passwords, API keys or app passwords in this
     file or any other file in this repository. Mail secrets
     belong in api/config.local.php (gitignored) or in
     environment variables on the server.
   ============================================================ */

const PORTFOLIO = {
  /* ---------------------------------------------------------
     1. PERSONAL DETAILS
     --------------------------------------------------------- */
  personal: {
    name: "Jericho Andren",
    initials: "JA",
    role: "BSIT Student / Aspiring Software Developer",
    availability: "Open to internship / entry-level roles",
    location: "Pasay City, Philippines",

    // Public profile links — verified.
    github: "https://github.com/jriku47-a11y",
    linkedin: "https://www.linkedin.com/in/jriku",
    portfolioRepo: "https://github.com/jriku47-a11y/Portfolio",

    // Contact fields. `email` is published on purpose (recruiters need a way to
    // reach you). `phone` stays EMPTY unless you consciously decide to publish it.
    email: "jriku47@gmail.com",
    phone: "",
    showEmail: true,
    showPhone: false,

    // Profile avatar shown in the hero. Set `photo` to "" to hide the
    // picture and show the initials badge instead. Keep it a file inside
    // this repo (for example assets/profile.jpg) — no external hotlinks.
    photo: "assets/profile.jpg",
    photoAlt: "Portrait of Jericho Andren",

// Resume. `available: false` renders an honest "add your PDF"
// panel instead of a broken download link.
    resume: {
      available: true,
      file: "assets/resume.pdf",
      label: "Jericho-Andren-Resume.pdf"
    }
  },

  /* ---------------------------------------------------------
     2. ABOUT
     Edit the paragraphs to sound like you in your own words.
     --------------------------------------------------------- */
  about: {
    paragraphs: [
      "I am a <strong>BSIT student at Datamex College of Saint Adeline</strong>, based in Pasay City, Philippines. I am interested in <strong>building practical digital solutions</strong> and in improving my skills in <strong>software development, problem-solving, and modern web technologies</strong>.",
      "What keeps me interested in this field is the part where something does not work and you have to work out <em>why</em>. I like taking something apart, finding the actual cause, and fixing it in a way that keeps working. I care about code and pages that are clear, readable, and accessible rather than clever for their own sake.",
      "Right now I am building my foundation deliberately: I write things myself, test them myself, and record what went wrong so I do not repeat it. I am looking for an internship or entry-level role where I can learn from experienced developers and contribute to real work."
    ],
    strengths: [
      "Willingness to investigate a problem before guessing at a fix",
      "Clear written communication and honest documentation",
      "Follow-through — finishing and checking work, not just starting it",
      "Comfortable asking for help and reading documentation"
    ],
    interests: [
      "Web applications and user-facing interfaces",
      "How data is stored, queried, and kept correct",
      "Practical cybersecurity habits as a default, not an afterthought"
    ]
  },

  /* ---------------------------------------------------------
     3. EDUCATION
     Only list what is true. Leave a field "" to hide that line.
     --------------------------------------------------------- */
  education: {
    items: [
      {
        title: "Bachelor of Science in Information Technology (BSIT)",
        school: "Datamex College of Saint Adeline",
        meta: "Undergraduate student",
        detail:
          "Building foundations across programming, web systems, databases, and introductory networking. Currently focused on web development and systems fundamentals."
      },
      {
        title: "Self-directed study",
        school: "Practice projects and documentation",
        meta: "Ongoing",
        detail:
          "Most of my hands-on skill comes from building small projects end to end and writing down the problems I hit and how I resolved them."
      }
    ],
    coursework: [
      "Web Systems and HTML/CSS fundamentals",
      "Databases and introductory SQL",
      "Computer fundamentals",
      "Programming fundamentals"
    ]
  },

  /* ---------------------------------------------------------
     4. TECHNICAL SKILLS
     Levels are honest labels, not percentages:
       beginner    — I have looked at it / just starting
       familiar    — I have used it in real projects
       intermediate— I am comfortable and have applied it repeatedly
     Do NOT claim a level you cannot defend in an interview.
     --------------------------------------------------------- */
  skills: {
    note:
      "Levels describe real experience, not percentages. Each item below is something used in this portfolio or its backend.",
    categories: [
      {
        name: "Frontend Development",
        level: "familiar",
        icon: "▣",
        items: ["HTML5", "CSS3", "Vanilla JavaScript", "Responsive design", "Semantic markup"]
      },
      {
        name: "Backend Development",
        level: "familiar",
        icon: "⬡",
        items: ["PHP", "Form handling", "Client + server validation", "JSON API responses"]
      },
      {
        name: "Programming",
        level: "familiar",
        icon: "◈",
        items: ["JavaScript", "PHP"]
      },
      {
        name: "Databases",
        level: "beginner",
        icon: "▤",
        items: ["[ Add a database tool here once you have actually used one ]"]
      },
      {
        name: "Development Tools",
        level: "familiar",
        icon: "⚙",
        items: ["Git", "GitHub", "VS Code", "XAMPP", "Browser DevTools"]
      },
      {
        name: "UI / UX",
        level: "familiar",
        icon: "◎",
        items: ["Layout and spacing systems", "Keyboard accessibility", "Visible focus states", "Reduced-motion support"]
      },
      {
        name: "Version Control",
        level: "familiar",
        icon: "⑂",
        items: ["Git", "Branching and commits", "Pull / push and resolving conflicts", "README documentation"]
      },
      {
        name: "Cybersecurity Awareness",
        level: "familiar",
        icon: "⬣",
        items: ["Input validation", "Keeping secrets out of client code", "Rate limiting and abuse controls", "Safe error messages"]
      },
      {
        name: "AI-Assisted Development",
        level: "familiar",
        icon: "✦",
        items: ["Writing clear prompts", "Verifying output before use", "Reviewing suggested code"]
      }
    ]
  },

  /* ---------------------------------------------------------
     5. PROJECTS
     ------------------------------------------------------------
     Only real projects. Use `published: false` to keep a slot
     reserved without showing it — an unpublished entry renders
     nothing at all, so you can never show a project that does
     not exist yet.

     Fields:
       number       — display number
       title        — project name
       category     — short type label
       type         — "Personal Project" / "Team Project" / "Academic"
       role         — what YOU actually did (be specific and honest)
       overview     — 2–4 sentences: what it is
       problem      — the problem it addresses
       solution     — what you built
       process      — array of steps you genuinely followed
       challenges   — array of { challenge, solution }
       features     — array of real features
       technologies — only what is genuinely used
       repo         — repository URL, or "" if none
       demo         — live demo URL, or "" if none
       docs         — documentation URL, or "" if none
       screenshot   — image path under assets/projects/, or ""
       lessons      — what you learned
       published    — true to show, false to reserve
     =========================================================== */
  projects: [
    {
      number: 1,
      published: true,
      title: "Salon Management & Booking System",
      category: "Web Application",
      type: "Web Application",
      role: "[ Replace this: say which parts you actually built or owned — modules, screens, or fixes. Do not claim the whole system unless it was yours. ]",
      overview:
        "A web system that runs a salon day to day: customers browse services and book a date and time, staff log their work and submit it for approval, and admins manage the schedule, point of sale, inventory and staff accounts from one dashboard.",
      problem:
        "Salon bookings, staff hours and daily sales were being handled across separate places, so scheduling, stock levels and staff performance were hard to see and easy to get wrong.",
      solution:
        "Two connected applications on one shared database — a customer-facing booking site and a staff/admin back office — with role-based and feature-based access so each person only sees what their account allows.",
      process: [
        "Modelled the data first: services, staff, accounts, permissions, bookings, sales and reports",
        "Built the customer-facing site — service selection, availability check, booking form and confirmation email",
        "Built the back office — dashboards, point of sale, inventory CRUD and sales reports",
        "Added the staff side: daily report drafting, submission and admin approval",
        "Moved reporting out of the pages and into SQL views so the same numbers back every screen",
        "Wrote an installation guide so the system can be rebuilt on another machine from scratch"
      ],
      challenges: [
        {
          challenge: "Two applications, one database.",
          solution:
            "The public site connects with MySQLi while the back office uses PDO. Both point at the same <span class=\"mono\">salon_management</span> schema, so a booking made on the site is immediately visible to staff and admins. The dual access styles are the clearest thing I would standardise if I revisited this."
        },
        {
          challenge: "Staff needed different menus, not just different roles.",
          solution:
            "Permissions are stored per account and the staff sidebar is built from those flags, so a staff member with only point-of-sale access sees only that link. Guard functions block the page itself, not just the link."
        },
        {
          challenge: "An older accounts table had to keep working while a new one was introduced.",
          solution:
            "Authentication tries the new accounts table first and falls back to the legacy one, so existing logins kept working through the change instead of breaking on deploy day."
        }
      ],
      features: [
        "Customer registration and login",
        "Service browsing with price and duration",
        "Booking with date, time and therapist selection",
        "Booking reference codes and a pending / confirmed / cancelled / completed status flow",
        "Confirmation email through PHPMailer",
        "Admin dashboard with sales, customer and staff overview",
        "Point of sale for products and services",
        "Inventory management with low-stock thresholds",
        "Sales reports filterable by date range",
        "Staff management with per-account feature permissions",
        "Staff daily reports with an admin approval step",
        "In-app notifications for pending sales and submissions",
        "Reporting views: daily sales summary, low stock, pending sales, staff performance"
      ],
      technologies: ["PHP", "MySQL (MariaDB)", "MySQLi", "PDO", "HTML5", "CSS3", "JavaScript", "PHPMailer", "Apache / XAMPP"],
      repo: "https://github.com/jriku47-a11y/Salon",
      demo: "https://jriku47-a11y.github.io/Salon/",
      docs: "https://github.com/jriku47-a11y/Salon#readme",
      demoNote:
        "The demo is a showcase with real screenshots of the running system. The live app itself needs a PHP host and MySQL, which GitHub Pages cannot run, so the repository holds the full source, the sanitized schema and setup instructions.",
      screenshot: "",
      lessons:
        "Access control is easier to get right when the page and the link are both gated — hiding a menu item is not security. Passwords are hashed with bcrypt and every query is a prepared statement, but this build has no CSRF tokens and the database password was left in a config file. Both belong at the top of my list to fix next."
    },

    {
      number: 2,
      published: true,
      title: "IT Equipment Inventory Analytics",
      category: "Database / Data Analysis",
      type: "Data Analysis Project",
      role: "[ Replace this: say what you did yourself — cleaning the workbook, writing the schema, or writing the queries. ]",
      overview:
        "A SQLite database built from a 50-record IT equipment workbook, with queries that turn a flat list of purchases into the numbers a department actually needs to make a replacement decision.",
      problem:
        "The equipment list existed as a spreadsheet: 50 rows of asset ID, type, brand, condition, age, quantity, cost, warranty and department. Nothing in it answered the questions that matter — what is the estate worth, how much is failing, and which items are broken with no warranty left to cover them.",
      solution:
        "A schema with constraints that reject bad data on entry, plus three queries: headline inventory KPIs, a value-ranked equipment breakdown, and a maintenance-risk query that isolates the worst records.",
      process: [
        "Read the workbook and decided what each column should be and what it is allowed to contain",
        "Defined the table with PRIMARY KEY, NOT NULL and CHECK constraints so bad rows are rejected at insert rather than discovered later",
        "Loaded all 50 cleaned records",
        "Wrote Query 1 for the headline KPIs, defining acquisition value as quantity × unit_cost",
        "Wrote Query 2 to rank equipment types by value rather than by row count",
        "Wrote Query 3 to cross-reference condition, warranty and age and find the genuinely risky records"
      ],
      challenges: [
        {
          challenge: "Row count is not the same as value.",
          solution:
            "Counting records makes projectors look like the biggest problem at 11 rows, but by acquisition value routers come first at PHP 2,402,000 across 70 units. Ranking by <span class=\"mono\">SUM(quantity * unit_cost)</span> rather than <span class=\"mono\">COUNT(*)</span> changed which department looks urgent."
        },
        {
          challenge: "\"Needs repair\" on its own is too broad to act on.",
          solution:
            "12 records and PHP 2,482,000 of equipment are flagged as needing repair, but only 3 records — PHP 675,000, 7.4% of the estate — are also out of warranty. Filtering on both conditions turns a large worry into a short, fundable list: A8049, A8014, A8011."
        }
      ],
      features: [
        "Single inventory_assets table with a PRIMARY KEY on asset_id",
        "CHECK constraints on age, quantity, costs and the warranty flag",
        "50 cleaned records loaded from the source workbook",
        "Query 1 — headline KPIs across the whole estate",
        "Query 2 — equipment types ranked by acquisition value",
        "Query 3 — maintenance risk and ageing asset base",
        "Runs as-is in the SQLite CLI or DB Browser for SQLite"
      ],
      technologies: ["SQLite", "SQL", "DB Browser for SQLite", "Excel"],
      /* Every figure below was produced by running the SQL file linked
         above. Regenerate and edit here if the dataset changes. */
      results: [
        { label: "Asset records", value: "50" },
        { label: "Total units", value: "279" },
        { label: "Acquisition value", value: "PHP 9,168,000" },
        { label: "Maintenance to date", value: "PHP 115,182" },
        { label: "Needs Repair", value: "12 records · PHP 2,482,000" },
        { label: "Out of warranty", value: "14 records" },
        { label: "Repair AND no warranty", value: "3 records · PHP 675,000" },
        { label: "Highest-value type", value: "Router · PHP 2,402,000" }
      ],
      /* Openable in Excel or Google Sheets — six sheets, numbers stored as
         numbers rather than text, so columns can be sorted and totalled. */
      file: "projects/it-equipment-inventory/IT_Equipment_Inventory_Analytics.xlsx",
      fileLabel: "Excel workbook",
      repo: "https://github.com/jriku47-a11y/Portfolio/blob/main/projects/it-equipment-inventory/inventory_analytics.sql",
      demo: "",
      docs: "https://github.com/jriku47-a11y/Portfolio/blob/main/projects/it-equipment-inventory/inventory_analytics.sql",
      docsLabel: "SQL source",
      screenshot: "",
      lessons:
        "The schema earns its keep only when it refuses bad data: the CHECK constraints stop a negative cost or an invalid warranty value from ever entering the table. The other lesson was about reading the result — the numbers were already in the data, but ranking by value instead of row count is what made them useful."
    },

    {
      number: 3,
      published: true,
      title: "Personal Portfolio Website",
      category: "Web Application",
      type: "Personal Project",
      role: "[ Replace this: say which parts you actually built or owned. ]",
      overview:
        "A single-page professional portfolio built to present my background, skills and work to instructors, internship coordinators and recruiters. It is the site you are reading now.",
      problem:
        "As a student I had no single place to present my background and projects in a form a recruiter could actually read in under a minute.",
      solution:
        "A fast, accessible single-page site with clear section navigation, case-study format for projects, a working contact form backed by a real PHP mail endpoint, and a layout that holds up from 320 px phones to wide desktop monitors.",
      process: [
        "Outlined the sections a reviewer needs, in the order they need them",
        "Built the design system first — colour, spacing and type tokens",
        "Wrote semantic markup for every section",
        "Added responsive CSS, then checked narrow viewports before desktop",
        "Implemented navigation, scroll reveal, accordions and form validation",
        "Wired the contact form to a mail endpoint that keeps secrets off the page, with a static-host relay so it still works on GitHub Pages",
        "Tested links, keyboard access, both colour themes and mobile behaviour"
      ],
      challenges: [
        {
          challenge: "A contact form that only pretends to send mail.",
          solution:
            "The form posts to a PHP endpoint with server-side validation, a honeypot and rate limiting. A success message appears only when the mail service confirms acceptance — otherwise it tells the visitor the message was not sent."
        },
        {
          challenge: "Keeping mail credentials out of public code.",
          solution:
            "Secrets load server-side from a gitignored config file or environment variables. Nothing sensitive is ever exposed in the browser."
        },
        {
          challenge: "One content source instead of thirteen hand-edited sections.",
          solution:
            "Everything on the page renders from a single config object, and reserved project slots stay hidden until they hold real work — so the site can never advertise something that does not exist."
        }
      ],
      features: [
        "Sticky navigation with active-section highlighting",
        "Mobile menu that closes on selection and on Escape",
        "Scroll-reveal animations that respect reduced-motion preferences",
        "Light and dark themes, following the OS setting until the visitor chooses",
        "Accessible accordions and expandable case studies",
        "Validated contact form with real server-side delivery",
        "Skip-to-content link and visible keyboard focus states",
        "Print stylesheet"
      ],
      technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "PHP 8", "PHPMailer", "Git", "GitHub Pages"],
      repo: "https://github.com/jriku47-a11y/Portfolio",
      demo: "https://jriku47-a11y.github.io/Portfolio/",
      docs: "https://github.com/jriku47-a11y/Portfolio#readme",
      demoNote: "Runs entirely on GitHub Pages, including the live SQLite explorer. The contact form delivers through Web3Forms there, and falls back to the PHP endpoint in api/contact.php when the site is hosted somewhere that runs PHP.",
      screenshot: "",
      lessons:
        "Building the design system first is what kept the page consistent. Writing the backend before the success message is what kept me honest — the form can only say it succeeded when the mail service actually accepted the message."
    },

    /* ------------------------------------------------------------
       Reserved slot for a future project.
       Replace the placeholder values with a real project and set
       published: true. While published is false nothing is shown,
       so the page never advertises work that does not exist.
       ------------------------------------------------------------ */
    {
      number: 4,
      published: false,
      title: "Project 4 — to be added",
      category: "",
      type: "",
      role: "",
      overview: "",
      problem: "",
      solution: "",
      process: [],
      challenges: [],
      features: [],
      technologies: [],
      repo: "",
      demo: "",
      docs: "",
      screenshot: "",
      lessons: ""
    }
  ],

  /* ---------------------------------------------------------
     6. PROBLEM-SOLVING CASES
     ------------------------------------------------------------
     Reusable format: problem, symptoms, investigation, root cause,
     solution, tools, lesson.
     Replace each placeholder with a REAL case from your own work.
     Cases with `published: false` are not rendered.
     =========================================================== */
  cases: [
    {
      published: true,
      title: "Reserved case 1 — replace with a real debugging story",
      symptoms: "[ What you observed. Exact error text is better than a paraphrase. ]",
      investigation: "[ What you actually did to narrow it down, in order. ]",
      rootCause: "[ The real underlying cause, not the first guess. ]",
      solution: "[ The fix, and how you confirmed it worked. ]",
      tools: "[ e.g. Browser DevTools, PHP error log, Git ]",
      lesson: "[ What you would do differently next time. ]"
    },
    {
      published: true,
      title: "Reserved case 2 — replace with a real debugging story",
      symptoms: "[ ... ]",
      investigation: "[ ... ]",
      rootCause: "[ ... ]",
      solution: "[ ... ]",
      tools: "[ ... ]",
      lesson: "[ ... ]"
    },
    {
      published: true,
      title: "Reserved case 3 — replace with a real debugging story",
      symptoms: "[ ... ]",
      investigation: "[ ... ]",
      rootCause: "[ ... ]",
      solution: "[ ... ]",
      tools: "[ ... ]",
      lesson: "[ ... ]"
    }
  ],

  /* ---------------------------------------------------------
     7. CYBERSECURITY AWARENESS
     Framed as topics studied, never as professional expertise.
     --------------------------------------------------------- */
  security: {
    disclaimer:
      "I am not a security engineer and I do not present myself as one. What follows is the security awareness I have built as a student, and the controls I have actually implemented in my own code.",
    topics: [
      {
        name: "Authentication",
        body: "How login should work, why passwords must be hashed rather than stored, and what multi-factor authentication adds on top of a password."
      },
      {
        name: "Session Management",
        body: "Why a session has to be started consistently, how to end it safely, and why sessions must be invalidated on logout rather than just cleared."
      },
      {
        name: "SQL Injection",
        body: "Why building queries by pasting user input into strings is dangerous, and how prepared statements with bound parameters remove that whole class of bug."
      },
      {
        name: "XSS & Output Handling",
        body: "Treating anything a user submits as untrusted, and why escaping on output matters as much as validating on input."
      },
      {
        name: "CSRF",
        body: "Why a form on your own site can still be triggered from another one, and what tokens and same-site cookies are for."
      },
      {
        name: "Secrets Handling",
        body: "Passwords and API keys belong in environment variables or a server-side config file that is never committed — never in browser JavaScript."
      },
      {
        name: "Data Protection",
        body: "Collecting only what is needed, keeping it out of logs and error messages, and not exposing more than a user should see."
      },
      {
        name: "Abuse Prevention",
        body: "Rate limiting, honeypot fields, and generic error messages so an attacker learns nothing from a failed attempt."
      }
    ],
    implementedTitle: "Controls implemented in this portfolio's contact form",
    implemented: [
      { label: "Server-side validation", body: "Every field is re-validated on the server. The browser check is a convenience, never the authority." },
      { label: "Honeypot field", body: "A hidden field real people never fill in. Bots that fill it are accepted silently and never emailed." },
      { label: "Rate limiting", body: "Five submissions per hour per IP address, so one visitor cannot flood the inbox." },
      { label: "Secrets kept server-side", body: "Mail credentials load from a gitignored file or environment variables — never from client code." },
      { label: "Errors that leak nothing", body: "Visitors get a plain sentence. Paths, stack traces, and keys stay in the server log." }
    ]
  },

  /* ---------------------------------------------------------
     8. AI LITERACY
     Replace the log rows with real entries. Keep the columns.
     =========================================================== */
  ai: {
    stance:
      "AI is a tool I use to learn faster, not a replacement for my own judgement. Every suggestion is checked before it goes anywhere near my final work.",
    principles: [
      { label: "Assist", body: "Use AI to explain an error I do not understand, to draft boilerplate, or to show me alternatives I had not considered." },
      { label: "Verify", body: "Never accept output on trust. Run the code, check the official documentation, and test the edge cases myself." },
      { label: "Own", body: "The final decision is mine. If I cannot explain the code line by line, it does not ship — regardless of who drafted it." }
    ],
    verificationRule: "If I cannot explain it and test it, I do not ship it — no matter who drafted it.",
    log: [
      { tool: "[ Tool name ]", purpose: "[ What you used it for ]", output: "[ What you actually kept from it ]", verification: "[ How you checked it ]", decision: "[ Keep / Edit / Discard ]" },
      { tool: "[ Tool name ]", purpose: "[ ... ]", output: "[ ... ]", verification: "[ ... ]", decision: "[ ... ]" },
      { tool: "[ Tool name ]", purpose: "[ ... ]", output: "[ ... ]", verification: "[ ... ]", decision: "[ ... ]" }
    ]
  },

  /* ---------------------------------------------------------
     9. CAREER PLAN
     Edit this as your plan develops.
     --------------------------------------------------------- */
  career: {
    target: "Junior Software Developer — starting with an internship, moving toward full-stack web development.",
    steps: [
      {
        when: "Now",
        title: "Build honest proof",
        current: true,
        detail: "Finish and document real projects. Write READMEs that explain how to run them. Practise explaining my own code out loud, because that is what interviews actually test."
      },
      {
        when: "0–6 months",
        title: "Deepen the foundations",
        detail: "Strengthen JavaScript and PHP. Get genuinely comfortable with SQL queries and form handling. Add real projects to this portfolio as I finish them."
      },
      {
        when: "6–12 months",
        title: "Gain team experience",
        detail: "Land an internship or entry-level role. Learn code review, work inside someone else's structure, and ship features other people depend on."
      },
      {
        when: "1–3 years",
        title: "Own features end to end",
        detail: "Move from backend basics to full-stack development. Take features from requirement to deployment, and help newer teammates the way my seniors help me now."
      }
    ],
    learning: [
      "JavaScript — async patterns and cleaner DOM handling",
      "PHP and server-side application structure",
      "SQL — joins, indexing, and writing maintainable queries",
      "Version control workflow on a shared team repository",
      "Testing habits — automated checks instead of manual-only confidence"
    ]
  },

  /* ---------------------------------------------------------
     10. FINAL REFLECTION
     Written to be edited. Keep it true to your own experience.
     --------------------------------------------------------- */
  reflection: [
    "Building this portfolio changed how I think about showing my work. I started by thinking the goal was to list what I know. What I have taken from building it is that a reviewer mostly wants to know how I think — how I break a problem down, how I check my own work, and whether what I claim is actually true.",
    "The part that surprised me was how much the unglamorous work matters. Writing accessible markup, checking a layout at 320 pixels, and making sure a form reports failure honestly all took longer than the styling did. None of it looks impressive in a screenshot, and all of it is the difference between something that works and something that merely appears to.",
    "Learning to treat security and verification as defaults rather than extras was the other big shift. Every form and every piece of user input is a place where things can go wrong quietly, so I now ask how it fails before I ask how it looks.",
    "I still have clear gaps. I want to be much stronger in JavaScript, disciplined about testing, and better at explaining trade-offs clearly out loud. My next goal is simple: an internship where I can ship reviewed code with a team, and keep this page honest as I get there."
  ],

  /* ---------------------------------------------------------
     11. CONTACT
     --------------------------------------------------------- */
  contact: {
    intro:
      "Best for internships, junior roles, and technical questions. If you have a role in mind, send the stack and the location and I will reply with relevant project links.",
    formNote:
      "Your message is validated on the server and delivered by email. A success message appears only once the mail service confirms it accepted the message.",

    /* ---------------------------------------------------------------
       FORM RELAY — lets the contact form work on a STATIC host such as
       GitHub Pages, where PHP cannot run.

       1. Sign up free at  https://app.web3forms.com/onboarding/create
       2. Verify your email and copy the access key
       3. Paste it into accessKey below and commit

       The access key is designed to be public — it is meant to sit in the
       page source of a client-side form. It cannot read or delete anything
       in your account; it can only submit a message to your inbox.
       Leave it empty to fall back to the PHP endpoint in api/contact.php.
       --------------------------------------------------------------- */
    relay: {
      enabled: true,
      provider: "web3forms",
      endpoint: "https://api.web3forms.com/submit",
      accessKey: "ed071f54-1119-419d-8e8e-7960f9d611e4"   // <- your Web3Forms access key
    }
  }
};

// Expose for main.js
window.PORTFOLIO = PORTFOLIO;