import { Routes, Route } from "react-router-dom";

// Routes
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./pages/Profile";
import ResetPassword from "./user/ResetPassword";
import Dashboard from "./pages/Dashboard";
import DetailEntry from "./pages/DetailEntry";
import Background from "./components/Background"

// Components
import Navigation from "./components/Navigation";

import "./App.css";
import MoodBoard from "./components/MoodBoard";

function App() {
  return (
    <div className="p-5">
      <Background/>
    <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/average-mood" element={<MoodBoard />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/entry/:id" element={<DetailEntry />} />
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