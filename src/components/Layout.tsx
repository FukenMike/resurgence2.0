import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-steam-bg text-steam-text font-body">
      <Navbar />
      <main className="p-4 lg:p-8 space-y-6">
        {children}
      </main>
      <Footer />
    </div>
  )
}
