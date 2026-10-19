'use client';

import { useState } from 'react';
import { L } from '../Text';

export default function Finale() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="finale" data-label="Reposé">
        <div className="finale__word" aria-hidden="true">
          {[...'REPOSÉ'].map((c, i) => (
            <span key={i} className="ch">
              {c}
            </span>
          ))}
        </div>
        <div className="finale__arch">
          <img src="/images/tower-dusk.webp" alt="Reposé Residence tower" />
        </div>
        <div className="finale__text">
          <h2 data-lines>
            <L>Make room for</L>
            <L>
              <em>a different rhythm.</em>
            </L>
          </h2>
          <a className="link" href="#contact" data-cursor="hover">
            Enquire about Reposé <span className="arr">↗</span>
          </a>
        </div>
      </section>

      <section className="contact" id="contact" data-label="Enquire">
        <div className="contact__glow" aria-hidden="true" />
        <p className="eyebrow" data-fade>
          Register your interest
        </p>
        <h2 className="display" data-lines>
          <L>Let&apos;s talk</L>
          <L>
            <em>about Reposé.</em>
          </L>
        </h2>
        {sent ? (
          <p className="contact__thanks">Thank you — a residence advisor will be in touch within one working day.</p>
        ) : (
          <form
            className="contact__form"
            data-fade
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input required name="name" placeholder="Full name" aria-label="Full name" />
            <input required name="phone" type="tel" placeholder="Phone" aria-label="Phone" />
            <input required name="email" type="email" placeholder="Email" aria-label="Email" />
            <select name="type" aria-label="Residence type" defaultValue="">
              <option value="" disabled>
                Residence
              </option>
              <option>1 BHK</option>
              <option>1 BHK + Study</option>
              <option>2 BHK</option>
              <option>3 BHK</option>
              <option>Penthouse</option>
            </select>
            <button className="pill pill--light" type="submit" data-cursor="hover">
              Contact us <span className="arr">→</span>
            </button>
          </form>
        )}
        <div className="contact__info" data-fade>
          <div>
            <span className="eyebrow">Sales gallery</span>
            <p>Al Furjan, Dubai — UAE</p>
          </div>
          <div>
            <span className="eyebrow">Call</span>
            <a href="tel:+97140000000" data-cursor="hover">
              +971 4 000 0000
            </a>
          </div>
          <div>
            <span className="eyebrow">Write</span>
            <a href="mailto:hello@reposeresidence.ae" data-cursor="hover">
              hello@reposeresidence.ae
            </a>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="foot__brand">
          <span className="saion saion--xl">
            SAION
            <small>Properties</small>
          </span>
        </div>
        <div className="foot__row">
          <span>© 2026 Saion Properties · Dubai One</span>
          <span>RERA Project No. 0000 · Images are artist impressions</span>
          <a href="#top" data-cursor="hover">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
