import { List } from "./List"
import Navbar from "./Navbar"
import ToastContainerComponent from "../submission"
import { Routes, Route } from "react-router"; 
import RegisterPage from "../RegisterPage";
import LoginPage from "../LoginPage";

import PrivateRoute from "../context/PrivateRoute";
function App() {

  return (
    <>
    <ToastContainerComponent/>

      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<PrivateRoute><List/></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App
