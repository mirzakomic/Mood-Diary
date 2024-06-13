import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../user/UserContext";

const Navigation = () => {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <nav className="bg-paleLilac p-5 rounded-3xl shadow-md text-2xl font-poppinsRegular">
      {!isLoggedIn && (
        <>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navigation;