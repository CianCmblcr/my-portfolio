import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultContent, mergeContent } from "./defaultContent";
import { fetchSavedContent, hasBackend } from "../lib/supabase";

const CACHE_KEY = "site-content-v1";
// How long first-time visitors wait for saved content before seeing defaults.
const LOAD_TIMEOUT = 2500;

const readCache = () => {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    if (data) window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    else window.localStorage.removeItem(CACHE_KEY);
  } catch {
    // Storage can be unavailable (private mode); the cache is only a speed-up.
  }
};

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [saved, setSaved] = useState(readCache);
  // "synced" once the latest saved content has been fetched (or there is no backend).
  const [status, setStatus] = useState(hasBackend ? "loading" : "synced");
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!hasBackend) return;
    let cancelled = false;
    const timer = setTimeout(() => setTimedOut(true), LOAD_TIMEOUT);

    fetchSavedContent().then(
      (next) => {
        if (cancelled) return;
        setSaved(next);
        writeCache(next);
        setStatus("synced");
      },
      () => !cancelled && setStatus("error"),
    );

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const applyContent = useCallback((next) => {
    setSaved(next);
    writeCache(next);
  }, []);

  const content = useMemo(() => mergeContent(defaultContent, saved), [saved]);
  const ready = status !== "loading" || saved !== null || timedOut;

  const value = useMemo(
    () => ({ content, ready, status, applyContent }),
    [content, ready, status, applyContent],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => useContext(ContentContext);
