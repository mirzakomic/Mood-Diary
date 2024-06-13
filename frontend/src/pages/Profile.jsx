import React, { useContext } from "react";
import { UserContext } from "../user/UserContext";

export default function Profile() {
  const { user, isLoggedIn } = useContext(UserContext);
  console.log("User:", user);

  return (
    <div>
      {isLoggedIn ? (
        user.email ? (
          <h1>Welcome, {user.name}!</h1>
        ) : (
          <h1>Welcome, user!</h1>
        )
      ) : (
        <h1>You are not logged in.</h1>
      )}
    </div>
  );
}