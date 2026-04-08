import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function AuthenticatedLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public — no navbar */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected — navbar shown */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AuthenticatedLayout />}>
                            <Route path="/" element={<Home />} />
                            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
