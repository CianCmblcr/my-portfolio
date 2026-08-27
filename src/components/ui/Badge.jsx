const Badge = ({ children }) => (
  <span className="rounded-full border border-[var(--color-accent-strong)]/30 bg-[var(--color-accent-strong)]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
    {children}
  </span>
);

export default Badge;