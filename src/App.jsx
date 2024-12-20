import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventDetailPage from "./pages/EventDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import { ToastContainer } from 'react-toastify';
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateEvent from "./pages/dashboard/CreateEvent";
import Events from "./pages/dashboard/Events";
import Settings from "./pages/Settings";
import EventDetails from "./pages/dashboard/EventDetails";
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="user-dashboard" element={<Dashboard />} />
            <Route path="event" element={<Events />} />
            <Route path="create-event" element={<CreateEvent />} />
            <Route path="settings" element={<Settings />} />
            <Route path="organizer-events/:id" element={<EventDetails />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;