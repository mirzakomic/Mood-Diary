import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [shouldRefetch, _refetch] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state

  const refetch = () => _refetch((prev) => !prev);

  const logout = async () => {
    try {
      await axios.get(`${apiUrl}/api/user/logout`);
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/user/secure`)
      .then(({ data }) => {
        setUser(data);
        setIsLoggedIn(true); // Update isLoggedIn state
      })
      .catch((e) => {
        setUser(null);
        setIsLoggedIn(false); // Update isLoggedIn state
      });
  }, [shouldRefetch]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};