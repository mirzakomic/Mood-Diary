import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [shouldRefetch, _refetch] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state

  const refetch = () => _refetch((prev) => !prev);

  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    axios
      .get("/api/user/secure")
      .then(({ data }) => {
        setUser(data);
        console.log(data, user);
        setIsLoggedIn(true); // Update isLoggedIn state
      })
      .catch((e) => {
        setUser(null);
        console.log("doesnt work");
        setIsLoggedIn(false); // Update isLoggedIn state
      });
  }, [shouldRefetch]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};