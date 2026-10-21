# Creatives & Facebook-Bilder

Alles in diesem Ordner wird aus `build.mjs` erzeugt:

    node creatives/build.mjs

Gerendert wird mit Chromium (Playwright) aus HTML – dadurch sind Schrift,
Farben und Abstaende exakt dieselben wie auf der Karriereseite.

## Drei Varianten zur Auswahl

Alle drei bewerben dieselbe Stelle, **Projektleiter (m/w/d)**, und
unterscheiden sich im Aufbau – nicht nur in der Formulierung. Gedacht
zum Aussuchen: eine davon ausspielen, nicht alle drei gleichzeitig.

| Variante | Aufbau | Foto |
|----------|--------|------|
| `v1-fotoblock` | Grosser Fotoblock oben, Inhalt darunter auf Blau | Projektbesprechung |
| `v2-vollbild` | Foto vollflaechig, Text unten im Verlauf | Team vor dem Betrieb |
| `v3-fakten` | Blau dominiert, Fakten-Liste mit Haken, Foto als Karte | Kollege an der Anlage |

Jede Variante liegt in drei Formaten vor:

| Suffix | Groesse | Platzierung |
|--------|---------|-------------|
| `-1x1` | 1080 x 1080 | Feed, quadratisch |
| `-4x5` | 1080 x 1350 | Feed, hoch |
| `-9x16` | 1080 x 1920 | Story / Reels |

`v3-fakten` ist als einzige formatabhaengig aufgebaut: in 1:1 und 4:5
stehen Liste und Hochkant-Foto nebeneinander, in 9:16 liegt das Foto als
breites Band unter der Liste. Nebeneinander waere die Fotospalte dort
extrem schmal und die Liste ueber die ganze Hoehe auseinandergezogen.

## Facebook

| Datei | Format | Hinweis |
|-------|--------|---------|
| `facebook-profilbild.png` | 1080x1080 | Reinweiss, Motiv weit innerhalb des runden Beschnitts |
| `facebook-titelbild.png` | 1640x856 | Inhalt in der Sicherheitszone 1092x616 mittig, unten rechts frei |

## Bildausschnitt: Koepfe bleiben drauf

Zu jedem Foto ist in `build.mjs` die **Kopfzone** hinterlegt – von wo bis
wo die Koepfe liegen, als Anteil der Bildhoehe, am Raster abgelesen:

| Foto | Kopfzone |
|------|----------|
| `hero-team.jpg` | 32 – 56 % |
| `team-zusammenhalt.jpg` | 2 – 34 % |
| `stelle-planung.jpg` | 5 – 50 % |
| `technik-anlage.jpg` | 10 – 40 % |
| `beratung-bad.jpg` | 5 – 40 % |

Beim Rendern wird daraus je Flaeche die `object-position` **berechnet**,
nicht geschaetzt: Bei `object-fit:cover` wird nur dann vertikal
beschnitten, wenn die Flaeche breiter proportioniert ist als das Foto;
sichtbar bleibt dann der Anteil `f = Bildverhaeltnis / Flaechenverhaeltnis`.
Die Position wird so gesetzt, dass die Kopfzone mittig darin liegt, und
auf den gueltigen Bereich begrenzt. Passt die Kopfzone nicht hinein,
meldet das Skript es.

## Was `build.mjs` beim Rendern prueft

Jeder Fall wird gemeldet:

1. Passt der Inhalt in die Flaeche, oder laeuft er ueber?
2. Bleibt der Stellentitel einzeilig?
3. Passen die Koepfe vollstaendig in den Bildausschnitt?

## Grundsaetze

* Es wird **ausschliesslich** das Bildmaterial aus `bilder/` verwendet,
  und zwar die web-optimierten Fassungen aus `bilder/web/`.
* Das **Original-Logo bleibt unveraendert** – nicht nachgebaut, nicht neu
  gezeichnet, nicht eingefaerbt, Seitenverhaeltnis unberuehrt. Es bringt
  einen weissen Hintergrund mit; auf dunklen Flaechen sitzt es deshalb auf
  einer weissen Karte.
* Farben exakt aus dem Logo: Teal `#008C8D`, Blau `#004D91`.
* In jeder Variante ist „Projektleiter (m/w/d)" das groesste Element.
