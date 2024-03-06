import NotLoggedInPage from "./NotLoggedIn.jsx";

export default function ManageUser(props) {	
  const { user, logIn, logOut, createUser } = props;
  return <>
    <p>{user ? `logged in as ${user.username}` : 'not logged in'} </p>
    {user
    ?  <button onClick={logOut}>Log out</button>
    : <NotLoggedInPage createUser={createUser} logIn={logIn}></NotLoggedInPage>}
  </>;
}
