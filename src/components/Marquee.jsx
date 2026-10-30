// Infinite strip; the second copy makes the loop seamless and is hidden from screen readers.
const Marquee = ({ items }) => (
  <div className="marquee">
    <div className="marquee-track">
      {[0, 1].map((copy) => (
        <div key={copy} className="marquee-group" aria-hidden={copy === 1}>
          {items.map((item) => (
            <span key={item} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Marquee;
