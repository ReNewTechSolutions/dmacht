"""Author the social image as outlined SVG, then rasterize locally with Sharp.
Optional authoring dependencies: fontTools and macOS Arial fonts.
Committed PNG/SVG outputs have no runtime font or network dependencies.
Run with a Python environment containing fontTools, then:
node scripts/render-social-image.mjs
"""
from pathlib import Path
import re
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[1]

def text_path(text, x, baseline, size, bold=False):
    font = TTFont('/System/Library/Fonts/Supplemental/Arial' + (' Bold' if bold else '') + '.ttf')
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = size / font['head'].unitsPerEm
    pen = SVGPathPen(glyphs)
    cursor = x
    for char in text:
        glyph = glyphs[cmap[ord(char)]]
        glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, cursor, baseline)))
        cursor += glyph.width * scale
    assert cursor < 1124, f'Line too wide: {text}: {cursor}'
    return re.sub(r'-?\d+\.\d+', lambda match: f'{float(match[0]):.2f}'.rstrip('0').rstrip('.'), pen.getCommands())

logo = (ROOT / 'public/brand/dmacht-logo-compact.svg').read_text()
logo = logo[logo.index('<defs>'):logo.rindex('</svg>')]
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f8fafc"/>
<g transform="translate(76 70) scale({520/1620})">{logo}</g>
<g fill="#172b3b">
<path d="{text_path('Industrial Printer Repair,', 76, 297, 70, True)}"/>
<path d="{text_path('Spare Parts & Printers', 76, 380, 70, True)}"/>
<path d="{text_path('CIJ • TIJ • DOD Coding & Marking Solutions', 78, 454, 32)}"/>
</g>
<path fill="#2476b7" d="M78 527H150V533H78Z"/>
<path fill="#fa721f" d="M158 527H182V533H158Z"/>
</svg>'''
(ROOT/'scripts/dmacht-social-source.svg').write_text(svg+'\n')
