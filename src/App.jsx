import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventDetailPage from "./pages/EventDetailPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CheckoutPage from "./pages/CheckoutPage";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
