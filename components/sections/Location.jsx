import { HOTSPOTS, STATS } from '@/lib/data';
import { L } from '../Text';

export default function Location() {
  return (
    <>
      <section className="loc" id="location" data-label="Location">
        <div className="loc__stats">
          {STATS.map((s) => (
            <div className="loc__stat" key={s.label} data-fade>
              <b>
                <span data-count={s.n} data-pad="2">
                  00
                </span>
                <small>min</small>
              </b>
              <p>{s.label}</p>
              <span>{s.sub}</span>
            </div>
          ))}
        </div>
        <div className="loc__body">
          <h2 data-lines>
            <L>A connected community.</L>
            <L>
              <em>A place to call your own.</em>
            </L>
          </h2>
          <p data-fade>
            Al Furjan sits between Sheikh Zayed Road and Sheikh Mohammed bin Zayed Road — minutes from the Metro,
            Expo City and the Marina, yet wrapped in the calm of a low-rise villa community.
          </p>
        </div>
      </section>

      <section className="mp" data-label="Masterplan">
        <div className="mp__head">
          <p className="eyebrow" data-fade>
            A connected community. A place to call your own.
          </p>
          <h2 className="display" data-lines>
            <L>Everything</L>
            <L>
              <em>within reach.</em>
            </L>
          </h2>
        </div>
        <div className="mp__scene">
          <div className="mp__plan">
            <img src="/images/masterplan.webp" alt="Amenity podium masterplan" />
            {HOTSPOTS.map((h, i) => (
              <button
                key={h.label}
                className="spot"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                data-cursor="hover"
                aria-label={h.label}
              >
                <i>{String(i + 1).padStart(2, '0')}</i>
                <span>{h.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
