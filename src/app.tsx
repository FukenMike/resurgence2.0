import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import WhoWeAre from './pages/who-we-are';
import Programs from './pages/programs';
import HowWeHelp from './pages/how-we-help';
import About from './pages/about';
import Resources from './pages/resources';
import GetInvolved from './pages/get-involved';
import Transparency from './pages/transparency';
import NotFound from './pages/not-found';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="who-we-are" element={<WhoWeAre />} />
          <Route path="programs" element={<Programs />} />
          <Route path="how-we-help" element={<HowWeHelp />} />
          <Route path="about" element={<About />} />
          <Route path="resources" element={<Resources />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="transparency" element={<Transparency />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

