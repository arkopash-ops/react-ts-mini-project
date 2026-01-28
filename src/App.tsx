import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import { seedAdmin } from './utils/seedAdmin';
import { seedUsers } from './utils/seedUser';
import { seedRestaurants } from './utils/seedRestaurant';
import { seedMenuItems } from './utils/seedMenuItems';

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
import BrowseRestaurant from './pages/user/BrowseRestaurant';
import MyOrders from './pages/user/MyOrders';

function App() {
  useEffect(() => {
    seedAdmin();
    seedUsers();
    seedRestaurants();
    seedMenuItems();
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

            {/* admin */}
            <Route path="/adminDashboard" element={
              <ProtectedRoute role={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* user */}
            <Route path="/userhome" element={
              <ProtectedRoute role={['user']}>
                <UserHome />
              </ProtectedRoute>
            } />

            <Route path="/browseRestaurants" element={
              <ProtectedRoute role={['user']}>
                <BrowseRestaurant />
              </ProtectedRoute>
            } />

            <Route path="/orders" element={
              <ProtectedRoute role={['user']}>
                <MyOrders />
              </ProtectedRoute>
            } />

            {/* owner */}
            <Route path="/ownerDashboard" element={
              <ProtectedRoute role={['owner']}>
                <OwnerDashboard />
              </ProtectedRoute>
            } />

            <Route path="/restaurant/create" element={
              <ProtectedRoute role={['owner']}>
                <RestaurantInfo />
              </ProtectedRoute>
            } />

            <Route path="/restaurant/edit/:id" element={
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
