import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp, FaChevronDown, FaXmark } from "react-icons/fa6";
import { resolveImage } from "../content/assets";
import { uploadImage } from "./upload";

export const Panel = ({ title, hint, children }) => (
  <section className="adm-panel">
    <header>
      <h2>{title}</h2>
      {hint && <p>{hint}</p>}
    </header>
    <div className="adm-panel-body">{children}</div>
  </section>
);

export const Group = ({ title, children }) => (
  <div className="adm-group">
    {title && <h3 className="adm-group-title">{title}</h3>}
    {children}
  </div>
);

const Field = ({ label, hint, children }) => (
  <label className="adm-field">
    <span className="adm-label">{label}</span>
    {children}
    {hint && <span className="adm-hint">{hint}</span>}
  </label>
);

export const TextField = ({ label, hint, value, onChange, type = "text", ...rest }) => (
  <Field label={label} hint={hint}>
    <input className="adm-input" type={type} value={value ?? ""} onChange={(e) => onChange(e.target.value)} {...rest} />
  </Field>
);

export const TextArea = ({ label, hint, value, onChange, rows = 3 }) => (
  <Field label={label} hint={hint}>
    <textarea className="adm-input" rows={rows} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
  </Field>
);

const joinTags = (list = []) => list.join(", ");
const parseTags = (text) => text.split(",").map((s) => s.trim()).filter(Boolean);

// Comma-separated list. Keeps the raw text while typing so trailing commas
// and spaces don't get eaten.
export const TagsField = ({ label, hint = "Separate with commas.", value = [], onChange }) => {
  const joined = joinTags(value);
  const [text, setText] = useState(joined);

  useEffect(() => {
    setText((current) => (joinTags(parseTags(current)) === joined ? current : joined));
  }, [joined]);

  return (
    <Field label={label} hint={hint}>
      <input
        className="adm-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(parseTags(e.target.value));
        }}
      />
    </Field>
  );
};

const DropZone = ({ onFiles, busy, multiple = false, compact = false, children }) => {
  const [drag, setDrag] = useState(false);

  return (
    <label
      className={`adm-drop ${compact ? "adm-drop--compact" : ""} ${drag ? "is-drag" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        onFiles([...e.dataTransfer.files]);
      }}
    >
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        className="sr-only"
        disabled={busy}
        onChange={(e) => {
          onFiles([...e.target.files]);
          e.target.value = "";
        }}
      />
      {children}
      {busy && <span className="adm-busy">Uploading…</span>}
    </label>
  );
};

export const ImageField = ({ label, hint, value, onChange }) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const src = resolveImage(value);

  const handle = async ([file]) => {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-field">
      <span className="adm-label">{label}</span>
      <DropZone onFiles={handle} busy={busy}>
        {src ? (
          <>
            <img src={src} alt="" />
            <span className="adm-drop-hint">Drop or click to replace</span>
          </>
        ) : (
          <span>Drop an image here, or click to choose</span>
        )}
      </DropZone>
      {value && (
        <button type="button" className="adm-link" onClick={() => onChange("")}>
          Remove image
        </button>
      )}
      {hint && <span className="adm-hint">{hint}</span>}
      {error && <p className="adm-error">{error}</p>}
    </div>
  );
};

export const GalleryField = ({ label, value = [], onChange }) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const add = async (files) => {
    if (!files.length) return;
    setError("");
    setBusy(true);
    try {
      const urls = await Promise.all(files.map(uploadImage));
      onChange([...value, ...urls.map((src) => ({ src, alt: "" }))]);
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  const update = (i, patch) => onChange(value.map((shot, j) => (j === i ? { ...shot, ...patch } : shot)));
  const move = (from, to) => {
    const next = [...value];
    const [shot] = next.splice(from, 1);
    next.splice(to, 0, shot);
    onChange(next);
  };

  return (
    <div className="adm-field">
      <span className="adm-label">{label}</span>
      {value.length > 0 && (
        <div className="adm-gallery">
          {value.map((shot, i) => (
            <figure key={`${shot.src}-${i}`} className="adm-thumb">
              <img src={resolveImage(shot.src)} alt="" />
              <div className="adm-thumb-body">
                <input
                  className="adm-input adm-input--sm"
                  placeholder="Describe this image"
                  aria-label={`Image ${i + 1} description`}
                  value={shot.alt ?? ""}
                  onChange={(e) => update(i, { alt: e.target.value })}
                />
                <div className="adm-thumb-actions">
                  <button type="button" className="adm-icon-btn" aria-label="Move earlier" disabled={i === 0} onClick={() => move(i, i - 1)}>
                    <FaArrowLeft />
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn"
                    aria-label="Move later"
                    disabled={i === value.length - 1}
                    onClick={() => move(i, i + 1)}
                  >
                    <FaArrowRight />
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn adm-icon-btn--danger"
                    aria-label="Remove image"
                    onClick={() => onChange(value.filter((_, j) => j !== i))}
                  >
                    <FaXmark />
                  </button>
                </div>
              </div>
            </figure>
          ))}
        </div>
      )}
      <DropZone multiple compact onFiles={add} busy={busy}>
        <span>Drop images here, or click to add</span>
      </DropZone>
      {error && <p className="adm-error">{error}</p>}
    </div>
  );
};

// Reorderable list of objects. `renderItem(item, set)` gets `set(patch)` to
// merge field changes into that item.
export const ListEditor = ({
  items = [],
  onChange,
  newItem,
  itemTitle,
  renderItem,
  addLabel = "Add item",
  collapsible = false,
}) => {
  const [openIndex, setOpenIndex] = useState(-1);

  const move = (from, to) => {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
    if (openIndex === from) setOpenIndex(to);
  };

  const remove = (i) => {
    if (!window.confirm(`Remove "${itemTitle(items[i], i)}"?`)) return;
    onChange(items.filter((_, j) => j !== i));
    setOpenIndex(-1);
  };

  const add = () => {
    onChange([...items, structuredClone(newItem)]);
    setOpenIndex(items.length);
  };

  return (
    <div className="adm-list">
      {items.map((item, i) => {
        const open = !collapsible || openIndex === i;
        const title = itemTitle(item, i);
        return (
          <div key={i} className={`adm-item ${open ? "is-open" : ""}`}>
            <div className="adm-item-head">
              {collapsible ? (
                <button
                  type="button"
                  className="adm-item-title adm-item-toggle"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  <FaChevronDown aria-hidden="true" />
                  {title}
                </button>
              ) : (
                <span className="adm-item-title">{title}</span>
              )}
              <button type="button" className="adm-icon-btn" aria-label="Move up" disabled={i === 0} onClick={() => move(i, i - 1)}>
                <FaArrowUp />
              </button>
              <button
                type="button"
                className="adm-icon-btn"
                aria-label="Move down"
                disabled={i === items.length - 1}
                onClick={() => move(i, i + 1)}
              >
                <FaArrowDown />
              </button>
              <button type="button" className="adm-icon-btn adm-icon-btn--danger" aria-label={`Remove ${title}`} onClick={() => remove(i)}>
                <FaXmark />
              </button>
            </div>
            {open && (
              <div className="adm-item-body">
                {renderItem(item, (patch) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x))), i)}
              </div>
            )}
          </div>
        );
      })}
      <button type="button" className="btn btn--sage btn--sm adm-add" onClick={add}>
        + {addLabel}
      </button>
    </div>
  );
};
