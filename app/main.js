import { viewOverview, viewPopulation, viewEconomy, viewSociety, viewRegions, viewLand } from "./views.js";
import { QUIZ } from "./data.js";
const state = { metric: "pop", fact: 0, year: 2020, q: "", region: "All", sort: "pop", dir: -1, selected: null, qi: 0, score: 0, picked: null, done: false };
const app = document.getElementById("app");
function route() {
  const h = location.hash.replace(/^#/, "") || "/";
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("on", a.dataset.nav === h));
  if (h === "/population") app.innerHTML = viewPopulation(state);
  else if (h === "/economy") app.innerHTML = viewEconomy();
  else if (h === "/society") app.innerHTML = viewSociety();
  else if (h === "/regions") app.innerHTML = viewRegions(state);
  else if (h === "/land") app.innerHTML = viewLand(state);
  else app.innerHTML = viewOverview(state);
  bind(); window.scrollTo({ top: 0 });
}
function bind() {
  document.querySelectorAll("[data-metric]").forEach(b => b.onclick = () => { state.metric = b.dataset.metric; route(); });
  const nf = document.getElementById("next-fact"); if (nf) nf.onclick = () => { state.fact++; route(); };
  const yr = document.getElementById("year"); if (yr) yr.oninput = () => { state.year = +yr.value; route(); const y2 = document.getElementById("year"); if (y2) y2.focus(); };
  const q = document.getElementById("q"); if (q) q.oninput = () => { state.q = q.value; const pos = q.selectionStart; route(); const q2 = document.getElementById("q"); q2.focus(); q2.setSelectionRange(pos, pos); };
  document.querySelectorAll("[data-region]").forEach(b => b.onclick = () => { state.region = b.dataset.region; route(); });
  document.querySelectorAll("[data-sort]").forEach(th => th.onclick = () => { const k = th.dataset.sort; if (state.sort === k) state.dir *= -1; else { state.sort = k; state.dir = k === "name" || k === "capital" || k === "region" ? 1 : -1; } route(); });
  document.querySelectorAll("[data-pref]").forEach(tr => tr.onclick = () => { state.selected = tr.dataset.pref; route(); });
  document.querySelectorAll("[data-opt]").forEach(b => b.onclick = () => { state.picked = b.dataset.opt; if (state.picked === QUIZ[state.qi % QUIZ.length].a) state.score++; route(); });
  const nq = document.getElementById("next-q"); if (nq) nq.onclick = () => { state.picked = null; if (state.qi + 1 >= QUIZ.length) { state.done = true; } else state.qi++; route(); };
  const rq = document.getElementById("restart-q"); if (rq) rq.onclick = () => { state.qi = 0; state.score = 0; state.picked = null; state.done = false; route(); };
}
addEventListener("hashchange", route); route();
