/* ============================================================
   LIVE SQLITE EXPLORER
   ------------------------------------------------------------
   Loads SQLite compiled to WebAssembly (sql.js), fetches the real
   inventory_analytics.sql file from this repository, executes it,
   and runs the queries in the visitor's browser.

   Nothing is pre-rendered: every number shown is produced by SQLite
   at the moment the page opens. No data is sent anywhere.
   ============================================================ */
(function () {
  "use strict";

  const SQL_FILE = "projects/it-equipment-inventory/inventory_analytics.sql";
  const RUNTIME = "assets/vendor/sql-wasm.js";
  const WASM = "assets/vendor/sql-wasm.wasm";

  const $ = (s) => document.querySelector(s);
  const el = (id) => document.getElementById(id);

  const btn = el("dbOpen");
  const statusEl = el("dbStatus");
  const explorer = el("dbExplorer");
  const panel = el("dbPanel");
  const tabs = Array.from(document.querySelectorAll(".db-tab"));

  if (!btn || !explorer || !panel) return;

  let db = null; // { db, tables }
  let loading = false;
  let recordFilter = "";
  let recordSort = { col: 0, dir: 1 };

  /* ---------- helpers ---------- */

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  // Numbers -> thousands separated. Long values stay readable.
  function fmt(v) {
    if (v === null || v === undefined) return "&mdash;";
    if (typeof v === "number") return v.toLocaleString("en-PH");
    return escapeHtml(v);
  }

  function runQuery(sql) {
    const res = db.exec(sql);
    if (!res.length) return { columns: [], rows: [] };
    return { columns: res[0].columns, rows: res[0].values };
  }

  function renderTable(columns, rows, opts) {
    const o = opts || {};
    if (!rows.length) {
      return `<p class="db-empty">No rows returned.</p>`;
    }
    const head = columns
      .map((c, i) => {
        if (!o.sortable) return `<th scope="col">${escapeHtml(c)}</th>`;
        const active = recordSort.col === i;
        const arrow = active ? (recordSort.dir === 1 ? " &#9650;" : " &#9660;") : "";
        return `<th scope="col"><button type="button" class="db-sort${active ? " is-active" : ""}" data-col="${i}">${escapeHtml(c)}${arrow}</button></th>`;
      })
      .join("");
    const body = rows
      .map(
        (r) =>
          "<tr>" +
          r.map((v) => `<td>${fmt(v)}</td>`).join("") +
          "</tr>"
      )
      .join("");
    return `<div class="db-table-wrap"><table class="db-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
      <p class="db-count">${rows.length} row${rows.length === 1 ? "" : "s"}</p>`;
  }

  /* ---------- views ---------- */

  function viewKpi() {
    const r = runQuery(`
      SELECT COUNT(*)            AS "Asset records",
             SUM(quantity)        AS "Total units",
             SUM(quantity*unit_cost) AS "Acquisition value",
             SUM(maintenance_cost)   AS "Maintenance cost",
             SUM(CASE WHEN condition='Needs Repair' THEN 1 ELSE 0 END) AS "Needs repair",
             SUM(CASE WHEN warranty='No' THEN 1 ELSE 0 END)           AS "Out of warranty"
      FROM inventory_assets;`);

    const tiles = r.rows[0].map((v, i) => {
      const label = r.columns[i];
      const isMoney = /value|cost/i.test(label);
      const display = typeof v === "number" ? (isMoney ? "PHP " + v.toLocaleString("en-PH") : v.toLocaleString()) : v;
      return `<div class="db-tile"><span class="db-tile-label">${escapeHtml(label)}</span><strong>${display}</strong></div>`;
    }).join("");

    return `<div class="db-tiles">${tiles}</div>`;
  }

  function viewTypes() {
    const r = runQuery(`
      SELECT equipment_type, COUNT(*) AS records, SUM(quantity) AS units,
             ROUND(AVG(age_years),2) AS avg_age,
             SUM(quantity*unit_cost) AS acquisition_value,
             SUM(maintenance_cost) AS maintenance
      FROM inventory_assets GROUP BY equipment_type ORDER BY acquisition_value DESC;`);

    const bar = (v, max) => `<span class="db-bar" style="width:${max ? Math.max(3, (v / max) * 100) : 0}%"></span>`;
    const max = r.rows.length ? Math.max.apply(null, r.rows.map((x) => x[4])) : 0;

    const rows = r.rows
      .map(
        (x) =>
          `<tr><td><strong>${escapeHtml(x[0])}</strong>${bar(x[4], max)}</td>
             <td>${fmt(x[1])}</td><td>${fmt(x[2])}</td><td>${fmt(x[3])}</td>
             <td>PHP ${fmt(x[4])}</td><td>PHP ${fmt(x[5])}</td></tr>`
      )
      .join("");

    return `<p class="db-note">Ranked by acquisition value rather than row count &mdash; that is why routers lead even though projectors have more records.</p>
      <div class="db-table-wrap"><table class="db-table">
        <thead><tr><th>Type</th><th>Records</th><th>Units</th><th>Avg age</th><th>Acquisition value</th><th>Maintenance</th></tr></thead>
        <tbody>${rows}</tbody></table></div>
      <p class="db-count">${r.rows.length} equipment types</p>`;
  }

  function viewRisk() {
    const r = runQuery(`
      SELECT asset_id, equipment_type, brand, age_years, quantity,
             quantity*unit_cost AS acquisition_value, department
      FROM inventory_assets
      WHERE condition='Needs Repair' AND warranty='No'
      ORDER BY acquisition_value DESC;`);

    const age = runQuery(`
      SELECT COUNT(*) AS records, SUM(quantity) AS units, SUM(quantity*unit_cost) AS value
      FROM inventory_assets WHERE age_years >= 6;`);

    let html = `<div class="db-callout">
        <strong>${r.rows.length} record${r.rows.length === 1 ? "" : "s"} are both broken and uncovered.</strong>
        Filtering on condition <em>and</em> warranty turns a large worry into a short, fundable list.
      </div>`;

    html += `<h4 class="db-sub">Needs repair and out of warranty</h4>`;
    html += r.rows.length
      ? renderTable(r.columns, r.rows)
      : `<p class="db-empty">No records match both conditions.</p>`;

    html += `<h4 class="db-sub">Ageing asset base (6 years or older)</h4>
      <div class="db-tiles">
        <div class="db-tile"><span class="db-tile-label">Records</span><strong>${fmt(age.rows[0][0])}</strong></div>
        <div class="db-tile"><span class="db-tile-label">Units</span><strong>${fmt(age.rows[0][1])}</strong></div>
        <div class="db-tile"><span class="db-tile-label">Value at risk</span><strong>PHP ${fmt(age.rows[0][2])}</strong></div>
      </div>`;

    return html;
  }

  function viewRecords() {
    let sql =
      "SELECT asset_id, equipment_type, brand, condition, age_years, quantity, unit_cost, maintenance_cost, warranty, department FROM inventory_assets";
    const where = [];
    if (recordFilter) {
      where.push(
        "(equipment_type LIKE '%" + recordFilter.replace(/'/g, "''") + "%' OR brand LIKE '%" +
          recordFilter.replace(/'/g, "''") + "%' OR department LIKE '%" +
          recordFilter.replace(/'/g, "''") + "%')"
      );
    }
    if (where.length) sql += " WHERE " + where.join(" AND ");

    const cols = [
      "asset_id", "equipment_type", "brand", "condition", "age_years",
      "quantity", "unit_cost", "maintenance_cost", "warranty", "department"
    ];
    const col = cols[recordSort.col];
    sql += " ORDER BY " + col + (recordSort.dir === 1 ? " ASC" : " DESC");

    const r = runQuery(sql);
    const total = runQuery("SELECT COUNT(*) FROM inventory_assets").rows[0][0];

    return `<div class="db-controls">
        <label class="sr-only" for="dbFilter">Filter records</label>
        <input id="dbFilter" type="search" placeholder="Filter by type, brand or department&hellip;" value="${escapeHtml(recordFilter)}" />
        <span class="db-hint">Showing ${r.rows.length} of ${total} records &middot; click a column heading to sort</span>
      </div>` + renderTable(r.columns, r.rows, { sortable: true });
  }

  const VIEWS = { kpi: viewKpi, types: viewTypes, risk: viewRisk, records: viewRecords };

  function show(name) {
    if (!db) return;
    panel.innerHTML = VIEWS[name]();
    tabs.forEach((t) => {
      const on = t.dataset.view === name;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  /* ---------- boot the database ---------- */

  function loadSqlJs() {
    return new Promise((resolve, reject) => {
      if (window.initSqlJs) return resolve(window.initSqlJs);
      const s = document.createElement("script");
      s.src = RUNTIME;
      s.onload = () => (window.initSqlJs ? resolve(window.initSqlJs) : reject(new Error("runtime missing")));
      s.onerror = () => reject(new Error("could not load " + RUNTIME));
      document.head.appendChild(s);
    });
  }

  async function boot() {
    if (loading || db) return;
    loading = true;
    btn.disabled = true;
    setStatus("Loading the SQLite runtime…");

    try {
      const SQL = await loadSqlJs();
      setStatus("Building the database from the SQL file…");

      const res = await fetch(SQL_FILE);
      if (!res.ok) throw new Error("could not fetch " + SQL_FILE);
      const text = await res.text();

      const wasmBin = await fetch(WASM);
      if (!wasmBin.ok) throw new Error("could not fetch " + WASM);
      const bytes = await wasmBin.arrayBuffer();

      // initSqlJs resolves to the module; the Database class is on it.
      const sqlite = await SQL({ locateFile: () => WASM, sqlWasm: bytes });
      if (!sqlite || !sqlite.Database) throw new Error("SQLite runtime loaded but exposed no Database class");
      const database = new sqlite.Database();

      // The file creates the table, inserts the rows and then runs the queries.
      database.exec(text);

      const count = database.exec("SELECT COUNT(*) FROM inventory_assets;")[0].values[0][0];
      db = database;

      explorer.hidden = false;
      btn.textContent = "Rebuild the database";
      setStatus("Ready — " + count + " records loaded from " + SQL_FILE);
      show("kpi");
    } catch (err) {
      setStatus(
        "Could not start the live database: " +
          (err && err.message ? err.message : "unknown error") +
          ". The SQL file is still available in the repository."
      );
      btn.textContent = "Try again";
    } finally {
      loading = false;
      btn.disabled = false;
    }
  }

  /* ---------- events ---------- */

  btn.addEventListener("click", boot);
  explorer.addEventListener("click", (e) => {
    const tab = e.target.closest(".db-tab");
    if (tab) { show(tab.dataset.view); return; }
    const sortBtn = e.target.closest(".db-sort");
    if (sortBtn) {
      const col = Number(sortBtn.dataset.col);
      if (recordSort.col === col) recordSort.dir *= -1;
      else recordSort = { col: col, dir: 1 };
      show("records");
    }
  });

  panel.addEventListener("input", (e) => {
    if (e.target.id === "dbFilter") {
      recordFilter = e.target.value.trim();
      show("records");
      const box = document.getElementById("dbFilter");
      if (box) { box.focus(); box.setSelectionRange(box.value.length, box.value.length); }
    }
  });

  // Open automatically if the visitor deep-linked straight to it.
  if (window.location.hash === "#database") setTimeout(boot, 400);
})();