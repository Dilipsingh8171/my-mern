import React from 'react'
import Header from './Header';
import Footer from './Footer';
// import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import AdminDashboard from '../pages/Admin/AdminDashboard';

const Layout = ({ children }) => {
  return (
    <div>

      <Toaster />
      <main style={{ height: '670px' }}>

        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
