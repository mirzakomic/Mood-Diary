import { Routes, Route } from "react-router-dom";

// Routes
import Home from "./pages/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./pages/Profile";
import ResetPassword from "./user/ResetPassword";

// Components
import Navigation from "./components/Navigation";

import "./App.css";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="p-5">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/passwordReset" element={<ResetPassword />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;