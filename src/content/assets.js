// Every image under src/assets, keyed by its path relative to that folder, so
// content can reference bundled files by a stable name instead of a hashed URL.
const files = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp,gif,svg,avif}", {
  eager: true,
  import: "default",
});

const byKey = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.replace("../assets/", ""), url]),
);

export const resolveImage = (value) => {
  if (!value) return "";
  if (/^(https?:|data:|blob:|\/)/.test(value)) return value;
  return byKey[value] ?? "";
};
