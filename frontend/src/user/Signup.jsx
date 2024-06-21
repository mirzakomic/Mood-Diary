import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const isProd = process.env.NODE_ENV === "production";

export default function Signup() {
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/signup", data);

      if (isProd) {
        nav("/login");
      }
    } catch (e) {
      if (e?.response?.data?.error?.message) {
        setError(e?.response?.data?.error?.message);
      } else {
        setError("An Error occured, try again later");
      }
    }
  };

  return (
    <form onSubmit={submit} className="bg-paleLilac p-6 rounded-lg mt-4 flex flex-col max-w-2xl gap-3 w-2/3 max-w-md">
      <input name="name" type="text" placeholder="Your name" className="bg-primary p-4 rounded-lg" />
      <input name="email" type="text" placeholder="Your email" className="bg-primary p-4 rounded-lg" />
      <input name="password" type="password" placeholder="Choose a password" className="bg-primary p-4 rounded-lg" />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <Button size="big" variant="tertiary" type="submit">Sign up</Button>
    </form>
  );
}
