'use client';

import { useEffect, useState } from 'react';
import { lenisRef } from '@/lib/initSite';

const LINKS = [
  ['The Address', '#top'],
  ['Residences', '#residences'],
  ['Interiors', '#interiors'],
  ['Amenities', '#amenities'],
  ['Location', '#location'],
  ['Enquire', '#contact'],
];

function Arch() {
  const slats = Array.from({ length: 13 }, (_, i) => 64 + i * 7);
  return (
    <svg className="loader__art" viewBox="0 0 120 160" aria-hidden="true">
      <defs>
        <clipPath id="door">
          <path d="M24 158 V66 A36 36 0 0 1 96 66 V158 Z" />
        </clipPath>
      </defs>
      <path className="draw" pathLength="1" d="M12 158 V62 A48 48 0 0 1 108 62 V158" />
      <path className="draw" pathLength="1" d="M24 158 V66 A36 36 0 0 1 96 66 V158" />
      <g clipPath="url(#door)">
        <g className="loader__door loader__door--l">
          {slats.map((y) => (
            <line key={y} className="loader__slat" x1="24" x2="60" y1={y} y2={y} />
          ))}
          <line className="loader__slat" x1="59.5" x2="59.5" y1="30" y2="158" />
        </g>
        <g className="loader__door loader__door--r">
          {slats.map((y) => (
            <line key={y} className="loader__slat" x1="60" x2="96" y1={y} y2={y} />
          ))}
          <line className="loader__slat" x1="60.5" x2="60.5" y1="30" y2="158" />
        </g>
      </g>
      <path className="draw" pathLength="1" d="M0 158.5 H120" />
    </svg>
  );
}

export default function Chrome() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    document.documentElement.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <>
      <div className="loader" aria-hidden="true">
        <div className="loader__inner">
          <Arch />
          <p className="loader__name">Reposé Residence</p>
          <p className="loader__sub">Al Furjan · Dubai</p>
        </div>
        <span className="loader__count">000</span>
        <span className="loader__brand">Saion Properties</span>
      </div>

      <header className="hdr">
        <a className="hdr__logo" href="#top" data-cursor="hover">
          <span>Reposé</span>
          <small>Residence</small>
        </a>
        <nav className="hdr__nav">
          <a href="#residences" data-cursor="hover">Residences</a>
          <a href="#amenities" data-cursor="hover">Amenities</a>
          <a href="#location" data-cursor="hover">Location</a>
        </nav>
        <div className="hdr__right">
          <a className="hdr__cta" href="#contact" data-cursor="hover" data-magnetic>
            Enquire
          </a>
          <button
            className="hdr__menu"
            onClick={() => setOpen((v) => !v)}
            data-cursor="hover"
            data-magnetic
            aria-expanded={open}
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className={`menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="menu__panel">
          <ol className="menu__links">
            {LINKS.map(([label, href], i) => (
              <li key={href} style={{ '--i': i }}>
                <a href={href} onClick={() => setOpen(false)} data-cursor="hover">
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="menu__side">
            <div className="menu__arch">
              <img src="/images/tower-dusk.webp" alt="" />
            </div>
            <p>
              Sales Gallery
              <br />
              Al Furjan, Dubai — UAE
            </p>
            <a href="tel:+97140000000">+971 4 000 0000</a>
            <a href="mailto:hello@reposeresidence.ae">hello@reposeresidence.ae</a>
          </div>
        </div>
      </div>

      <div className="rail" aria-hidden="true">
        <span className="rail__label">The Address</span>
        <span className="rail__bar">
          <i />
        </span>
        <span className="rail__pct">00</span>
      </div>

      <div className="cursor" aria-hidden="true">
        <span className="cursor__dot" />
        <span className="cursor__ring">
          <em />
        </span>
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
