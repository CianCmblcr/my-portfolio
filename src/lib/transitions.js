// Shared `view-transition-name` for a project's cover, so the card image on the
// home page morphs into the hero image of its case study (and back).
export const coverTransitionName = (slug = "") => `cover-${slug.replace(/[^a-z0-9-]/gi, "") || "untitled"}`;
