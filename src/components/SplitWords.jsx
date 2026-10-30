// Splits text into words that rise out of a mask one after another.
const SplitWords = ({ text, baseDelay = 0 }) => (
  <span aria-hidden="true" style={{ "--base": `${baseDelay}ms` }}>
    {text.split(" ").map((word, i, words) => (
      <span key={`${word}-${i}`}>
        <span className="split-word-mask">
          <span className="split-word" style={{ "--i": i }}>
            {word}
          </span>
        </span>
        {i < words.length - 1 && " "}
      </span>
    ))}
  </span>
);

export default SplitWords;
