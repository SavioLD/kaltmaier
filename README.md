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
| `--brand-900` | `#0c2b47` | dunkles Firmenblau: Topbar, Hero, Mid-CTA, Footer |
| `--brand-700` | `#00558f` | mittleres Blau: Kicker, Icons, Links, Tags |
| `--brand` | `#f39200` | Signal-Orange: Buttons, Fortschritt, Auswahl |
| `--f-display` | `Barlow` | Überschriften |
| `--f-body` | `Inter` | Fließtext |

Firmendaten (Adresse, Telefon, E-Mail, Rechts-Links) stehen gebündelt im
`FIRMA`-Objekt im Script am Seitenende.

---

## 6 · Bildmaterial

Siehe `bilder/HIER-BILDER-ABLEGEN.txt`. Kurz:

* **Logo** → `bilder/logo-weiss.png` (oder `.svg` / `logo.png`)
* **Hero-Bild** → `bilder/hero.jpg`

Beides wird automatisch eingebunden, sobald die Datei vorhanden ist –
ohne Code-Änderung. Solange nichts da ist, greifen Schriftzug und
Farbverlauf als Platzhalter.
