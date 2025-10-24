import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { api } from "../services/service"

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
    }, [token]);

    async function login(email, senha) {
    try {
      const res = await api.post("/auth/login", { email, senha });
      const { token } = res.data.dados;
      setToken(token);
      localStorage.setItem("token", token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser({ email });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}
export default AuthProvider;