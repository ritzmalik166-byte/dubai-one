import { L } from '../Text';

export default function Wellness() {
  return (
    <section className="well" data-label="Wellness & Balance">
      <div className="well__bar">
        <span className="eyebrow">Wellness & Balance</span>
        <span className="eyebrow well__hint">
          Scroll <i>→</i>
        </span>
      </div>
      <div className="well__track">
        <article className="panel panel--balance">
          <div className="panel__arch" data-hpar="-8">
            <img src="/images/garden.webp" alt="Zen garden" />
          </div>
          <h2 className="panel__title">
            <L>Find your</L>
            <L>
              <em>balance.</em>
            </L>
          </h2>
          <div className="panel__thumbs">
            <img src="/images/terrace.webp" alt="" data-hpar="10" />
            <img src="/images/living.webp" alt="" data-hpar="16" />
          </div>
          <p className="panel__note">
            Zen garden · Yoga studio
            <br />
            Shaded terraces for slow mornings.
          </p>
        </article>

        <article className="panel panel--move">
          <div className="panel__wide" data-hpar="-6">
            <img src="/images/gym.webp" alt="Residents' gym" />
          </div>
          <h2 className="panel__title">
            <L>Room</L>
            <L>
              <em>to move.</em>
            </L>
          </h2>
          <div className="panel__side" data-hpar="14">
            <img src="/images/padel.webp" alt="Padel court" />
          </div>
          <p className="panel__note">Modern well-equipped gym · Padel court · Cricket simulator</p>
        </article>

        <article className="panel panel--exhale">
          <div className="panel__card" data-hpar="-5">
            <img src="/images/spa.webp" alt="Steam room" />
            <h2 className="panel__title panel__title--in">
              <L>Time to</L>
              <L>
                <em>exhale.</em>
              </L>
            </h2>
            <p className="panel__note panel__note--in">Steam rooms with personal lockers</p>
          </div>
        </article>

        <article className="panel panel--be">
          <h2 className="panel__huge">
            <L>
              Simply <em>be.</em>
            </L>
          </h2>
          <div className="panel__arch panel__arch--sm" data-hpar="12">
            <img src="/images/garden.webp" alt="" />
          </div>
          <p className="panel__note">
            Wellness, woven into
            <br />
            the everyday.
          </p>
        </article>
      </div>
    </section>
  );
}
