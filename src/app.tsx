// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/home';
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="who-we-are" element={<WhoWeAre />} />
          <Route path="mission" element={<Mission />} />
          <Route path="vision" element={<Vision />} />
          <Route path="founder-story" element={<FounderStory />} />
          <Route path="support" element={<Support />} />
          <Route path="buried-by-the-system" element={<BuriedByTheSystem />} />
          <Route path="the-vault" element={<TheVault />} />
          <Route path="wall-of-truth" element={<WallOfTruth />} />
          <Route path="education-reform" element={<EducationReform />} />
          <Route path="connect" element={<Connect />} />
        </Route>
      </Routes>
    </Router>
  );
}

