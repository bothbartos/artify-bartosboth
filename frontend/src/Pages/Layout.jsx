import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ManageUser from "../components/ManageUser";


export default function Layout(props) {
  const [searchedArtist, setSearchedArtist] = useState(undefined);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/artist/${searchedArtist}`)
  }

  return <div className="navBar">
    <Link to={"/"}>ARTIFY</Link>
    <form onSubmit={handleSubmit}>
      <label>Search by Artist:</label>
      <input type="text" onChange={(e) => setSearchedArtist(e.target.value)}></input>
      <button>Search</button>
    </form>
    <ManageUser
      user={props.user}
      logIn={props.logIn}
      logOut={props.logOut}
      createUser={props.createUser}/>
  </div>
}
