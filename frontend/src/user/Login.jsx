import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./UserContext";

export default function Login() {
  const { refetch } = useContext(UserContext);
  const nav = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/login", data);
      refetch();
      nav("/profile");
    } catch (e) {
      console.log(e);
      setError("An Error occured, try again later");
    }
  };

  return (
    <form onSubmit={submit} className="bg-paleLilac p-2 rounded-lg mt-4">
      <input name="email" type="email" placeholder="your email" className="bg-primary p-2 rounded-lg" />
      <input name="password" type="password" placeholder="***********" className="bg-primary p-2 rounded-lg"/>
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
    </form>
  );
}
