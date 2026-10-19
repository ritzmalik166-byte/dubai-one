'use client';

import { useEffect, useState } from 'react';
import { LEVELS } from '@/lib/data';
import { lenisRef } from '@/lib/initSite';
import Explorer from '../Explorer';
import { Chars, L } from '../Text';

const TOP = 7.5;
const BOTTOM = 77;
const STEP = (BOTTOM - TOP) / LEVELS.length;

export default function Descent() {
  const [hover, setHover] = useState(null);
  const [level, setLevel] = useState(null);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (level) lenis.stop();
    else lenis.start();
    document.documentElement.classList.toggle('xp-open', !!level);
  }, [level]);

  const info = LEVELS[(hover ?? 11) - 1];

  return (
    <section className="descent" id="top" data-label="The Address">
      <div className="descent__stage">
        <div className="frame d-clouds">
          <img src="/images/hero-clouds.webp" alt="Dubai skyline above the clouds at dawn" />
        </div>
        <div className="frame d-aerial">
          <img src="/images/aerial-plot.webp" alt="Aerial view of the Al Furjan plot" />
        </div>
        <div className="frame frame--tower d-build">
          <img src="/images/tower-build.webp" alt="Reposé Residence under construction" />
        </div>
        <div className="frame frame--tower d-done">
          <img src="/images/tower-dusk.webp" alt="Reposé Residence at dusk" />
          <div className="levels" id="residences">
            {LEVELS.map((l) => (
              <button
                key={l.n}
                className={`levels__band${hover === l.n ? ' is-on' : ''}`}
                style={{ top: `${BOTTOM - l.n * STEP}%`, height: `${STEP}%` }}
                onMouseEnter={() => setHover(l.n)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(l.n)}
                onClick={() => setLevel(l.n)}
                data-cursor-label="Open"
                aria-label={`Level ${l.n}`}
              >
                <span>L{String(l.n).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fog" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <b />
        </div>
        <div className="d-shade" />

        <div className="d-title">
          <h1>
            <Chars text="Reposé" />
            <Chars text="Residence" />
          </h1>
          <p className="d-title__sub">A luxurious lifestyle address</p>
        </div>

        <div className="d-rise" aria-hidden="true">
          <Chars text="Ready" />
          <Chars text="to rise" />
        </div>

        <div className="d-why">
          <h2>
            <L>Why Dubai?</L>
          </h2>
          <p>
            <L>Built for ambition. Designed for longevity.</L>
            <L>Dubai is where opportunity becomes an address —</L>
            <L>zero income tax, a skyline that never stops rising,</L>
            <L>and a city built around the way you want to live.</L>
          </p>
        </div>

        <div className="d-progress">
          <span className="eyebrow">Floors rising</span>
          <b>
            <span className="d-progress__n">00</span>
            <small>/15</small>
          </b>
          <span className="d-progress__bar">
            <i />
          </span>
          <span className="eyebrow d-progress__q">Handover Q4 2027</span>
        </div>

        <div className="d-explore">
          <p className="eyebrow">Reposé Residence · G+15</p>
          <h2>
            Explore
            <br />
            Residences
          </h2>
          <p className="d-explore__hint">Select a level to discover the residences</p>
          <div className="d-explore__info">
            <strong>Level {String(info.n).padStart(2, '0')}</strong>
            <span>{info.mix.join(' · ')}</span>
          </div>
        </div>

        <p className="d-scroll">
          <span>Scroll to descend</span>
          <i />
        </p>
        <div className="d-foot">
          <span>
            Reposé Residence
            <br />
            <em>Al Furjan, Dubai</em>
          </span>
          <span className="saion">
            SAION
            <small>Properties</small>
          </span>
        </div>
      </div>

      {level && <Explorer level={level} onLevel={setLevel} onClose={() => setLevel(null)} />}
    </section>
  );
}
