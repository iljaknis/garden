import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

export default function Navbar() {
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

                    <Link to="/login">
                        <Button variant="default">Login</Button>
                    </Link>
                </div>
            </div>
            <Separator />
        </nav>
    );
}