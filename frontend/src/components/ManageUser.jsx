import { useState } from "react";
import NotLoggedInPage from "./NotLoggedIn.jsx";

export default function ManageUser() {
  const [user, setUser] = useState(null);

  async function logInAsUser(username) {
    const res = await fetch(`/api/users/${username}`);
    const user = await res.json();
    if (!res.ok) throw {message: 'user not found'};
    setUser(user);
  }

  async function createUser(userData) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    const user = await res.json();
    if (!res.ok) throw {message: 'username already in use'};
    setUser(user);
  }

	return <>
      <p>{user ? `logged in as ${user.username}` : 'not logged in'} </p>
      {user
      ?  <button onClick={() => setUser(null)}>Log out</button>
      : <NotLoggedInPage createUser={createUser} logInAsUser={logInAsUser}></NotLoggedInPage>}
		</>;
}
