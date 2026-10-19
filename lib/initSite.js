import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const lenisRef = { current: null };

const pad = (n, l = 2) => String(n).padStart(l, '0');

export function initSite(root) {
  gsap.registerPlugin(ScrollTrigger);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
  lenisRef.current = lenis;
  lenis.stop();
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const ctx = gsap.context(() => {}, root);
  let dead = false;

  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  fontsReady.then(() => {
    if (dead) return;
    ctx.add(() => build(root, lenis));
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad);

  return () => {
    dead = true;
    window.removeEventListener('load', onLoad);
    ctx.revert();
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenisRef.current = null;
  };
}

function build(root, lenis) {
  const q = gsap.utils.selector(root);
  const one = (s) => root.querySelector(s);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mm = gsap.matchMedia();

  /* ---------------- cursor ---------------- */
  const cursor = one('.cursor');
  const offs = [];
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    const label = ring.querySelector('em');
    const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
    const move = (e) => {
      cursor.classList.add('is-live');
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest('[data-cursor-label],[data-cursor],a,button,input,select');
      const text = t?.getAttribute('data-cursor-label');
      cursor.classList.toggle('is-hover', !!t && !text);
      cursor.classList.toggle('is-label', !!text);
      label.textContent = text || '';
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    document.documentElement.classList.add('has-cursor');
    offs.push(() => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.classList.remove('has-cursor');
    });
  }

  /* ---------------- anchors ---------------- */
  const anchors = {};
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    e.preventDefault();
    if (anchors[id]) return lenis.scrollTo(anchors[id](), { duration: 2 });
    const el = id ? document.getElementById(id) : null;
    lenis.scrollTo(el || 0, { duration: 2 });
  };
  root.addEventListener('click', onClick);

  /* ---------------- header + rail ---------------- */
  const hdr = one('.hdr');
  const railBar = one('.rail__bar i');
  const railPct = one('.rail__pct');
  const railLabel = one('.rail__label');
  lenis.on('scroll', ({ scroll, direction, progress }) => {
    hdr.classList.toggle('is-hidden', direction === 1 && scroll > window.innerHeight * 0.6);
    gsap.set(railBar, { scaleY: progress });
    railPct.textContent = pad(Math.round(progress * 100));
  });
  q('[data-label]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (s) => {
        if (s.isActive) railLabel.textContent = sec.dataset.label;
      },
    });
  });

  /* ---------------- loader + hero intro ---------------- */
  const count = one('.loader__count');
  const counter = { v: 0 };
  const intro = gsap.timeline({
    defaults: { ease: 'power3.inOut' },
    onComplete: () => {
      one('.loader').style.display = 'none';
      if (!document.documentElement.classList.contains('xp-open')) lenis.start();
    },
  });
  if (reduce) intro.timeScale(3);
  intro
    .fromTo('.loader .draw', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, stagger: 0.12 }, 0.1)
    .from('.loader__slat', { scaleX: 0, transformOrigin: '50% 50%', duration: 0.5, stagger: 0.03, ease: 'power2.out' }, 0.7)
    .from('.loader__name, .loader__sub', { y: 18, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, 0.9)
    .to(counter, { v: 100, duration: 2.4, ease: 'power2.inOut', onUpdate: () => (count.textContent = pad(Math.round(counter.v), 3)) }, 0)
    .to('.loader__door--l', { x: -36, duration: 1.1 }, 2.5)
    .to('.loader__door--r', { x: 36, duration: 1.1 }, 2.5)
    .to('.loader__name, .loader__sub, .loader__count, .loader__brand', { autoAlpha: 0, duration: 0.5 }, 2.6)
    .to('.loader__art', { scale: 14, duration: 1.5, ease: 'expo.in', transformOrigin: '50% 60%' }, 3)
    .to('.loader', { autoAlpha: 0, duration: 0.6, ease: 'none' }, 4.1)
    .fromTo('.d-clouds img', { scale: 1.35 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 4)
    .from('.d-title .ch', { yPercent: 115, duration: 1.4, stagger: 0.035, ease: 'expo.out' }, 4.2)
    .from('.d-title__sub, .d-foot, .d-scroll, .hdr, .rail', { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08, ease: 'power3.out' }, 4.6);

  /* ---------------- descent (hero → build → explore) ---------------- */
  const stage = one('.descent__stage');
  const floorsN = one('.d-progress__n');
  const floors = { v: 0 };
  const descent = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.descent',
      start: 'top top',
      end: '+=700%',
      scrub: 1,
      pin: stage,
      anticipatePin: 1,
      refreshPriority: 10,
      onUpdate: (s) => stage.classList.toggle('is-explore', s.progress > 0.9),
    },
  });
  anchors.residences = () => descent.scrollTrigger.end - 4;
  anchors.top = () => 0;

  descent
    .to('.d-clouds img', { scale: 1.5, yPercent: 7, duration: 2.4 }, 0)
    .to('.d-title', { yPercent: -40, autoAlpha: 0, filter: 'blur(10px)', duration: 1.2, ease: 'power1.in' }, 0.15)
    .to('.d-scroll, .d-foot', { autoAlpha: 0, duration: 0.5 }, 0)
    .fromTo('.fog i', { scale: 0.4, autoAlpha: 0 }, { scale: 1.6, autoAlpha: 1, duration: 1.4, stagger: 0.07, ease: 'power1.in' }, 0.8)
    .fromTo('.fog b', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.7)
    .set('.d-aerial', { autoAlpha: 1 }, 2.3)
    .fromTo('.d-aerial img', { scale: 1.7, rotate: -6 }, { scale: 1.08, rotate: 0, duration: 2.6, ease: 'power2.out' }, 2.3)
    .to('.fog b', { autoAlpha: 0, duration: 0.8 }, 2.35)
    .to('.fog i', { scale: 3.2, autoAlpha: 0, xPercent: (i) => (i % 2 ? 70 : -70), duration: 1.5, stagger: 0.04, ease: 'power1.out' }, 2.35)
    .fromTo('.d-rise .ch', { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.05, ease: 'power3.out' }, 3.1)
    .fromTo('.d-rise', { letterSpacing: '0em' }, { letterSpacing: '0.08em', duration: 2.2 }, 3.1)
    .to('.d-rise', { autoAlpha: 0, scale: 1.25, filter: 'blur(8px)', duration: 0.6, ease: 'power1.in' }, 4.9)
    .to('.d-aerial img', { scale: 2.6, duration: 1.4, ease: 'power2.in' }, 4.6)
    .fromTo('.d-build', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power2.inOut' }, 5.5)
    .fromTo('.d-build img', { scale: 1.3, yPercent: 10 }, { scale: 1, yPercent: 0, duration: 2.6, ease: 'power2.out' }, 5.5)
    .fromTo('.d-progress', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 5.6)
    .fromTo(floors, { v: 0 }, { v: 15, duration: 3.6, onUpdate: () => (floorsN.textContent = pad(Math.round(floors.v))) }, 5.6)
    .fromTo('.d-progress__bar i', { scaleX: 0 }, { scaleX: 1, duration: 3.6 }, 5.6)
    .fromTo('.d-why .ln__i', { yPercent: 115 }, { yPercent: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out' }, 6.3)
    .to('.d-why', { autoAlpha: 0, y: -40, duration: 0.7, ease: 'power1.in' }, 8.3)
    .fromTo('.d-done', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'power2.inOut' }, 7.9)
    .fromTo('.d-done img', { scale: 1.18 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 7.9)
    .to('.d-progress', { autoAlpha: 0, duration: 0.5 }, 9.3)
    .fromTo('.d-explore > *', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, 9.4)
    .fromTo('.levels__band', { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.025, ease: 'power2.out' }, 9.5)
    .to({}, { duration: 1.4 });

  /* ---------------- arrival ---------------- */
  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.arrival', start: 'top top', end: '+=280%', scrub: 1, pin: '.arrival__stage', anticipatePin: 1, refreshPriority: 9 },
    })
    .fromTo('.a-kicker', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0)
    .to('.a-ent img', { scale: 3.4, duration: 2, ease: 'power2.in' }, 0)
    .to('.a-kicker', { autoAlpha: 0, y: -30, duration: 0.3 }, 0.9)
    .fromTo('.a-lobby', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 1.55)
    .fromTo('.a-lobby img', { scale: 1.4 }, { scale: 1, duration: 1.8, ease: 'power2.out' }, 1.55)
    .fromTo('.a-title .ch', { yPercent: 115 }, { yPercent: 0, duration: 0.6, stagger: 0.025, ease: 'power3.out' }, 2.3)
    .fromTo('.a-copy, .a-tag', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 2.6)
    .to({}, { duration: 0.5 });

  /* ---------------- generic reveals ---------------- */
  q('[data-lines]').forEach((el) => {
    gsap.from(el.querySelectorAll('.ln__i'), {
      yPercent: 115,
      duration: 1.3,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 86%' },
    });
  });
  q('[data-fade]').forEach((el) => {
    gsap.from(el, {
      y: 36,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });
  q('[data-par]').forEach((el) => {
    const v = parseFloat(el.dataset.par);
    gsap.fromTo(
      el,
      { yPercent: -v, scale: 1.15 },
      {
        yPercent: v,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
  q('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.dec || '0', 10);
    const p = parseInt(el.dataset.pad || '0', 10);
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onUpdate: () => {
        const t = o.v.toFixed(dec);
        el.textContent = p ? t.padStart(p, '0') : t;
      },
    });
  });

  /* ---------------- interiors arches ---------------- */
  gsap.from('.arch', {
    yPercent: 24,
    autoAlpha: 0,
    duration: 1.4,
    stagger: 0.12,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.arches', start: 'top 85%' },
  });
  gsap.from('.arch__media img', {
    scale: 1.45,
    duration: 1.8,
    stagger: 0.12,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.arches', start: 'top 85%' },
  });

  /* ---------------- bedroom expand ---------------- */
  mm.add({ sm: '(max-width: 767px)', lg: '(min-width: 768px)' }, (c) => {
    const sm = c.conditions.sm;
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '.expand', start: 'top top', end: '+=180%', scrub: 1, pin: '.expand__stage', anticipatePin: 1, refreshPriority: 8 },
      })
      .fromTo(
        '.expand__win',
        { width: sm ? '70vw' : '24vw', height: sm ? '52vh' : '64vh', borderRadius: sm ? '35vw 35vw 0 0' : '12vw 12vw 0 0' },
        { width: '100vw', height: '100vh', borderRadius: '0vw 0vw 0 0', duration: 1.4, ease: 'power2.inOut' },
      )
      .fromTo('.expand__win img', { scale: 1.5 }, { scale: 1, duration: 1.6, ease: 'power2.out' }, 0)
      .fromTo('.expand__text .ln__i', { yPercent: 115 }, { yPercent: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, 1.15)
      .fromTo('.expand__text .eyebrow, .expand__meta span', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 }, 1.3)
      .to({}, { duration: 0.5 });
  });

  /* ---------------- amenities list ---------------- */
  const amenImgs = q('.amen__img');
  const amenItems = q('.amen__list li');
  const amenCount = one('.amen__count b');
  amenItems.forEach((li, i) => {
    ScrollTrigger.create({
      trigger: li,
      start: 'top 58%',
      end: 'bottom 58%',
      onToggle: (s) => {
        if (!s.isActive) return;
        amenItems.forEach((n, j) => n.classList.toggle('is-on', j === i));
        amenImgs.forEach((n, j) => n.classList.toggle('is-on', j === i));
        amenCount.textContent = pad(i + 1);
      },
    });
  });

  /* ---------------- wellness horizontal ---------------- */
  mm.add('(min-width: 900px)', () => {
    const track = one('.well__track');
    const dist = () => track.scrollWidth - window.innerWidth;
    const h = gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.well',
        start: 'top top',
        end: () => '+=' + dist(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        refreshPriority: 7,
      },
    });
    q('.well [data-hpar]').forEach((el) => {
      const v = parseFloat(el.dataset.hpar);
      gsap.fromTo(
        el,
        { xPercent: v },
        { xPercent: -v, ease: 'none', scrollTrigger: { trigger: el, containerAnimation: h, start: 'left right', end: 'right left', scrub: true } },
      );
    });
    q('.well .panel__title, .well .panel__huge').forEach((t) => {
      gsap.from(t.querySelectorAll('.ln__i'), {
        yPercent: 115,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: t, containerAnimation: h, start: 'left 80%' },
      });
    });
    gsap.to('.well__hint i', { x: 8, repeat: -1, yoyo: true, duration: 0.8, ease: 'sine.inOut' });
  });
  mm.add('(max-width: 899px)', () => {
    q('.well .panel__title, .well .panel__huge').forEach((t) => {
      gsap.from(t.querySelectorAll('.ln__i'), {
        yPercent: 115,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: t, start: 'top 85%' },
      });
    });
  });

  /* ---------------- pool → less rush ---------------- */
  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.pool', start: 'top top', end: '+=260%', scrub: 1, pin: '.pool__stage', anticipatePin: 1, refreshPriority: 6 },
    })
    .fromTo('.p-img img', { scale: 1.3 }, { scale: 1, duration: 2.2 }, 0)
    .fromTo('.p-title .ln__i', { yPercent: 115 }, { yPercent: 0, duration: 0.6, stagger: 0.18, ease: 'power3.out' }, 0.05)
    .fromTo('.p-cap', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.4)
    .to('.p-title, .p-cap', { yPercent: -30, autoAlpha: 0.0, duration: 0.6, ease: 'power1.in' }, 1.35)
    .fromTo('.p-circle', { clipPath: 'circle(0% at 50% 100%)' }, { clipPath: 'circle(150% at 50% 100%)', duration: 1.4, ease: 'power2.in' }, 1.1)
    .fromTo('.p-circle .ln__i', { yPercent: 115 }, { yPercent: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' }, 2.25)
    .fromTo('.p-circle .eyebrow', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 2.3)
    .fromTo('.p-r', { autoAlpha: 0, rotate: -25 }, { autoAlpha: 1, rotate: 0, duration: 0.4 }, 2.45)
    .fromTo('.p-mini', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 2.5)
    .to({}, { duration: 0.6 });

  /* ---------------- terrace window ---------------- */
  gsap.fromTo(
    '.terrace__win',
    { clipPath: 'inset(14% 20% 14% 20% round 28px)' },
    {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      ease: 'none',
      scrollTrigger: { trigger: '.terrace', start: 'top bottom', end: 'top top', scrub: true },
    },
  );

  /* ---------------- generation ---------------- */
  gsap.fromTo(
    '.gen__marquee span',
    { xPercent: 0 },
    { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '.gen', start: 'top bottom', end: 'bottom top', scrub: true } },
  );
  gsap.from('.gen__arch', {
    clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)',
    duration: 1.6,
    ease: 'expo.inOut',
    scrollTrigger: { trigger: '.gen__arch', start: 'top 85%' },
  });

  /* ---------------- coming home ---------------- */
  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.home', start: 'top bottom', end: 'bottom top', scrub: true },
    })
    .fromTo('.home__img', { clipPath: 'inset(18% 26% 18% 26%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
    .fromTo('.home__img img', { scale: 1.35 }, { scale: 1, duration: 1.4 }, 0)
    .fromTo('.home__l1 .ln__i', { xPercent: -18 }, { xPercent: 6, duration: 2 }, 0)
    .fromTo('.home__l2 .ln__i', { xPercent: 18 }, { xPercent: -6, duration: 2 }, 0);

  /* ---------------- life specs ---------------- */
  q('.life__specs li').forEach((li, i) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 88%' }, delay: i * 0.05 });
    tl.from(li.querySelector('.life__rule'), { scaleX: 0, transformOrigin: '0 50%', duration: 1.2, ease: 'expo.inOut' }).from(
      li.querySelectorAll('b, .eyebrow, p'),
      { y: 30, autoAlpha: 0, duration: 1, stagger: 0.08, ease: 'power3.out' },
      0.3,
    );
  });

  /* ---------------- masterplan ---------------- */
  gsap.fromTo(
    '.mp__plan',
    { rotateX: 58, scale: 0.82, yPercent: 8 },
    {
      rotateX: 0,
      scale: 1,
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.mp__scene', start: 'top bottom', end: 'center 55%', scrub: 1 },
    },
  );
  gsap.from('.spot', {
    scale: 0,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: 'back.out(2)',
    scrollTrigger: { trigger: '.mp__scene', start: 'center 65%' },
  });

  /* ---------------- finale ---------------- */
  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.finale', start: 'top bottom', end: 'center center', scrub: 1 },
    })
    .fromTo('.finale__word .ch', { yPercent: 100 }, { yPercent: 0, stagger: 0.06, duration: 1 }, 0)
    .fromTo('.finale__arch', { scale: 0.55, yPercent: 20 }, { scale: 1, yPercent: 0, duration: 1.2 }, 0)
    .fromTo('.finale__arch img', { scale: 1.6 }, { scale: 1, duration: 1.2 }, 0);

  return () => {
    root.removeEventListener('click', onClick);
    offs.forEach((f) => f());
    mm.revert();
  };
}
