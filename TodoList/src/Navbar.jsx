import useThemeStore from "./store/themeStore";
import ToggleButton from "./ToggleButton";
import { useEffect } from "react";
export default function Navbar() {
    const darkMode = useThemeStore((state) => state.darkMode);
    useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    }, [darkMode]);
    return (
    <nav className="fixed  top-0 left-0 w-full z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md shadow-lg transition-colors ">
        <div className="max-w-7xl mx-auto px-4 py-3  flex justify-between items-center">
        <div className="text-2xl font-bold text-green-500 dark:text-blue-600">
            TodoList
        </div>

        <ul className="flex gap-6 font-medium text-green-700 dark:text-blue-800">
            <li>
            <a href="/login" className="hover:underline">
                Login
            </a>
            </li>
            <li>
            <a href="/register" className="hover:underline">
                Register
            </a>
            </li>
        </ul>

            <ToggleButton />
        </div>
    </nav>
    );
}
