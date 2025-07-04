import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-steam-bg text-steam-text font-body">
      <Navbar />
      <main className="pt-20 lg:pt-24 p-4 lg:p-8 space-y-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
