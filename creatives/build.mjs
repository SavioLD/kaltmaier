/* =====================================================================
   CREATIVE-GENERATOR  ·  Bad & Heizung Kaltmaier  ·  Projektleiter (m/w/d)
   Aufruf:  node creatives/build.mjs

   Drei gestalterisch verschiedene Varianten zur Auswahl, jede in
   1:1, 4:5 und 9:16. Es wird ausschliesslich das Bildmaterial aus
   bilder/ verwendet, das Original-Logo bleibt unveraendert.

   BILDAUSSCHNITT
   Zu jedem Foto ist die Kopfzone hinterlegt (von-bis als Anteil der
   Bildhoehe, am Raster abgelesen). Die object-position wird daraus beim
   Rendern je Flaeche BERECHNET, nicht geschaetzt - und das Skript meldet
   jeden Fall, in dem die Koepfe nicht vollstaendig hineinpassen.
   ===================================================================== */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const out  = here;

const dataUri = (rel, mime) =>
  `data:${mime};base64,` + fs.readFileSync(path.join(root, rel)).toString('base64');

const LOGO = dataUri('bilder/buh_logo.png.webp', 'image/webp');

/* kopf: [oben, unten] als Anteil der Bildhoehe */
const F = {
  team:     { src: dataUri('bilder/web/hero-team.jpg','image/jpeg'),         kopf:[0.32,0.56] },
  zusammen: { src: dataUri('bilder/web/team-zusammenhalt.jpg','image/jpeg'), kopf:[0.02,0.34] },
  planung:  { src: dataUri('bilder/web/stelle-planung.jpg','image/jpeg'),    kopf:[0.05,0.50] },
  technik:  { src: dataUri('bilder/web/technik-anlage.jpg','image/jpeg'),    kopf:[0.10,0.40] },
  beratung: { src: dataUri('bilder/web/beratung-bad.jpg','image/jpeg'),      kopf:[0.05,0.40] }
};
const bild = (k, extra='') =>
  `<img src="${F[k].src}" data-kopf="${F[k].kopf[0]},${F[k].kopf[1]}" style="${extra}" alt="">`;

/* CI, exakt aus dem Original-Logo ausgelesen */
const C = { blau900:'#00243f', blau800:'#00315c', blau:'#004d91',
            teal:'#008c8d', tealBtn:'#00787a' };

