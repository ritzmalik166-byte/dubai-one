import { L } from '../Text';

export default function Lifestyle() {
  return (
    <>
      <section className="pool" data-label="Leisure">
        <div className="pool__stage">
          <div className="frame p-img">
            <img src="/images/pool.webp" alt="Rooftop pool at golden hour" />
          </div>
          <div className="p-shade" />
          <h2 className="p-title">
            <L>Nothing to do.</L>
            <L>
              <em>Everything to feel.</em>
            </L>
          </h2>
          <p className="p-cap eyebrow">All-weather pool — Podium level</p>
          <div className="p-circle">
            <p className="eyebrow">The Reposé way</p>
            <h2>
              <L>Less rush.</L>
              <L>
                <em>More Reposé.</em>
              </L>
            </h2>
            <span className="p-r">R.</span>
            <img className="p-mini" src="/images/hero-clouds.webp" alt="" />
          </div>
        </div>
      </section>

      <section className="terrace" data-label="Leisure">
        <div className="terrace__win">
          <img src="/images/terrace.webp" alt="Rooftop terrace" data-par="8" />
        </div>
        <div className="terrace__text">
          <h2 data-lines>
            <L>Above the</L>
            <L>
              <em>everyday.</em>
            </L>
          </h2>
          <p data-fade>
            A table for friends.
            <br />
            An afternoon that lingers.
          </p>
        </div>
      </section>

      <section className="gen" data-label="Community">
        <div className="gen__marquee" aria-hidden="true">
          <span>together · together · together ·</span>
        </div>
        <h2 className="gen__title display" data-lines>
          <L>For every</L>
          <L>
            <em>generation</em>
          </L>
        </h2>
        <div className="gen__arch">
          <img src="/images/kids.webp" alt="Kids play garden" data-par="10" />
        </div>
        <div className="gen__small" data-reveal data-skew>
          <img src="/images/living.webp" alt="" data-par="14" />
        </div>
        <div className="gen__copy" data-fade>
          <p className="eyebrow">Kids play area · Family lounge</p>
          <p>
            Room for their adventures.
            <br />A little time for yours.
          </p>
        </div>
      </section>
    </>
  );
}
