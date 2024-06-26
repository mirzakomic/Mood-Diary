import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../providers/UserContext";
import Button from "../components/Button";

export default function Login() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
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
      const response = await axios.post(`${apiUrl}/api/user/login`, data);
      const token = response.data.token;
      localStorage.setItem('authToken', token); // Store the token
      refetch();
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      setError("An Error occurred, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-paleLilac p-6 rounded-lg mt-4 flex flex-col gap-3 w-2/3 max-w-md">
      <input name="email" type="email" placeholder="Your email" className="bg-primary p-4 rounded-lg" />
      <input name="password" type="password" placeholder="Your password" className="bg-primary p-4 rounded-lg"/>
      {error && <small style={{ color: "red" }}>{error}</small>}
      <Button size="big" variant="tertiary" type="submit">Login</Button>
    </form>
  );
}
