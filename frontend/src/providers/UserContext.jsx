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
      localStorage.removeItem('authToken');
      navigate("/");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      axios
        .get(`${apiUrl}/api/user/secure`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setUser(data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error('Error fetching secure user data:', error);
          setUser(null);
          setIsLoggedIn(false);
        });
    }
  }, [shouldRefetch, apiUrl]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};