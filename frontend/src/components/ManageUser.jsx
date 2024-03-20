import NotLoggedIn from "./NotLoggedIn.jsx";
import { useNavigate } from "react-router-dom";

export default function ManageUser(props) {
  const { user, logIn, logOut, createUser } = props;

  const navigate = useNavigate();

  return (
    <div className="login">
      <p>{user ? `Logged in as ${user.username}` : "Not logged in"} </p>
      {user ? (
        <>
          <button onClick={logOut}>Log out</button>
          <button type="button" onClick={()=> navigate("/favorites")}>Favorites</button>
        </>
      ) : (
        <NotLoggedIn createUser={createUser} logIn={logIn}></NotLoggedIn>
      )}
    </div>
  );
}
