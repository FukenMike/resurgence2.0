// src/components/Layout.tsx

import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-4 bg-black text-white min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

