import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-steam-bg text-steam-text font-body">
      <Navbar />
      <main className="p-4 lg:p-8 space-y-6">
        <Outlet /> {/* ← this renders the current route’s component */}
      </main>
      <Footer />
    </div>
  );
}
