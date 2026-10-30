import { useEffect, useRef, useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";

const CopyEmail = ({ email }) => {
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
    <button type="button" className="copy-email" onClick={copy} aria-label={`Copy ${email}`}>
      <span>{email}</span>
      <span className="copy-email-icon" aria-hidden="true">
        <FaRegCopy className={copied ? "is-off" : ""} />
        <FaCheck className={copied ? "" : "is-off"} />
      </span>
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </button>
  );
};

export default CopyEmail;
