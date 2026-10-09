/* =====================================================================
   CREATIVE-GENERATOR  ·  Bad & Heizung Kaltmaier
   Rendert die Meta-Ads-Creatives und die Facebook-Bilder aus HTML
   mit Chromium. Aufruf:  node creatives/build.mjs
   Es wird ausschliesslich das Bildmaterial aus bilder/ verwendet.
   ===================================================================== */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const out  = here;

/* Bildmaterial als Data-URI einbetten - setContent() hat keine Basis-URL,
   file://-Pfade wuerden nicht geladen. */
const dataUri = (rel, mime) =>
  `data:${mime};base64,` + fs.readFileSync(path.join(root, rel)).toString('base64');
const LOGO    = dataUri('bilder/buh_logo.png.webp', 'image/webp');
const HAUS    = dataUri('bilder/csm_Kaltmaier_Metzingen-gebaeude_68f07057f5.jpg', 'image/jpeg');
const MONTEUR = dataUri('bilder/Vorschau_Muster_Kundendienstmonteur.jpg', 'image/jpeg');

/* CI – exakt aus dem Original-Logo ausgelesen */
const C = {
  blau900:'#00243f', blau800:'#00315c', blau:'#004d91',
  teal:'#008c8d', tealBtn:'#00787a', tealHell:'#e0f0f0'
};

