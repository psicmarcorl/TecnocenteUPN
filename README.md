# Tecnocente · UPN 112

Espacio docente de Marco Antonio Rojas López (Universidad Pedagógica Nacional, Unidad 112 Celaya): herramientas para el aula, materias, horario y pausas de bienestar. Se publica con GitHub Pages desde la rama `main`.

## Páginas
- `index.html` — Inicio: portada, selector "¿Quién participa?" y accesos a las secciones.
- `herramientas.html` — catálogo de herramientas con buscador y filtros.
- `clases/` — listado de materias y una página por materia (`clases/<materia>.html`).
- `horario.html` — días de clase y calendario de Classroom.
- `relajate.html` — pausa de respiración guiada.
- `herramientas/` — cada herramienta en su propia página.

## Cómo actualizar
- **Agregar una herramienta o una actividad a una materia:** edita `assets/datos.js`. Las páginas se actualizan solas.
- **Agregar una materia nueva:** agrégala en `assets/datos.js` y ejecuta `python3 generar.py` para crear su página.
- **Cambiar el menú, el pie o el texto fijo de una sección:** edita `generar.py` y vuelve a ejecutarlo.
- Estilos compartidos: `assets/estilos.css`. Comportamiento compartido: `assets/sitio.js`.
