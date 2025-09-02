import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Firebase tool to listen to auth changes
import { auth } from "../config/firebase"; // your Firebase instance

export const AuthContext = createContext(); //global store we will use context to share info to all components

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //  React state to store the current user
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u); //  Firebase tells us when the user logs in or logs out
      setLoading(false);
    });

    return () => unsubscribe(); //  Cleanup when the client leave the website
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext); //customHook
