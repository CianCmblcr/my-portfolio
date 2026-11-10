import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useContent } from "../content/ContentProvider";
import { defaultContent } from "../content/defaultContent";
import { CONTENT_ID, CONTENT_TABLE } from "../lib/supabase";
import { supabase } from "./client";
import { GalleryField, Group, ImageField, ListEditor, Panel, TagsField, TextArea, TextField } from "./fields";
import "./admin.css";

const TABS = [
  ["site", "General"],
  ["hero", "Hero"],
  ["about", "About"],
  ["services", "Services"],
  ["process", "Process"],
  ["projects", "Projects"],
  ["contact", "Contact"],
  ["socials", "Socials"],
  ["stack", "Tech stack"],
];

const getIn = (obj, path) => path.reduce((o, key) => o?.[key], obj);

const setIn = (obj, [key, ...rest], value) => {
  if (key === undefined) return value;
  const base = Array.isArray(obj) ? [...obj] : { ...obj };
  base[key] = setIn(obj?.[key], rest, value);
  return base;
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const Logo = () => (
  <span className="nav-logo">
    Cian
    <span className="nav-logo-dot" aria-hidden="true" />
    <span className="adm-badge">/ admin</span>
  </span>
);

const AdminPage = () => {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = "Admin | Edit site";
    return () => meta.remove();
  }, []);

  if (!supabase) return <SetupNotice />;
  return <AuthGate />;
};

const SetupNotice = () => (
  <div className="adm-login">
    <div className="adm-login-card glass">
      <Logo />
      <h1 className="adm-title">Connect Supabase to start editing</h1>
      <p className="body-sm">
        Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env.local</code> (and to
        your Vercel project settings), then run <code>supabase/setup.sql</code>. The full steps are in{" "}
        <code>docs/admin.md</code>.
      </p>
      <a href="/" className="btn btn--dark">Back to site</a>
    </div>
  </div>
);

