import React, { createContext, useContext, useCallback } from "react";

const DEMO_USER = {
  id: 1,
  role: "creator",
  email: "demo@example.com",
  name: "Demo User",
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const logout = useCallback(() => {
    // Static demo: no live session; keep UI signed in.
  }, []);

  const checkAuth = useCallback(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user: DEMO_USER,
        loading: false,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
