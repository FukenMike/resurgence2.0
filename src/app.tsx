import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import Experience from './pages/experience';
import Support from './pages/support';
import TheVault from './pages/the-vault';
import WallOfTruth from './pages/wall-of-truth';
import Connect from './pages/connect';
import PrivacyPolicy from './pages/privacy-policy';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Root now funnels to the canonical narrative spine */}
          <Route index element={<Navigate to="/experience" replace />} />

          {/* Legacy content modules now anchor into /experience to keep external links alive */}
          <Route path="home" element={<Navigate to="/experience#signal" replace />} />
          <Route path="who-we-are" element={<Navigate to="/experience#signal" replace />} />
          <Route path="mission" element={<Navigate to="/experience#mission" replace />} />
          <Route path="vision" element={<Navigate to="/experience#truth" replace />} />
          <Route path="founder-story" element={<Navigate to="/experience#voices" replace />} />
          <Route path="buried-by-the-system" element={<Navigate to="/experience#cost" replace />} />

          {/* Canonical narrative route */}
          <Route path="experience" element={<Experience />} />

          {/* Standalone utility routes remain routable */}
          <Route path="support" element={<Support />} />
          <Route path="the-vault" element={<TheVault />} />
          <Route path="wall-of-truth" element={<WallOfTruth />} />
          <Route path="connect" element={<Connect />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </Router>
  );
}

