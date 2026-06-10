/* ── PIN config ── */
const DIET_PIN = "2185";
let pinBuffer = "";
let dietUnlocked = sessionStorage.getItem("diet-unlocked") === "1";

/* ── Open diet tab (entry point called by app.js router) ── */
function openDietTab() {
  document.querySelectorAll(".tab").forEach(x =>
    x.classList.toggle("active", x.dataset.p === "diet")
  );
  document.querySelectorAll(".page").forEach(x => x.classList.remove("active"));

  if (dietUnlocked) {
    document.getElementById("page-diet").classList.add("active");
    renderDiet();
    window.scrollTo({ top: 0 });
  } else {
    showPinOverlay();
  }
}

/* ── PIN overlay ── */
function showPinOverlay() {
  pinBuffer = "";
  updateDots();
  document.getElementById("pin-overlay").classList.remove("hidden");
}

function pinKey(digit) {
  if (pinBuffer.length >= 4) return;
  pinBuffer += digit;
  updateDots();
  if (pinBuffer.length === 4) checkPin();
}

function pinDel() {
  pinBuffer = pinBuffer.slice(0, -1);
  updateDots();
}

function pinCancel() {
  document.getElementById("pin-overlay").classList.add("hidden");
  pinBuffer = "";
  // Return to today tab visually
  document.querySelectorAll(".tab").forEach(x =>
    x.classList.toggle("active", x.dataset.p === "today")
  );
  document.getElementById("page-today").classList.add("active");
}

function updateDots() {
  document.querySelectorAll(".pin-dot").forEach((dot, i) => {
    dot.classList.toggle("filled", i < pinBuffer.length);
    dot.classList.remove("error", "ok");
  });
}

function checkPin() {
  if (pinBuffer === DIET_PIN) {
    // Success
    document.querySelectorAll(".pin-dot").forEach(d => {
      d.classList.remove("filled");
      d.classList.add("ok");
    });
    setTimeout(() => {
      document.getElementById("pin-overlay").classList.add("hidden");
      dietUnlocked = true;
      sessionStorage.setItem("diet-unlocked", "1");
      document.getElementById("page-diet").classList.add("active");
      renderDiet();
      window.scrollTo({ top: 0 });
    }, 380);
  } else {
    // Wrong PIN
    document.querySelectorAll(".pin-dot").forEach(d => {
      d.classList.remove("filled");
      d.classList.add("error");
    });
    const dotsEl = document.querySelector(".pin-dots");
    dotsEl.classList.add("shake");
    setTimeout(() => {
      dotsEl.classList.remove("shake");
      document.querySelectorAll(".pin-dot").forEach(d => d.classList.remove("error"));
      pinBuffer = "";
      updateDots();
    }, 500);
  }
}

/* ── Diet content renderer ── */
function renderDiet() {
  const el = document.getElementById("diet-content");
  if (el.dataset.rendered) return; // render once
  el.dataset.rendered = "1";

  const t = DIET.targets;

  const macroGrid = `
    <div class="macro-grid">
      <div class="macro-card">
        <div class="macro-label">Calories</div>
        <div class="macro-val">${t.kcal}</div>
        <div class="macro-unit">kcal / day</div>
      </div>
      <div class="macro-card">
        <div class="macro-label">Protein</div>
        <div class="macro-val">${t.protein}g</div>
        <div class="macro-unit">per day target</div>
      </div>
      <div class="macro-card">
        <div class="macro-label">Carbs</div>
        <div class="macro-val">${t.carbs}g</div>
        <div class="macro-unit">per day</div>
      </div>
      <div class="macro-card">
        <div class="macro-label">Fat</div>
        <div class="macro-val">${t.fat}g</div>
        <div class="macro-unit">per day</div>
      </div>
    </div>`;

  const meals = DIET.meals.map(m => `
    <div class="meal-card">
      <div class="meal-head">
        <div class="meal-meta">
          <div>
            <div class="meal-time">${m.time}</div>
            <div class="meal-name">${m.name}</div>
          </div>
          <div class="meal-kcal">~${m.kcal} kcal</div>
        </div>
        <div class="meal-macros">
          <span class="meal-macro-pill"><b>${m.protein}g</b> protein</span>
          <span class="meal-macro-pill"><b>${m.carbs}g</b> carbs</span>
          <span class="meal-macro-pill"><b>${m.fat}g</b> fat</span>
        </div>
      </div>
      <div class="meal-items">
        ${m.items.map(item => `
          <div class="food-row">
            <div class="food-name">${item.name}</div>
            <div class="food-right">
              <div class="food-amount">${item.amount}</div>
              ${item.protein !== "—" ? `<div class="food-protein">${item.protein}</div>` : ""}
            </div>
          </div>`).join("")}
      </div>
      <div class="meal-note">${m.note}</div>
    </div>`).join("");

  const dots = n => Array.from({ length: 5 }, (_, i) =>
    `<div class="pdot ${i < n ? "on" : ""}"></div>`).join("");

  const proteinTable = `
    <div class="protein-table">
      ${DIET.proteinSources.map(s => `
        <div class="protein-row">
          <div class="protein-name">${s.name}</div>
          <div class="protein-per">${s.per100} / 100g</div>
          <div class="protein-dots">${dots(s.rating)}</div>
        </div>`).join("")}
    </div>`;

  const rules = `
    ${DIET.rules.map((r, i) => `
      <div class="row">
        <div class="n">${String(i + 1).padStart(2, "0")}</div>
        <div><div class="d">${r}</div></div>
      </div>`).join("")}`;

  el.innerHTML = `
    <div class="diet-hero">
      <div class="tag">Lean Mass · Vegetarian Surplus</div>
      <h3>Your Diet Plan</h3>
      <p>Calorie surplus + protein at every meal + sleep. The kitchen is 50% of the result.</p>
      ${macroGrid}
    </div>

    <h2><svg class="ic"><use href="#i-sun"/></svg>Meal Schedule</h2>
    <p class="lead">5 meals, spread through the day. Protein in every single one.</p>
    ${meals}

    <h2><svg class="ic"><use href="#i-zap"/></svg>Protein Sources</h2>
    <p class="lead">Rated by g of protein per 100g. Build your meals around the top three.</p>
    ${proteinTable}

    <h2><svg class="ic"><use href="#i-shield"/></svg>Diet Rules</h2>
    ${rules}

    <div class="note">
      <svg class="ic"><use href="#i-loop"/></svg>
      These numbers are targets, not laws. Stay within 10% and you will make progress. Consistency over precision.
    </div>
    <footer>PROJECT REBUILD · DIET PLAN</footer>`;
}
