import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded bg-blue-500 text-white dark:bg-slate-400 dark:text-gray-900"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
