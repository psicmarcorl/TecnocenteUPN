/* Tecnocente · datos del sitio.
   Aquí se agregan herramientas, materias y actividades. Las páginas se llenan solas con esta información.
   Las rutas "h" son relativas a la carpeta principal del sitio; los enlaces que empiezan con https:// abren en otra pestaña. */
window.TEC = {
  horario: { 2: '9:00–11:00', 4: '7:00–8:00' }, // 0 = lunes … 4 = viernes

  herramientas: [
    { n: 'Generador de equipos', h: 'herramientas/generador-equipos.html', t: 'Sorteos y equipos', i: 'team',
      d: 'Pega la lista del grupo y forma equipos aleatorios en un clic.' },
    { n: 'Ruleta de selección', h: 'herramientas/ruleta.html', t: 'Sorteos y equipos', i: 'wheel',
      d: 'Gira la ruleta para elegir quién participa o qué tema sigue.' },
    { n: 'Carrera de números', h: 'herramientas/carrera-numeros.html', t: 'Sorteos y equipos', i: 'flag',
      d: 'Hasta 10 autos compiten; en 10 segundos sabes el orden de exposición.' },
    { n: 'Memorama de Pedagogía', h: 'herramientas/memorama-pedagogia.html', t: 'Juegos', i: 'cards',
      d: 'Encuentra los pares de conceptos y autores.' },
    { n: 'Cada animal a su hogar', h: 'herramientas/granja.html', t: 'Juegos', i: 'drag',
      d: 'Arrastra cada animal a su lugar en la granja y valida tus respuestas.' },
    { n: 'Crucigrama de Erikson', h: 'herramientas/crucigrama-erikson.html', t: 'Juegos', i: 'grid',
      d: 'Las etapas psicosociales en un crucigrama jugable en celular.' },
    { n: 'Trivia: Explicar y comprender', h: 'herramientas/trivia-explicar-comprender.html', t: 'Trivias', i: 'quiz',
      d: '15 preguntas de investigación científica, con puntos extra por rapidez.' },
    { n: 'Trivia de Erik Erikson', h: 'herramientas/trivia-erikson.html', t: 'Trivias', i: 'quiz',
      d: '20 preguntas de opción múltiple, verdadero o falso y relación de conceptos.' },
    { n: 'Nube de Ideas', h: 'https://psicmarcorl.github.io/Herramientas-didacticas/', t: 'Participación', i: 'cloud',
      d: 'Cada alumno envía palabras y la nube crece en vivo en el proyector.' },
    { n: 'Boleto de salida', h: 'https://psicmarcorl.github.io/Herramientas-didacticas/', t: 'Participación', i: 'ticket',
      d: 'Al final de la clase, cada alumno deja su reflexión entrando por QR.' }
  ],

  // u: 'UPN' o 'UG' · actual: true = este semestre
  materias: [
    { slug: 'procesos-psicosociales', n: 'Procesos psicosociales del rendimiento académico', p: 'Lic. en Psicología Educativa', u: 'UPN', actual: true, items: [] },
    { slug: 'cultura-comunicacion-educacion', n: 'Cultura, comunicación y educación', p: 'Lic. en Pedagogía · Lic. en Intervención Educativa', u: 'UPN', actual: true, items: [] },
    { slug: 'jovenes-violencia-convivencialidad', n: 'Jóvenes, violencia y convivencialidad', p: 'Lic. en Pedagogía', u: 'UPN', actual: true,
      items: [{ t: 'Feria por la eliminación de la violencia', m: '25 de noviembre' }] },
    { slug: 'interculturalidad-comunicacion-educacion', n: 'Interculturalidad, comunicación y educación', p: 'Lic. en Intervención Educativa', u: 'UPN', actual: true, items: [] },
    { slug: 'teoria-de-la-medida', n: 'Teoría de la Medida', p: 'Psicología Clínica', u: 'UG', actual: true, items: [] },
    { slug: 'tecnologia-aplicada-psicologia', n: 'Tecnología Aplicada a la Psicología', p: 'Psicología Clínica', u: 'UG', actual: true, items: [] },
    { slug: 'metodos-cualitativos', n: 'Métodos cualitativos', p: 'Semestre anterior', u: 'UPN', actual: false, items: [
      { t: 'Explicar y comprender · trivia', m: '15 preguntas', h: 'herramientas/trivia-explicar-comprender.html' },
      { t: 'SciELO', m: 'buscador', h: 'https://scielo.org/es/' },
      { t: 'Google Académico', m: 'buscador', h: 'https://scholar.google.com/' },
      { t: 'Consensus', m: 'IA', h: 'https://consensus.app/' },
      { t: 'Complemento de IA de Google Académico', m: 'IA', h: 'https://scholar.google.com/scholar_settings?sciifh=1&hl=es&as_sdt=0,5#4' }
    ] },
    { slug: 'desarrollo-aprendizaje-educacion', n: 'Desarrollo, aprendizaje y educación', p: 'Semestre anterior', u: 'UPN', actual: false, items: [
      { t: 'Crucigrama: etapas psicosociales de Erikson', m: 'juego', h: 'herramientas/crucigrama-erikson.html' },
      { t: 'Trivia de Erik Erikson', m: '20 preguntas', h: 'herramientas/trivia-erikson.html' }
    ] },
    { slug: 'comunicacion-procesos-educativos', n: 'Comunicación en los procesos educativos', p: 'Semestre anterior', u: 'UPN', actual: false, items: [] }
  ]
};
