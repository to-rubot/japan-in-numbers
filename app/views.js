import { KEY, POP_TREND, AGEING, PYRAMID, GDP_TREND, SECTORS, TRADE, SOCIETY, LANDUSE, PREFS, QUIZ, FACTS } from "./data.js";
const fmt = (n) => n.toLocaleString("en-GB");
export function fmtKpi(k) {
  if (k.format === "pop") return fmt(k.value);
  if (k.format === "km2") return fmt(k.value) + " km²";
  if (k.format === "usdtn") return "$" + k.value.toFixed(2) + " trillion";
  if (k.format === "years") return k.value.toFixed(1) + " years";
  if (k.format === "years1") return k.value.toFixed(1) + " years";
  if (k.format === "pct") return k.value.toFixed(1) + "%";
  return String(k.value);
}
function lineChart(series, { w = 680, h = 300, color = "#1b4f72", unit = "", second = null } = {}) {
  const all = second ? series.concat(second.data) : series;
  const xs = all.map(d => d[0]), ys = all.map(d => d[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = 0, y1 = Math.max(...ys) * 1.12;
  const X = v => 44 + (v - x0) / (x1 - x0) * (w - 58), Y = v => h - 30 - (v - y0) / (y1 - y0) * (h - 48);
  const path = s => s.map((d, i) => (i ? "L" : "M") + X(d[0]).toFixed(1) + " " + Y(d[1]).toFixed(1)).join(" ");
  const dots = s => s.map(d => `<circle cx="${X(d[0])}" cy="${Y(d[1])}" r="3.2" fill="${color}"><title>${d[0]}: ${d[1]}${unit}</title></circle>`).join("");
  let grid = "";
  for (let i = 0; i <= 4; i++) { const v = y1 * i / 4, y = Y(v); grid += `<line x1="44" x2="${w - 14}" y1="${y}" y2="${y}" stroke="#e5dcc6"/><text class="axis" x="40" y="${y + 4}" text-anchor="end">${Math.round(v)}</text>`; }
  let xl = ""; for (let i = 0; i < xs.length; i += 2) xl += `<text class="axis" x="${X(xs[i])}" y="${h - 10}" text-anchor="middle">${xs[i]}</text>`;
  const secondSvg = second ? `<path d="${path(second.data)}" fill="none" stroke="${second.color}" stroke-width="2.5" stroke-dasharray="6 4"/>` : "";
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="line chart">${grid}${xl}<path d="${path(series)}" fill="none" stroke="${color}" stroke-width="3"/>${secondSvg}${dots(series)}</svg>`;
}
function donut(parts) {
  let a = -Math.PI / 2, out = "";
  const cx = 130, cy = 130, r = 105, ir = 58;
  for (const p of parts) {
    const a2 = a + p.share / 100 * Math.PI * 2;
    const large = a2 - a > Math.PI ? 1 : 0;
    out += `<path d="M ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)} A ${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(a2)} ${cy + r * Math.sin(a2)} L ${cx + ir * Math.cos(a2)} ${cy + ir * Math.sin(a2)} A ${ir} ${ir} 0 ${large} 0 ${cx + ir * Math.cos(a)} ${cy + ir * Math.sin(a)} Z" fill="${p.color}"><title>${p.name}: ${p.share}%</title></path>`;
    a = a2;
  }
  return `<svg viewBox="0 0 260 260" role="img" aria-label="donut chart">${out}<text x="130" y="126" text-anchor="middle" font-size="15" fill="#17222e">GDP by</text><text x="130" y="146" text-anchor="middle" font-size="15" fill="#17222e">industry</text></svg>`;
}
function pyramid() {
  const max = 5, cx = 300, bw = 250, rh = 17;
  let out = "";
  PYRAMID.forEach((r, i) => {
    const y = 8 + i * (rh + 3);
    out += `<rect x="${cx - r[1] / max * bw}" y="${y}" width="${r[1] / max * bw}" height="${rh}" fill="#1b4f72"><title>${r[0]} male ${r[1]}m</title></rect>
    <rect x="${cx}" y="${y}" width="${r[2] / max * bw}" height="${rh}" fill="#c0392b"><title>${r[0]} female ${r[2]}m</title></rect>
    <text class="axis" x="${cx}" y="${y + rh - 4}" text-anchor="middle" fill="#fff" font-weight="700">${r[0]}</text>`;
  });
  return `<svg viewBox="0 0 620 ${PYRAMID.length * 20 + 16}" role="img" aria-label="population pyramid 2020">${out}</svg><div class="legend"><span><span class="sw" style="background:#1b4f72"></span>Male</span><span><span class="sw" style="background:#c0392b"></span>Female</span><span>Millions per 5-year band, 2020 Census</span></div>`;
}
function bars(items, max, color = "#1b4f72", unit = "") {
  return items.map(d => `<div class="bar-row"><span>${d.label ?? d.name}</span><strong>${d.v ?? d.share}${unit}</strong><div class="bar-track"><div class="bar-fill" style="width:${Math.min(100, (d.v ?? d.share) / max * 100)}%;background:${d.color || color}"></div></div></div>`).join("");
}
export function viewOverview(state) {
  const series = state.metric === "gdp" ? GDP_TREND : state.metric === "ageing" ? AGEING : POP_TREND;
  const unit = state.metric === "gdp" ? " trillion USD" : state.metric === "ageing" ? "%" : " million";
  const title = state.metric === "gdp" ? "Nominal GDP (US$ trillion)" : state.metric === "ageing" ? "Share of population aged 65+ (%)" : "Population (millions)";
  return `
  <section class="hero"><h1>Japan, counted carefully.</h1>
  <p>One country, told in its own official numbers: 123.8 million people, the world's oldest large society, a $4 trillion economy, two-thirds forest — and all 47 prefectures, explorable one by one.</p>
  <a class="cta" href="#/regions">Explore the 47 prefectures →</a></section>
  <div class="grid">${KEY.map(k => `<article class="card kpi"><div class="lab">${k.label}</div><div class="num" data-count="${k.value}" data-kpi="${k.format}">${fmtKpi(k)}</div><div class="sub">${k.sub}</div></article>`).join("")}</div>
  <section class="card"><h3>${title}</h3>
    <div class="toggle" role="group" aria-label="Chart metric">
      <button data-metric="pop" class="${state.metric === "pop" ? "on" : ""}">Population</button>
      <button data-metric="gdp" class="${state.metric === "gdp" ? "on" : ""}">GDP</button>
      <button data-metric="ageing" class="${state.metric === "ageing" ? "on" : ""}">Ageing 65+</button>
    </div>${lineChart(series, { unit })}</section>
  <div class="grid">
    <article class="card"><h3>A country that peaked in 2010</h3><p>Japan's population rose for a century, topped out at 128.06 million in 2010, and has fallen every year since. The 2024 estimate is 123.80 million — a country learning, in real time, how a rich society shrinks well.</p><a class="more" href="#/population">Population in depth →</a></article>
    <article class="card"><h3>An economy built on making things</h3><p>Manufacturing is still a fifth of GDP — cars, chips and machinery lead exports of ¥100.9 trillion — while services carry the rest. Nominal GDP in dollars swung with the yen, from $5.76tn in 2010 to $4.03tn in 2024.</p><a class="more" href="#/economy">Economy in depth →</a></article>
    <article class="card"><h3>47 prefectures, 1 explorer</h3><p>From Tokyo's 14.0 million to Tottori's 553 thousand; from Hokkaido's 83,424 km² to Osaka's density of 4,638 people per km². Search, filter by region, and sort every column.</p><a class="more" href="#/regions">Open the explorer →</a></article>
  </div>
  <section class="fact" id="fact-box">${FACTS[state.fact % FACTS.length]}<br><button class="chip" id="next-fact" style="margin-top:12px">Another fact ↻</button></section>`;
}
export function viewPopulation(state) {
  const yr = state.year;
  // interpolate population & ageing
  const interp = (s, y) => { for (let i = 0; i < s.length - 1; i++) { if (y >= s[i][0] && y <= s[i + 1][0]) { const t = (y - s[i][0]) / (s[i + 1][0] - s[i][0]); return s[i][1] + t * (s[i + 1][1] - s[i][1]); } } return s[s.length - 1][1]; };
  const pop = interp(POP_TREND, yr), age = yr >= 1970 ? interp(AGEING, yr) : null;
  return `<h2>Population</h2><p class="lede">A century of growth, a 2010 peak, and the world's most advanced ageing. Drag the year slider — every figure below follows it.</p>
  <section class="card"><h3>Travel through time: <span id="yr-label">${yr}</span></h3>
  <input type="range" id="year" min="1920" max="2024" step="1" value="${yr}" aria-label="Year">
  <div class="grid">
    <article class="card kpi"><div class="lab">Population in ${yr}</div><div class="num">${pop.toFixed(2)}m</div><div class="sub">${yr < 2010 ? "Still growing toward the 2010 peak" : yr === 2010 ? "The all-time peak: 128.06 million" : "Falling since the 2010 peak"}</div></article>
    <article class="card kpi"><div class="lab">Aged 65+ share</div><div class="num">${age === null ? "—" : age.toFixed(1) + "%"}</div><div class="sub">${age === null ? "Reliable series starts in 1970 (7.1%)" : "Roughly " + Math.round(pop * age / 100 * 10) / 10 + " million people"}</div></article>
    <article class="card kpi"><div class="lab">Change vs 2020 census</div><div class="num">${(pop - 126.15 >= 0 ? "+" : "") + (pop - 126.15).toFixed(2)}m</div><div class="sub">2020 Census counted 126.15 million</div></article>
  </div></section>
  <div class="two"><section class="card"><h3>Population, 1920–2024 (millions)</h3>${lineChart(POP_TREND, { unit: " million" })}</section>
  <section class="card"><h3>Ageing: share aged 65+ (%)</h3>${lineChart(AGEING, { color: "#c0392b", unit: "%" })}</section></div>
  <section class="card"><h3>The 2020 pyramid — a shape no textbook forgets</h3><p>Two bulges (the post-war baby boom and its echo), a narrow base: only 10.0 million children aged 0–4 against 36 million people over 65 in 2020. Hover any bar for its count.</p>${pyramid()}</section>
  <div class="grid"><article class="card"><h3>Births &amp; deaths</h3><p>In 2023 Japan recorded about <strong>727,000 births</strong> against <strong>1.58 million deaths</strong> — a natural decrease of roughly 850,000 people in a single year, the largest of any country in peacetime.</p></article>
  <article class="card"><h3>Households</h3><p>The 2020 Census counted <strong>55.7 million households</strong>, averaging 2.21 people. Single-person households are the largest group at <strong>38.1%</strong> — and a majority in central Tokyo.</p></article>
  <article class="card"><h3>Foreign residents</h3><p>About <strong>3.2 million foreign residents</strong> (2023, a record) — 2.6% of the population, led by residents from China, South Korea, Vietnam and the Philippines.</p></article></div>`;
}
export function viewEconomy() {
  return `<h2>Economy</h2><p class="lede">The world's fourth-largest economy: an export powerhouse whose dollar size rises and falls with the yen.</p>
  <div class="two"><section class="card"><h3>Nominal GDP (US$ trillion)</h3>${lineChart(GDP_TREND, { color: "#b7950b", unit: " trillion USD" })}<p>The 2010–2024 slide in dollars is mostly exchange-rate: in yen, GDP reached a record ¥609 trillion in 2023.</p></section>
  <section class="card"><h3>What makes the GDP</h3>${donut(SECTORS)}<div>${SECTORS.map(s => `<div class="bar-row"><span><span class="sw" style="background:${s.color}"></span>${s.name}</span><strong>${s.share}%</strong></div>`).join("")}</div></section></div>
  <section class="card"><h3>Trade, 2023 (¥ trillion)</h3>${bars(TRADE, 110, "#1b4f72", " tn")}<p>Japan runs on imported energy — mineral fuels were a quarter of all imports in 2023 — and pays for it with cars, semiconductors and machinery the world wants.</p></section>
  <div class="grid"><article class="card kpi"><div class="lab">GDP per person (2024)</div><div class="num">≈ $32,500</div><div class="sub">World Bank, current US$</div></article>
  <article class="card kpi"><div class="lab">Unemployment (2023 avg.)</div><div class="num">2.6%</div><div class="sub">Among the lowest in the OECD</div></article>
  <article class="card kpi"><div class="lab">People in work (2023)</div><div class="num">67.6m</div><div class="sub">A record, driven by women &amp; older workers</div></article></div>`;
}
export function viewSociety() {
  return `<h2>Society &amp; health</h2><p class="lede">Long lives, high schooling, small households — the social numbers behind the headlines.</p>
  <section class="card"><h3>How Japan scores (%)</h3>${bars(SOCIETY.map(s => ({ label: s.label, v: s.v })), 100, "#6c3483", "%")}</section>
  <div class="grid">
  <article class="card"><h3>84.0 years of life</h3><p>Life expectancy in 2023 was <strong>87.1 years for women</strong> and <strong>81.1 for men</strong> — near the top of world tables for four decades, credited to diet, universal healthcare and low violent crime.</p></article>
  <article class="card"><h3>95,119 centenarians</h3><p>In September 2024 Japan counted <strong>95,119 people aged 100+</strong>, 88% of them women. The oldest verified person in history, Kane Tanaka of Fukuoka, lived to 119.</p></article>
  <article class="card"><h3>Safe streets</h3><p>Japan recorded about <strong>0.2 homicides per 100,000 people</strong> in recent years — among the lowest rates measured anywhere — and lost property is famously, routinely, returned.</p></article>
  <article class="card"><h3>One-person Japan</h3><p><strong>38.1% of households</strong> were a single person in 2020. Convenience stores, solo dining booths and single-serving everything are an economy built around that one statistic.</p></article></div>`;
}
export function viewRegions(state) {
  const regions = ["All", ...new Set(PREFS.map(p => p[1]))];
  let rows = PREFS.map(p => ({ name: p[0], region: p[1], capital: p[2], pop: p[3], area: p[4], density: Math.round(p[3] / p[4]) }));
  if (state.region !== "All") rows = rows.filter(r => r.region === state.region);
  if (state.q) rows = rows.filter(r => (r.name + r.capital + r.region).toLowerCase().includes(state.q.toLowerCase()));
  rows.sort((a, b) => { const k = state.sort, d = state.dir; return (typeof a[k] === "string" ? a[k].localeCompare(b[k]) : a[k] - b[k]) * d; });
  const total = rows.reduce((s, r) => s + r.pop, 0);
  const sel = state.selected ? PREFS.find(p => p[0] === state.selected) : null;
  const th = (k, label) => `<th data-sort="${k}">${label}${state.sort === k ? (state.dir === 1 ? " ↑" : " ↓") : ""}</th>`;
  return `<h2>The 47 prefectures</h2><p class="lede">Every prefecture, from the 2020 Census. Search by name or capital, filter by region block, click any column to sort, click a row for its card.</p>
  <div class="controls"><input type="search" id="q" placeholder="Search prefecture or capital…" value="${state.q.replace(/"/g, "&quot;")}" aria-label="Search prefectures">
  <span class="axis">${rows.length} shown · combined population ${fmt(total)}</span></div>
  <div class="chips">${regions.map(r => `<button class="chip ${state.region === r ? "on" : ""}" data-region="${r}">${r}</button>`).join("")}</div>
  ${sel ? `<section class="card detail"><h3>${sel[0]} — ${sel[1]} region</h3><p>Capital: <strong>${sel[2]}</strong> · Population (2020): <strong>${fmt(sel[3])}</strong> · Area: <strong>${fmt(sel[4])} km²</strong> · Density: <strong>${fmt(Math.round(sel[3] / sel[4]))} people/km²</strong> · Share of Japan: <strong>${(sel[3] / 126146099 * 100).toFixed(2)}%</strong></p></section>` : ""}
  <div style="overflow-x:auto"><table><thead><tr>${th("name", "Prefecture")}${th("region", "Region")}${th("capital", "Capital")}${th("pop", "Population 2020")}${th("area", "Area km²")}${th("density", "Density /km²")}</tr></thead>
  <tbody>${rows.map(r => `<tr data-pref="${r.name}" class="${state.selected === r.name ? "sel" : ""}"><td><strong>${r.name}</strong></td><td>${r.region}</td><td>${r.capital}</td><td>${fmt(r.pop)}</td><td>${fmt(r.area)}</td><td>${fmt(r.density)}</td></tr>`).join("") || `<tr><td colspan="6">No prefecture matches that search.</td></tr>`}</tbody></table></div>
  <p class="axis">Source: Statistics Bureau, Population Census 2020 (final counts); areas: Geospatial Information Authority of Japan.</p>`;
}
export function viewLand(state) {
  const q = QUIZ[state.qi % QUIZ.length];
  return `<h2>Land &amp; quiz</h2><p class="lede">An archipelago of 6,852 islands stretching 3,000 km — subtropical Okinawa to subarctic Hokkaido.</p>
  <div class="two"><section class="card"><h3>What the land is</h3>${bars(LANDUSE, 70, "#1e8449", "%")}<p>Only about 12% of Japan is flat enough to farm or build on easily — which is why 123.8 million people live at 330/km² on paper, but over 800/km² on the habitable land.</p></section>
  <section class="card"><h3>Landmarks in numbers</h3><p><strong>Mount Fuji:</strong> 3,776 m, Japan's highest point.<br><strong>Lake Biwa:</strong> 670 km², the largest lake, about 4 million years old.<br><strong>Shinano River:</strong> 367 km, the longest river.<br><strong>Coastline:</strong> about 29,750 km — longer than Australia's mainland coast.<br><strong>Highest temperature recorded:</strong> 41.1 °C (Kumagaya &amp; Hamamatsu).<br><strong>Snow:</strong> Sukayu Onsen averages about 17.6 m of snowfall a year — among the snowiest inhabited places on Earth.</p></section></div>
  <section class="card"><h3>Test yourself — the Japan numbers quiz</h3>
  <p class="axis">Question ${(state.qi % QUIZ.length) + 1} of ${QUIZ.length} · Score: ${state.score}</p>
  <h3>${q.q}</h3>
  ${q.opts.map(o => `<button class="quiz-opt ${state.picked ? (o === q.a ? "right" : o === state.picked ? "wrong" : "") : ""}" data-opt="${o}" ${state.picked ? "disabled" : ""}>${o}</button>`).join("")}
  ${state.picked ? `<p><strong>${state.picked === q.a ? "Correct!" : "Not quite — the answer is " + q.a + "."}</strong></p><button class="chip" id="next-q">${state.qi + 1 >= QUIZ.length ? "See final score" : "Next question →"}</button>` : ""}
  ${state.done ? `<p><strong>Final score: ${state.score} / ${QUIZ.length}.</strong> ${state.score === QUIZ.length ? "A true Japan statistician." : state.score >= 3 ? "Solid — the prefecture explorer will sharpen the rest." : "Worth a wander through the explorer — every answer lives there."}</p><button class="chip" id="restart-q">Play again</button>` : ""}
  </section>`;
}
