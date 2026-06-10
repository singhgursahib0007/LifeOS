function renderMorning() {
  document.getElementById("morningFlow").innerHTML = MORNING.map((m, i) =>
    `<div class="row">
       <div class="n">${String(i + 1).padStart(2, "0")}</div>
       <div>
         <div class="t">${m.t}</div>
         <div class="d">${m.d}</div>
       </div>
     </div>`
  ).join("");
}
