import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("authUser");

    if (token && userData) {
      setUser(JSON.parse(userData)); // Carrega os dados do usuário
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
     
    setUser(null);
  };

  return { user, logout };
};
    