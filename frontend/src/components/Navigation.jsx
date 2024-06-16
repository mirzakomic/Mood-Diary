import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../user/UserContext";
import  Logo  from "../assets/img/logo.png"

const Navigation = () => {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <nav className="bg-paleLilac p-5 rounded-3xl shadow-md text-2xl font-poppinsRegular flex justify-between">
      <img src={Logo} className="w-20 h-20"/>
      <div className="flex items-center gap-5 mr-5">
      {!isLoggedIn && (
        <>
          <Link to="/" cclassName="hover:bg-primary p-3 rounded-2xl transition-all">Home</Link>
          <Link to="/signup" className="hover:bg-primary p-3 rounded-2xl transition-all">Signup</Link>
          <Link to="/login" className="hover:bg-primary p-3 rounded-2xl transition-all">Login</Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <Link to="/dashboard" className="hover:bg-primary p-3 rounded-2xl transition-all">Dashboard</Link>
          <Link to="/diary" className="hover:bg-primary p-3 rounded-2xl transition-all">Diary</Link>
          <Link to="/profile" className="hover:bg-primary p-3 rounded-2xl transition-all">Profile</Link>
          <button type="button" className="hover:bg-primary p-3 rounded-2xl transition-all" onClick={logout}>
            Logout
          </button>
        </>
      )}
      </div>
    </nav>
  );
};

export default Navigation;