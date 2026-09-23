(() => {
  'use strict';

  const C = window.SITE_CONTENT;
  const LANG_KEY = 'vero-lang';
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MAX_PREVIEWS = 2; // simultaneous muted previews on touch devices

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const videoSrc = (id) => `videos/${id}.mp4`;
  const posterSrc = (id) => `posters/${id}.jpg`;

  // Remembers which media files are missing, so re-renders don't retry them.
  const missing = { poster: new Set(), video: new Set() };

  /* ---------------- Language ---------------- */
  function storage(action, value) {
    try {
      if (action === 'get') return localStorage.getItem(LANG_KEY);
      localStorage.setItem(LANG_KEY, value);
    } catch (e) { /* private mode / blocked storage */ }
    return null;
  }

  function detectLang() {
    const saved = storage('get');
    if (C.languages.includes(saved)) return saved;
    const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (const l of prefs) {
      const code = String(l).slice(0, 2).toLowerCase();
      if (C.languages.includes(code)) return code;
    }
    return C.defaultLang;
  }

  let lang = detectLang();
  const t = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), C.ui[lang]) ?? '';
  const L = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang] ?? v.en ?? '');

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k === 'html') node.innerHTML = v;
      else node.setAttribute(k, v === true ? '' : v);
    }
    for (const c of [].concat(children)) if (c != null) node.append(c);
    return node;
  }

  /* ---------------- Icons ---------------- */
  const ICONS = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>',
    left: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg class="contact__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M21.5 3.5L2.5 11l6.5 2.5 2.5 7 3.5-4.5 5 3.5z"/><path d="M9 13.5L21.5 3.5"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 0 1-2.8-2.8l.8-1-1-2z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M14 3v11.5a4 4 0 1 1-4-4"/><path d="M14 3c.4 2.8 2.4 4.8 5 5"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M14 21v-8h3l.5-3.5H14V7.6c0-1 .4-1.6 1.6-1.6H18V3.2c-.5-.1-1.6-.2-2.8-.2-2.7 0-4.4 1.6-4.4 4.5v2H8V13h2.8v8"/></svg>',
    brand: '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><path d="M10 40V20l14-12 14 12v20z"/><path d="M19 40V28h10v12"/></svg>',
    rocket: '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><path d="M24 6c7 5 10 12 9 22l-5 5h-8l-5-5c-1-10 2-17 9-22z"/><circle cx="24" cy="19" r="3.5"/><path d="M15 28l-5 5 3 7 5-5M33 28l5 5-3 7-5-5"/></svg>',
    globe: '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><circle cx="24" cy="24" r="17"/><path d="M7 24h34M24 7c5 5 7 11 7 17s-2 12-7 17c-5-5-7-11-7-17s2-12 7-17z"/></svg>',
  };
  const AUDIENCE_ICONS = ['brand', 'rocket', 'globe'];

  /* ---------------- Static texts ---------------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
    $$('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
    $$('[data-i18n-aria]').forEach((n) => { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
    $$('.lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('.skip').textContent = t('nav.works');
    $('#aboutText').replaceChildren(...[].concat(t('about.text')).map((p) => el('p', { text: p })));
    $('#aboutFacts').replaceChildren(...t('about.facts').map((f) => el('li', { text: f })));
  }

  /* ---------------- Works ---------------- */
  function soonBlock() {
    return el('span', { class: 'soon', 'aria-hidden': 'true' }, [
      el('span', { class: 'soon__mark', html: 'VERO<span>+</span>' }),
      el('span', { class: 'soon__label', text: t('works.soon') }),
    ]);
  }

  function workCard(w) {
    const card = el('button', {
      class: 'card', type: 'button', 'data-id': w.id,
      'aria-label': `${t('works.open')}: ${L(w.title)}`,
    });
    const media = el('span', { class: 'card__media' });
    const img = el('img', { class: 'card__poster', src: posterSrc(w.id), alt: '', loading: 'lazy', decoding: 'async' });
    img.addEventListener('error', () => { missing.poster.add(w.id); card.classList.add('is-soon'); });
    if (missing.poster.has(w.id)) card.classList.add('is-soon');
    media.append(img, soonBlock(), el('span', { class: 'card__play', html: ICONS.play }));
    card.append(media, el('span', {}, [
      el('span', { class: 'card__brand', text: w.brand }),
      el('span', { class: 'card__title', text: L(w.title) }),
    ]));
    card.addEventListener('click', () => openWork(w));
    return card;
  }

  function ghostCard() {
    const card = el('div', { class: 'card card--ghost', 'aria-hidden': 'true' });
    card.append(el('span', { class: 'card__media' }, soonBlock()), el('span', {}, [
      el('span', { class: 'card__brand', text: 'VERO+' }),
      el('span', { class: 'card__title', text: t('works.soon') }),
    ]));
    return card;
  }

  function navButton(dir, track) {
    const b = el('button', { type: 'button', 'aria-label': t(dir === -1 ? 'works.prev' : 'works.next'), html: dir === -1 ? ICONS.left : ICONS.right });
    b.addEventListener('click', () => track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reducedMotion ? 'auto' : 'smooth' }));
    return b;
  }

  function renderWorks() {
    const rows = $('#rows');
    rows.replaceChildren();
    for (const cat of C.categories) {
      const items = C.works.filter((w) => w.category === cat.id);
      const track = el('div', { class: 'track', role: 'list' });
      if (items.length) items.forEach((w) => track.append(workCard(w)));
      else for (let i = 0; i < 3; i++) track.append(ghostCard());

      const prev = navButton(-1, track);
      const next = navButton(1, track);
      const syncNav = () => {
        prev.disabled = track.scrollLeft <= 4;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      };
      track.addEventListener('scroll', syncNav, { passive: true });
      requestAnimationFrame(syncNav);
      window.addEventListener('resize', syncNav, { passive: true });

      const title = el('h3', { class: 'row__title' }, [
        L(cat.title),
        el('span', { class: 'row__count', text: items.length ? String(items.length).padStart(2, '0') : '' }),
      ]);
      rows.append(el('div', { class: 'row reveal' }, [
        el('div', { class: 'container row__head' }, [title, el('div', { class: 'row__nav' }, [prev, next])]),
        track,
      ]));
    }
    setupPreviews();
  }

  /* ---------------- Card previews ---------------- */
  const active = [];
  let previewObserver = null;

  function startPreview(card) {
    const id = card.dataset.id;
    if (!id || card.classList.contains('is-soon') || missing.video.has(id) || modal.open) return;
    let v = $('.card__video', card);
    if (!v) {
      v = el('video', { class: 'card__video', src: videoSrc(id), muted: true, loop: true, playsinline: true, preload: 'none', 'aria-hidden': 'true' });
      v.muted = true;
      v.addEventListener('error', () => { missing.video.add(id); stopPreview(card); v.remove(); });
      v.addEventListener('playing', () => { if (active.includes(card)) card.classList.add('is-playing'); });
      $('.card__media', card).insertBefore(v, $('.soon', card));
    }
    if (!active.includes(card)) active.push(card);
    while (active.length > (canHover ? 1 : MAX_PREVIEWS)) stopPreview(active[0]);
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }

  function stopPreview(card) {
    const i = active.indexOf(card);
    if (i > -1) active.splice(i, 1);
    card.classList.remove('is-playing');
    const v = $('.card__video', card);
    if (v) v.pause();
  }

  function stopAllPreviews() { [...active].forEach(stopPreview); }

  function setupPreviews() {
    active.length = 0;
    if (previewObserver) previewObserver.disconnect();
    if (reducedMotion) return;
    const cards = $$('.card[data-id]');
    if (canHover) {
      cards.forEach((c) => {
        c.addEventListener('mouseenter', () => startPreview(c));
        c.addEventListener('mouseleave', () => stopPreview(c));
        c.addEventListener('focus', () => startPreview(c));
        c.addEventListener('blur', () => stopPreview(c));
      });
    } else if ('IntersectionObserver' in window) {
      previewObserver = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? startPreview(e.target) : stopPreview(e.target)));
      }, { threshold: 0.7 });
      cards.forEach((c) => previewObserver.observe(c));
    }
  }

  /* ---------------- Other sections ---------------- */
  function renderProcess() {
    $('#episodes').replaceChildren(...C.process.map((p, i) => {
      const num = String(i + 1).padStart(2, '0');
      return el('li', { class: `episode reveal${i === C.process.length - 1 ? ' episode--last' : ''}` }, [
        el('span', { class: 'episode__bg', 'aria-hidden': 'true', text: num }),
        el('span', { class: 'episode__num', text: `EP.${num}` }),
        el('h3', { class: 'episode__title', text: L(p.title) }),
        el('p', { class: 'episode__text', text: L(p.text) }),
      ]);
    }));
  }

  function renderTools() {
    $('#toolsList').replaceChildren(...C.tools.map((tool) => el('li', { class: 'tool reveal' }, [
      el('span', { class: 'tool__icon', 'aria-hidden': 'true', text: tool.name.slice(0, 2) }),
      el('span', {}, [
        el('span', { class: 'tool__name', text: tool.name }),
        el('span', { class: 'tool__role', text: L(tool.role) }),
      ]),
    ])));
  }

  function renderAudience() {
    $('#audienceGrid').replaceChildren(...C.audience.map((a, i) => el('article', { class: 'aud reveal' }, [
      el('span', { class: 'aud__icon', html: ICONS[AUDIENCE_ICONS[i % AUDIENCE_ICONS.length]] }),
      el('h3', { class: 'aud__title', text: L(a.title) }),
      el('p', { class: 'aud__text', text: L(a.text) }),
    ])));
  }

  function renderContacts() {
    $('#contactsGrid').replaceChildren(...C.contacts.map((c) => {
      const href = C.links[c.id] || '#';
      const external = /^https?:/.test(href);
      const a = el('a', {
        class: 'contact reveal', href,
        target: external ? '_blank' : null, rel: external ? 'noopener noreferrer' : null,
      });
      a.innerHTML = ICONS[c.id] || '';
      a.append(el('span', { text: c.label }));
      a.insertAdjacentHTML('beforeend', ICONS.arrow);
      return a;
    }));
  }

  /* ---------------- Reveal on scroll ---------------- */
  let revealObserver = null;
  function setupReveal() {
    const items = $$('.reveal:not(.is-in)');
    if (reducedMotion || !('IntersectionObserver' in window)) { items.forEach((n) => n.classList.add('is-in')); return; }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); revealObserver.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    items.forEach((n) => revealObserver.observe(n));
  }

  /* ---------------- Modal ---------------- */
  const modal = $('#modal');
  const modalVideo = $('#modalVideo');
  const modalMedia = $('#modalMedia');
  const modalInfo = $('#modalInfo');
  const heroVideo = $('#heroVideo');
  let current = null; // work object or 'showreel'

  modalVideo.addEventListener('error', () => {
    if (!modalVideo.getAttribute('src')) return;
    modalMedia.classList.add('is-soon');
  });

  function fillInfo(w) {
    modalInfo.replaceChildren(
      el('p', { class: 'modal__brand', text: w.brand }),
      el('h2', { class: 'modal__title', id: 'modalTitle', text: L(w.title) }),
      el('div', { class: 'modal__block' }, [el('p', { class: 'modal__label', text: t('modal.task') }), el('p', { text: L(w.task) })]),
      el('div', { class: 'modal__block' }, [el('p', { class: 'modal__label', text: t('modal.done') }), el('p', { text: L(w.done) })]),
      el('div', { class: 'modal__block' }, [
        el('p', { class: 'modal__label', text: t('modal.tools') }),
        el('ul', { class: 'tags' }, (w.tools || []).map((x) => el('li', { text: x }))),
      ]),
    );
    modal.setAttribute('aria-labelledby', 'modalTitle');
  }

  function openPlayer(src, poster, isMissing) {
    stopAllPreviews();
    if (!heroVideo.paused) heroVideo.pause();
    modalMedia.classList.toggle('is-soon', isMissing);
    if (isMissing) {
      modalVideo.removeAttribute('src');
    } else {
      if (poster) modalVideo.poster = poster; else modalVideo.removeAttribute('poster');
      modalVideo.src = src;
      modalVideo.muted = false;
    }
    if (!modal.open) {
      if (typeof modal.showModal === 'function') modal.showModal();
      else modal.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
    if (!isMissing) {
      const p = modalVideo.play();
      if (p && p.catch) p.catch(() => {});
    }
  }

  function openWork(w) {
    current = w;
    modal.classList.remove('is-reel');
    fillInfo(w);
    openPlayer(videoSrc(w.id), missing.poster.has(w.id) ? null : posterSrc(w.id), missing.video.has(w.id));
  }

  function openShowreel() {
    current = 'showreel';
    modal.classList.add('is-reel');
    modalInfo.replaceChildren();
    modal.removeAttribute('aria-labelledby');
    modal.setAttribute('aria-label', t('modal.showreel'));
    openPlayer(videoSrc('showreel'), posterSrc('showreel'), $('#hero').classList.contains('no-video'));
  }

  function closeModal() {
    if (modal.open) {
      if (typeof modal.close === 'function') modal.close();
      else { modal.removeAttribute('open'); onClosed(); }
    }
  }

  function onClosed() {
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
    modal.removeAttribute('aria-label');
    document.body.style.overflow = '';
    current = null;
    syncHero();
  }

  modal.addEventListener('close', onClosed);
  $('#modalClose').addEventListener('click', closeModal);
  // click on the backdrop (outside the box) closes the dialog
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  $('#showreelBtn').addEventListener('click', openShowreel);

  /* ---------------- Hero video ---------------- */
  let heroInView = true;
  let heroPausedByUser = reducedMotion;
  const heroToggle = $('#heroToggle');
  const canPlayHero = () => heroInView && !heroPausedByUser && !modal.open && !$('#hero').classList.contains('no-video');
  function syncHero() {
    heroToggle.setAttribute('aria-pressed', String(heroPausedByUser));
    if (canPlayHero()) { const p = heroVideo.play(); if (p && p.catch) p.catch(() => {}); } else heroVideo.pause();
  }
  heroToggle.addEventListener('click', () => { heroPausedByUser = !heroPausedByUser; syncHero(); });
  heroVideo.addEventListener('error', () => $('#hero').classList.add('no-video'));
  if (reducedMotion) heroVideo.removeAttribute('autoplay');
  syncHero();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      heroInView = e.isIntersecting;
      if (!modal.open) syncHero();
    }, { threshold: 0.05 }).observe($('#hero'));
  }

  /* ---------------- Header ---------------- */
  const header = $('#header');
  const burger = $('#burger');
  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    header.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));
  $$('#nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', (e) => { if (!header.contains(e.target)) setMenu(false); });

  /* ---------------- Language switch ---------------- */
  function render() {
    applyStatic();
    renderWorks();
    renderProcess();
    renderTools();
    renderAudience();
    renderContacts();
    setupReveal();
    if (modal.open && current && current !== 'showreel') fillInfo(current);
  }

  $$('.lang [data-lang]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    storage('set', lang);
    render();
    // content was rebuilt: show it immediately instead of re-animating
    $$('.reveal').forEach((n) => n.classList.add('is-in'));
  }));

  $('#year').textContent = new Date().getFullYear();
  render();
  $$('.about .section__title, .about__text, .section__subtitle').forEach((n) => n.classList.add('reveal'));
  setupReveal();
})();
