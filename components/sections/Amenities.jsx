import { AMENITIES } from '@/lib/data';
import { L } from '../Text';

export default function Amenities() {
  return (
    <section className="amen" id="amenities" data-label="Amenities">
      <div className="amen__head">
        <p className="eyebrow" data-fade>
          Amenities — 12 spaces
        </p>
        <h2 className="display" data-lines>
          <L>Everything you need</L>
          <L>
            <em>to spend a day.</em>
          </L>
        </h2>
      </div>
      <div className="amen__grid">
        <div className="amen__media">
          <div className="amen__frame" data-reveal>
            {AMENITIES.map((a, i) => (
              <img
                key={i}
                className={`amen__img${i === 0 ? ' is-on' : ''}`}
                src={`/images/${a.img}.webp`}
                alt={a.name}
                loading="lazy"
              />
            ))}
            <span className="amen__count">
              <b>01</b> / {String(AMENITIES.length).padStart(2, '0')}
            </span>
          </div>
        </div>
        <ol className="amen__list">
          {AMENITIES.map((a, i) => (
            <li key={a.name} className={i === 0 ? 'is-on' : ''}>
              <small>{String(i + 1).padStart(2, '0')}</small>
              <div>
                <h3>{a.name}</h3>
                <p>{a.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
