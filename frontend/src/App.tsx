import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Navbar from "./components/NavbarAlternate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DummyOne from "./pages/DummyOne";
import DummyTwo from "./pages/DummyTwo";


function AuthenticatedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Guest-only — redirects to / if already logged in */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected — navbar shown */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dummyone" element={<DummyOne />} />
              <Route path="/dummytwo" element={<DummyTwo />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
