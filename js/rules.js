function renderRules() {
  document.getElementById("rulesList").innerHTML = RULES.map((r, i) =>
    `<div class="row">
       <div class="n">${String(i + 1).padStart(2, "0")}</div>
       <div>
         <div class="t">${r.t}</div>
         <div class="d">${r.d}</div>
       </div>
     </div>`
  ).join("");
}
