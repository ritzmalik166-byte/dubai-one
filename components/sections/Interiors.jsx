import { ROOMS } from '@/lib/data';
import { L } from '../Text';

export default function Interiors() {
  return (
    <>
      <section className="interiors" id="interiors" data-label="Interiors">
        <div className="interiors__head">
          <p className="eyebrow" data-fade>
            Interiors
          </p>
          <h2 className="display" data-lines>
            <L>Step inside</L>
            <L>
              <em>the everyday.</em>
            </L>
          </h2>
          <p className="interiors__sub" data-fade>
            Four rooms, one feeling — light, measured and warm to the touch.
          </p>
        </div>
        <div className="arches" data-skew>
          {ROOMS.map((r, i) => (
            <a className="arch" href="#bedroom" key={r.name} data-cursor-label="View" style={{ '--i': i }}>
              <div className="arch__media">
                <img src={`/images/${r.img}.webp`} alt={r.name} />
              </div>
              <div className="arch__meta">
                <h3>{r.name}</h3>
                <span>{r.tag}</span>
                <span className="arch__go">
                  Explore <i>→</i>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="expand" id="bedroom" data-label="Interiors">
        <div className="expand__stage">
          <div className="expand__win">
            <img src="/images/bedroom.webp" alt="The bedroom with skyline views" />
          </div>
          <div className="expand__text">
            <p className="eyebrow">
              <span className="dot" /> Interiors — 03
            </p>
            <h2>
              <L>The</L>
              <L>Bedroom</L>
            </h2>
            <p className="expand__sub">
              <L>Rooms made to return to.</L>
            </p>
          </div>
          <div className="expand__meta">
            <span>Oak panelling</span>
            <span>Floor-to-ceiling glazing</span>
            <span>Skyline orientation</span>
          </div>
        </div>
      </section>
    </>
  );
}
