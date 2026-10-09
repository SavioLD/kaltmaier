# Creatives & Facebook-Bilder

Alles in diesem Ordner wird aus `build.mjs` erzeugt:

    node creatives/build.mjs

Gerendert wird mit Chromium (Playwright) aus HTML – dadurch sind Schrift,
Farben und Abstaende exakt dieselben wie auf der Karriereseite.

## Meta Ads

Jedes Konzept liegt in drei Formaten vor:

| Suffix | Groesse | Platzierung |
|--------|---------|-------------|
| `-1x1` | 1080 x 1080 | Feed, quadratisch |
| `-4x5` | 1080 x 1350 | Feed, hoch (nimmt mehr Flaeche ein) |
| `-9x16` | 1080 x 1920 | Story / Reels |

In allen Creatives ist **„Projektleiter (m/w/d)" das groesste Element**.
Der jeweilige Werbe-Winkel steht als zweite, kleinere Zeile in Teal
darunter. So ist beim Scrollen sofort klar, welche Stelle beworben wird,
und die drei Varianten bleiben trotzdem unterscheidbar.

| Konzept | Zweite Zeile | Ansatz |
|---------|--------------|--------|
| `benefit-*` | „Firmenwagen – auch privat." | Benefit voran |
| `beruf-*` | „Fuehr deine eigenen Projekte." | Berufsbild direkt, mit hervorgehobenem Firmenwagen-Block |
| `wechsel-*` | „Statt immer nur montieren." | Problem/Loesung |

## Facebook

| Datei | Format | Hinweis |
|-------|--------|---------|
| `facebook-profilbild.png` | 1080x1080 | Reinweiss, Motiv weit innerhalb des runden Beschnitts |
| `facebook-titelbild.png` | 1640x856 | Inhalt in der Sicherheitszone 1092x616 mittig, unten rechts frei |

## Grundsaetze

* Es wird **ausschliesslich** das Bildmaterial aus `bilder/` verwendet.
* Das **Original-Logo bleibt unveraendert** – nicht nachgebaut, nicht neu
  gezeichnet, nicht eingefaerbt, Seitenverhaeltnis unberuehrt. Es bringt
  einen weissen Hintergrund mit; auf dunklen Flaechen sitzt es deshalb auf
  einer weissen Karte, auf dem Profilbild auf reinweissem Grund.
* Farben exakt aus dem Logo: Teal `#008C8D`, Blau `#004D91`.
* Der Firmenwagen ist in jedem Konzept vertreten: bei `benefit` als
  zweite Headline-Zeile, bei `beruf` als eigener Benefit-Block mit Icon
  (inklusive Firmenhandy und Firmentablet), bei `wechsel` als Chip.
* `build.mjs` prueft beim Rendern dreierlei und meldet jeden Fall: ob der
  Inhalt in die Flaeche passt, ob der Stellentitel einzeilig bleibt und ob
  das Foto mindestens 240 px hoch ist. Letzteres faengt ab, dass das Bild
  bei viel Text zu einem unleserlichen Streifen zusammenschrumpft.
* Das Bild nimmt uebrigen Platz auf (`flex:1 1 var(--media)`). Dadurch sitzt
  der Abschluss in jedem Format und bei jeder Headline-Laenge gleich tief,
  statt dass unten Leerraum entsteht.

## Hinweis zum Monteur-Foto

`Vorschau_Muster_Kundendienstmonteur.jpg` ist mit 530 x 354 px klein und
traegt „Vorschau/Muster" im Dateinamen. Es wird in den beiden
`beruf-`Creatives verwendet und dort hochskaliert. Vor dem Ausspielen
bitte Lizenz und eine hoeher aufgeloeste Fassung klaeren – idealerweise
ersetzt durch ein echtes Foto aus dem Betrieb.