const BASE = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:"Source Sans 3",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.canvas{position:relative;overflow:hidden;display:flex;flex-direction:column;
  background:linear-gradient(150deg,${C.blau900} 0%,${C.blau800} 55%,${C.blau} 125%);color:#fff}
.canvas::after{content:"";position:absolute;right:-18%;top:-12%;width:68%;aspect-ratio:1;
  border-radius:50%;background:radial-gradient(circle,rgba(0,140,141,.30),transparent 68%)}
.canvas.plain::after{display:none}
.pad{padding:0 var(--pad)}
.head{display:flex;align-items:center;gap:var(--gap);padding-top:var(--pad);position:relative;z-index:2}
.badge{background:#fff;border-radius:calc(var(--u)*.9);padding:calc(var(--u)*.55) calc(var(--u)*.85);display:block}
.badge img{display:block;height:calc(var(--u)*2.0);width:auto}
.firma{font-weight:800;font-size:calc(var(--u)*2.0);letter-spacing:-.01em;line-height:1}
.eyebrow{display:inline-flex;align-items:center;gap:calc(var(--u)*.55);font-weight:700;
  font-size:calc(var(--u)*1.18);letter-spacing:.14em;text-transform:uppercase;color:#9fdada}
.eyebrow i{width:calc(var(--u)*.72);height:calc(var(--u)*.72);border-radius:50%;background:${C.teal};
  box-shadow:0 0 0 calc(var(--u)*.3) rgba(0,140,141,.32)}
/* Der Stellentitel ist das groesste Element der Flaeche. Der jeweilige
   Werbe-Winkel steht als zweite, kleinere Zeile darunter - so ist auf
   einen Blick klar, welche Stelle beworben wird. */
h1{font-weight:900;letter-spacing:-.03em;line-height:.98;font-size:var(--h1)}
h1 .mwd{font-size:.44em;font-weight:800;letter-spacing:-.01em}
h1 .ak{color:${C.teal};-webkit-text-fill-color:${C.teal}}
.title{display:flex;flex-direction:column;gap:calc(var(--u)*.55)}
.jobline{font-family:var(--f-display);font-weight:900;color:${C.teal};
  font-size:calc(var(--h1)*.50);line-height:1.03;letter-spacing:-.022em}
.sub{font-weight:500;font-size:calc(var(--u)*1.72);line-height:1.34;color:#d2e2ee}
.chips{display:flex;flex-wrap:wrap;gap:calc(var(--u)*.62)}
.chip{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.3);border-radius:999px;
  padding:calc(var(--u)*.56) calc(var(--u)*1.12);font-weight:700;font-size:calc(var(--u)*1.28)}
.chip.on{background:${C.teal};border-color:${C.teal}}
/* Hervorgehobener Benefit-Block: traegt den Firmenwagen samt dem, was
   dazugehoert. Teal-getoent, damit er sich klar vom Fliesstext abhebt. */
.perk{display:flex;align-items:center;gap:calc(var(--u)*.95);
  background:rgba(0,140,141,.18);border:1px solid rgba(0,140,141,.55);
  border-radius:calc(var(--u)*.9);padding:calc(var(--u)*.9) calc(var(--u)*1.15)}
.perk__ic{flex:0 0 auto;width:calc(var(--u)*2.4);height:calc(var(--u)*2.4);border-radius:50%;
  background:${C.teal};display:grid;place-items:center}
.perk__ic svg{width:calc(var(--u)*1.35);height:calc(var(--u)*1.35);stroke:#fff;fill:none;
  stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.perk b{display:block;font-family:var(--f-display);font-weight:800;
  font-size:calc(var(--u)*1.52);line-height:1.1;letter-spacing:-.01em}
.perk span{display:block;font-weight:500;font-size:calc(var(--u)*1.16);
  color:#cfe3ee;margin-top:calc(var(--u)*.12)}
.media{position:relative;width:100%;overflow:hidden;border-radius:calc(var(--u)*1.1);
  background:#0a2b47;
  /* --media ist die Basishoehe; uebriger Platz geht ins Bild statt als
     Leerraum nach unten. Das Inline-margin-Shorthand der Konzepte wuerde
     ein margin-top:auto ohnehin ueberschreiben. */
  flex:1 1 var(--media);min-height:150px}
.media img{width:100%;height:100%;object-fit:cover;display:block}
.media::after{content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(0,36,64,.08) 40%,rgba(0,36,64,.72) 100%)}
.cta{display:flex;align-items:center;justify-content:space-between;gap:var(--gap);
  background:${C.tealBtn};border-radius:calc(var(--u)*1.0);padding:calc(var(--u)*1.25) calc(var(--u)*1.6);
  position:relative;z-index:2}
.cta b{font-weight:800;font-size:calc(var(--u)*1.72);letter-spacing:-.01em}
.cta span{font-weight:600;font-size:calc(var(--u)*1.2);color:#d5f0f0;display:block;margin-top:calc(var(--u)*.18)}
.cta .arrow{flex:0 0 auto;width:calc(var(--u)*2.9);height:calc(var(--u)*2.9);border-radius:50%;
  background:#fff;display:grid;place-items:center}
.cta .arrow svg{width:calc(var(--u)*1.5);height:calc(var(--u)*1.5);stroke:${C.tealBtn};fill:none;stroke-width:2.6;
  stroke-linecap:round;stroke-linejoin:round}
.foot{font-weight:600;font-size:calc(var(--u)*1.12);color:#9fb6c8;text-align:center;
  padding-bottom:var(--pad);position:relative;z-index:2}
.stack{display:flex;flex-direction:column;position:relative;z-index:2}
`;

const ARROW = `<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
const AUTO  = `<svg viewBox="0 0 24 24"><rect x="1" y="6" width="15" height="11" rx="2"/>`+
              `<path d="M16 10h3.5L23 13.5V17h-7z"/><circle cx="5.5" cy="18.5" r="2"/>`+
              `<circle cx="18.5" cy="18.5" r="2"/></svg>`;
const perkAuto = `<div class="pad"><div class="perk">`+
  `<span class="perk__ic">${AUTO}</span>`+
  `<div><b>Firmenwagen &ndash; auch privat</b>`+
  `<span>Firmenhandy und Firmentablet inklusive</span></div></div></div>`;
const logoHead = `<div class="head"><span class="badge"><img src="${LOGO}" alt=""></span><span class="firma">Kaltmaier</span></div>`;
const cta = (b,s)=>`<div class="cta"><div><b>${b}</b><span>${s}</span></div><span class="arrow">${ARROW}</span></div>`;

/* ---- die drei Konzepte ---------------------------------------------- */
const KONZEPTE = {
  /* 1 · Benefit voran */
  'benefit': (f) => `
    ${logoHead}
    <div class="stack pad" style="gap:var(--stack-gap);padding-top:var(--stack-top)">
      <span class="eyebrow"><i></i>Metzingen &middot; Wir stellen ein</span>
      <div class="title">
        <h1>Projektleiter <span class="mwd">(m/w/d)</span></h1>
        <div class="jobline">Firmenwagen &ndash; auch privat.</div>
      </div>
      <p class="sub">Dazu Firmenhandy, Firmentablet und 30&nbsp;Tage Urlaub &ndash; bei einem Fachbetrieb f&uuml;r Bad und Heizung.</p>
      <div class="chips">
        <span class="chip on">30 Tage Urlaub</span>
        <span class="chip">Unbefristet</span>
        <span class="chip">Urlaubs- &amp; Weihnachtsgeld</span>
      </div>
    </div>
    <div class="media" style="margin:var(--media-top) var(--pad) var(--media-bot)"><img src="${HAUS}" alt=""></div>
    <div class="pad">${cta('Jetzt bewerben','In unter 60 Sekunden &middot; ohne Lebenslauf')}</div>
    <div class="foot">bad &amp; heizung Kaltmaier GmbH &middot; Metzingen</div>`,

  /* 2 · Direkte Ansprache des Berufsbilds */
  'beruf': (f) => `
    ${logoHead}
    <div class="stack pad" style="gap:var(--stack-gap);padding-top:var(--stack-top)">
      <span class="eyebrow"><i></i>Meister &middot; Techniker &middot; Ingenieur SHK</span>
      <div class="title">
        <h1>Projektleiter <span class="mwd">(m/w/d)</span></h1>
        <div class="jobline">F&uuml;hr deine eigenen Projekte.</div>
      </div>
      <p class="sub">${f.key === '1x1'
        ? 'Von der Planung bis zur &Uuml;bergabe &ndash; du entscheidest.'
        : 'Von der Planung bis zur &Uuml;bergabe: Du steuerst die Projekte, leitest die Monteure an und entscheidest selbst.'}</p>
      <div class="chips">
        <span class="chip on">Unbefristet</span>
        <span class="chip">Vollzeit</span>
        <span class="chip">Metzingen</span>
      </div>
    </div>
    <div style="margin-top:var(--stack-gap)">${perkAuto}</div>
    <div class="media" style="margin:var(--media-top) var(--pad) var(--media-bot)"><img src="${MONTEUR}" style="object-position:center 42%" alt=""></div>
    <div class="pad">${cta('Jetzt bewerben','Vier kurze Fragen &middot; kein Anschreiben')}</div>
    <div class="foot">bad &amp; heizung Kaltmaier GmbH &middot; Metzingen</div>`,

  /* 3 · Problem - Loesung */
  'wechsel': (f) => `
    ${logoHead}
    <div class="stack pad" style="gap:var(--stack-gap);padding-top:var(--stack-top)">
      <span class="eyebrow"><i></i>Zeit f&uuml;r den n&auml;chsten Schritt</span>
      <div class="title">
        <h1>Projektleiter <span class="mwd">(m/w/d)</span></h1>
        <div class="jobline">Statt immer nur montieren.</div>
      </div>
      <p class="sub">&Uuml;bernimm die Projektleitung, leite dein Team an und entscheide selbst &ndash; mit allem, was dazugeh&ouml;rt.</p>
      <div class="chips">
        <span class="chip on">Firmenwagen privat</span>
        <span class="chip">Weiterbildung</span>
        <span class="chip">Junges Team</span>
      </div>
    </div>
    <div class="media" style="margin:var(--media-top) var(--pad) var(--media-bot)"><img src="${HAUS}" style="object-position:62% center" alt=""></div>
    <div class="pad">${cta('Jetzt bewerben','Ohne Lebenslauf &middot; wir melden uns pers&ouml;nlich')}</div>
    <div class="foot">bad &amp; heizung Kaltmaier GmbH &middot; Metzingen</div>`
};

/* ---- Facebook ------------------------------------------------------- */
function fbProfil(){
  /* 1080 x 1080. Facebook beschneidet rund - alles Wichtige bleibt weit
     innerhalb des einbeschriebenen Quadrats (ca. 764 x 764 mittig).
     Reinweisser Grund, weil das Original-Logo einen weissen Hintergrund
     mitbringt; so ist keine Kante sichtbar und das Logo bleibt unveraendert. */
  return `<div class="canvas plain" style="width:1080px;height:1080px;--u:20px;--pad:0;--gap:0;
      background:#fff;align-items:center;justify-content:center">
    <div style="display:flex;flex-direction:column;align-items:center;gap:52px;position:relative;z-index:2">
      <img src="${LOGO}" style="width:612px;height:auto;display:block">
      <div style="font-weight:900;font-size:122px;letter-spacing:-.03em;color:${C.blau};line-height:1">Kaltmaier</div>
      <div style="width:340px;height:12px;border-radius:999px;background:${C.teal}"></div>
    </div>
  </div>`;
}
function fbTitel(){
  /* 1640 x 856, Sicherheitszone 1092 x 616 mittig, unten rechts frei */
  return `<div class="canvas" style="width:1640px;height:856px;--u:20px;--pad:0;--gap:0;justify-content:center">
    <img src="${HAUS}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:68% center">
    <div style="position:absolute;inset:0;background:linear-gradient(95deg,rgba(0,36,64,.97) 0%,rgba(0,36,64,.95) 54%,rgba(0,49,92,.62) 76%,rgba(0,49,92,.20) 100%)"></div>
    <div style="position:relative;z-index:2;width:1092px;margin:0 auto;display:flex;flex-direction:column;gap:30px">
      <div style="display:flex;align-items:center;gap:24px">
        <span style="background:#fff;border-radius:14px;padding:13px 19px;display:block">
          <img src="${LOGO}" style="height:52px;width:auto;display:block"></span>
        <span style="font-weight:800;font-size:52px;letter-spacing:-.015em;line-height:1">Kaltmaier</span>
      </div>
      <div style="font-weight:900;font-size:76px;line-height:1.02;letter-spacing:-.028em;max-width:820px">
        Komplette B&auml;der.<br>Moderne <span style="color:${C.teal}">Heiztechnik.</span></div>
      <div style="font-weight:600;font-size:30px;color:#cfe0ec;max-width:760px">
        Ihr Fachbetrieb in Metzingen &ndash; f&uuml;r private, gewerbliche und kommunale Bauherren.</div>
    </div>
  </div>`;
}

const page1 = (f,inner)=>`<!doctype html><html lang="de"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>${BASE}</style></head><body>
<div class="canvas" style="width:${f.w}px;height:${f.h}px;--u:${f.u}px;--pad:${f.pad}px;--gap:${Math.round(f.u*1.1)}px;--h1:${f.h1}px;--media:${f.media}px;--stack-top:${f.stackTop}px;--stack-gap:${f.stackGap}px;--media-top:${f.mediaTop}px;--media-bot:${f.mediaBot}px">
${inner}</div></body></html>`;

const rawPage = (inner)=>`<!doctype html><html lang="de"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>${BASE}</style></head><body>${inner}</body></html>`;

const FORMATE = [
  /* Feed quadratisch - klassische Feed-Platzierung */
  { key:'1x1',  w:1080, h:1080, u:19, pad:50, h1:88,  media:196,
    stackTop:22, stackGap:18, mediaTop:22, mediaBot:18 },
  /* Feed hoch - nimmt im Feed mehr Flaeche ein, Metas Empfehlung */
  { key:'4x5',  w:1080, h:1350, u:20, pad:54, h1:104, media:300,
    stackTop:40, stackGap:26, mediaTop:38, mediaBot:32 },
  /* Story / Reels */
  { key:'9x16', w:1080, h:1920, u:22, pad:60, h1:116, media:700,
    stackTop:70, stackGap:33, mediaTop:48, mediaBot:40 }
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor:1 });
const made = [];

for (const [name, build] of Object.entries(KONZEPTE)){
  for (const f of FORMATE){
    const p = await ctx.newPage();
    await p.setViewportSize({ width:f.w, height:f.h });
    await p.setContent(page1(f, build(f)), { waitUntil:'load' });
    await p.evaluate(()=>document.fonts.ready);
    await p.waitForTimeout(400);
    const fit = await p.evaluate(()=>{
      const c=document.querySelector('.canvas'), h=c.querySelector('h1');
      const cs=getComputedStyle(h);
      const zeilen=Math.round(h.getBoundingClientRect().height/parseFloat(cs.lineHeight));
      const m=c.querySelector('.media');
      return { soll:c.clientHeight, ist:c.scrollHeight, zeilen,
               bild:m?Math.round(m.getBoundingClientRect().height):0 };
    });
    if (fit.ist > fit.soll) console.log(`  !! ${name}-${f.key}: Inhalt ${fit.ist}px > Flaeche ${fit.soll}px`);
    if (fit.zeilen > 1)     console.log(`  !! ${name}-${f.key}: Stellentitel bricht auf ${fit.zeilen} Zeilen um`);
    if (fit.bild && fit.bild < 240) console.log(`  !! ${name}-${f.key}: Bild nur ${fit.bild}px hoch`);
    const file = path.join(out, `${name}-${f.key}.png`);
    await p.locator('.canvas').screenshot({ path:file });
    made.push(file); await p.close();
  }
}
for (const [file, html, w, h] of [
  ['facebook-profilbild.png', fbProfil(), 1080, 1080],
  ['facebook-titelbild.png',  fbTitel(),  1640, 856]
]){
  const p = await ctx.newPage();
  await p.setViewportSize({ width:w, height:h });
  await p.setContent(rawPage(html), { waitUntil:'load' });
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(400);
  const fp = path.join(out, file);
  await p.locator('.canvas').screenshot({ path:fp });
  made.push(fp); await p.close();
}
await browser.close();
for (const m of made){ const s=fs.statSync(m); console.log(`  ${path.basename(m).padEnd(30)} ${(s.size/1024).toFixed(0)} KB`); }
