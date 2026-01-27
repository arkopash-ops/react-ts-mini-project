import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { seedAdmin } from './utils/seedAdmin';
import { seedUsers } from './utils/seedUser';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import GuestHome from './pages/guest/GuestHome';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import AdminDashboard from './pages/admin/AdminDashboard';

import UserHome from './pages/user/UserHome';

import OwnerDashboard from './pages/owner/OwnerDashboard';
import RestaurantInfo from './pages/owner/RestaurantInfo';

import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    seedAdmin();
    seedUsers();
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
              <ProtectedRoute role={['user']}>
                <UserHome />
              </ProtectedRoute>
            } />

            <Route path="/ownerDashboard" element={
              <ProtectedRoute role={['owner']}>
                <OwnerDashboard />
              </ProtectedRoute>
            } />

            <Route path="/addRestaurant" element={
              <ProtectedRoute role={['owner']}>
                <RestaurantInfo />
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
