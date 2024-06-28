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
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
  });

  const refetch = () => _refetch((prev) => !prev);

  const logout = async () => {
    try {
      await axios.get(`${apiUrl}/api/user/logout`, {secure: true});
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
      setIsLoggedIn(true);
    })
    .catch((error) => {
      console.error('Error fetching secure user data:', error);
      setUser(null);
      setIsLoggedIn(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};