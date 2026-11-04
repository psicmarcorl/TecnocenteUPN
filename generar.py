"""Genera las páginas de Tecnocente con el mismo encabezado, menú y pie.

Uso: python3 generar.py
Las materias se leen de assets/datos.js: al agregar una materia nueva ahí, vuelve a ejecutar este archivo
para crear su página en clases/. Las actividades de cada materia no requieren volver a generar nada.
"""
import json
import os
import re

RAIZ = os.path.dirname(os.path.abspath(__file__))

NAV = [("herramientas.html", "Herramientas"), ("clases/", "Clases"), ("horario.html", "Horario"), ("relajate.html", "Relájate")]


def encabezado(root, activo):
    actual = ' aria-current="page"'
    enlaces = "\n".join(
        f'      <a href="{root}{h}"{actual if h == activo else ""}>{t}</a>' for h, t in NAV
    )
    return f'''<header>
  <div class="wrap bar">
    <a class="logo" href="{root or './'}" aria-label="Tecnocente, inicio">
      <i><svg viewBox="0 0 24 24" fill="none" stroke="var(--on-navy)" stroke-width="2.4" stroke-linecap="round"><path d="M5 6h14M12 6v13"/></svg></i>
      Tecnocente
    </a>
    <button class="iconbtn" id="menuBtn" aria-label="Abrir menú" aria-expanded="false" aria-controls="mainNav"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    <nav class="main" id="mainNav" aria-label="Principal">
{enlaces}
    </nav>
    <button class="iconbtn" id="themeBtn" aria-label="Cambiar tema claro u oscuro"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button>
  </div>
</header>'''


PIE = '''<footer>
  <div class="wrap">
    <div><strong>Marco Antonio Rojas López</strong><br><span class="small">Universidad Pedagógica Nacional, Unidad 112 Celaya</span></div>
    <div class="mail"><code id="mail">marojasl@upncelaya.edu.mx</code><button class="btn ghost" id="copyBtn" type="button" style="padding:8px 12px">Copiar correo</button></div>
  </div>
</footer>
<div class="toast" id="toast" role="status"></div>'''


def pagina(ruta, titulo, descripcion, activo, cuerpo, body_attrs=""):
    root = "../" * ruta.count("/")
    html = f'''<!doctype html>
<html lang="es" data-root="{root}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{titulo}</title>
<meta name="description" content="{descripcion}">
<meta name="theme-color" content="#1F3864">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=IBM+Plex+Mono:wght@500&display=swap">
<link rel="stylesheet" href="{root}assets/estilos.css">
</head>
<body{body_attrs}>
{encabezado(root, activo)}

<main>
{cuerpo}
</main>

{PIE}
<script src="{root}assets/datos.js"></script>
<script src="{root}assets/sitio.js"></script>
</body>
</html>
'''
    destino = os.path.join(RAIZ, ruta)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    with open(destino, "w", encoding="utf-8") as f:
        f.write(html)


def icono(path):
    return f'<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{path}</svg></div>'


