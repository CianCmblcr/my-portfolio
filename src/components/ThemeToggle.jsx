import { FaMoon, FaSun } from "react-icons/fa6";
import useTheme from "../hooks/useTheme";

const ThemeToggle = ({ tabIndex }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      className="theme-slider"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      onClick={toggleTheme}
      tabIndex={tabIndex}
    >
      <span className={`theme-slider-thumb ${isLight ? "is-light" : ""}`}>
        {isLight ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
      </span>
    </button>
  );
};

export default ThemeToggle;
