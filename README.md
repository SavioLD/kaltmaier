# Karriereseite – Bad & Heizung Kaltmaier GmbH

Ad-Funnel / Karriere-Landingpage für die Stelle **Projektleiter (m/w/d)**
am Standort Metzingen. Aufbau und Sektionsfolge entsprechen der
ALWA-Referenzseite, Texte und CI sind auf Kaltmaier angepasst.

Die Seite ist eine einzige, eigenständige Datei: **`index.html`**
(kein Build, kein Framework, keine Abhängigkeiten).

---

## 1 · Struktur

| # | Sektion | Inhalt |
|---|---------|--------|
| 1 | Topbar | Logo, Navigation, Bewerben-Button (fix) |
| 2 | Sticky Mobile-CTA | Blendet sich unterwegs ein, am Formular aus |
| 3 | Hero | Logo, Stelle, Nutzenversprechen, 2 CTAs |
| 4 | Trust-Band | Firmenwagen · 30 Tage Urlaub · Unbefristet · Urlaubs- & Weihnachtsgeld |
| 5 | Offene Stelle | **Genau eine** Stellenkarte: Projektleiter (m/w/d) |
| 6 | Benefits | 6 Karten |
| 7 | Ablauf | 3 Schritte |
| 8 | Mid-CTA | Zwischen-Handlungsaufruf |
| 9 | Bewerbung | Mehrstufiges Formular (6 Schritte) |
| 10 | FAQ | 6 Fragen |
| 11 | Footer | Kontakt, Rechtliches |

Zusätzlich: `JobPosting`-Structured-Data (schema.org) wird aus der
JOB-Konfiguration erzeugt.

> **Nur eine Stelle.** Es wird ausschließlich der Projektleiter
> kommuniziert – keine weiteren Positionen, keine Initiativbewerbung,
> kein „weitere offene Stellen“-Bereich, keine Verlinkung auf andere Vakanzen.

---

## 2 · Vorfilter-Formular

6 Schritte: 5 Fragen, danach die Kontaktdaten. Eine Frage pro Schritt.

| # | Frage | Kategorie | Erfüllt bei |
|---|-------|-----------|-------------|
| 1 | Qualifikation | **Pflicht (K.-o.)** | Meister **oder** Techniker **oder** Ingenieur SHK |
| 2 | Berufserfahrung SHK | **Pflicht (K.-o.)** | mind. 2 Jahre |
| 3 | Monteure anleiten | **Pflicht (K.-o.)** | macht es bereits **oder** will es |
| 4 | Führerschein Klasse B | **Pflicht (K.-o.)** | vorhanden |
| 5 | Weiterbildung Energieberater | *Optional* | abgeschlossen **oder** läuft |

**Logik**

* **Pflichtfrage nicht erfüllt** → Bewerbung endet sofort. Freundlicher
  Abschlusshinweis, dass es aktuell nicht zum gesuchten Profil passt.
  Es werden **keine anderen Stellen angeboten**. Es wird **nichts an die
  Lead Table übertragen**.
* **Optionale Frage nicht erfüllt** → Bewerber läuft ganz normal weiter.
  Die Antwort wird übertragen und zusätzlich im Feld `nicht_erfuellt`
  als nicht erfüllt markiert.

**Bewusst nicht enthalten:** kein Lebenslauf-Upload, keine Dateianhänge.
Alle Fragen sind rein berufsbezogen – keine Fragen zu Alter, Herkunft,
Gesundheit, Religion oder Familienstand (AGG).

---

## 3 · Mobile Laufruhe

Beim Schrittwechsel bleibt der Viewport **exakt stehen**:

* kein `window.scrollTo`, kein `scrollIntoView`, kein `focus()`,
  kein Reload, kein Anker-/Hash-Sprung
* feste Mindesthöhe des Formularcontainers über **alle** Schritte
  (`--form-min` / `--form-min-mobile`), auch in der Mobile-Query
* Fortschrittsbalken oben und Weiter-Button unten (`margin-top:auto`)
  stehen dadurch immer an derselben Position

Gemessen mit Playwright/Chromium – `window.scrollY` über den kompletten
Weg von Frage 1 bis zur Bestätigung:

| Gerät | Höchster Schritt | Platz unter der Topbar | Sprünge |
|-------|------------------|------------------------|---------|
| iPhone SE | 564 px | 586 px | **0** |
| iPhone 12 / 14 | 564 px | 605 px | **0** |
| Pixel 5 | 564 px | 668 px | **0** |
| Galaxy S9+ | 564 px | 688 px | **0** |
| Pixel 7 | 564 px | 780 px | **0** |
| iPad Mini | 577 px | 959 px | **0** |

