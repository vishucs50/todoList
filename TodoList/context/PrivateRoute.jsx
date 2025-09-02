import { Navigate } from "react-router";
import { useAuth } from "./authContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>loading...</div>
  if (user) return children;

  return <Navigate to="/Login" replace />;
};

export default PrivateRoute;
