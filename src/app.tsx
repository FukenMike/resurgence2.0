// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/home';
import Experience from './pages/experience';
import WhoWeAre from './pages/who-we-are';
import Mission from './pages/mission';
import Vision from './pages/vision';
import FounderStory from './pages/founder-story';
import Support from './pages/support';
import BuriedByTheSystem from './pages/buried-by-the-system';
import TheVault from './pages/the-vault';
import WallOfTruth from './pages/wall-of-truth';
import EducationReform from './pages/education-reform';
import Connect from './pages/connect';
import PrivacyPolicy from './pages/privacy-policy'; // <-- ✅ Add this line

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redirect root to the new narrative experience */}
          <Route index element={<Navigate to="/experience" replace />} />
          {/* Keep Home routable as secondary */}
          <Route path="home" element={<Home />} />
          <Route path="experience" element={<Experience />} />
          <Route path="who-we-are" element={<WhoWeAre />} />
          <Route path="mission" element={<Mission />} />
          <Route path="vision" element={<Vision />} />
          <Route path="founder-story" element={<FounderStory />} />
          <Route path="support" element={<Support />} />
          <Route path="buried-by-the-system" element={<Navigate to="/experience#cost" replace />} />
          <Route path="the-vault" element={<TheVault />} />
          <Route path="wall-of-truth" element={<WallOfTruth />} />
          <Route path="education-reform" element={<EducationReform />} />
          <Route path="connect" element={<Connect />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} /> {/* ✅ Add this route */}
        </Route>
      </Routes>
    </Router>
  );
}

