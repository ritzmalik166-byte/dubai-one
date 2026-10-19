const FILL = {
  bed: '#e8dac6',
  wet: 'url(#tile)',
  kit: '#f2eee7',
  liv: '#fbfaf7',
  store: '#f1efeb',
  bal: 'url(#hatch)',
};

function Furniture({ x, y, w, h, kind }) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  if (kind === 'bed') {
    const bw = Math.min(w * 0.5, 18);
    const bh = Math.min(h * 0.5, 22);
    const bx = cx - bw / 2;
    const by = y + 3;
    return (
      <g className="fur">
        <rect x={bx} y={by} width={bw} height={bh} rx="0.8" pathLength="1" />
        <rect x={bx + 1.2} y={by + 1.2} width={bw / 2 - 1.8} height={3.2} rx="0.6" pathLength="1" />
        <rect x={cx + 0.6} y={by + 1.2} width={bw / 2 - 1.8} height={3.2} rx="0.6" pathLength="1" />
        <line x1={bx} y1={by + bh * 0.42} x2={bx + bw} y2={by + bh * 0.42} pathLength="1" />
      </g>
    );
  }
  if (kind === 'liv') {
    const sw = Math.min(w * 0.38, 26);
    return (
      <g className="fur">
        <rect x={x + 3} y={y + h - 9} width={sw} height={6} rx="1" pathLength="1" />
        <rect x={x + 3 + sw * 0.25} y={y + h - 20} width={sw * 0.5} height={7} rx="0.6" pathLength="1" />
        <circle cx={x + w - Math.min(w * 0.22, 16)} cy={cy} r={Math.min(h * 0.16, 6)} pathLength="1" />
        {[0, 90, 180, 270].map((a) => {
          const r = Math.min(h * 0.16, 6) + 2.4;
          const px = x + w - Math.min(w * 0.22, 16) + Math.cos((a * Math.PI) / 180) * r;
          const py = cy + Math.sin((a * Math.PI) / 180) * r;
          return <rect key={a} x={px - 1.2} y={py - 1.2} width="2.4" height="2.4" rx="0.5" pathLength="1" />;
        })}
      </g>
    );
  }
  if (kind === 'kit') {
    return (
      <g className="fur">
        <rect x={x + 1.5} y={y + 1.5} width={w - 3} height={4} pathLength="1" />
        <rect x={cx - w * 0.22} y={cy + 1} width={w * 0.44} height={4.5} rx="0.5" pathLength="1" />
        <circle cx={x + w * 0.3} cy={y + 3.5} r="1.1" pathLength="1" />
      </g>
    );
  }
  if (kind === 'wet' && w > 12 && h > 12) {
    return (
      <g className="fur">
        <rect x={x + 2} y={y + 2} width={Math.min(w - 4, 14)} height={5.5} rx="2.4" pathLength="1" />
        <ellipse cx={x + w - 4} cy={y + h - 4.5} rx="1.8" ry="2.4" pathLength="1" />
      </g>
    );
  }
  return null;
}

export function UnitPlan({ unit }) {
  const { w, h, rooms, jacuzzi } = unit.plan;
  const pad = 8;
  const interior = rooms.filter((r) => r[5] !== 'bal');
  const ih = Math.max(...interior.map((r) => r[1] + r[3]));
  return (
    <svg className="uplan" viewBox={`${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}`} role="img" aria-label={`${unit.name} floor plan`}>
      <defs>
        <pattern id="hatch" width="2.2" height="2.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="2.2" height="2.2" fill="#f4f1ec" />
          <line x1="0" y1="0" x2="0" y2="2.2" stroke="#cfc8bc" strokeWidth="0.35" />
        </pattern>
        <pattern id="tile" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="#eef1f1" />
          <path d="M3 0H0V3" fill="none" stroke="#d7dcdc" strokeWidth="0.25" />
        </pattern>
      </defs>
      {rooms.map(([x, y, rw, rh, label, kind, dim], i) => (
        <g key={i} className="room" style={{ '--i': i }}>
          <rect x={x} y={y} width={rw} height={rh} fill={FILL[kind]} className="room__fill" />
          <rect x={x} y={y} width={rw} height={rh} className="room__wall" pathLength="1" />
          <Furniture x={x} y={y} w={rw} h={rh} kind={kind} />
          <text x={x + rw / 2} y={y + rh / 2 + (kind === 'bed' ? rh * 0.18 : 0)} className="room__label">
            {label.toUpperCase()}
          </text>
          {dim && (
            <text x={x + rw / 2} y={y + rh / 2 + (kind === 'bed' ? rh * 0.18 : 0) + 3.2} className="room__dim">
              {dim}
            </text>
          )}
        </g>
      ))}
      {jacuzzi && (
        <rect
          x={jacuzzi[0]}
          y={jacuzzi[1]}
          width={jacuzzi[2]}
          height={jacuzzi[3]}
          rx="5"
          className="jacuzzi"
          pathLength="1"
        />
      )}
      <rect x="0" y="0" width={w} height={ih} className="shell" pathLength="1" />
      {[0.18, 0.5, 0.82].map((f) => (
        <line key={f} x1={w * f - 5} y1="0" x2={w * f + 5} y2="0" className="window" />
      ))}
      <g className="north" transform={`translate(${w + 2} ${-3})`}>
        <path d="M0 -3 L2 3 L0 1.8 L-2 3 Z" />
        <text y="-4.6">N</text>
      </g>
    </svg>
  );
}

export function KeyPlan({ level, active, onHover, onPick }) {
  const [cx, cy, cw, ch] = level.core;
  return (
    <svg className="kplan" viewBox="0 0 200 122" role="img" aria-label={`Level ${level.n} key plan`}>
      <rect x="6" y="4" width="188" height="114" className="kplan__site" />
      <g className="kplan__core">
        <rect x={cx} y={cy} width={cw} height={ch} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={cx + 5 + i * ((cw - 10) / 3)} y={cy + 5} width={(cw - 10) / 3 - 2} height="9" className="lift" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={cx + 5} x2={cx + cw - 5} y1={cy + ch - 18 + i * 1.8} y2={cy + ch - 18 + i * 1.8} />
        ))}
        <text x={cx + cw / 2} y={cy + ch / 2}>CORE</text>
      </g>
      {level.units.map((u, i) => {
        const pts = u.poly.split(' ').map((p) => p.split(',').map(Number));
        const tx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
        const ty = pts.reduce((s, p) => s + p[1], 0) / pts.length;
        const unit = u.id;
        return (
          <g
            key={i}
            className={`kunit${active === i ? ' is-on' : ''}`}
            style={{ '--c': UNITS_COLOR[unit], '--i': i }}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onPick(unit)}
          >
            <polygon points={u.poly} />
            <text x={tx} y={ty}>
              {unit}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const UNITS_COLOR = {
  A: '#4f86c6',
  B: '#6aa36f',
  C: '#6b62c9',
  D: '#d9a441',
  P: '#a9c04a',
  S: '#d98a3a',
};
