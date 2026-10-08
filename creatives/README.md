# Creatives & Facebook-Bilder

Alles in diesem Ordner wird aus `build.mjs` erzeugt:

    node creatives/build.mjs

Gerendert wird mit Chromium (Playwright) aus HTML – dadurch sind Schrift,
Farben und Abstaende exakt dieselben wie auf der Karriereseite.

## Meta Ads

| Datei | Format | Konzept |
|-------|--------|---------|
| `benefit-4x5.png` / `benefit-9x16.png` | 1080x1350 / 1080x1920 | Benefit voran – „Firmenwagen. Auch privat." |
| `beruf-4x5.png` / `beruf-9x16.png` | 1080x1350 / 1080x1920 | Berufsbild direkt – „Meister, Techniker oder Ingenieur SHK?" |
| `wechsel-4x5.png` / `wechsel-9x16.png` | 1080x1350 / 1080x1920 | Problem/Loesung – „Immer nur montieren? Du kannst mehr." |

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
* `build.mjs` prueft beim Rendern, ob der Inhalt in die Flaeche passt, und
  meldet jeden Ueberlauf.

## Hinweis zum Monteur-Foto

`Vorschau_Muster_Kundendienstmonteur.jpg` ist mit 530 x 354 px klein und
traegt „Vorschau/Muster" im Dateinamen. Es wird in den beiden
`beruf-`Creatives verwendet und dort hochskaliert. Vor dem Ausspielen
bitte Lizenz und eine hoeher aufgeloeste Fassung klaeren – idealerweise
ersetzt durch ein echtes Foto aus dem Betrieb.
