/* ===========================================================================
 * app.js — prototype controller
 *
 * Single-page, no framework, no build step. This is itself an inclusive-design
 * choice: the whole app is a few small static files that load instantly on a
 * slow connection and keep working with no server, mirroring the offline-first
 * requirement for AZC connectivity.
 *
 * State is held in memory and mirrored to a tiny in-memory "store" so the demo
 * can show Save & resume without depending on browser storage being available.
 * ======================================================================== */

const App = (() => {
  /* ---- state ---- */
  const state = {
    lang: "ti",
    lowData: false,
    onboardStep: 0,
    screen: "language",          // language | onboard | home | asylum | bsn | bank
    tasks: { asylum: "todo", bsn: "todo", bank: "todo" },
    form: {},                    // bsn form values
    bsn: null,                   // issued number
    iban: null,
    savedDraft: null,            // snapshot for Save & resume
    /* ---- added in the post-cognitive-walkthrough revision ---- */
    showNotes: true,             // review-annotation (sticky note) layer on by default
    errors: {},                  // inline, in-language field validation (CW Task 2 Q4)
    showDefs: { basic: false, iban: false }, // tap-to-explain jargon (CW Task 3 Q3)
    bankExpanded: false          // single recommended bank, others behind a tap (CW Task 3 Q2)
  };

  const root = () => document.getElementById("app");
  const T = (k) => t(k, state.lang);

  /* ---- helpers ---- */
  function setDir() {
    const dir = LANGS[state.lang].dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = state.lang;
  }
  function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = ICON.check + `<span>${msg}</span>`;
    root().appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
  function go(screen) { state.screen = screen; render(); window.scrollTo(0, 0); }

  /* Sticky review-note: a yellow annotation pinned next to a changed element,
     stating the cognitive-walkthrough finding and the change we made. Shown only
     when the "Show changes" layer is on (body.notes-on), so the clean prototype
     can still be demoed. Notes are written in English: they are meta-annotations
     for the evaluators/markers, not part of Yonas's interface. */
  function sticky(text) {
    return `
      <div class="sticky" role="note">
        <span class="num">${ICON.note}</span>
        <span class="sbody">${text}</span>
      </div>`;
  }

  /* ---- chrome (topbar + status strip) shared across app screens ---- */
  function chrome(inner, { showBack = false, backTo = "home" } = {}) {
    const backBtn = showBack
      ? `<button class="iconbtn" data-act="back" data-to="${backTo}" aria-label="${T("back")}">
           <svg class="flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>
         </button>`
      : `<span class="brandmark" aria-hidden="true">${ICON.shield}</span>`;

    return `
      <div class="topbar">
        ${backBtn}
        <div class="brand"><b>${T("app_name")}</b><span>${T("app_subtitle")}</span></div>
        <div class="spacer"></div>
        <button class="iconbtn" data-act="lang" aria-label="${T("globe")}">${ICON.globe}</button>
        <button class="iconbtn" data-act="help" aria-label="${T("help_button")}">${ICON.help}</button>
      </div>
      <div class="statusstrip">
        <span class="pill"><span class="dot"></span>${T("offline_badge")}</span>
        <button class="pill toggle" data-act="lowdata" aria-pressed="${state.lowData}">${ICON.wifiOff}${T("low_data")}</button>
        <button class="pill toggle notes" data-act="notes" aria-pressed="${state.showNotes}">${ICON.note}${state.showNotes ? T("notes_hide") : T("notes_show")}</button>
      </div>
      ${inner}`;
  }

  /* =======================================================================
   * SCREEN: language picker (entry)
   * ===================================================================== */
  function viewLanguage() {
    const grid = Object.keys(LANGS).map(code => `
      <button class="langbtn" data-act="setlang" data-code="${code}" aria-pressed="${state.lang === code}">
        <b>${LANGS[code].name}</b><small>${LANGS[code].english}</small>
      </button>`).join("");
    return `
      <div class="topbar">
        <span class="brandmark" aria-hidden="true">${ICON.globe}</span>
        <div class="brand"><b>${T("app_name")}</b><span>${T("app_subtitle")}</span></div>
      </div>
      <div class="screen">
        <h1 class="title">Choose your language</h1>
        <p class="lead">ቋንቋ ምረጹ · اختر اللغة · Kies een taal</p>
        <div class="langgrid">${grid}</div>
        <div style="flex:1"></div>
        <button class="btn primary" data-act="toOnboard">${T("next")} ${ICON.arrow}</button>
      </div>`;
  }

  /* =======================================================================
   * SCREEN: onboarding walkthrough (could-have)
   * ===================================================================== */
  function viewOnboard() {
    const steps = [
      { art: ICON.hand,   title: "ob1_title", body: "ob1_body" },
      { art: ICON.step,   title: "ob2_title", body: "ob2_body" },
      { art: ICON.help,   title: "ob3_title", body: "ob3_body" }
    ];
    const s = steps[state.onboardStep];
    const dots = steps.map((_, i) => `<i class="${i === state.onboardStep ? "on" : ""}"></i>`).join("");
    const last = state.onboardStep === steps.length - 1;
    return chrome(`
      <div class="screen">
        <div class="onboard">
          <div class="art">${s.art}</div>
          <h1>${T(s.title)}</h1>
          <p>${T(s.body)}</p>
          <div class="dots">${dots}</div>
        </div>
      </div>
      <div class="footer">
        <button class="btn ghost narrow" data-act="skipOnboard" aria-label="${T("skip")}">${T("skip")}</button>
        <button class="btn primary" data-act="${last ? "finishOnboard" : "nextOnboard"}">
          ${last ? T("start") : T("next")} ${ICON.arrow}
        </button>
      </div>`);
  }

  /* =======================================================================
   * SCREEN: home / task hub
   * ===================================================================== */
  function statusTag(key) {
    const map = {
      todo:     ["todo",     ICON.step,  "status_todo"],
      progress: ["progress", ICON.clock, "status_progress"],
      done:     ["done",     ICON.check, "status_done"],
      locked:   ["locked",   ICON.lock,  "locked"]
    };
    const [cls, ic, label] = map[key];
    return `<span class="statustag ${cls}">${ic}${T(label)}</span>`;
  }

  function taskCard({ id, icon, title, sub, status, locked }) {
    const tag = locked ? statusTag("locked") : statusTag(status);
    const active = !locked && status === "progress";
    return `
      <button class="taskcard ${active ? "active" : ""}" data-act="task" data-id="${id}" ${locked ? "disabled" : ""}>
        <span class="glyph">${icon}</span>
        <span class="meta">
          <b>${T(title)}</b>
          <small>${T(sub)}</small>
          ${tag}
        </span>
        ${locked ? `<span class="chev">${ICON.lock}</span>` : `<span class="chev">${ICON.chevron}</span>`}
      </button>`;
  }

  function viewHome() {
    const { asylum, bsn, bank } = state.tasks;
    const bsnLocked = asylum !== "done";
    const bankLocked = bsn !== "done";
    const doneCount = Object.values(state.tasks).filter(s => s === "done").length;
    const nodes = [asylum, bsn, bank].map(s =>
      `<span class="node ${s === "done" ? "done" : ""}"></span>`).join("");
    const rail = `<div class="track">${nodes}</div><span class="count">${doneCount}/3</span>`;

    const allDone = doneCount === 3;
    const banner = allDone ? `
      <div class="card" style="border-color:var(--ok);background:var(--ok-bg)">
        <b style="font-size:1.15rem;color:var(--ok)">${T("all_done")}</b>
        <span style="color:var(--ink-soft)">${T("all_done_sub")}</span>
      </div>` : "";

    return chrome(`
      <div class="screen">
        <h1 class="title">${T("home_heading")}</h1>
        <div class="rail">${rail}</div>
        ${banner}
        ${taskCard({ id:"asylum", icon:ICON.asylum, title:"task_asylum", sub:"task_asylum_sub", status:asylum })}
        ${taskCard({ id:"bsn", icon:ICON.id, title:"task_bsn", sub:"task_bsn_sub", status:bsn, locked:bsnLocked })}
        ${taskCard({ id:"bank", icon:ICON.bank, title:"task_bank", sub:"task_bank_sub", status:bank, locked:bankLocked })}
        ${state.savedDraft ? `<button class="btn amber" data-act="resume">${ICON.doc}${T("continue_saved")}</button>` : ""}
      </div>
      <div class="footer">
        <button class="btn primary" data-act="help">${ICON.help}${T("help_button")}</button>
      </div>`);
  }

  /* =======================================================================
   * SCREEN: asylum (task 1) — checklist + redirect to IND
   * ===================================================================== */
  function viewAsylum() {
    const item = (ic, key) => `<li><span class="ico">${ic}</span><span>${T(key)}</span></li>`;
    const step = (n, key) => `<li><span class="stepnum">${n}</span><span>${T(key)}</span></li>`;
    return chrome(`
      <div class="screen">
        <h1 class="title">${T("asylum_title")}</h1>
        <p class="lead">${T("asylum_intro")}</p>
        <div class="card">
          <b class="section-label">${T("asylum_check")}</b>
          <ul class="checklist">
            ${item(ICON.id, "asylum_doc1")}
            ${item(ICON.doc, "asylum_doc2")}
            ${item(ICON.help, "asylum_doc3")}
          </ul>
        </div>

        ${sticky("The bare redirect was the main exclusion point. Once Yonas left, the language-first protection disappeared. Added an in-app, in-language explainer of exactly what happens on the IND site (illustrated step list + what to bring) before he leaves.")}
        <div class="card">
          <b class="section-label">${ICON.doc}${T("asylum_explainer_title")}</b>
          <p class="lead">${T("asylum_explainer_intro")}</p>
          <ol class="steplist">
            ${step(1, "asylum_step1")}
            ${step(2, "asylum_step2")}
            ${step(3, "asylum_step3")}
            ${step(4, "asylum_step4")}
          </ol>
          <b class="section-label" style="font-size:.98rem">${T("asylum_bring")}</b>
          <ul class="checklist compact">
            ${item(ICON.id, "asylum_doc1")}
            ${item(ICON.doc, "asylum_doc2")}
            ${item(ICON.asylum, "asylum_doc3")}
          </ul>
        </div>

        <div class="card accent">
          <button class="btn ghost" data-act="indlink">${ICON.external}${T("asylum_ready")}</button>
          <span class="hint">${T("asylum_redirect_note")}</span>
        </div>

        ${sticky("Added a prominent in-language &lsquo;Talk to a person / interpreter&rsquo; shortcut here. The walkthrough flagged the IND hand-off as where Yonas is most likely to stall.")}
        <button class="btn ghost" data-act="help">${ICON.phone}${T("talk_person")}</button>

        ${sticky("Re-labelled the ambiguous &lsquo;I have applied for asylum&rsquo; button so it names the checklist action, and added a confirmation step explaining that it does not send anything to the IND. This removes the false-completed risk.")}
        <p class="sendnote">${ICON.shield}${T("asylum_confirm_note")}</p>
      </div>
      <div class="footer">
        <button class="btn primary" data-act="askConfirmAsylum">${ICON.check}${T("asylum_confirm")}</button>
      </div>`, { showBack: true });
  }

  /* =======================================================================
   * SCREEN: BSN form (task 2)
   * ===================================================================== */
  function field(name, labelKey, icon, { type = "text", required = true, hint } = {}) {
    const v = state.form[name] || "";
    const err = state.errors[name];
    return `
      <div class="field ${err ? "has-error" : ""}">
        <label>${icon}${T(labelKey)} ${required ? `<span class="req">• ${T("required")}</span>` : ""}</label>
        <input type="${type}" data-field="${name}" value="${v}" placeholder="" />
        ${err ? `<span class="errmsg">${ICON.info}${T(err)}</span>` : ""}
        ${hint ? `<span class="hint">${T(hint)}</span>` : ""}
      </div>`;
  }

  /* Localised date-of-birth picker (CW Task 2 Q2/Q3). Replaces the native
     <input type=date>, which rendered in an East-Asian locale (年/月/日) and
     assumed an exact Gregorian date. Three tap-to-choose selects with month
     names in the chosen language, plus an "I'm not sure of the exact day"
     option so a user who knows only the year (Ge'ez calendar) can still proceed. */
  function dobPicker() {
    const unsure = !!state.form.dobUnsure;
    const err = state.errors.dob;
    const opt = (val, lbl, cur) => `<option value="${val}" ${String(cur) === String(val) ? "selected" : ""}>${lbl}</option>`;
    const sel = (name, options, lock) => `
      <select data-field="${name}" ${lock ? "disabled" : ""}>
        <option value="">—</option>
        ${options.map(([val, lbl]) => opt(val, lbl, state.form[name] || "")).join("")}
      </select>`;
    const days = Array.from({ length: 31 }, (_, i) => [i + 1, i + 1]);
    const months = Array.from({ length: 12 }, (_, i) => [i + 1, T("month_" + (i + 1))]);
    const nowY = new Date().getFullYear();
    const years = [];
    for (let y = nowY - 14; y >= nowY - 90; y--) years.push([y, y]);
    return `
      <div class="field ${err ? "has-error" : ""}">
        <label>${ICON.calendar}${T("f_dob")} <span class="req">• ${T("required")}</span></label>
        <div class="dobgrid">
          <span class="dobcol"><small>${T("dob_day")}</small>${sel("dobDay", days, unsure)}</span>
          <span class="dobcol"><small>${T("dob_month")}</small>${sel("dobMonth", months, unsure)}</span>
          <span class="dobcol"><small>${T("dob_year")}</small>${sel("dobYear", years, false)}</span>
        </div>
        <button class="chip wide ${unsure ? "on" : ""}" data-act="dobUnsure" aria-pressed="${unsure}">
          ${unsure ? ICON.check : ICON.calendar}${T("dob_unsure")}
        </button>
        <span class="hint">${T("dob_unsure_hint")}</span>
        ${err ? `<span class="errmsg">${ICON.info}${T(err)}</span>` : ""}
      </div>`;
  }

  /* Country of birth (CW Task 2 Q2): tap-to-choose dropdown with each country
     shown in Tigrinya / Arabic / English, instead of a free-text box that
     silently required Latin-script typing. Common origin countries are listed
     first; "Another country" is the fallback. */
  function countrySelect() {
    const countries = [
      ["Eritrea",     "ኤርትራ · إريتريا · Eritrea"],
      ["Ethiopia",    "ኢትዮጵያ · إثيوبيا · Ethiopia"],
      ["Sudan",       "ሱዳን · السودان · Sudan"],
      ["South Sudan", "ደቡብ ሱዳን · جنوب السودان · South Sudan"],
      ["Somalia",     "ሶማልያ · الصومال · Somalia"],
      ["Syria",       "ሶርያ · سوريا · Syria"],
      ["Iraq",        "ዒራቕ · العراق · Iraq"],
      ["Yemen",       "የመን · اليمن · Yemen"],
      ["Afghanistan", "ኣፍጋኒስታን · أفغانستان · Afghanistan"],
      ["Iran",        "ኢራን · إيران · Iran"]
    ];
    const v = state.form.country || "";
    return `
      <div class="field">
        <label>${ICON.globe}${T("f_country")}</label>
        <select data-field="country">
          <option value="">${T("f_country_pick")}</option>
          ${countries.map(([val, lbl]) => `<option value="${val}" ${v === val ? "selected" : ""}>${lbl}</option>`).join("")}
          <option value="__other" ${v === "__other" ? "selected" : ""}>${T("country_other")}</option>
        </select>
      </div>`;
  }
  function selectField(name, labelKey, icon, options) {
    const v = state.form[name] || "";
    const opts = options.map(([val, lbl]) =>
      `<option value="${val}" ${v === val ? "selected" : ""}>${T(lbl)}</option>`).join("");
    return `
      <div class="field">
        <label>${icon}${T(labelKey)}</label>
        <select data-field="${name}"><option value="">—</option>${opts}</select>
      </div>`;
  }

  function viewBsn() {
    if (state.bsn) return viewBsnSuccess();
    const genChips = [["male","g_male"],["female","g_female"],["other","g_other"]].map(([v,l]) =>
      `<button class="chip" data-act="gender" data-v="${v}" aria-pressed="${state.form.gender===v}">${T(l)}</button>`).join("");
    const filled = !!state.form.docPhoto;
    return chrome(`
      <div class="screen">
        <h1 class="title">${T("bsn_title")}</h1>
        <p class="lead">${T("bsn_intro")}</p>
        ${state.errors._summary ? `<div class="card errbanner">${ICON.info}<span>${T("err_summary")}</span></div>` : ""}
        ${field("given", "f_given", ICON.person)}
        ${field("family", "f_family", ICON.person)}

        ${sticky("The native date control rendered in an East-Asian locale (年/月/日) and assumed an exact Gregorian date. Replaced with a localised Day/Month/Year picker (month names in the chosen language) plus an &lsquo;I&rsquo;m not sure of the exact day&rsquo; option for the Ge&lsquo;ez-calendar reality.")}
        ${dobPicker()}

        ${sticky("&lsquo;Country of birth&rsquo; was a free-text box that silently required Latin typing. It is now a tap-to-choose dropdown showing countries in Tigrinya, Arabic and English.")}
        ${countrySelect()}

        <div class="field">
          <label>${ICON.person}${T("f_gender")}</label>
          <div class="chips">${genChips}</div>
        </div>
        <div class="field">
          <label>${ICON.asylum}${T("f_coa")}</label>
          <select data-field="coa">
            <option value="">—</option>
            ${["Ter Apel","Budel","Gilze","Amsterdam","Rotterdam"]
              .map(c => `<option value="${c}" ${state.form.coa===c?"selected":""}>${c}</option>`).join("")}
          </select>
        </div>

        ${sticky("Made the photo step resilient on an unstable AZC connection: it now shows a confirmation thumbnail, a one-tap retake, and a note that the image is automatically compressed (low-data).")}
        <div class="field ${state.errors.docPhoto ? "has-error" : ""}">
          <label>${ICON.camera}${T("f_doc_upload")} <span class="req">• ${T("required")}</span></label>
          <button class="uploadtile ${filled ? "filled" : ""}" data-act="upload">
            ${filled ? `<span class="thumb">${ICON.id}</span>` : ICON.camera}
            <span>${filled ? T("photo_added") + " ✓" : T("take_photo")}</span>
            ${filled ? `<small class="retake">${ICON.retry}${T("photo_retake")}</small>` : ""}
          </button>
          <span class="hint">${T("photo_lowdata")}</span>
          ${state.errors.docPhoto ? `<span class="errmsg">${ICON.info}${T("err_photo")}</span>` : ""}
        </div>

        ${sticky("Split the single combined button into two distinct actions: &lsquo;Save for later&rsquo; and &lsquo;Send my application&rsquo;. Added a one-line note saying exactly what is sent and to whom.")}
        <p class="sendnote">${ICON.shield}${T("send_note")}</p>
      </div>
      <div class="footer two">
        <button class="btn ghost" data-act="save">${ICON.doc}${T("save_for_later")}</button>
        <button class="btn primary" data-act="submitBsn">${ICON.id}${T("send_application")}</button>
      </div>`, { showBack: true });
  }

  function viewBsnSuccess() {
    const holder = [state.form.given, state.form.family].filter(Boolean).join(" ") || "—";
    return chrome(`
      <div class="screen">
        <div class="success">
          <div class="seal">${ICON.check}</div>
          <h1 class="title">${T("bsn_issued")}</h1>
        </div>
        <div class="credential">
          <div class="pattern"></div>
          <div class="crow">${ICON.badge}<span>BSN · Nederland</span></div>
          <div class="clabel">Burgerservicenummer</div>
          <div class="cnum">${state.bsn}</div>
          <div class="cfoot">
            <span><small>${T("c_holder")}</small>${holder}</span>
            <span style="text-align:end"><small>${T("bsn_valid")}</small>${state.bsnExpiry}</span>
          </div>
        </div>
        <p class="lead" style="text-align:center">${T("bsn_what_now")}</p>
      </div>
      <div class="footer">
        <button class="btn primary" data-act="goBankFromBsn">${ICON.bank}${T("task_bank")} ${ICON.arrow}</button>
      </div>`, { showBack: true });
  }

  /* =======================================================================
   * SCREEN: bank (task 3)
   * ===================================================================== */
  function viewBank() {
    if (state.iban) return viewBankSuccess();
    const banks = [
      ["bank-basis", "Basisbank", "bank_basis_desc", true],
      ["bank-volk",  "Volksbank", "bank_volk_desc",  false],
      ["bank-stad",  "Stadsbank", "bank_stad_desc",  false]
    ];
    const chosen = state.form.bank || "";
    const visible = state.bankExpanded ? banks : banks.filter(b => b[3]);
    const list = visible.map(([v, label, descKey, rec]) => `
      <button class="taskcard ${chosen===v?'active':''}" data-act="pickbank" data-v="${v}">
        <span class="glyph">${ICON.bank}</span>
        <span class="meta">
          <b>${label} ${rec ? `<span class="rec">${T("bank_recommended")}</span>` : ""}</b>
          <small>${T(descKey)}</small>
        </span>
        <span class="chev" style="color:var(--blue-700)">${chosen===v ? ICON.check : ICON.chevron}</span>
      </button>`).join("");
    const moreBtn = state.bankExpanded ? "" :
      `<button class="btn ghost" data-act="moreBanks">${ICON.chevron}${T("bank_more")}</button>`;
    const defRow = (act, qKey, aKey, open) => `
      <button class="defrow" data-act="${act}" aria-expanded="${open}">
        ${ICON.info}<span>${T(qKey)}</span><span class="defchev ${open?"open":""}">${ICON.chevron}</span>
      </button>
      ${open ? `<p class="lead defans">${T(aKey)}</p>` : ""}`;

    return chrome(`
      <div class="screen">
        <h1 class="title">${T("bank_title")}</h1>
        <p class="lead">${T("bank_intro")}</p>

        ${sticky("Added tap-to-explain definitions for the unexplained jargon &lsquo;basic account&rsquo; and &lsquo;IBAN&rsquo;, in the user&rsquo;s own language.")}
        <div class="card">
          ${defRow("defBasic", "bank_what_basic_q", "bank_what_basic_a", state.showDefs.basic)}
          ${defRow("defIban",  "bank_what_iban_q",  "bank_what_iban_a",  state.showDefs.iban)}
        </div>

        <div class="card ok">
          <div style="display:flex;align-items:center;gap:12px">
            <span class="checklist"><span class="ico" style="background:#bfe6cf;color:var(--ok)">${ICON.id}</span></span>
            <div><b>${T("bank_prefill")}</b><div style="font-weight:800;font-size:1.2rem;letter-spacing:2px;color:var(--navy-800);margin-top:4px;font-variant-numeric:tabular-nums">${state.bsn || ""}</div></div>
          </div>
        </div>

        <b class="section-label">${T("bank_choose")}</b>
        ${sticky("Providers no longer look identical with no basis to choose. One free option is now shown as &lsquo;Recommended&rsquo; with a plain-language one-liner, the others are behind &lsquo;See other banks&rsquo;. This removes the equal-options decision freeze.")}
        ${list}
        ${moreBtn}

        ${sticky("Added an explicit reassurance that this opens a free account (no money, no fee now), and that the bank can be changed later. Addresses anxiety about official commitments.")}
        <p class="sendnote">${ICON.shield}${T("bank_no_fee")}</p>

        ${sticky("Kept a prominent in-language &lsquo;Talk to a person / interpreter&rsquo; button on this screen so Yonas can verify before committing.")}
        <button class="btn ghost" data-act="help">${ICON.phone}${T("talk_person")}</button>
      </div>
      <div class="footer">
        <button class="btn primary" data-act="submitBank" ${chosen?"":"disabled"}>${ICON.bank}${T("bank_submit")}</button>
      </div>`, { showBack: true });
  }

  function viewBankSuccess() {
    const bankName = ({ "bank-basis":"Basisbank", "bank-volk":"Volksbank", "bank-stad":"Stadsbank" })[state.form.bank] || "Bank";
    return chrome(`
      <div class="screen">
        <div class="success">
          <div class="seal">${ICON.check}</div>
          <h1 class="title">${T("bank_done")}</h1>
        </div>
        <div class="credential bank">
          <div class="pattern"></div>
          <div class="crow">${ICON.card}<span>${T("bank_iban")}</span></div>
          <div class="cnum" style="font-size:1.3rem;letter-spacing:2px">${state.iban}</div>
          <div class="cfoot">
            <span><small>${T("c_bank")}</small>${bankName}</span>
            <span style="text-align:end"><small>BSN</small>${state.bsn || ""}</span>
          </div>
        </div>
        <p class="lead" style="text-align:center">${T("all_done_sub")}</p>
      </div>
      <div class="footer">
        <button class="btn primary" data-act="back" data-to="home">${ICON.check}${T("done")}</button>
      </div>`, { showBack: true });
  }

  /* =======================================================================
   * OVERLAYS: privacy popup, help sheet, language sheet
   * ===================================================================== */
  function privacyOverlay() {
    return `
      <div class="overlay" data-overlay="privacy">
        <div class="sheet" role="dialog" aria-modal="true" aria-label="${T("privacy_title")}">
          <span class="grip"></span>
          <h2>${ICON.shield}${T("privacy_title")}</h2>
          <p class="lead">${T("privacy_body")}</p>
          <button class="btn primary" data-act="agreePrivacy">${ICON.check}${T("privacy_agree")}</button>
        </div>
      </div>`;
  }
  function helpOverlay() {
    const row = (ic, t1, t2) => `
      <div class="helprow">
        <span class="ico">${ic}</span>
        <span class="meta"><b>${T(t1)}</b><small>${T(t2)}</small></span>
        <button class="call" data-act="noop">${ICON.phone}${T("help_call")}</button>
      </div>`;
    return `
      <div class="overlay" data-overlay="help">
        <div class="sheet" role="dialog" aria-modal="true" aria-label="${T("help_title")}">
          <span class="grip"></span>
          <h2>${ICON.help}${T("help_title")}</h2>
          ${row(ICON.asylum, "help_coa", "help_coa_sub")}
          ${row(ICON.person, "help_vw", "help_vw_sub")}
          <button class="btn ghost" data-act="noop">${ICON.globe}${T("help_interpreter")}</button>
          <button class="btn ghost" data-act="closeOverlay">${T("close")}</button>
        </div>
      </div>`;
  }
  function langOverlay() {
    const grid = Object.keys(LANGS).map(code => `
      <button class="langbtn" data-act="setlang" data-code="${code}" aria-pressed="${state.lang === code}">
        <b>${LANGS[code].name}</b><small>${LANGS[code].english}</small>
      </button>`).join("");
    return `
      <div class="overlay" data-overlay="lang">
        <div class="sheet" role="dialog" aria-modal="true" aria-label="language">
          <span class="grip"></span>
          <h2>${ICON.globe}Language</h2>
          <div class="langgrid">${grid}</div>
          <button class="btn ghost" data-act="closeOverlay">${T("close")}</button>
        </div>
      </div>`;
  }

  /* Confirmation before the asylum self-certification (CW Task 1 Q3/Q4):
     makes explicit that marking the step done does NOT file anything with the
     IND, so it cannot create a false sense that the claim is genuinely lodged. */
  function asylumConfirmOverlay() {
    return `
      <div class="overlay" data-overlay="asylumConfirm">
        <div class="sheet" role="dialog" aria-modal="true" aria-label="${T("asylum_confirm_q")}">
          <span class="grip"></span>
          <h2>${ICON.shield}${T("asylum_confirm_q")}</h2>
          <p class="lead">${T("asylum_confirm_note")}</p>
          <button class="btn primary" data-act="finishAsylum">${ICON.check}${T("yes_mark_done")}</button>
          <button class="btn ghost" data-act="closeOverlay">${T("not_yet")}</button>
        </div>
      </div>`;
  }

  /* ---- which overlay (if any) is open ---- */
  let overlay = null;

  /* =======================================================================
   * RENDER
   * ===================================================================== */
  function render() {
    setDir();
    document.body.classList.toggle("low-data", state.lowData);
    document.body.classList.toggle("notes-on", state.showNotes);
    let body;
    switch (state.screen) {
      case "language": body = viewLanguage(); break;
      case "onboard":  body = viewOnboard();  break;
      case "home":     body = viewHome();     break;
      case "asylum":   body = viewAsylum();   break;
      case "bsn":      body = viewBsn();      break;
      case "bank":     body = viewBank();     break;
      default:         body = viewHome();
    }
    let ov = "";
    if (overlay === "privacy") ov = privacyOverlay();
    if (overlay === "help")    ov = helpOverlay();
    if (overlay === "lang")    ov = langOverlay();
    if (overlay === "asylumConfirm") ov = asylumConfirmOverlay();
    root().innerHTML = `<div class="phone">${body}${ov}</div>`;
  }

  /* =======================================================================
   * EVENTS (single delegated handler)
   * ===================================================================== */
  function genBsn() {
    let n = "";
    for (let i = 0; i < 9; i++) n += Math.floor(Math.random() * 10);
    return n.replace(/(\d{3})(\d{2})(\d{4})/, "$1 $2 $3");
  }
  function genIban() {
    let n = "";
    for (let i = 0; i < 10; i++) n += Math.floor(Math.random() * 10);
    return ("NL" + (10 + Math.floor(Math.random()*89)) + " BASI " + n).replace(/(\d{4})(\d{4})(\d{2})/, "$1 $2 $3");
  }
  function expiryYears(yrs) {
    const d = new Date(); d.setFullYear(d.getFullYear() + yrs);
    return d.toLocaleDateString(state.lang === "ar" ? "ar" : "en-GB", { year:"numeric", month:"long" });
  }

  function onClick(e) {
    const el = e.target.closest("[data-act]");
    if (!el) {
      // tap on overlay backdrop closes it
      const back = e.target.closest(".overlay");
      if (back && e.target === back && overlay !== "privacy") { overlay = null; render(); }
      return;
    }
    const act = el.dataset.act;
    switch (act) {
      case "setlang": state.lang = el.dataset.code; render(); break;
      case "toOnboard": state.screen = "onboard"; render(); break;
      case "nextOnboard": state.onboardStep++; render(); break;
      case "skipOnboard":
      case "finishOnboard": overlay = "privacy"; state.screen = "home"; render(); break;
      case "agreePrivacy": overlay = null; render(); break;
      case "lang": overlay = "lang"; render(); break;
      case "help": overlay = "help"; render(); break;
      case "closeOverlay": overlay = null; render(); break;
      case "lowdata": state.lowData = !state.lowData; render(); break;
      case "notes": state.showNotes = !state.showNotes; render(); break;
      case "back": go(el.dataset.to || "home"); break;

      case "task": {
        const id = el.dataset.id;
        if (id === "asylum") { state.tasks.asylum = state.tasks.asylum==="done"?"done":"progress"; go("asylum"); }
        if (id === "bsn")    { state.tasks.bsn = state.tasks.bsn==="done"?"done":"progress"; go("bsn"); }
        if (id === "bank")   { state.tasks.bank = state.tasks.bank==="done"?"done":"progress"; go("bank"); }
        break;
      }

      /* asylum */
      case "indlink": toast(T("offline_badge")); break; // demo: would window.open IND
      case "askConfirmAsylum": overlay = "asylumConfirm"; render(); break;
      case "finishAsylum": overlay = null; state.tasks.asylum = "done"; go("home"); break;

      /* bsn form */
      case "gender": state.form.gender = el.dataset.v; render(); break;
      case "upload": state.form.docPhoto = true; delete state.errors.docPhoto; render(); break;
      case "dobUnsure":
        state.form.dobUnsure = !state.form.dobUnsure;
        if (state.form.dobUnsure) { state.form.dobDay = ""; state.form.dobMonth = ""; }
        delete state.errors.dob; render(); break;
      case "save":
        state.savedDraft = JSON.parse(JSON.stringify(state.form));
        toast(T("saved_msg")); break;
      case "resume":
        state.form = JSON.parse(JSON.stringify(state.savedDraft));
        state.tasks.bsn = "progress"; go("bsn"); break;
      case "submitBsn": {
        /* inline, in-language validation (CW Task 2 Q4) */
        const errs = {};
        if (!state.form.given  || !state.form.given.trim())  errs.given  = "err_given";
        if (!state.form.family || !state.form.family.trim()) errs.family = "err_family";
        if (!state.form.dobYear) errs.dob = "err_dob";
        if (!state.form.docPhoto) errs.docPhoto = "err_photo";
        if (Object.keys(errs).length) {
          errs._summary = true;
          state.errors = errs;
          render();
          const first = root().querySelector(".has-error");
          if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
          break;
        }
        state.errors = {};
        state.bsn = genBsn();
        state.bsnExpiry = expiryYears(3);
        state.tasks.bsn = "done";
        render(); break;
      }
      case "goBankFromBsn": state.tasks.bank = "progress"; go("bank"); break;

      /* bank */
      case "pickbank": state.form.bank = el.dataset.v; render(); break;
      case "moreBanks": state.bankExpanded = true; render(); break;
      case "defBasic": state.showDefs.basic = !state.showDefs.basic; render(); break;
      case "defIban":  state.showDefs.iban  = !state.showDefs.iban;  render(); break;
      case "submitBank":
        state.iban = genIban();
        state.tasks.bank = "done";
        render(); break;

      case "noop": toast(T("offline_badge")); break;
    }
  }

  function onInput(e) {
    const f = e.target.closest("[data-field]");
    if (!f) return;
    const name = f.dataset.field;
    state.form[name] = f.value;
    // Clear the matching error immediately in state and in the DOM so the red
    // border disappears as the user types, without a full re-render (which
    // would steal focus from the active input).
    if (name === "dobYear" || name === "dobMonth" || name === "dobDay") {
      delete state.errors.dob;
    } else {
      delete state.errors[name];
    }
    const fieldEl = f.closest(".field");
    if (fieldEl) {
      fieldEl.classList.remove("has-error");
      fieldEl.querySelector(".errmsg")?.remove();
    }
    // Hide the summary banner once the user starts correcting
    if (state.errors._summary && Object.keys(state.errors).filter(k => k !== "_summary").length === 0) {
      delete state.errors._summary;
      document.querySelector(".errbanner")?.remove();
    }
  }

  function init() {
    render();
    root().addEventListener("click", onClick);
    root().addEventListener("input", onInput);
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", App.init);
