import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
    const storedToken = localStorage.getItem("token");

    setIsAuthenticated(storedAuth || false);
    setToken(storedToken);  // Cargar el token almacenado en localStorage
  }, []);

  const login = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("token", token);  // Guardar el token en localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");  // Eliminar el token de localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);