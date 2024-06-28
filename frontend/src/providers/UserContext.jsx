import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [shouldRefetch, _refetch] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true, // Enable cookies
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      // Read token from cookies
      const token = document.cookie.split('; ')
        .find(row => row.startsWith('auth='))
        ?.split('=')[1];
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("token ok in usCont");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
  });

  const refetch = () => _refetch((prev) => !prev);

  const logout = async () => {
    try {
      console.log("trying log out");
      await axiosInstance.get(`/api/user/logout`);
      console.log("cookie cleared, logging out");
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // useEffect(() => {
  //     axios
  //       .get(`${apiUrl}/api/user/secure`, {secure: true})
  //       .then(({ data }) => {
  //         setUser(data);
  //         setIsLoggedIn(true);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching secure user data:', error);
  //         setUser(null);
  //         setIsLoggedIn(false);
  //       });
  // }, [shouldRefetch]);

  useEffect(() => {
    axiosInstance.get('/api/user/secure')
    .then(({ data }) => {
      setUser(data);
      console.log("set user data:", data);
      setIsLoggedIn(true);
      navigate("/dashboard")
    })
    .catch((error) => {
      console.error('Error fetching secure user data:', error);
      setUser(null);
      setIsLoggedIn(false);
      console.log("usercontext error");
    });
  }, [shouldRefetch]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};