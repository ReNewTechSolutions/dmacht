"""Rebuild approved D-Macht identity as independent vector assets.
Optional authoring dependency: fontTools. No font dependency at runtime.
Main mark and MACHT are hand-drawn geometry; supporting type is outlined Arial.
Reference coordinates are preserved to make future visual review straightforward.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

DEST = Path(__file__).resolve().parents[1] / 'public' / 'brand'
FONT = Path('/System/Library/Fonts/Supplemental/Arial.ttf')
font = TTFont(FONT)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()

def outlined(text, x, baseline, width, height, tracking):
    bounds = BoundsPen(glyphs)
    glyphs[cmap[ord('H')]].draw(bounds)
    sy = height / bounds.bounds[3]
    advance = sum(glyphs[cmap[ord(c)]].width for c in text)
    sx = (width - tracking * (len(text)-1)) / advance
    pen = SVGPathPen(glyphs)
    cursor = x
    for char in text:
        glyph = glyphs[cmap[ord(char)]]
        glyph.draw(TransformPen(pen, (sx, 0, 0, -sy, cursor, baseline)))
        cursor += glyph.width * sx + tracking
    import re
    return re.sub(r'-?\d+\.\d+', lambda m: f'{float(m[0]):.2f}'.rstrip('0').rstrip('.'), pen.getCommands())

defs = '''<defs><linearGradient id="orange" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff9912"/><stop offset="1" stop-color="#fa501e"/></linearGradient><linearGradient id="blue" x1="0" y1="0" x2="1" y2=".5"><stop stop-color="#04a9d4"/><stop offset="1" stop-color="#3658ad"/></linearGradient></defs>'''
mark = '''<g id="symbol"><path fill="url(#orange)" d="M238 233H435C524 233 585 288 585 370C585 451 525 507 435 507H392V458H432C494 458 531 425 531 371C531 313 493 277 432 277H340V507H195C182 507 172 498 172 485C172 472 182 462 195 462H257C267 462 274 455 274 446C274 436 267 429 257 429H211C199 429 189 420 189 408C189 396 199 386 211 386H305C315 386 323 379 323 369C323 360 315 353 305 353H171C159 353 149 343 149 331C149 319 159 310 171 310H266C275 310 283 302 283 293C283 284 275 277 266 277H238C226 277 216 267 216 255C216 243 226 233 238 233Z"/><path fill="url(#blue)" d="M118 233H173A22 22 0 0 1 173 277H118A22 22 0 0 1 118 233ZM94 389H147A22 22 0 0 1 147 433H94A22 22 0 0 1 94 389ZM117 466H125A21 21 0 0 1 125 508H117A21 21 0 0 1 117 466ZM392 325H434C462 325 478 341 478 367C478 393 462 409 434 409H392Z"/></g>'''
word = '''<g id="wordmark"><path fill="url(#orange)" d="M612 380H695V425H612Z"/><g fill="#172b3b"><path d="M711 326H771L815 427L858 326H922V507H875V392L824 507H807L756 392V507H711Z"/><path fill-rule="evenodd" d="M931 507L1009 326H1065L1141 507H1088L1075 474H996L983 507ZM1012 436H1060L1036 377Z"/><path d="M1207 325H1251C1294 325 1314 345 1314 380V395H1264V384C1264 372 1258 367 1245 367H1215C1201 367 1194 373 1194 387V447C1194 461 1201 468 1215 468H1245C1258 468 1264 462 1264 450V440H1314V453C1314 489 1294 509 1251 509H1207C1165 509 1144 490 1144 452V382C1144 345 1165 325 1207 325Z"/><path d="M1331 326H1381V397H1457V326H1507V507H1457V437H1381V507H1331Z"/><path d="M1522 326H1692V366H1632V507H1582V366H1522Z"/></g></g>'''
subtitle = outlined('INDUSTRIAL CODING & MARKING SOLUTIONS', 171, 579, 1495, 39, 6.4)
quality = outlined('QUALITY', 347, 659, 221, 30, 6)
reliability = outlined('RELIABILITY', 666, 659, 322, 30, 6)
flexibility = outlined('FLEXIBILITY', 1087, 659, 323, 30, 6)
full = f'''<g id="supporting-type" fill="#2c3945"><path d="{subtitle}"/><path d="{quality}"/><path d="{reliability}"/><path d="{flexibility}"/></g><g id="tagline-rules" fill="#babdbf"><path d="M91 642H307V647H91ZM1447 642H1691V647H1447Z"/></g><g id="tagline-separators" fill="#fa661f"><path d="M612 618H617V670H612ZM1035 618H1040V670H1035Z"/></g>'''

def save(name, box, content, title, y_offset=-233):
    (DEST/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{box}" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="title"><title id="title">{title}</title>{defs}<g transform="translate(-72 {y_offset})">{content}</g></svg>\n')

save('dmacht-logo.svg', '0 0 1620 437', mark+word+full, 'D-Macht. Industrial Coding &amp; Marking Solutions. Quality, Reliability, Flexibility')
save('dmacht-logo-compact.svg', '0 0 1620 276', mark+word, 'D-Macht')
save('dmacht-mark.svg', '0 0 513 513', mark, 'D-Macht symbol', y_offset=-114.5)
