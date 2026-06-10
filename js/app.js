/* ── State ── */
const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0
let viewIdx = todayIdx;

function dateOf(idx) {
  const d = new Date();
  d.setDate(d.getDate() + (idx - todayIdx));
  return d.toISOString().slice(0, 10);
}
const load = idx => JSON.parse(localStorage.getItem("pr-" + dateOf(idx)) || "{}");
const save = (idx, obj) => localStorage.setItem("pr-" + dateOf(idx), JSON.stringify(obj));

/* ── Tab router ── */
function openTab(p) {
  if (p === "diet") { openDietTab(); return; }
  document.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x.dataset.p === p));
  document.querySelectorAll(".page").forEach(x => x.classList.toggle("active", x.id === "page-" + p));
  window.scrollTo({ top: 0 });
}

/* ── Day selector ── */
function setDay(i) {
  viewIdx = i;
  renderDay();
  // If not on today tab, switch to it
  if (!document.getElementById("page-today").classList.contains("active")) {
    openTab("today");
  }
  window.scrollTo({ top: 0 });
}

/* ── Day bar ── */
function renderDaybar() {
  document.getElementById("daybar").innerHTML = WEEK.map((w, i) =>
    `<div class="daychip ${i === viewIdx ? "sel" : ""} ${i === todayIdx ? "istoday" : ""}"
          onclick="setDay(${i})">
       <div class="dl">${w.d}</div>
       <div class="dd"></div>
     </div>`
  ).join("");
  document.getElementById("dayHint").textContent =
    viewIdx === todayIdx
      ? "Tap any day to preview its session"
      : "Previewing " + WEEK[viewIdx].d + " · tap today's chip to return";
}

/* ── Exercise card ── */
function buildCard(e, i) {
  const done = load(viewIdx)[i];
  const ph = `<div class="ph"><svg class="ic"><use href="#i-bell"/></svg></div>`;
  const img = e.img
    ? `<img src="${e.img}" loading="lazy" alt="${e.name}"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
       ><div class="ph" style="display:none"><svg class="ic"><use href="#i-bell"/></svg></div>`
    : ph;

  return `<div class="card ${done ? "done" : ""}">
    <div class="imgbox">
      ${img}
      <div class="num">${String(i + 1).padStart(2, "0")}</div>
    </div>
    <div class="cbody">
      <div class="crow">
        <div class="cname">${e.name}</div>
        <div class="cdose">${e.dose}</div>
      </div>
      <div class="cue breath">
        <svg class="ic"><use href="#i-wind"/></svg>
        <span>${e.breath}</span>
      </div>
      <div class="cue wrong">
        <svg class="ic"><use href="#i-alert"/></svg>
        <span><b>You're doing it wrong if:</b> ${e.wrong}</span>
      </div>
      <button class="check" onclick="toggle(${i})">
        <svg class="ic"><use href="#i-${done ? "check" : "circle"}"/></svg>
        ${done ? "Done" : "Mark done"}
      </button>
    </div>
  </div>`;
}

/* ── Today tab ── */
function renderDay() {
  const w = WEEK[viewIdx];
  const isToday = viewIdx === todayIdx;
  const done = load(viewIdx);
  const n = EX[w.key].length;
  const dn = EX[w.key].map((_, i) => done[i]).filter(Boolean).length;

  document.getElementById("heroTag").textContent =
    (isToday ? "Today · " : "") + w.d + (w.sprint ? " · Sprint morning" : "");
  document.getElementById("heroTitle").textContent = w.t;
  document.getElementById("heroDesc").textContent =
    w.key === "rest"
      ? "No logbook today. Go to the park and play. Springy beats stiff."
      : (w.sprint ? "Flow + sprints this morning. " : "Morning flow first. ") +
        "Strength this evening, 30–40 min. Log every set.";

  document.getElementById("bar").style.width = (100 * dn / n) + "%";
  document.getElementById("pct").textContent =
    dn === n ? "SESSION COMPLETE — EAT, SLEEP, GROW" : dn + " / " + n + " EXERCISES DONE";

  document.getElementById("dayCards").innerHTML =
    `<h2><svg class="ic"><use href="#i-bell"/></svg>Evening · ${w.t}</h2>` +
    EX[w.key].map(buildCard).join("");

  renderDaybar();
}

function toggle(i) {
  const d = load(viewIdx);
  d[i] = !d[i];
  save(viewIdx, d);
  renderDay();
}

/* ── Week tab ── */
function renderWeek() {
  document.getElementById("weekList").innerHTML = WEEK.map((w, i) =>
    `<div class="wk ${i === todayIdx ? "istoday" : ""}"
          onclick="setDay(${i});openTab('today')">
       <div class="dot" style="background:${w.c}"></div>
       <div class="wd">${w.d.toUpperCase()}</div>
       <div>
         <div class="wt">${w.t}${w.sprint ? " · sprints" : ""}</div>
         <div class="ws">${w.s}</div>
       </div>
       <div class="go"><svg class="ic"><use href="#i-arrow"/></svg></div>
     </div>`
  ).join("");
}

/* ── Init ── */
document.querySelectorAll(".tab").forEach(b =>
  b.addEventListener("click", () => openTab(b.dataset.p))
);

openTab("today");
renderDay();
renderWeek();
renderMorning();
renderRules();
