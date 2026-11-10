import { useEffect, useRef, useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";

const CopyEmail = ({ email, className = "btn btn--sage" }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(0);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" className={className} onClick={copy} aria-label={`Copy ${email}`}>
      <span>{copied ? "Copied to clipboard" : email}</span>
      {copied ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </button>
  );
};

export default CopyEmail;
