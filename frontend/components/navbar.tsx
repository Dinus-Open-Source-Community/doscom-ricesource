"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUser } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@/types";
import { logout } from "@/actions/auth";

const navItems = [
  { name: "Home", href: "/ricesource" },
  { name: "About", href: "/ricesource/about" },
  { name: "Explore", href: "/ricesource/explore" },
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
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Ricesource
              </span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${pathname === item.href
                    ? "border-emerald-600 text-emerald-600"
                    : "border-transparent text-gray-600 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/ricesource/bookmark"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${pathname === "/ricesource/bookmark"
                      ? "border-emerald-600 text-emerald-600"
                      : "border-transparent text-gray-600 hover:border-emerald-300 hover:text-emerald-600"
                    }`}
                >
                  Bookmark
                </Link>

                <Link
                  href={`/ricesource/manage/${user.id}`}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${pathname === "/ricesource/manage/" + user.id
                      ? "border-emerald-600 text-emerald-600"
                      : "border-transparent text-gray-600 hover:border-emerald-300 hover:text-emerald-600"
                    }`}
                >
                  Manage
                </Link>

                <div className="flex items-center space-x-4">
                  <Avatar className="border-2 border-emerald-100">
                    <AvatarImage src={user.avatar || "/account.svg"} alt={user.username} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                      {user.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-700">{user.username}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1 bg-white">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${pathname === item.href
                    ? "bg-emerald-50 border-emerald-600 text-emerald-600"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  href="/ricesource/bookmark"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${pathname === "/ricesource/bookmark"
                      ? "bg-emerald-50 border-emerald-600 text-emerald-600"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-emerald-300 hover:text-emerald-600"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  Bookmark
                </Link>

                <Link
                  href={`/ricesource/manage/${user.id}`}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${pathname === "/ricesource/manage/" + user.id
                      ? "bg-emerald-50 border-emerald-600 text-emerald-600"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-emerald-300 hover:text-emerald-600"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  Manage
                </Link>

                <div className="flex items-center space-x-3 pl-3 pr-4 py-2">
                  <Avatar className="border-2 border-emerald-100 h-8 w-8">
                    <AvatarImage src={user.avatar || "/account.svg"} alt={user.username} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs">
                      {user.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-700">{user.username}</span>
                </div>

                <button
                  onClick={() => {
                    handleLogout?.()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <div className="flex flex-col space-y-2 p-3">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
