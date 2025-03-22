"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUser } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@/types";
import { logout } from "@/actions/auth";

const navItems = [
  { name: "Home", href: "/ricesource" },
  { name: "About", href: "/ricesource/about" },
  { name: "Explore", href: "/ricesource/explore" },
  { name: "Bookmark", href: "/ricesource/bookmark" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const fetchUserData = async () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        console.log("Parsed user from localStorage:", user); // Debugging
        if (user?.id) {
          const response = await getUser(user.id);
          console.log("Fetched user data from API:", response); // Debugging
          if (response) {
            setUser(response);
          } else {
            setError("Failed to fetch user data");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Debugging
        setError("Failed to parse or fetch user data");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No user data found in localStorage"); // Debugging
      setError("No user data found in localStorage");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    await logout();
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
    }

    fetchUserData();
  }, []);

  // Log user state changes
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  return (
    <nav className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">
                Ricesource
              </span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === item.href
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className=" flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={user.avatar || "/account.svg"} // Fallback to a default avatar
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {user.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold capitalize text-md">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  pathname === item.href
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:bg-muted hover:border-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <>
                <div className="pl-3 pr-4 py-2">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>
                      {user.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
