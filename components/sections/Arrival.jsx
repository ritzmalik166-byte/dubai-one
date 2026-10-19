import { Chars } from '../Text';

export default function Arrival() {
  return (
    <section className="arrival" data-label="The Arrival">
      <div className="arrival__stage">
        <div className="frame a-ent">
          <img src="/images/entrance.webp" alt="Reposé Residence entrance at night" />
        </div>
        <div className="frame a-lobby">
          <img src="/images/lobby.webp" alt="Sculpted lobby lounge" />
        </div>
        <div className="a-shade" />
        <p className="a-kicker">
          <span className="eyebrow">The Arrival</span>
          <span className="a-kicker__t">Doors that open onto quiet.</span>
        </p>
        <div className="a-text">
          <h2 className="a-title">
            <Chars text="Welcome to Reposé" />
          </h2>
          <p className="a-copy">
            A double-height lobby carved from sculpted plaster and raw stone — the first unhurried moment of every
            day.
          </p>
        </div>
        <span className="a-tag">Lobby · Ground level</span>
      </div>
    </section>
  );
}
