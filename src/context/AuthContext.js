import React, { createContext, useState, useEffect } from "react";
import { listenForAuthState } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    listenForAuthState((user) => {
      setUser(user);
      setLoading(false); // Auth state resolved
      console.log("AuthContext: User state updated:", user); // Debugging log
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
