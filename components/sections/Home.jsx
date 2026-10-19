import { L } from '../Text';

const SPECS = [
  { v: '3.65', unit: 'm', dec: 2, label: 'Ceiling height', note: 'Volume in every living space.' },
  { v: 'Italian', label: 'Kitchens & fittings', note: 'Handleless joinery, stone tops, brushed brass.' },
  { v: 'Intuitive', label: 'Smart home', note: 'Light, climate and access from one touch.' },
  { v: 'Open', label: 'Layouts', note: 'Plans that flow straight to the balcony.' },
];

export default function Home() {
  return (
    <>
      <section className="home" data-label="The Feeling of Home">
        <p className="eyebrow home__eyebrow">
          <span className="dot" /> 02 — The feeling of home
        </p>
        <div className="home__img">
          <img src="/images/dining.webp" alt="Open-plan living and dining" />
        </div>
        <h2 className="home__title">
          <L className="home__l1">The luxury of</L>
          <L className="home__l2">
            <em>coming home</em>
          </L>
        </h2>
        <ul className="home__notes" data-fade>
          <li>Natural light</li>
          <li>Thoughtful layouts</li>
          <li>A life that fits</li>
        </ul>
      </section>

      <section className="life" data-label="The Feeling of Home">
        <div className="life__left">
          <h2 className="display" data-lines>
            <L>Life,</L>
            <L>
              <em>considered.</em>
            </L>
          </h2>
          <div className="life__img" data-reveal data-skew>
            <img src="/images/kitchen.webp" alt="Italian kitchen" data-par="10" />
          </div>
          <p className="life__cap" data-fade>
            The thoughtful details
            <br />
            that make a home.
          </p>
        </div>
        <ul className="life__specs">
          {SPECS.map((s) => (
            <li key={s.label}>
              <span className="life__rule" />
              <b>
                {s.dec ? (
                  <>
                    <span data-count={s.v} data-dec={s.dec}>
                      0.00
                    </span>{' '}
                    {s.unit}
                  </>
                ) : (
                  s.v
                )}
              </b>
              <span className="eyebrow">{s.label}</span>
              <p>{s.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
