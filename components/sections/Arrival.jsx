import { Chars, L } from '../Text';

export const WALK_STEPS = ['Arrival', 'Entrance', 'Lobby', 'Corridor', 'Residence', 'Living', 'Terrace'];

export default function Arrival() {
  return (
    <section className="walk" id="walk" data-label="Step Inside">
      <div className="walk__stage">
        <div className="frame walk__scene w-ent">
          <img src="/images/entrance.webp" alt="Reposé Residence entrance at night" />
        </div>
        <div className="frame walk__scene w-lobby">
          <img src="/images/lobby.webp" alt="Sculpted lobby lounge" />
        </div>
        <div className="frame walk__scene w-doors" aria-hidden="true">
          <div className="w-doors__in">
            <div className="w-door w-door--l">
              <img src="/images/walk-doors.webp" alt="" />
            </div>
            <div className="w-door w-door--r">
              <img src="/images/walk-doors.webp" alt="" />
            </div>
          </div>
        </div>
        <div className="frame walk__scene w-cor">
          <img src="/images/walk-corridor.webp" alt="Oak-lined residential corridor" />
        </div>
        <div className="frame walk__scene w-foy">
          <img src="/images/walk-foyer.webp" alt="Arched apartment foyer opening to the living room" />
        </div>
        <div className="frame walk__scene w-liv">
          <img src="/images/walk-living.webp" alt="Living room facing the Dubai skyline" />
        </div>
        <div className="frame walk__scene w-bal">
          <img src="/images/walk-balcony.webp" alt="Private terrace overlooking Dubai at dusk" />
        </div>

        <div className="w-glow" aria-hidden="true" />
        <div className="w-flash" aria-hidden="true" />
        <div className="w-shade" aria-hidden="true" />

        <div className="w-cap w-cap--c">
          <p className="eyebrow">01 — The Arrival</p>
          <h2>
            <L>Doors that open</L>
            <L>
              <em>onto quiet.</em>
            </L>
          </h2>
        </div>
        <div className="w-cap">
          <p className="eyebrow">02 — The Entrance</p>
          <h2>
            <L>Bronze, glass</L>
            <L>
              <em>and a warm hello.</em>
            </L>
          </h2>
        </div>
        <div className="w-cap w-cap--xl">
          <p className="eyebrow">03 — Lobby · Ground level</p>
          <h2>
            <Chars text="Welcome to Reposé" />
          </h2>
          <p>
            A double-height lobby carved from sculpted plaster and raw stone — the first unhurried moment of every day.
          </p>
        </div>
        <div className="w-cap">
          <p className="eyebrow">04 — Level 12</p>
          <h2>
            <L>A hush between</L>
            <L>
              <em>the city and home.</em>
            </L>
          </h2>
        </div>
        <div className="w-cap">
          <p className="eyebrow">05 — Residence 1204</p>
          <h2>
            <L>Light, measured</L>
            <L>
              <em>and warm to the touch.</em>
            </L>
          </h2>
        </div>
        <div className="w-cap">
          <p className="eyebrow">06 — The Living Room</p>
          <h2>
            <L>Every room turns</L>
            <L>
              <em>towards the skyline.</em>
            </L>
          </h2>
        </div>
        <div className="w-cap w-cap--end">
          <p className="eyebrow">07 — The Terrace</p>
          <h2>
            <L>You&apos;re</L>
            <L>
              <em>home.</em>
            </L>
          </h2>
          <p>Dubai, at your feet.</p>
        </div>

        <ol className="w-steps" aria-hidden="true">
          {WALK_STEPS.map((s, i) => (
            <li key={s} className={i === 0 ? 'is-on' : ''}>
              <i>{String(i + 1).padStart(2, '0')}</i>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <div className="w-meter" aria-hidden="true">
          <span className="w-meter__n">
            <b>01</b> / {String(WALK_STEPS.length).padStart(2, '0')}
          </span>
          <span className="w-meter__bar">
            <i />
          </span>
          <span className="w-meter__l">{WALK_STEPS[0]}</span>
        </div>
      </div>
    </section>
  );
}
