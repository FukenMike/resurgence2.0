import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import WhoWeAre from './pages/WhoWeAre';
import Mission from './pages/Mission';
import Vision from './pages/Vision';
import FounderStory from './pages/FounderStory';
import Donate from './pages/Donate';
import BuriedByTheSystem from './pages/BuriedByTheSystem';
import Publications from './pages/Publications';
import WallOfTruth from './pages/WallOfTruth';
import ApolloAlliance from './pages/ApolloAlliance';
import Contact from './pages/Contact';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/who-we-are' element={<WhoWeAre />} />
        <Route path='/mission' element={<Mission />} />
        <Route path='/vision' element={<Vision />} />
        <Route path='/founder-story' element={<FounderStory />} />
        <Route path='/donate' element={<Donate />} />
        <Route path='/buried-by-the-system' element={<BuriedByTheSystem />} />
        <Route path='/publications' element={<Publications />} />
        <Route path='/wall-of-truth' element={<WallOfTruth />} />
        <Route path='/apollo-alliance' element={<ApolloAlliance />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
