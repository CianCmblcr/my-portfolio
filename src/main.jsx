import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx';
import Spotify from './projects/Spotify.jsx';
import GlowNest from './projects/GlowNest.jsx';
import LifeLane from "./projects/LifeLane";
import GlobalEffects from "./components/GlobalEffects";
import './index.css';
import './motion.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalEffects />}>
          <Route path="/" element={<App />} />
          <Route path="/projects/spotify" element={<Spotify />} />
          <Route path="/projects/glownest" element={<GlowNest />} />
          <Route path="/projects/lifelane" element={<LifeLane />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
