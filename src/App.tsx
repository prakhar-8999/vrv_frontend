import {Toaster} from "react-hot-toast";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {Analytics} from "./pages/Analytics";
import {Dashboard} from "./pages/Dashboard";
import {EventForm} from "./pages/EventForm";
import {EventList} from "./pages/EventList";
import {Login} from "./pages/Login";
import {RoleManagement} from "./pages/RoleManagement";
import Unauthorized from "./pages/Unauthorized";
import {UserManagement} from "./pages/UserManagement";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <EventList />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/new"
            element={
              <ProtectedRoute requiredPermission="create_event">
                <>
                  <Navbar />
                  <EventForm />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute requiredPermission="create_event">
                <>
                  <Navbar />
                  <EventForm />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredPermission="manage_users">
                <>
                  <Navbar />
                  <UserManagement />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute requiredPermission="manage_roles">
                <>
                  <Navbar />
                  <RoleManagement />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute requiredPermission="view_analytics">
                <>
                  <Navbar />
                  <Analytics />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
