import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsAuthenticated(!!token); // token이 존재하면 true, 존재하지 않으면 false
  }, []);

  const login = (token) => {
    localStorage.setItem("ACCESS_TOKEN", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
