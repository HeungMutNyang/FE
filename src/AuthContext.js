import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("ACCESS_TOKEN", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
