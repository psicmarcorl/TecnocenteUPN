/* Tecnocente · comportamiento compartido (menú, tema) y funciones de cada página.
   Cada bloque se activa solo si la página tiene el elemento que necesita. */
(function () {
  const $ = s => document.querySelector(s);
  const ROOT = document.documentElement.dataset.root || '';
  const D = window.TEC || { herramientas: [], materias: [], horario: {} };
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const toast = t => { const el = $('#toast'); if (!el) return; el.textContent = t; el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 2200); };
  const isExt = h => /^https?:/.test(h);
  const href = h => isExt(h) ? h : ROOT + h;
  const target = h => isExt(h) ? ' target="_blank" rel="noopener"' : '';
  const UNI = { UPN: 'UPN Unidad 112', UG: 'Universidad de Guanajuato' };

  // Tema claro u oscuro
  const saved = store.get('tema'); if (saved) document.documentElement.setAttribute('data-theme', saved);
  $('#themeBtn')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next); store.set('tema', next);
  });

  // Menú en celular
  const nav = $('#mainNav'), mb = $('#menuBtn');
  mb?.addEventListener('click', () => { const o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', o); });

  // Correo
  $('#copyBtn')?.addEventListener('click', () => {
    const t = $('#mail').textContent;
    navigator.clipboard.writeText(t).then(() => toast('Correo copiado')).catch(() => {
      const r = document.createRange(); r.selectNodeContents($('#mail')); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      toast('Correo seleccionado: cópialo con Ctrl+C');
    });
  });

  // Inicio: ¿Quién participa?
  if ($('#pickBtn')) {
    let used = [];
    const list = () => $('#names').value.split('\n').map(s => s.trim()).filter(Boolean);
    const upd = () => { const n = list(); const rest = n.filter(x => !used.includes(x)); $('#left').textContent = $('#noRepeat').checked ? `${rest.length} de ${n.length} por participar` : `${n.length} en la lista`; };
    $('#names').addEventListener('input', () => { used = []; upd(); });
    $('#noRepeat').addEventListener('change', () => { used = []; upd(); });
    upd();
    $('#pickBtn').addEventListener('click', () => {
      const n = list(); if (!n.length) { $('#result').textContent = 'Escribe al menos un nombre'; return; }
      let pool = $('#noRepeat').checked ? n.filter(x => !used.includes(x)) : n;
      if (!pool.length) { used = []; pool = n; toast('Ya participaron todos. Empezamos de nuevo.'); }
      const r = $('#result'), btn = $('#pickBtn'); btn.disabled = true; r.classList.remove('win');
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; let i = 0; const steps = reduce ? 1 : 14;
      const tick = () => {
        r.textContent = pool[Math.floor(Math.random() * pool.length)]; i++;
        if (i < steps) setTimeout(tick, 40 + i * 12);
        else { const w = pool[Math.floor(Math.random() * pool.length)]; r.textContent = w; r.classList.add('win'); if ($('#noRepeat').checked) used.push(w); upd(); btn.disabled = false; }
      };
      tick();
    });
  }

  // Inicio: datos de los accesos rápidos
  const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
  if ($('#statTools')) $('#statTools').textContent = `${D.herramientas.length} herramientas`;
  if ($('#statClasses')) $('#statClasses').textContent = `${D.materias.filter(m => m.actual).length} materias este semestre`;
  if ($('#statNext')) {
    const hoy = (new Date().getDay() + 6) % 7; // 0 = lunes
    let txt = '';
    for (let k = 0; k < 7 && !txt; k++) { const d = (hoy + k) % 7; if (D.horario[d]) txt = (k === 0 ? 'Hoy' : 'Próxima: ' + dias[d]) + ' · ' + D.horario[d]; }
    $('#statNext').textContent = txt || 'Sin clases registradas';
  }

  // Herramientas
  const ICONS = {
    team: '<path d="M8 11a3 3 0 100-6 3 3 0 000 6zM16 11a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 3-5 6-5s6 2 6 5M14 15.5c3 0 8 1 8 4.5"/>',
    wheel: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    cards: '<rect x="3" y="6" width="8" height="12" rx="1.5"/><rect x="13" y="6" width="8" height="12" rx="1.5"/><path d="M7 10v4M17 10v4"/>',
    drag: '<path d="M9 3h6v6H9zM4 15h6v6H4zM14 15h6v6h-6zM12 9v3M7 15v-1.5h10V15"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-1 .6-1.5 1.1-1.5 2.2M12 17h.01"/>',
    grid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    cloud: '<path d="M7 18a4 4 0 01-.5-8 6 6 0 0111.5 1.5A3.5 3.5 0 0117.5 18z"/>',
    ticket: '<path d="M3 8a2 2 0 002-2h14a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H5a2 2 0 00-2-2v-2a2 2 0 000-4z"/><path d="M13 6v12" stroke-dasharray="2 2"/>'
  };
  if ($('#tools')) {
    const tools = D.herramientas;
    const cats = ['Todas', ...new Set(tools.map(x => x.t))]; let cat = 'Todas';
    const chips = $('#chips');
    const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const render = () => {
      const q = norm($('#q').value.trim());
      const list = tools.filter(x => (cat === 'Todas' || x.t === cat) && (!q || norm(x.n + ' ' + x.d).includes(q)));
      $('#tools').innerHTML = list.length ? list.map(x => `<article class="tool"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[x.i] || ''}</svg></div><h3>${x.n}</h3><p>${x.d}</p><div class="meta"><span class="tag">${x.t}</span><a class="open" href="${href(x.h)}"${target(x.h)}>Abrir</a></div></article>`).join('')
        : '<div class="empty">No encontré herramientas con ese nombre. Prueba con otra palabra.</div>';
    };
    cats.forEach(c => {
      const b = document.createElement('button'); b.className = 'chip'; b.type = 'button'; b.textContent = c; b.setAttribute('aria-pressed', c === cat);
      b.onclick = () => { cat = c; chips.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b)); render(); };
      chips.appendChild(b);
    });
    $('#q').addEventListener('input', render); render();
  }

  // Clases (listado)
  const itemsHTML = items => items.map(i => `<li><span>${i.h ? `<a href="${href(i.h)}"${target(i.h)}>${i.t}</a>` : i.t}</span><span class="meta">${i.m}</span></li>`).join('');
  if ($('#classList')) {
    const opts = [['now', 'Este semestre'], ['old', 'Semestres anteriores'], ['all', 'Todas']]; let cv = 'now';
    const cc = $('#classChips');
    const render = () => {
      const list = D.materias.filter(c => cv === 'all' || (cv === 'now') === c.actual);
      $('#classList').innerHTML = list.map(c => {
        const url = `${ROOT}clases/${c.slug}.html`;
        const body = c.items.length
          ? `<ul>${c.items.slice(0, 3).map(i => `<li><span>${i.t}</span><span>${i.m}</span></li>`).join('')}</ul>`
          : `<p class="soon"><span class="pill">en preparación</span></p>`;
        return `<article class="class"><div class="top${c.u === 'UG' ? ' ug' : ''}"><span class="eyebrow">${UNI[c.u]}</span><h3><a href="${url}">${c.n}</a></h3><p class="prog">${c.p}</p></div>${body}<p class="more"><a href="${url}">Ver materia →</a></p></article>`;
      }).join('');
    };
    opts.forEach(([v, l]) => {
      const b = document.createElement('button'); b.className = 'chip'; b.type = 'button'; b.textContent = l; b.setAttribute('aria-pressed', v === cv);
      b.onclick = () => { cv = v; cc.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b)); render(); };
      cc.appendChild(b);
    });
    render();
  }

  // Página de una materia
  if ($('#acts')) {
    const m = D.materias.find(x => x.slug === document.body.dataset.materia);
    if (m) {
      $('#acts').innerHTML = m.items.length ? itemsHTML(m.items)
        : '<li><span>Pronto encontrarás aquí las actividades, lecturas y fechas de esta materia.</span><span class="meta">en preparación</span></li>';
      if ($('#actCount')) $('#actCount').textContent = m.items.length ? `${m.items.length} ${m.items.length === 1 ? 'recurso' : 'recursos'}` : 'Sin actividades todavía';
    }
  }

  // Horario
  if ($('#week')) {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
    const today = new Date().getDay() - 1;
    $('#week').innerHTML = days.map((d, i) => `<div class="day${i === today ? ' today' : ''}"><b>${d}</b>${D.horario[i] ? `<span class="slot">${D.horario[i]}</span>` : ''}</div>`).join('');
  }

  // Relájate: respiración guiada
  if ($('#breathBtn')) {
    let run = false;
    $('#breathBtn').addEventListener('click', async function () {
      if (run) { run = false; return; }
      run = true; this.textContent = 'Detener'; const dot = $('#dot'), lbl = $('#blbl');
      const phase = (txt, sec, scale) => new Promise(res => {
        lbl.textContent = txt; dot.style.transitionDuration = sec + 's'; dot.style.transform = `scale(${scale})`; let s = sec; dot.textContent = s;
        const iv = setInterval(() => { if (!run) { clearInterval(iv); res(); return; } s--; if (s > 0) dot.textContent = s; else { clearInterval(iv); res(); } }, 1000);
      });
      for (let c = 0; c < 5 && run; c++) { await phase('Inhala', 4, 1.9); if (!run) break; await phase('Sostén', 4, 1.9); if (!run) break; await phase('Exhala', 6, 1); }
      run = false; this.textContent = 'Empezar respiración'; dot.style.transform = 'scale(1)'; dot.textContent = '4'; lbl.textContent = 'Listo';
    });
  }
})();
