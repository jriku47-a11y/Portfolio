/* ============================================================
   PORTFOLIO — interactions and content rendering
   Vanilla JS, no dependencies.

   Everything visible is rendered from window.PORTFOLIO
   (js/content.js). To change the page, edit that file.
   ============================================================ */
(function () {
  "use strict";

  const CFG = window.PORTFOLIO || {};
  const P = CFG.personal || {};

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // Every section on this page is rendered from the config, so a single missing
  // browser API must never be able to stop the page from rendering. Guard it.
  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- small helpers ---------- */

  // Contact detail for fallback messages. Never hardcoded — it comes from config.
  const contactFallback = () =>
    P.email || "the contact form above";

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  const list = (items, cls) =>
    (items || [])
      .filter(Boolean)
      .map((t) => `<li>${t}</li>`)
      .join("");

  /* ============================================================
     RENDER — PERSONAL DETAILS
     ============================================================ */
  function renderPersonal() {
    const setText = (id, value) => {
      const n = document.getElementById(id);
      if (n && value) n.textContent = value;
    };
    const setLink = (id, href) => {
      const n = document.getElementById(id);
      if (n && href) n.href = href;
    };

    setLink("navGithub", P.github);
    setLink("heroGithub", P.github);
    setLink("heroLinkedin", P.linkedin);
    setLink("footGithub", P.github);
    setLink("footLinkedin", P.linkedin);
    setText("heroAvailability", P.availability);
    setText("heroLocation", P.location);

    // Email: shown only when explicitly enabled in config.
    if (P.showEmail && P.email) {
      const a = $("#heroEmailLink");
      a.href = "mailto:" + P.email;
      a.textContent = P.email;
      a.hidden = false;
    }

    // Deliberately no profile photograph anywhere on this site, so there is no
    // image element to populate.
  }

  /* ============================================================
     RENDER — ABOUT
     ============================================================ */
  function renderAbout() {
    const about = CFG.about || {};
    $("#aboutParagraphs").innerHTML = (about.paragraphs || [])
      .map((t) => `<p>${t}</p>`)
      .join("");
    $("#aboutStrengths").innerHTML = list(about.strengths);
    $("#aboutInterests").innerHTML = list(about.interests);
  }

  /* ============================================================
     RENDER — EDUCATION
     ============================================================ */
  function renderEducation() {
    const edu = CFG.education || {};
    $("#eduTimeline").innerHTML = (edu.items || [])
      .map(
        (it) => `<li>
          <strong>${it.title || ""}</strong><br />
          <span class="tl-school">${it.school || ""}</span>
          ${it.meta ? ` &middot; <span class="tl-meta">${it.meta}</span>` : ""}
          ${it.detail ? `<br /><span class="tl-detail">${it.detail}</span>` : ""}
        </li>`
      )
      .join("");
    $("#eduCoursework").innerHTML = list(edu.coursework);
  }

  /* ============================================================
     RENDER — SKILLS
     ============================================================ */
  function renderSkills() {
    const skills = CFG.skills || {};
    $("#skillsNote").textContent = skills.note || "";

    $("#skillsGrid").innerHTML = (skills.categories || [])
      .map(
        (c) => `<div class="card reveal">
          <div class="skill-head">
            <div class="icon" aria-hidden="true">${c.icon || "▪"}</div>
            <span class="level ${c.level || "beginner"}">${c.level || "beginner"}</span>
          </div>
          <h3 class="card-title">${c.name || ""}</h3>
          <ul class="skill-list">${(c.items || []).map((i) => `<li>${i}</li>`).join("")}</ul>
        </div>`
      )
      .join("");
  }

  /* ============================================================
     RENDER — PROJECTS
     Only `published: true` entries are rendered, so a reserved
     slot can never advertise a project that does not exist.
     ============================================================ */
  function renderProjects() {
    const projects = (CFG.projects || []).filter((p) => p.published);
    const host = $("#projectsList");
    host.innerHTML = "";

    if (!projects.length) {
      host.appendChild(
        el(
          "div",
          "card slot-card",
          "<h3>No published projects yet</h3><p>Add a project in <span class=\"mono\">js/content.js</span> and set <span class=\"mono\">published: true</span>.</p>"
        )
      );
      return;
    }

    projects.forEach((p, idx) => {
      const article = el("article", "card project-featured reveal" + (idx ? " spaced" : ""));

      /* ---- media / screenshot ---- */
      const media = el("div", "pf-media");
      if (p.screenshot) {
        media.classList.add("has-shot");
        media.innerHTML = `<img class="pf-shot" src="${p.screenshot}"
            alt="${p.title} — project screenshot" loading="lazy"
            onerror="this.parentElement.classList.remove('has-shot');this.remove()" />`;
      } else {
        // Neutral wireframe placeholder — shown when no real screenshot exists yet.
        media.innerHTML = `<div class="mock" aria-hidden="true">
            <div class="mock-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></div>
            <div class="mock-body">
              <div class="mock-line mid"></div><div class="mock-line"></div><div class="mock-line short"></div>
              <div class="mock-row"><div class="mock-btn"></div><div class="mock-btn alt"></div></div>
            </div>
          </div>
          <small class="mono media-note">Screenshot placeholder — add a real capture under assets/projects/</small>`;
      }

      /* ---- body ---- */
      const body = el("div", "pf-body");
      const links = [];
      if (p.file) links.push(`<a class="btn btn-accent btn-sm" href="${p.file}" download>${p.fileLabel || "Download data"} &#8595;</a>`);
      if (p.demo) links.push(`<a class="btn btn-primary btn-sm" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live Demo &#8599;</a>`);
      if (p.repo) links.push(`<a class="btn btn-ghost btn-sm" href="${p.repo}" target="_blank" rel="noopener noreferrer">Repository &#8599;</a>`);
      if (p.docs) links.push(`<a class="btn btn-ghost btn-sm" href="${p.docs}" target="_blank" rel="noopener noreferrer">${p.docsLabel || "Documentation"} &#8599;</a>`);

      const dl = (rows) =>
        `<dl>${rows
          .filter((r) => r[1])
          .map((r) => `<dt>${r[0]}</dt><dd>${r[1]}</dd>`)
          .join("")}</dl>`;

      const bullets = (arr) => (arr && arr.length ? `<ul>${arr.map((i) => `<li>${i}</li>`).join("")}</ul>` : "");
      const ordered = (arr) => (arr && arr.length ? `<ol>${arr.map((i) => `<li>${i}</li>`).join("")}</ol>` : "");

      body.innerHTML = `
        <div class="tag-row">
          <span class="tag">Project ${p.number} &middot; ${p.category || "Project"}</span>
          ${p.type ? `<span class="tag teal">${p.type}</span>` : ""}
        </div>
        <h3>${p.title || ""}</h3>
        ${p.overview ? `<p>${p.overview}</p>` : ""}
        ${p.problem || p.solution
          ? `<p><strong style="color:var(--text)">Problem:</strong> ${p.problem || ""}<br />
             <strong style="color:var(--text)">Solution:</strong> ${p.solution || ""}</p>`
          : ""}
        ${p.role ? `<p><strong style="color:var(--text)">My role:</strong> ${p.role}</p>` : ""}
        ${(p.technologies || []).length
          ? `<div class="tag-row">${p.technologies.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
          : ""}
        ${(p.features || []).length || p.process || (p.challenges || []).length || p.lessons || (p.results || []).length
          ? `<details class="case">
              <summary>Full case study: scope, process, challenges, lessons</summary>
              <div class="case-body">
                ${(p.results || []).length
                  ? `<h4 class="case-h">Results</h4>
                     <dl class="stat-grid">${p.results
                       .map((r) => `<div><dt>${r.label}</dt><dd>${r.value}</dd></div>`)
                       .join("")}</dl>`
                  : ""}
                ${p.features && p.features.length ? `<h4 class="case-h">Key features</h4>${bullets(p.features)}` : ""}
                ${p.process && p.process.length ? `<h4 class="case-h">Development process</h4>${ordered(p.process)}` : ""}
                ${(p.challenges || []).length
                  ? `<h4 class="case-h">Technical challenges &amp; solutions</h4>
                     ${p.challenges
                       .map(
                         (c) => `<div class="case-item">
                           <strong>Challenge:</strong> ${c.challenge}<br />
                           <strong>Solution:</strong> ${c.solution}
                         </div>`
                       )
                       .join("")}`
                  : ""}
                ${p.lessons ? dl([["Results & lessons learned", p.lessons]]) : ""}
              </div>
            </details>`
          : ""}
        ${links.length ? `<div class="btn-row">${links.join("")}</div>` : ""}
        ${p.demoNote ? `<p class="hint note-line">${p.demoNote}</p>` : ""}
        ${!links.length && !p.demoNote ? `<p class="hint">Links for this project have not been added yet.</p>` : ""}
      `;

      article.appendChild(media);
      article.appendChild(body);
      host.appendChild(article);
    });
  }

  /* ============================================================
     RENDER — PROBLEM-SOLVING CASES
     ============================================================ */
  function renderCases() {
    const cases = (CFG.cases || []).filter((c) => c.published);
    const host = $("#casesList");
    host.innerHTML = "";

    if (!cases.length) {
      host.appendChild(
        el("div", "acc-panel", "<p>No cases published yet. Add them in <span class=\"mono\">js/content.js</span> &rarr; <span class=\"mono\">cases</span>.</p>")
      );
      return;
    }

    cases.forEach((c, i) => {
      const item = el("div", "acc-item" + (i === 0 ? " open" : ""));
      const btn = el(
        "button",
        "acc-btn",
        `<span class="acc-num">#${String(i + 1).padStart(2, "0")}</span><span class="acc-title">${c.title || "Untitled case"}</span>`
      );
      btn.type = "button";
      btn.setAttribute("aria-expanded", i === 0 ? "true" : "false");

      const panel = el(
        "div",
        "acc-panel",
        `<div class="case-fields">
          ${c.symptoms ? `<p><strong>Symptoms:</strong> ${c.symptoms}</p>` : ""}
          ${c.investigation ? `<p><strong>Investigation:</strong> ${c.investigation}</p>` : ""}
          ${c.rootCause ? `<p><strong>Root cause:</strong> ${c.rootCause}</p>` : ""}
          ${c.solution ? `<p><strong>Solution:</strong> ${c.solution}</p>` : ""}
          ${c.tools ? `<p><strong>Tools used:</strong> ${c.tools}</p>` : ""}
          ${c.lesson ? `<p class="case-lesson"><strong>Lesson learned:</strong> ${c.lesson}</p>` : ""}
        </div>`
      );

      item.appendChild(btn);
      item.appendChild(panel);
      host.appendChild(item);
    });
  }

  /* ============================================================
     RENDER — CYBERSECURITY
     ============================================================ */
  function renderSecurity() {
    const sec = CFG.security || {};
    $("#secDisclaimer").textContent = sec.disclaimer || "";
    $("#secImplTitle").textContent = sec.implementedTitle || "";

    $("#secTopics").innerHTML = (sec.topics || [])
      .map(
        (t) => `<div class="card reveal">
          <h3 class="card-title">${t.name || ""}</h3>
          <p class="body-text">${t.body || ""}</p>
        </div>`
      )
      .join("");

    $("#secImplemented").innerHTML = (sec.implemented || [])
      .map(
        (i) => `<div class="impl-item">
          <strong>${i.label || ""}</strong>
          <p>${i.body || ""}</p>
        </div>`
      )
      .join("");
  }

  /* ============================================================
     RENDER — AI LITERACY
     ============================================================ */
  function renderAI() {
    const ai = CFG.ai || {};
    $("#aiStance").textContent = ai.stance || "";
    $("#aiRule").textContent = ai.verificationRule ? "“" + ai.verificationRule + "”" : "";

    $("#aiPrinciples").innerHTML = (ai.principles || [])
      .map(
        (p) => `<div class="card reveal">
          <div class="ai-step" aria-hidden="true">${p.label || ""}</div>
          <h3 class="card-title">${p.label || ""}</h3>
          <p class="body-text">${p.body || ""}</p>
        </div>`
      )
      .join("");

    $("#aiLogBody").innerHTML = (ai.log || [])
      .map(
        (r) => `<tr>
          <td>${r.tool || ""}</td><td>${r.purpose || ""}</td><td>${r.output || ""}</td>
          <td>${r.verification || ""}</td><td>${r.decision || ""}</td>
        </tr>`
      )
      .join("");
  }

  /* ============================================================
     RENDER — PROFESSIONAL PRESENCE
     ============================================================ */
  function renderPresence() {
    const cards = [
      {
        icon: "⌁",
        tag: "GitHub",
        tagClass: "",
        title: "The code behind every claim",
        body: "Repositories with real source, a setup section in the README, and commits that show how the work actually progressed. This is the first link a technical reviewer opens.",
        link: P.github,
        cta: "Open GitHub",
        ghost: "View portfolio repo",
        ghostHref: P.portfolioRepo
      },
      {
        icon: "◍",
        tag: "LinkedIn",
        tagClass: "teal",
        title: "A profile that reads professionally",
        body: "Professional headline, education, and skills listed consistently with what is on this page — so nothing here contradicts anything there.",
        link: P.linkedin,
        cta: "Open LinkedIn"
      }
    ];

    $("#presenceGrid").innerHTML = cards
      .map(
        (c) => `<div class="card reveal">
          <div class="skill-head">
            <div class="icon" aria-hidden="true">${c.icon}</div>
            <span class="tag ${c.tagClass}">${c.tag}</span>
          </div>
          <h3 class="card-title">${c.title}</h3>
          <p class="body-text">${c.body}</p>
          ${c.link ? `<p class="mono link-text">${c.link.replace(/^https?:\/\//, "")}</p>` : ""}
          <div class="btn-row">
            ${c.link ? `<a class="btn btn-primary btn-sm" href="${c.link}" target="_blank" rel="noopener noreferrer">${c.cta} &#8599;</a>` : ""}
            ${c.ghost ? `<a class="btn btn-ghost btn-sm" href="${c.ghostHref}" target="_blank" rel="noopener noreferrer">${c.ghost} &#8599;</a>` : ""}
          </div>
        </div>`
      )
      .join("");
  }

  /* ============================================================
     RENDER — RESUME
     Shows the real PDF only when one is marked available,
     otherwise an honest setup panel (never a broken link).
     ============================================================ */
  function renderResume() {
    const r = P.resume || {};
    const host = $("#resumeArea");

    if (!r.available) {
      host.innerHTML = `<div class="card slot-card reveal">
        <span class="tag grey">Resume</span>
        <h3 class="card-title">No resume uploaded yet</h3>
        <p class="body-text">
          I am not publishing a placeholder CV, because a portfolio should only show documents
          that are real and current.
        </p>
        <ol class="howto">
          <li>Export your resume as a single-page PDF.</li>
          <li>Save it as <span class="mono">assets/resume.pdf</span>.</li>
          <li>Open <span class="mono">js/content.js</span> and set
              <span class="mono">personal.resume.available</span> to <span class="mono">true</span>.</li>
        </ol>
        <p class="hint">A download button and an inline preview appear here automatically once that is done.</p>
      </div>`;
      return;
    }

    host.innerHTML = `<div class="resume-grid">
      <div class="resume-viewer reveal">
        <div class="resume-chrome" aria-hidden="true">
          <span class="resume-file"><span class="file-badge">PDF</span> ${r.label || "resume.pdf"}</span>
          <span class="resume-pages mono">1 page</span>
        </div>
        <iframe src="${r.file}#toolbar=0&navpanes=0&scrollbar=0&view=Fit&page=1"
                title="Resume PDF preview" loading="lazy"></iframe>
      </div>
      <div class="card reveal">
        <h3 class="card-title">${P.name} — Resume</h3>
        <p class="body-text">${P.role}<br />${P.location}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="${r.file}" download>Download PDF &#8595;</a>
          <a class="btn btn-ghost" href="${r.file}" target="_blank" rel="noopener noreferrer">Open Full Screen &#8599;</a>
        </div>
        <ul class="tick-list" style="margin-top:1rem">
          <li>Single page with clear headings and real contact details</li>
          <li>Matches the skills and projects listed on this page</li>
          <li>Suitable for recruiters, panelists, and coordinators</li>
        </ul>
      </div>
    </div>`;

    const heroBtn = $("#heroResumeBtn");
    heroBtn.hidden = false;
    heroBtn.href = r.file;
    heroBtn.setAttribute("download", "");
    heroBtn.textContent = "Download Resume";
  }

  /* ============================================================
     RENDER — CAREER + REFLECTION
     ============================================================ */
  function renderCareer() {
    const c = CFG.career || {};
    $("#careerTarget").textContent = c.target || "";
    $("#careerRoadmap").innerHTML = (c.steps || [])
      .map(
        (s) => `<div class="road-step${s.current ? " now" : ""}">
          <time>${s.when || ""}</time>
          <div>
            <strong>${s.title || ""}</strong>
            <p>${s.detail || ""}</p>
          </div>
        </div>`
      )
      .join("");
    $("#careerLearning").innerHTML = list(c.learning);
  }

  function renderReflection() {
    $("#reflectionBody").innerHTML = (CFG.reflection || []).map((t) => `<p>${t}</p>`).join("");
  }

  /* ============================================================
     RENDER — CONTACT
     Only publishes what the owner explicitly enabled.
     ============================================================ */
  function renderContact() {
    const cc = CFG.contact || {};
    $("#contactIntro").textContent = cc.intro || "";
    $("#formNote").textContent = cc.formNote || "";

    const rows = [
      { icon: "📍", label: "Location", value: P.location, href: "" },
      { icon: "◍", label: "LinkedIn", value: P.linkedin, href: P.linkedin },
      { icon: "⌁", label: "GitHub", value: P.github, href: P.github },
      { icon: "⑂", label: "Portfolio repository", value: P.portfolioRepo, href: P.portfolioRepo }
    ];
    if (P.showEmail && P.email) rows.splice(2, 0, { icon: "✉️", label: "Email", value: P.email, href: "mailto:" + P.email });
    if (P.showPhone && P.phone) rows.push({ icon: "📞", label: "Phone", value: P.phone, href: "tel:" + P.phone });

    $("#contactChannels").innerHTML = rows
      .map((r) => {
        const shown = r.href ? `<a href="${r.href}" target="_blank" rel="noopener noreferrer">${r.value}</a>` : r.value;
        return `<li><span class="ch-icon" aria-hidden="true">${r.icon}</span>
          <span class="ch-label">${r.label}</span>
          <span class="ch-value">${shown}</span></li>`;
      })
      .join("");
  }

  /* ============================================================
     BEHAVIOUR
     ============================================================ */

  function initFooter() {
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initMobileMenu() {
    const btn = $("#menuBtn");
    const menu = $("#mobileMenu");
    if (!btn || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    btn.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  function initActiveNav() {
    const links = $$("[data-nav]");
    const sections = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = "#" + e.target.id;
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
  }

  function initReveal() {
    const nodes = $$(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    nodes.forEach((n) => obs.observe(n));
  }

  function initAccordions() {
    // Case accordions
    $$(".acc-item").forEach((item) => {
      const btn = item.querySelector(".acc-btn");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        $$(".acc-item.open").forEach((o) => {
          o.classList.remove("open");
          const b = o.querySelector(".acc-btn");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ============================================================
     THEME TOGGLE
     The <head> script sets data-theme before first paint. Here we
     wire the button: flip the theme, remember the choice, and keep
     following the OS setting until the visitor chooses explicitly.
     ============================================================ */
  const THEME_KEY = "theme";

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function initTheme() {
    const btn = $("#themeToggle");
    const root = document.documentElement;

    const label = () => {
      if (!btn) return;
      const dark = currentTheme() === "dark";
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("title", dark ? "Switch to light theme" : "Switch to dark theme");
    };

    label();

    if (btn) {
      btn.addEventListener("click", () => {
        const next = currentTheme() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage blocked */ }
        label();
      });
    }

    // Follow the OS only while the visitor has not made an explicit choice.
    if (typeof window.matchMedia === "function") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = (e) => {
        let saved = null;
        try { saved = localStorage.getItem(THEME_KEY); } catch (err) { /* storage blocked */ }
        if (saved) return;
        root.setAttribute("data-theme", e.matches ? "dark" : "light");
        label();
      };
      if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
      else if (typeof mq.addListener === "function") mq.addListener(onChange);
    }
  }

  function initBackToTop() {
    const btn = $("#toTop");
    if (!btn) return;
    const onScroll = () => btn.classList.toggle("show", window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
    );
  }

  /* ---------- contact form ---------- */
  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;

    const status = $("#formStatus");
    const sendBtn = $("#sendBtn");
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // NOTE: never read fields as `form.name` / `form.email`. HTMLFormElement has its
    // own `name`, `action`, `method` and `target` IDL attributes, and those win over
    // the form's named controls — so `form.name` is the form's name attribute, not
    // the input called "name". Always go through form.elements.
    const field = (n) => form.elements.namedItem(n);

    const setInvalid = (name, invalid) => {
      const f = form.querySelector(`[data-field="${name}"]`);
      if (f) f.classList.toggle("invalid", invalid);
    };

    const fail = (msg) => {
      status.className = "form-status err";
      status.textContent = msg;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = field("name").value.trim();
      const email = field("email").value.trim();
      const subject = field("subject").value.trim();
      const message = field("message").value.trim();
      const honeyNode = field("_honey");
      const honey = honeyNode ? honeyNode.value : "";

      let ok = true;
      setInvalid("name", !name); if (!name) ok = false;
      const emailOk = EMAIL_RE.test(email);
      setInvalid("email", !emailOk); if (!emailOk) ok = false;
      setInvalid("subject", !subject); if (!subject) ok = false;
      const msgOk = message.length >= 10;
      setInvalid("message", !msgOk); if (!msgOk) ok = false;

      if (!ok) {
        fail("Please fix the highlighted fields. The message needs at least 10 characters.");
        return;
      }

      sendBtn.disabled = true;
      sendBtn.textContent = "Sending…";
      status.className = "form-status sending";
      status.textContent = "Sending your message…";

      try {
        // Server-side delivery. A success message is shown ONLY when the
        // mail service confirms the message was accepted.
        const res = await fetch("api/contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, subject, message, _honey: honey })
        });

        let json = {};
        try { json = await res.json(); } catch (_) { /* non-JSON response */ }

        if (res.ok && json && json.ok) {
          status.className = "form-status ok";
          status.textContent =
            "Message accepted for delivery. I will reply from " + (P.email || "my listed email") + ".";
          form.reset();
          return;
        }
        if (res.status === 422) { fail((json && json.error) || "Please check the highlighted fields."); return; }
        if (res.status === 429) { fail("Too many messages from this device. Please try again later."); return; }
        if (res.status === 501) { fail(notConfiguredMsg()); return; }

        // Any other failure: say so plainly. Never claim success.
        fail(
          (json && json.error) ||
            "Your message was not sent. Please try again, or reach me through " +
              (P.linkedin ? "LinkedIn" : contactFallback()) +
              "."
        );
      } catch (err) {
        fail(
          "The message was not sent — the mail service could not be reached. Please try again, or reach me through " +
            (P.linkedin ? "LinkedIn" : contactFallback()) +
            "."
        );
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send Message";
      }
    });

    function notConfiguredMsg() {
      return (
        "The contact form is not connected to a mail service on this host yet. " +
        "Please reach me through " + (P.linkedin ? "my LinkedIn profile" : contactFallback()) + " instead."
      );
    }

    // Clear the error state as soon as the visitor edits a field.
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        const wrap = input.closest(".field");
        if (wrap) wrap.classList.remove("invalid");
      });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    renderPersonal();
    renderAbout();
    renderEducation();
    renderSkills();
    renderProjects();
    renderCases();
    renderSecurity();
    renderAI();
    renderPresence();
    renderResume();
    renderCareer();
    renderReflection();
    renderContact();

    initFooter();
    initMobileMenu();
    initActiveNav();
    initReveal();
    initAccordions();
    initTheme();
    initBackToTop();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();