const AuthGate = () => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) return <div className="page-loader" />;
  return session ? <Editor session={session} /> : <Login />;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (authError) setError(authError.message);
  };

  return (
    <div className="adm-login">
      <form className="adm-login-card glass" onSubmit={submit}>
        <Logo />
        <h1 className="adm-title">Sign in to edit your site</h1>
        <TextField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" required />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          required
        />
        {error && <p className="adm-error">{error}</p>}
        <button type="submit" className="btn btn--dark" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

const Editor = ({ session }) => {
  const { content, status, applyContent } = useContent();
  const [saved, setSaved] = useState(null);
  const [draft, setDraft] = useState(null);
  const [tab, setTab] = useState("site");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(0);

  // Start editing from the freshly fetched content, never from a stale cache.
  useEffect(() => {
    if (draft === null && status === "synced") {
      setDraft(content);
      setSaved(content);
    }
  }, [status, content, draft]);

  const dirty = draft !== null && JSON.stringify(draft) !== JSON.stringify(saved);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = useCallback((message, tone = "ok") => {
    setToast({ message, tone });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from(CONTENT_TABLE)
      .upsert({ id: CONTENT_ID, data: draft, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) {
      showToast(error.message, "error");
      return;
    }
    setSaved(draft);
    applyContent(draft);
    showToast("Saved. Your site is updated.");
  };

  const resetToDefaults = () => {
    if (window.confirm("Replace everything with the original content? Nothing is saved until you press Save.")) {
      setDraft(structuredClone(defaultContent));
    }
  };

  if (status === "error") {
    return (
      <div className="adm-login">
        <div className="adm-login-card glass">
          <Logo />
          <h1 className="adm-title">Couldn&apos;t load your saved content</h1>
          <p className="body-sm">
            Editing now could overwrite it, so the editor is paused. Check your connection and that{" "}
            <code>supabase/setup.sql</code> has been run, then reload.
          </p>
          <button type="button" className="btn btn--dark" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (!draft) return <div className="page-loader" />;

  const bind = (...path) => ({ value: getIn(draft, path), onChange: (value) => setDraft((d) => setIn(d, path, value)) });

  const panels = {
    site: (
      <Panel title="General" hint="Your name and contact details. These appear across the whole site.">
        <div className="adm-grid-2">
          <TextField label="Full name" {...bind("site", "name")} />
          <TextField label="Short name" hint="Shown as the logo in the nav." {...bind("site", "shortName")} />
          <TextField label="Role" {...bind("site", "role")} />
          <TextField label="Location" {...bind("site", "location")} />
        </div>
        <TextField label="Email" type="email" {...bind("site", "email")} />
      </Panel>
    ),

    hero: (
      <Panel title="Hero" hint="The first screen. Your full name is used as the headline.">
        <TextArea label="Tagline" rows={3} {...bind("hero", "tagline")} />
      </Panel>
    ),

    about: (
      <Panel title="About">
        <ImageField label="Photo" hint="A portrait works best (4:5)." {...bind("about", "photo")} />
        <TextField label="Heading" {...bind("about", "heading")} />
        <TextArea label="Bio" rows={6} {...bind("about", "body")} />
      </Panel>
    ),

    services: (
      <Panel title="Services">
        <TextField label="Heading" {...bind("services", "heading")} />
        <TextArea label="Intro" rows={2} {...bind("services", "intro")} />
        <Group title="Cards">
          <ListEditor
            {...bind("services", "items")}
            items={draft.services.items}
            itemTitle={(item, i) => item.title || `Service ${i + 1}`}
            newItem={{ title: "New service", description: "", tags: [] }}
            addLabel="Add service"
            renderItem={(item, set) => (
              <>
                <TextField label="Title" value={item.title} onChange={(title) => set({ title })} />
                <TextArea label="Description" value={item.description} onChange={(description) => set({ description })} />
                <TagsField label="Tags" value={item.tags} onChange={(tags) => set({ tags })} />
              </>
            )}
          />
        </Group>
      </Panel>
    ),

    process: (
      <Panel title="Process">
        <TextField label="Heading" {...bind("process", "heading")} />
        <Group title="Steps">
          <ListEditor
            {...bind("process", "steps")}
            items={draft.process.steps}
            itemTitle={(item, i) => item.title || `Step ${i + 1}`}
            newItem={{ title: "New step", description: "" }}
            addLabel="Add step"
            renderItem={(item, set) => (
              <>
                <TextField label="Title" value={item.title} onChange={(title) => set({ title })} />
                <TextArea label="Description" value={item.description} onChange={(description) => set({ description })} />
              </>
            )}
          />
        </Group>
      </Panel>
    ),

    projects: (
      <Panel title="Projects" hint="The first project is shown large. Use the arrows to reorder.">
        <TextField label="Heading" {...bind("work", "heading")} />
        <TextArea label="Intro" rows={2} {...bind("work", "intro")} />
        <Group title="Projects">
          <ListEditor
            collapsible
            {...bind("projects")}
            items={draft.projects}
            itemTitle={(item, i) => item.title || `Project ${i + 1}`}
            newItem={{
              slug: `project-${draft.projects.length + 1}`,
              title: "New project",
              type: "",
              year: String(new Date().getFullYear()),
              category: "",
              description: "",
              cover: "",
              gallery: [],
            }}
            addLabel="Add project"
            renderItem={(item, set, i) => {
              const duplicate = draft.projects.some((p, j) => j !== i && p.slug === item.slug);
              return (
                <>
                  <div className="adm-grid-2">
                    <TextField label="Title" value={item.title} onChange={(title) => set({ title })} />
                    <TextField
                      label="URL slug"
                      hint={duplicate ? "Another project already uses this slug." : `Page address: /projects/${item.slug}`}
                      value={item.slug}
                      onChange={(slug) => set({ slug: slugify(slug) })}
                    />
                    <TextField label="Type" hint="e.g. UI / Product" value={item.type} onChange={(type) => set({ type })} />
                    <TextField label="Year" value={item.year} onChange={(year) => set({ year })} />
                  </div>
                  <TextField label="Category" value={item.category} onChange={(category) => set({ category })} />
                  <TextArea label="Short description" value={item.description} onChange={(description) => set({ description })} />
                  <ImageField
                    label="Cover image"
                    hint="Shown on the project card, and as the case study hero (cropped to 16:9)."
                    value={item.cover}
                    onChange={(cover) => set({ cover })}
                  />
                  <GalleryField label="Case study images" value={item.gallery} onChange={(gallery) => set({ gallery })} />
                </>
              );
            }}
          />
        </Group>
      </Panel>
    ),

    contact: (
      <Panel title="Contact">
        <TextArea label="Heading" rows={2} {...bind("contact", "heading")} />
        <TextArea label="Text" rows={2} {...bind("contact", "body")} />
      </Panel>
    ),

    socials: (
      <Panel title="Socials" hint="Icons are picked automatically for LinkedIn, X, Behance, Dribbble, GitHub and Instagram.">
        <ListEditor
          {...bind("socials")}
          items={draft.socials}
          itemTitle={(item, i) => item.label || `Link ${i + 1}`}
          newItem={{ label: "", href: "https://" }}
          addLabel="Add link"
          renderItem={(item, set) => (
            <div className="adm-grid-2">
              <TextField label="Label" value={item.label} onChange={(label) => set({ label })} />
              <TextField label="URL" type="url" value={item.href} onChange={(href) => set({ href })} />
            </div>
          )}
        />
      </Panel>
    ),

    stack: (
      <Panel title="Tech stack" hint="Shown in the About section.">
        <ListEditor
          {...bind("stack")}
          items={draft.stack}
          itemTitle={(item, i) => item.label || `Group ${i + 1}`}
          newItem={{ label: "New group", items: [] }}
          addLabel="Add group"
          renderItem={(item, set) => (
            <>
              <TextField label="Group name" value={item.label} onChange={(label) => set({ label })} />
              <TagsField label="Tools" value={item.items} onChange={(items) => set({ items })} />
            </>
          )}
        />
      </Panel>
    ),
  };

  return (
    <div className="adm">
      <header className="adm-bar glass">
        <Logo />
        <div className="adm-bar-actions">
          {dirty && <span className="adm-unsaved">Unsaved changes</span>}
          <button type="button" className="btn btn--glass btn--sm" disabled={!dirty || saving} onClick={() => setDraft(saved)}>
            Discard
          </button>
          <button type="button" className="btn btn--dark btn--sm" disabled={!dirty || saving} onClick={save}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </header>

      <div className="adm-layout">
        <aside className="adm-side">
          <nav className="adm-tabs" aria-label="Sections">
            {TABS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`adm-tab ${tab === id ? "is-active" : ""}`}
                aria-current={tab === id ? "page" : undefined}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="adm-side-foot">
            <a href="/" target="_blank" rel="noopener noreferrer" className="adm-link">
              View site <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
            <button type="button" className="adm-link" onClick={resetToDefaults}>
              Reset to original content
            </button>
            <button type="button" className="adm-link" onClick={() => supabase.auth.signOut()}>
              Sign out
            </button>
            <p className="adm-hint">{session.user.email}</p>
          </div>
        </aside>

        <main className="adm-main">{panels[tab]}</main>
      </div>

      {toast && (
        <p className={`adm-toast glass ${toast.tone === "error" ? "is-error" : ""}`} role="status">
          {toast.message}
        </p>
      )}
    </div>
  );
};

export default AdminPage;
