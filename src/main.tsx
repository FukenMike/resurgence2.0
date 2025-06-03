import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/who-we-are' element={<WhoWeAre />} />
        <Route path='/mission' element={<Mission />} />
        <Route path='/vision' element={<Vision />} />
        <Route path='/founder-story' element={<FounderStory />} />
        <Route path='/support' element={<Support />} />
        <Route path='/buried-by-the-system' element={<BuriedByTheSystem />} />
        <Route path='/the-vault' element={<TheVault />} />
        <Route path='/wall-of-truth' element={<WallOfTruth />} />
        <Route path='/education-reform' element={<EducationReform />} />
        <Route path='/connect' element={<Connect />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
