import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router';
import GuestHome from './pages/guest/GuestHome';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import UserHome from './pages/user/UserHome';
function App() {

  return (
    <BrowserRouter>
      <div className='d-flex flex-column min-vh-100' style={{ fontFamily: "cursive", backgroundColor: "#000", color: "#fff" }}>
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<GuestHome />} />
            
            <Route path="/userhome" element={<UserHome />} />

            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>

        <Footer />
      </div></BrowserRouter>
  )
}

export default App