Jeder Schritt ist auf allen geprüften Geräten ohne Scrollen vollständig
sichtbar.

---

## 4 · Lead Table

Generic-Webhook der Kachel, hinterlegt in `index.html` unter `WEBHOOK_URL`.
Gesendet wird **nur** bei vollständiger, qualifizierter Bewerbung.

Payload – jedes Feld **genau einmal**:

```json
{
  "vorname":         "Max",
  "nachname":        "Mustermann",
  "telefon":         "0151 23456789",
  "email":           "max@beispiel.de",
  "stelle":          "Projektleiter (m/w/d)",
  "qualifikation":   "...",
  "berufserfahrung": "...",
  "fuehrung":        "...",
  "fuehrerschein":   "...",
  "energieberater":  "...",
  "nicht_erfuellt":  "–",
  "datum":           "08.10.2026",
  "datenschutz":     "Ja (Einwilligung mit Absenden, Art. 6 Abs. 1 lit. a DSGVO)",
  "quelle":          "Karriere-Landingpage Kaltmaier",
  "seite":           "https://…"
}
```

**Vorname und Nachname bleiben getrennt.** Es wird bewusst **kein**
kombiniertes Feld (`name`, `fullname`, `vollstaendiger_name`) mitgesendet,
damit der Name in der Lead Table nicht doppelt steht.

---

## 5 · CI anpassen

Alle Farben und Schriften stecken ausschließlich im `:root`-Block ganz
oben in `index.html`. Wer dort ändert, ändert die ganze Seite.

| Variable | Wert | Rolle |
|----------|------|-------|
| `--brand-900` | `#00315c` | dunkles Firmenblau: Topbar, Hero, Mid-CTA, Footer |
| `--brand-700` | `#004d91` | **Original-Blau aus dem Logo**: Kicker, Icons, Links, Tags |
| `--brand-pure` | `#008c8d` | **Original-Teal aus dem Logo**: Fortschritt, Rahmen, Punkte |
| `--brand` | `#00787a` | Logo-Teal, fuer Flaechen mit Text minimal abgedunkelt (Weiss darauf 5,3:1) |
| `--f-display` / `--f-body` | `Source Sans 3` | Humanistische Grotesk, am naechsten am Logo-Schriftzug |

`#008c8d` und `#004d91` sind direkt aus `bilder/buh_logo.png.webp`
ausgelesen. Das reine Teal traegt nirgends Text; wo Text darauf steht
(Buttons), kommt `--brand` zum Einsatz, damit der Kontrast AA erfuellt.

Firmendaten (Adresse, Telefon, E-Mail, Rechts-Links) stehen gebündelt im
`FIRMA`-Objekt im Script am Seitenende.

---

## 6 · Bildmaterial

Im Repo liegen:

| Datei | Verwendung |
|-------|------------|
| `bilder/buh_logo.png.webp` | Original-Logo, in Topbar, Hero und Footer eingebunden |
| `bilder/csm_Kaltmaier_Metzingen-gebaeude_68f07057f5.jpg` | Hero-Hintergrund (Betriebsgebaeude Metzingen) |
| `bilder/Vorschau_Muster_Kundendienstmonteur.jpg` | Reserve, 530 x 354 px |

**Das Logo wird unveraendert verwendet** – nicht nachgebaut, nicht neu
gezeichnet, nicht eingefaerbt, Seitenverhaeltnis unberuehrt. Da der
Schriftzug schwarz ist, sitzt es auf einer weissen Flaeche; daneben steht
„Kaltmaier" als Text, genau wie auf Fahrzeugen und Gebaeude.

**Hero-Darstellung:** Am Desktop liegt das Foto als Vollflaeche hinter dem
Text. Mobil nicht – das Gebaeudefoto ist ein Querformat (3,4:1), davon waere
auf einem Hochkant-Display nur ein rund 20 % breiter Streifen zu sehen.
Mobil bekommt es deshalb ein eigenes Band von 320 px ganz oben im Hero und
laeuft nach unten weich in den Textbereich aus. Die Abdunklung steckt
komplett im Stylesheet; das JS setzt nur noch `--hero-photo`, weil ein
inline gesetztes `background-image` jede Media-Query ueberschreiben wuerde.

Optionale Ueberschreibungen (greifen automatisch, ohne Code-Aenderung):

* `bilder/logo-kaltmaier-weiss.png` – fertiges Komplettlogo in Weiss,
  ersetzt dann Logo-Badge + Schriftzug
* `bilder/hero.jpg` – eigenes Hero-Bild, hat Vorrang vor dem Gebaeudefoto