const BASE = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:"Source Sans 3",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.canvas{position:relative;overflow:hidden;display:flex;flex-direction:column;
  background:linear-gradient(150deg,${C.blau900} 0%,${C.blau800} 55%,${C.blau} 125%);color:#fff}
img{display:block;width:100%;height:100%;object-fit:cover}

.badge{background:#fff;border-radius:calc(var(--u)*.9);padding:calc(var(--u)*.55) calc(var(--u)*.85);display:block}
.badge img{height:calc(var(--u)*2.0);width:auto;object-fit:contain}
.marke{display:flex;align-items:center;gap:calc(var(--u)*1.0)}
.marke b{font-weight:800;font-size:calc(var(--u)*2.0);letter-spacing:-.012em;line-height:1}

.eyebrow{display:inline-flex;align-items:center;gap:calc(var(--u)*.55);font-weight:700;
  font-size:calc(var(--u)*1.18);letter-spacing:.14em;text-transform:uppercase;color:#9fdada}
.eyebrow i{width:calc(var(--u)*.72);height:calc(var(--u)*.72);border-radius:50%;background:${C.teal};
  box-shadow:0 0 0 calc(var(--u)*.3) rgba(0,140,141,.32)}
h1{font-weight:900;letter-spacing:-.03em;line-height:.98;font-size:var(--h1)}
h1 .mwd{font-size:.44em;font-weight:800;letter-spacing:-.01em}
.jobline{font-family:inherit;font-weight:900;color:${C.teal};
  font-size:calc(var(--h1)*.50);line-height:1.03;letter-spacing:-.022em}

.haken{display:grid;gap:calc(var(--u)*.62)}
.haken li{list-style:none;display:flex;align-items:flex-start;gap:calc(var(--u)*.72);
  font-weight:600;font-size:calc(var(--u)*1.42);line-height:1.26}
.haken svg{flex:0 0 auto;width:calc(var(--u)*1.5);height:calc(var(--u)*1.5);margin-top:calc(var(--u)*.14);
  stroke:${C.teal};fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}

.cta{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*1.1);
  background:${C.tealBtn};border-radius:calc(var(--u)*1.0);
  padding:calc(var(--u)*1.25) calc(var(--u)*1.6)}
.cta b{font-weight:800;font-size:calc(var(--u)*1.72);letter-spacing:-.01em}
.cta span{font-weight:600;font-size:calc(var(--u)*1.2);color:#d5f0f0;display:block;margin-top:calc(var(--u)*.18)}
.cta .pfeil{flex:0 0 auto;width:calc(var(--u)*2.9);height:calc(var(--u)*2.9);border-radius:50%;
  background:#fff;display:grid;place-items:center}
.cta .pfeil svg{width:calc(var(--u)*1.5);height:calc(var(--u)*1.5);stroke:${C.tealBtn};fill:none;
  stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.foot{font-weight:600;font-size:calc(var(--u)*1.12);color:#9fb6c8;text-align:center}
`;

const PFEIL = `<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
const HAKEN = `<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`;
const marke = `<span class="marke"><span class="badge"><img src="${LOGO}" alt=""></span><b>Kaltmaier</b></span>`;
const titel = `<h1>Projektleiter <span class="mwd">(m/w/d)</span></h1>`;
const cta = (a,b) => `<div class="cta"><div><b>${a}</b><span>${b}</span></div><span class="pfeil">${PFEIL}</span></div>`;
const li  = t => `<li>${HAKEN}<span>${t}</span></li>`;

/* =====================================================================
   DIE DREI VARIANTEN
   ===================================================================== */
const VARIANTEN = {

/* ---- 1 · Fotoblock oben, Inhalt unten auf Blau --------------------- */
'v1-fotoblock': f => `
  <div style="position:relative;flex:0 0 ${f.v1Foto};overflow:hidden">
    ${bild('planung')}
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,
      rgba(0,36,64,.62) 0%,rgba(0,36,64,.10) 34%,rgba(0,36,64,.08) 62%,rgba(0,49,92,.92) 100%)"></div>
    <div style="position:absolute;top:var(--pad);left:var(--pad)">${marke}</div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;gap:var(--gap);padding:0 var(--pad) var(--pad)">
    <span class="eyebrow" style="margin-top:calc(var(--u)*-.4)"><i></i>Metzingen &middot; Vollzeit &middot; unbefristet</span>
    ${titel}
    <div class="jobline">F&uuml;hr deine eigenen Projekte.</div>
    <ul class="haken">
      ${li('Meister, Techniker oder Ingenieur SHK')}
      ${li('Firmenwagen &ndash; auch privat')}
      ${li('30 Tage Urlaub, unbefristet')}
    </ul>
    <div style="margin-top:auto">${cta('Jetzt bewerben','In unter 60 Sekunden &middot; ohne Lebenslauf')}</div>
    <div class="foot">bad &amp; heizung Kaltmaier GmbH &middot; Metzingen</div>
  </div>`,

/* ---- 2 · Vollflaechiges Foto, Text unten im Verlauf ---------------- */
'v2-vollbild': f => `
  <div style="position:absolute;inset:0">${bild('team')}</div>
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,
    rgba(0,36,64,.80) 0%,rgba(0,36,64,.30) 22%,rgba(0,36,64,.34) 42%,
    rgba(0,41,74,.90) 68%,rgba(0,36,64,.97) 100%)"></div>
  <div style="position:relative;z-index:2;display:flex;flex-direction:column;
       height:100%;padding:var(--pad)">
    ${marke}
    <div style="margin-top:auto;display:flex;flex-direction:column;gap:var(--gap)">
      <span class="eyebrow"><i></i>Wir stellen ein &middot; Metzingen</span>
      ${titel}
      <div class="jobline">Firmenwagen &ndash; auch privat.</div>
      <ul class="haken">
        ${li('Firmenhandy und Firmentablet dazu')}
        ${li('30 Tage Urlaub, Urlaubs- und Weihnachtsgeld')}
        ${li('Unbefristet, mit Weiterbildung')}
      </ul>
      ${cta('Jetzt bewerben','Vier kurze Fragen &middot; kein Anschreiben')}
      <div class="foot">bad &amp; heizung Kaltmaier GmbH &middot; Metzingen</div>
    </div>
  </div>`,

/* ---- 3 · Fakten: Liste und Foto ----------------------------------
   Im Hoch- und Quadratformat stehen Liste und Hochkant-Foto nebeneinander.
   In 9:16 waere die Fotospalte extrem schmal und die Liste wuerde ueber
   die ganze Hoehe auseinandergezogen - dort liegt das Foto deshalb als
   breites Band unter der Liste.                                      */
'v3-fakten': f => {
  const punkte = [
    'Abschluss als Meister, Techniker oder Ingenieur SHK',
    'Erfahrung und Organisationsgeschick',
    'Freude daran, Monteure anzuleiten',
    'Firmenwagen, auch privat',
    '30 Tage Urlaub &amp; unbefristet'
  ].map(li).join('');
  const hoch = f.key === '9x16';
  const block = hoch
    ? `<ul class="haken" style="align-content:start">${punkte}</ul>
       <div style="flex:1;min-height:0;border-radius:calc(var(--u)*1.1);overflow:hidden;background:#0a2b47">
         ${bild('technik')}
       </div>`
    : `<div style="display:flex;gap:calc(var(--u)*1.4);align-items:stretch">
         <ul class="haken" style="flex:1 1 58%;align-content:start">${punkte}</ul>
         <div style="flex:0 0 36%;aspect-ratio:3/4;border-radius:calc(var(--u)*1.1);
              overflow:hidden;background:#0a2b47">${bild('technik')}</div>
       </div>`;
  return `
  <div style="display:flex;flex-direction:column;height:100%;padding:var(--pad);gap:var(--gap)">
    ${marke}
    <span class="eyebrow"><i></i>Meister &middot; Techniker &middot; Ingenieur SHK</span>
    ${titel}
    <div class="jobline">Das bringst du mit. Das bekommst du.</div>
    ${block}
    <div style="margin-top:auto">${cta('Jetzt bewerben','Ohne Lebenslauf &middot; wir melden uns pers&ouml;nlich')}</div>
    <div class="foot">bad &amp; heizung Kaltmaier GmbH &middot; Metzingen</div>
  </div>`;
}
};

/* ---- Facebook ------------------------------------------------------ */
const fbProfil = () => `<div class="canvas" style="width:1080px;height:1080px;--u:20px;
    background:#fff;align-items:center;justify-content:center">
  <div style="display:flex;flex-direction:column;align-items:center;gap:52px">
    <img src="${LOGO}" style="width:612px;height:auto;object-fit:contain">
    <div style="font-weight:900;font-size:122px;letter-spacing:-.03em;color:${C.blau};line-height:1">Kaltmaier</div>
    <div style="width:340px;height:12px;border-radius:999px;background:${C.teal}"></div>
  </div></div>`;

const fbTitel = () => `<div class="canvas" style="width:1640px;height:856px;--u:20px;justify-content:center">
  <div style="position:absolute;inset:0">${bild('team')}</div>
  <div style="position:absolute;inset:0;background:linear-gradient(95deg,rgba(0,36,64,.97) 0%,
    rgba(0,36,64,.95) 54%,rgba(0,49,92,.62) 76%,rgba(0,49,92,.20) 100%)"></div>
  <div style="position:relative;z-index:2;width:1092px;margin:0 auto;display:flex;flex-direction:column;gap:30px">
    <div style="display:flex;align-items:center;gap:24px">
      <span style="background:#fff;border-radius:14px;padding:13px 19px;display:block">
        <img src="${LOGO}" style="height:52px;width:auto;object-fit:contain"></span>
      <span style="font-weight:800;font-size:52px;letter-spacing:-.015em;line-height:1">Kaltmaier</span>
    </div>
    <div style="font-weight:900;font-size:76px;line-height:1.02;letter-spacing:-.028em;max-width:820px">
      Komplette B&auml;der.<br>Moderne <span style="color:${C.teal}">Heiztechnik.</span></div>
    <div style="font-weight:600;font-size:30px;color:#cfe0ec;max-width:760px">
      Ihr Fachbetrieb in Metzingen &ndash; f&uuml;r private, gewerbliche und kommunale Bauherren.</div>
  </div></div>`;

const seite = inner => `<!doctype html><html lang="de"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>${BASE}</style></head><body>${inner}</body></html>`;

const FORMATE = [
  { key:'1x1',  w:1080, h:1080, u:19, pad:50, h1:88,  gap:17, v1Foto:'43%' },
  { key:'4x5',  w:1080, h:1350, u:20, pad:54, h1:100, gap:21, v1Foto:'51%' },
  { key:'9x16', w:1080, h:1920, u:22, pad:60, h1:116, gap:27, v1Foto:'57%' }
];

/* =====================================================================
   BILDAUSSCHNITT BERECHNEN
   Bei object-fit:cover wird nur dann vertikal beschnitten, wenn die
   Flaeche breiter proportioniert ist als das Foto. Sichtbar bleibt dann
   der Anteil f = Bildverhaeltnis / Flaechenverhaeltnis. Die
   object-position wird so gesetzt, dass die Kopfzone mittig darin liegt,
   und auf den gueltigen Bereich begrenzt.
   ===================================================================== */
const AUSSCHNITT = `(() => {
  const berichte = [];
  document.querySelectorAll('img[data-kopf]').forEach((img, i) => {
    const [a, b] = img.dataset.kopf.split(',').map(Number);
    const r = img.getBoundingClientRect();
    const Rc = r.width / r.height, Ri = img.naturalWidth / img.naturalHeight;
    if (Rc <= Ri + 1e-6) {                       // kein vertikaler Beschnitt
      img.style.objectPosition = 'center center';
      berichte.push({ i, ok: true, sichtbar: 1 });
      return;
    }
    const f = Ri / Rc;                            // sichtbarer Anteil der Hoehe
    let p = ((a + b) / 2 - f / 2) / (1 - f);      // Kopfzone mittig
    const pMin = Math.max(0, (b - f) / (1 - f));
    const pMax = Math.min(1, a / (1 - f));
    const passt = (b - a) <= f + 1e-6;
    if (passt) p = Math.min(Math.max(p, pMin), pMax);
    p = Math.min(Math.max(p, 0), 1);
    img.style.objectPosition = 'center ' + (p * 100).toFixed(1) + '%';
    berichte.push({ i, ok: passt, sichtbar: +f.toFixed(3), noetig: +(b - a).toFixed(3) });
  });
  return berichte;
})()`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
const gemacht = [];
let warnungen = 0;

async function render(html, w, h, datei, pruefen = true) {
  const p = await ctx.newPage();
  await p.setViewportSize({ width: w, height: h });
  await p.setContent(seite(html), { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(350);
  const schnitt = await p.evaluate(AUSSCHNITT);
  await p.waitForTimeout(120);
  if (pruefen) {
    const c = await p.evaluate(() => {
      const el = document.querySelector('.canvas'), h1 = el.querySelector('h1');
      const zeilen = h1 ? Math.round(h1.getBoundingClientRect().height /
                      parseFloat(getComputedStyle(h1).lineHeight)) : 1;
      return { soll: el.clientHeight, ist: el.scrollHeight, zeilen };
    });
    if (c.ist > c.soll) { console.log(`  !! ${datei}: Inhalt ${c.ist}px > Flaeche ${c.soll}px`); warnungen++; }
    if (c.zeilen > 1)   { console.log(`  !! ${datei}: Stellentitel bricht auf ${c.zeilen} Zeilen um`); warnungen++; }
    schnitt.forEach(s => { if (!s.ok) {
      console.log(`  !! ${datei}: Koepfe passen nicht - sichtbar ${(s.sichtbar*100).toFixed(0)}%, noetig ${(s.noetig*100).toFixed(0)}%`);
      warnungen++;
    }});
  }
  const fp = path.join(out, datei);
  await p.locator('.canvas').screenshot({ path: fp });
  gemacht.push(fp);
  await p.close();
}

for (const [name, bau] of Object.entries(VARIANTEN)) {
  for (const f of FORMATE) {
    const stil = `width:${f.w}px;height:${f.h}px;--u:${f.u}px;--pad:${f.pad}px;` +
                 `--h1:${f.h1}px;--gap:${f.gap}px`;
    await render(`<div class="canvas" style="${stil}">${bau(f)}</div>`, f.w, f.h, `${name}-${f.key}.png`);
  }
}
await render(fbProfil(), 1080, 1080, 'facebook-profilbild.png', false);
await render(fbTitel(),  1640, 856,  'facebook-titelbild.png',  false);

await browser.close();
for (const m of gemacht) {
  const s = fs.statSync(m);
  console.log(`  ${path.basename(m).padEnd(30)} ${(s.size / 1024).toFixed(0)} KB`);
}
console.log(warnungen ? `\n${warnungen} Warnung(en)` : '\nKeine Warnungen.');
