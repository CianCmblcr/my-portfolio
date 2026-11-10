// Splits text into masked characters that rise into place, staggered.
// The parent adds `is-in` (directly or via a revealed ancestor) to play it.
const RiseText = ({ text = "", delay = 0, step = 35, className = "" }) => {
  let index = 0;
  const words = text.split(" ");

  return (
    <span className={`rise ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true">
          <span className="rise-word">
            {[...word].map((char, c) => (
              <span key={c} className="rise-char" style={{ "--d": `${delay + index++ * step}ms` }}>
                {char}
              </span>
            ))}
          </span>
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
};

export default RiseText;
