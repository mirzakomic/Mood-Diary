import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import  Logo  from "../assets/img/logo.png"
import Login from "../user/Login";
import Signup from "../user/Signup";
import Button from "./Button";

const Navigation = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  const [showForm, setShowForm] = useState(true);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };


  return (
         <>
      {isLoggedIn && (
        <nav className="bg-paleLilac p-5 rounded-3xl shadow-md text-2xl font-poppinsRegular flex justify-between">
          <img src={Logo} className="w-20 h-20"/>
          <div className="flex items-center gap-5 mr-5">
          <Link to="/dashboard" className="hover:bg-primary p-3 rounded-2xl transition-all">Dashboard</Link>
          <Link to="/diary" className="hover:bg-primary p-3 rounded-2xl transition-all">Diary</Link>
          <Link to="/profile" className="hover:bg-primary p-3 rounded-2xl transition-all">Profile</Link>
          <button type="button" className="hover:bg-primary p-3 rounded-2xl transition-all" onClick={logout}>
            Logout
          </button>
      </div>
    </nav>
)}
{!isLoggedIn && (
  <>
  <div className="flex flex-col justify-center items-center gap-4 h-screen">
  <img src={Logo} className="w-40 h-40" />
        {showForm ? <Login/> : <Signup/>}
      <Button onClick={toggleForm} variant="tertiary">
        {showForm ? "You want to sign up rather?" : "Login?"}
      </Button>
</div>
</>
)}
    </>
  );
};

export default Navigation;