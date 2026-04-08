import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="w-full border-b bg-white">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-semibold">
                    Knis Garden
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button variant="ghost">Home</Button>
                    </Link>

                    {isAuthenticated ? (
                        <Button variant="default" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Link to="/login">
                            <Button variant="default">Login</Button>
                        </Link>
                    )}
                </div>
            </div>
            <Separator />
        </nav>
    );
}