INICIO = f'''  <section class="hero">
    <div class="wrap">
      <div>
        <span class="eyebrow">UPN Unidad 112 · Celaya, Gto.</span>
        <h1><span class="mark">Tecno</span>cente</h1>
        <p class="lead">Espacio para la docencia, el conocimiento y las herramientas digitales de mis clases.</p>
        <div class="ctas">
          <a class="btn solid" href="herramientas.html">Ver herramientas</a>
          <a class="btn ghost" href="clases/">Ir a mi materia</a>
        </div>
      </div>

      <div class="picker" aria-labelledby="pickTitle">
        <header><h3 id="pickTitle">¿Quién participa?</h3><span class="ejemplo">lista de ejemplo</span></header>
        <label for="names">Un nombre por renglón</label>
        <textarea id="names">Ana Pérez
Juan López
María Martínez
Luis García
Sofía Ramírez
Carlos Díaz</textarea>
        <div class="row">
          <button class="btn solid" id="pickBtn" type="button">Elegir al azar</button>
          <label class="count" style="margin:0;display:flex;gap:6px;align-items:center"><input type="checkbox" id="noRepeat" checked> sin repetir</label>
        </div>
        <div class="result" id="result" aria-live="polite">—</div>
        <p class="count" id="left" style="margin-top:8px"></p>
      </div>
    </div>
  </section>

  <section class="band tight" aria-label="Secciones del sitio">
    <div class="wrap">
      <div class="quick">
        <a class="qcard" href="herramientas.html">{icono('<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>')}<h3>Herramientas</h3><p>Sorteos, juegos y trivias para usar en clase.</p><span class="stat" id="statTools"></span><span class="go">Abrir →</span></a>
        <a class="qcard" href="clases/">{icono('<path d="M4 5h11a3 3 0 013 3v11H7a3 3 0 01-3-3z"/><path d="M8 9h6M8 13h6"/>')}<h3>Clases</h3><p>Entra a tu materia y encuentra sus actividades.</p><span class="stat" id="statClasses"></span><span class="go">Abrir →</span></a>
        <a class="qcard" href="horario.html">{icono('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>')}<h3>Horario</h3><p>Días de clase y calendario de entregas.</p><span class="stat" id="statNext"></span><span class="go">Abrir →</span></a>
        <a class="qcard" href="relajate.html">{icono('<path d="M12 21c-5-3-8-6.5-8-10.5A4.5 4.5 0 0112 7a4.5 4.5 0 018 3.5c0 4-3 7.5-8 10.5z"/>')}<h3>Relájate</h3><p>Una pausa de respiración de un minuto.</p><span class="stat">1 minuto</span><span class="go">Abrir →</span></a>
      </div>
    </div>
  </section>'''

HERRAMIENTAS = '''  <section class="pagehead">
    <div class="wrap">
      <span class="eyebrow">Para usar en clase</span>
      <h1>Herramientas</h1>
      <p>Sorteos, juegos y trivias que funcionan en celular, tableta o proyector.</p>
    </div>
  </section>
  <section class="band tight">
    <div class="wrap">
      <div class="tools-ctrl">
        <div class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="q" type="search" placeholder="Buscar herramienta" aria-label="Buscar herramienta"></div>
        <div class="chips" role="group" aria-label="Filtrar por tipo" id="chips"></div>
      </div>
      <div class="grid" id="tools"></div>
    </div>
  </section>'''

CLASES = '''  <section class="pagehead">
    <div class="wrap">
      <span class="eyebrow">Por materia</span>
      <h1>Clases</h1>
      <p>Busca tu materia y entra a su página para ver actividades, lecturas y fechas.</p>
    </div>
  </section>
  <section class="band tight">
    <div class="wrap">
      <div class="chips class-ctrl" role="group" aria-label="Filtrar materias" id="classChips"></div>
      <div class="classes" id="classList"></div>
    </div>
  </section>'''

HORARIO = '''  <section class="pagehead">
    <div class="wrap">
      <span class="eyebrow">Organízate</span>
      <h1>Horario y fechas</h1>
      <p>Días de clase de esta semana y el calendario con entregas y fechas importantes.</p>
    </div>
  </section>
  <section class="band tight">
    <div class="wrap">
      <div class="panel">
        <h3>Esta semana</h3>
        <div class="week" id="week"></div>
        <iframe class="calframe" title="Calendario de la clase" loading="lazy" src="https://calendar.google.com/calendar/embed?src=c_classroom5063ffc0%40group.calendar.google.com&amp;ctz=America%2FMexico_City&amp;mode=AGENDA&amp;showPrint=0&amp;showTz=0&amp;showCalendars=0&amp;showTitle=0"></iframe>
        <p class="small" style="margin-top:8px">Si no ves las fechas, inicia sesión con tu cuenta institucional de Google. · <a href="https://www.google.com/maps/search/?api=1&amp;query=20.536923,-100.808851" target="_blank" rel="noopener">Cómo llegar a la UPN 112</a></p>
      </div>
    </div>
  </section>'''

