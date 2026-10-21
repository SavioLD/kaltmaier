#!/usr/bin/env python3
"""Erzeugt die web-optimierten Fassungen in bilder/web/.

Aufruf aus dem Projektwurzelverzeichnis:  python3 bilder/optimieren.py
"""
from PIL import Image
import os, sys

HIER = os.path.dirname(os.path.abspath(__file__))
WURZEL = os.path.dirname(HIER)

# Quelle -> (Ziel, Zielbreite in px)
JOBS = [
    ('035A7907.JPG',                                   'hero-team.jpg',          2000),
    ('035A5037.JPG',                                   'stelle-planung.jpg',     1400),
    ('035A5999.JPG',                                   'team-zusammenhalt.jpg',  1400),
    ('035A5223.JPG',                                   'technik-anlage.jpg',     1100),
    ('035A3994.JPG',                                   'beratung-bad.jpg',       1100),
    ('csm_Kaltmaier_Metzingen-gebaeude_68f07057f5.jpg','betrieb-gebaeude.jpg',   1600),
]

ziel_ordner = os.path.join(HIER, 'web')
os.makedirs(ziel_ordner, exist_ok=True)
gesamt = 0
for quelle, ziel, breite in JOBS:
    qp = os.path.join(HIER, quelle)
    if not os.path.exists(qp):
        print(f'  uebersprungen (fehlt): {quelle}')
        continue
    im = Image.open(qp).convert('RGB')
    hoehe = round(im.size[1] * breite / im.size[0])
    im = im.resize((breite, hoehe), Image.LANCZOS)
    zp = os.path.join(ziel_ordner, ziel)
    im.save(zp, 'JPEG', quality=78, optimize=True, progressive=True)
    kb = os.path.getsize(zp) // 1024
    gesamt += kb
    print(f'  {ziel:26} {breite:4} x {hoehe:<4} {kb:4} KB')
print(f'\nSumme: {gesamt} KB')
