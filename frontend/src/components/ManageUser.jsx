import NotLoggedIn from "./NotLoggedIn.jsx";


export default function ManageUser(props) {	
  const { user, logIn, logOut, createUser } = props;
  return <div className="login">
    <p>{user ? `Logged in as ${user.username}` : 'Not logged in'} </p>
    {user
    ?  <button onClick={logOut}>Log out</button>
    : <NotLoggedIn createUser={createUser} logIn={logIn}></NotLoggedIn>}
  </div>;
}
