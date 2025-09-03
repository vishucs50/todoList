import useThemeStore from "./store/ThemeStore";

export default function ToggleButton() {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded bg-blue-500 text-white dark:bg-slate-400 dark:text-gray-900"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
