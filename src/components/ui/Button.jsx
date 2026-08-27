const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-[var(--color-invert-surface)] text-[var(--color-invert-text)] hover:bg-[var(--color-accent)]',
    outline: 'border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-strong)] hover:bg-[var(--color-surface)]',
  };

  return (
    <button
      className={`premium-button rounded-full px-6 py-3 text-sm font-bold ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;