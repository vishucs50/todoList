import useThemeStore from "./store/themeStore";
import ToggleButton from "./ToggleButton";
import { useEffect } from "react";
import LogoutButton from "./forms/Logout";
import { Link } from "react-router";
import { useAuth } from "../context/authContext";
export default function Navbar() {
    const user = useAuth()
    if(user) console.log(user);
    const darkMode = useThemeStore((state) => state.darkMode);
    useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    }, [darkMode]);
    return (
      <nav className="fixed top-0 left-0 w-full z-50  bg-gray-900/50 backdrop-blur-md shadow-lg transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left side: Logo */}
          <div className="text-2xl font-bold text-green-500 dark:text-blue-400">
            TodoList
          </div>

          {/* Right side: Links + Toggle */}
          <div className="flex items-center gap-6">
            {user?.user && <ToggleButton />}
            <ul className="flex gap-6 font-medium text-green-700 dark:text-blue-800 items-center">
              {!user?.user && (
                <li>
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded  text-white bg-blue-400 hover:bg-blue-600"
                  >
                    Login
                  </Link>
                </li>
              )}
              {!user?.user && (
                <li>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded  text-white bg-blue-400 hover:bg-blue-600"
                  >
                    Register
                  </Link>
                </li>
              )}
              {user.user && (
                <li>
                  <LogoutButton className="px-4 py-2 rounded bg-red-500 text-white dark:bg-slate-500 dark:text-gray-100" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
}
