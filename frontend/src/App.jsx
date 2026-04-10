import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExploreEvents from './pages/ExploreEvents';
import EventDetails from './pages/EventDetails';
import MyTickets from './pages/MyTickets';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import OrganizerDashboard from './pages/OrganizerDashboard';
import ScanTicket from './pages/ScanTicket';
import ForgotPassword from './pages/ForgotPassword';
import EventAnalytics from './pages/EventAnalytics';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="font-sans text-slate-900 bg-slate-50 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex flex-col pt-20 md:pt-[124px]">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/explore" element={<ExploreEvents />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Attendee routes */}
              <Route
                path="/my-tickets"
                element={
                  <PrivateRoute roles={['attendee']}>
                    <MyTickets />
                  </PrivateRoute>
                }
              />

              {/* Organizer routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute roles={['organizer']}>
                    <OrganizerDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-event"
                element={
                  <PrivateRoute roles={['organizer']}>
                    <CreateEvent />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-event/:id"
                element={
                  <PrivateRoute roles={['organizer']}>
                    <EditEvent />
                  </PrivateRoute>
                }
              />
              <Route
                path="/analytics/:id"
                element={
                  <PrivateRoute roles={['organizer']}>
                    <EventAnalytics />
                  </PrivateRoute>
                }
              />
              <Route
                path="/scan"
                element={
                  <PrivateRoute roles={['organizer']}>
                    <ScanTicket />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
