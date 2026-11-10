import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import GlobalEffects from "./components/GlobalEffects";
import { ContentProvider } from "./content/ContentProvider";
import "./index.css";
import "./motion.css";

const AdminPage = lazy(() => import("./admin/AdminPage.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<GlobalEffects />}>
            <Route path="/" element={<App />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div className="page-loader" />}>
                <AdminPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  </StrictMode>,
);
