import Navbar from '@/components/layouts/Navbar'
import React from 'react'
import Footer from '@/components/layouts/Footer'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default UserLayout