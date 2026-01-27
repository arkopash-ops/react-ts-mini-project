import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { seedAdmin } from './utils/seedAdmin';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import GuestHome from './pages/guest/GuestHome';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import UserHome from './pages/user/UserHome';

import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/admin/adminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    seedAdmin();
  }, []);

  return (
    <BrowserRouter>
      <div className='d-flex flex-column min-vh-100' style={{ fontFamily: "cursive", backgroundColor: "#000", color: "#fff" }}>
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<GuestHome />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/adminDashboard" element={
              <ProtectedRoute role={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/userhome" element={
              <ProtectedRoute role={['user', 'owner']}>
                <UserHome />
              </ProtectedRoute>
            } />

            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>

        <Footer />
      </div></BrowserRouter>
  )
}

export default App
