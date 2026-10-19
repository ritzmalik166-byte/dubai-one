export function L({ children, className = '' }) {
  return (
    <span className={`ln ${className}`}>
      <span className="ln__i">{children}</span>
    </span>
  );
}

export function Chars({ text, className = '' }) {
  return (
    <span className={`ln ${className}`} aria-label={text}>
      <span className="ln__i" aria-hidden="true">
        {[...text].map((c, i) => (
          <span className="ch" key={i}>
            {c === ' ' ? '\u00a0' : c}
          </span>
        ))}
      </span>
    </span>
  );
}