RELAJATE = '''  <section class="pagehead">
    <div class="wrap">
      <span class="eyebrow">Relájate</span>
      <h1>Pausa de un minuto</h1>
      <p>Antes de un examen o después de una clase pesada, tómate un momento para respirar.</p>
    </div>
  </section>
  <section class="band tight">
    <div class="wrap">
      <div class="panel pause">
        <div class="breath" aria-hidden="true"><div class="ring"></div><div class="dot" id="dot">4</div><div class="lbl" id="blbl">Listo</div></div>
        <div>
          <h2>Respiración 4 · 4 · 6</h2>
          <p>Inhala 4 segundos, sostén 4 y exhala 6. Sigue el círculo durante cinco ciclos.</p>
          <div class="ctas" style="margin-top:0">
            <button class="btn solid" id="breathBtn" type="button">Empezar respiración</button>
            <a class="btn ghost" href="https://www.youtube.com/results?search_query=morning+jazz+snoopy" target="_blank" rel="noopener">Música para concentrarte</a>
          </div>
        </div>
      </div>
    </div>
  </section>'''

UNI = {"UPN": "UPN Unidad 112", "UG": "Universidad de Guanajuato"}


def materias():
    """Lee el arreglo de materias de assets/datos.js (solo los campos que necesita la página)."""
    js = open(os.path.join(RAIZ, "assets/datos.js"), encoding="utf-8").read()
    bloque = js[js.index("materias:"):]
    return [
        dict(slug=m[0], n=m[1], p=m[2], u=m[3], actual=m[4] == "true")
        for m in re.findall(r"slug: '([^']+)', n: '([^']+)', p: '([^']+)', u: '(UPN|UG)', actual: (true|false)", bloque)
    ]


def generar():
    pagina("index.html", "Tecnocente · UPN 112",
           "Espacio docente de Marco Antonio Rojas López: herramientas digitales, clases y recursos para estudiantes.",
           "", INICIO)
    pagina("herramientas.html", "Herramientas · Tecnocente", "Sorteos, juegos y trivias para usar en clase.", "herramientas.html", HERRAMIENTAS)
    pagina("clases/index.html", "Clases · Tecnocente", "Materias y actividades de cada curso.", "clases/", CLASES)
    pagina("horario.html", "Horario · Tecnocente", "Horario de clases y calendario de entregas.", "horario.html", HORARIO)
    pagina("relajate.html", "Relájate · Tecnocente", "Pausa de respiración de un minuto.", "relajate.html", RELAJATE)
    lista = materias()
    for m in lista:
        ug = " ug" if m["u"] == "UG" else ""
        estado = "Este semestre" if m["actual"] else "Semestre anterior"
        prog = m["p"] if m["actual"] else "Materia de un semestre anterior"
        cuerpo = f'''  <section class="mhero{ug}">
    <div class="wrap">
      <nav class="crumbs" aria-label="Ruta"><a href="../">Inicio</a><span>/</span><a href="./">Clases</a></nav>
      <h1>{m["n"]}</h1>
      <p class="prog">{prog} · {UNI[m["u"]]}</p>
      <span class="pill">{estado}</span>
    </div>
  </section>
  <section class="band tight" style="padding-top:32px">
    <div class="wrap mgrid">
      <div class="panel">
        <h2 style="font-size:1.5rem">Actividades y recursos</h2>
        <p class="small" id="actCount" style="margin-top:4px"></p>
        <ul class="acts" id="acts"></ul>
      </div>
      <aside class="panel side">
        <h3>Para la clase</h3>
        <p>Sorteos de participación, equipos y juegos de repaso.</p>
        <a class="btn ghost" href="../herramientas.html">Ver herramientas</a>
        <a class="btn ghost" href="../horario.html">Ver horario y fechas</a>
        <a class="open" href="./">← Todas las materias</a>
      </aside>
    </div>
  </section>'''
        pagina(f'clases/{m["slug"]}.html', f'{m["n"]} · Tecnocente', f'Actividades y recursos de {m["n"]}.', "clases/", cuerpo,
               f' data-materia="{m["slug"]}"')
    print(f"Listo: 5 páginas y {len(lista)} materias.")


if __name__ == "__main__":
    generar()
