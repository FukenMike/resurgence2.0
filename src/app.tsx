import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import WhoWeServe from './pages/who-we-serve';
import Programs from './pages/programs';
import HowWeHelp from './pages/how-we-help';
import About from './pages/about';
import ResourcesTools from './pages/resources-tools';
import { ResourcesDirectory } from './pages/resources-directory';
import { ResourceDetail } from './pages/resource-detail';
import GetInvolved from './pages/get-involved';
import Transparency from './pages/transparency';
import NotFound from './pages/not-found';
import ProgramMobilityStabilization from './pages/program-mobility-stabilization';
import PrivacyPolicy from './pages/privacy-policy';
import TermsOfService from './pages/terms-of-service';
import Diagnostics from './pages/diagnostics';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="who-we-serve" element={<WhoWeServe />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/mobility-stabilization" element={<ProgramMobilityStabilization />} />
          <Route path="how-we-help" element={<HowWeHelp />} />
          <Route path="about" element={<About />} />
          {/* /resources restored to original tools layout; directory lives under /resources/directory */}
          <Route path="resources" element={<ResourcesTools />} />
          <Route path="resources/directory" element={<ResourcesDirectory />} />
          <Route path="resources/directory/:slugOrId" element={<ResourceDetail />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="transparency" element={<Transparency />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="admin/diagnostics" element={<Diagnostics />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

