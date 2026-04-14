import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavbarAlternate() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  {/*
  const linkClass = (path: string) =>
    `px-3 py-2 text-sm transition-colors ${location.pathname === path
      ? "text-cyan-400"
      : "text-slate-300 hover:text-white"
    }`;*/}
  const linkClass = (path: string) =>
    `px-3 py-2 text-sm rounded-md transition-colors ${location.pathname === path
      ? "bg-slate-800 text-white"
      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
    }`;

  return (
    <nav className="w-full bg-card/80 backdrop-blur border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-lg font-semibold tracking-tight text-slate-100">
          Knis Garden
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-2">

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className={linkClass("/")}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/dummyone" className={linkClass("/dummyone")}>
                  DummyOne
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/dummytwo" className={linkClass("/dummytwo")}>
                  DummyTwo
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button variant="secondary" onClick={handleLogout}>
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