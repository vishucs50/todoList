import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useThemeStore from "./store/ThemeStore";
const ToastContainerComponent = () => {
    const darkMode=useThemeStore((state)=>state.darkMode);
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000} // Toast auto closes after 3 seconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={darkMode ?"dark" :"light"} // You can choose 'light' or 'dark' or 'colored'
    />
  );
};

export default ToastContainerComponent;
