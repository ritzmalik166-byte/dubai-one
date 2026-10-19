'use client';

import { useEffect, useState } from 'react';
import { LEVELS, UNITS } from '@/lib/data';
import { KeyPlan, UnitPlan } from './Plans';

const pad = (n) => String(n).padStart(2, '0');
const sqft = (n) => n.toLocaleString('en-US');

export default function Explorer({ level, onLevel, onClose }) {
  const [unitId, setUnitId] = useState(null);
  const [hover, setHover] = useState(null);
  const [interior, setInterior] = useState(false);
  const data = LEVELS[level - 1];
  const unit = unitId ? UNITS[unitId] : null;

  useEffect(() => {
    setUnitId(null);
    setHover(null);
  }, [level]);

  useEffect(() => {
    setInterior(false);
  }, [unitId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (interior) setInterior(false);
        else if (unitId) setUnitId(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [interior, unitId, onClose]);

  const hovered = hover != null ? UNITS[data.units[hover].id] : null;

  return (
    <div className="xp" role="dialog" aria-modal="true" aria-label={`Level ${level}`}>
      <div className="xp__bg" />
      <div className="xp__top">
        <button className="xp__back" onClick={unit ? () => setUnitId(null) : onClose} data-cursor="hover">
          <span className="arr">←</span> {unit ? 'Back to floor' : 'Back to building'}
        </button>
        <span className="xp__crumb">
          Reposé Residence <i>/</i> Level {pad(level)}
          {unit && (
            <>
              {' '}
              <i>/</i> {unit.type}
            </>
          )}
        </span>
        <button className="xp__close" onClick={onClose} aria-label="Close" data-cursor="hover">
          <span />
          <span />
        </button>
      </div>

      {!unit && (
        <div className="xp__floor" key={`f${level}`}>
          <div className="xp__info">
            <p className="eyebrow">Select a residence</p>
            <h3 className="xp__title">Level {pad(level)}</h3>
            <p className="xp__mix">{data.mix.join(' · ')}</p>
            <ul className="xp__legend">
              {[...new Set(data.units.map((u) => u.id))].map((id) => (
                <li key={id} style={{ '--c': UNITS[id].color }}>
                  <button onClick={() => setUnitId(id)} data-cursor="hover">
                    <i />
                    <span>{UNITS[id].name}</span>
                    <em>{sqft(UNITS[id].apt + UNITS[id].balcony)} sq.ft</em>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="xp__plan">
            <p className="xp__compass">Al Furjan Boulevard</p>
            <KeyPlan level={data} active={hover} onHover={setHover} onPick={setUnitId} />
            <p className="xp__caption">{data.label}</p>
            <div className={`xp__tip${hovered ? ' is-on' : ''}`}>
              {hovered && (
                <>
                  <strong>{hovered.name}</strong>
                  <span>
                    {hovered.type} · {sqft(hovered.apt + hovered.balcony)} sq.ft — click to view
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {unit && (
        <div className="xp__unit" key={`u${unitId}${level}`}>
          <div className="xp__info">
            <p className="eyebrow">{unit.type}</p>
            <h3 className="xp__title">{unit.name}</h3>
            <dl className="xp__spec">
              <div>
                <dt>Apartment area</dt>
                <dd>{sqft(unit.apt)} sq.ft</dd>
              </div>
              <div>
                <dt>Balcony area</dt>
                <dd>{sqft(unit.balcony)} sq.ft</dd>
              </div>
              <div>
                <dt>Total area</dt>
                <dd>{sqft(unit.apt + unit.balcony)} sq.ft</dd>
              </div>
              <div>
                <dt>Level</dt>
                <dd>{pad(level)}</dd>
              </div>
            </dl>
            <button className="pill pill--light" onClick={() => setInterior((v) => !v)} data-cursor="hover">
              {interior ? 'View floor plan' : 'View interior'} <span className="arr">↗</span>
            </button>
          </div>
          <div className={`xp__card${interior ? ' is-interior' : ''}`}>
            <UnitPlan unit={unit} />
            <img className="xp__interior" src={`/images/${unit.view}.webp`} alt={`${unit.name} interior`} />
            <span className="xp__stamp">Reposé · {unit.type}</span>
          </div>
        </div>
      )}

      <nav className="xp__levels" aria-label="Levels">
        {LEVELS.slice()
          .reverse()
          .map((l) => (
            <button
              key={l.n}
              className={l.n === level ? 'is-on' : ''}
              onClick={() => onLevel(l.n)}
              data-cursor="hover"
            >
              {pad(l.n)}
            </button>
          ))}
      </nav>
    </div>
  );
}
