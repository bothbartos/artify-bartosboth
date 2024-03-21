import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ManageUser from "../components/ManageUser";


export default function Layout(props) {
  const [searchedArtist, setSearchedArtist] = useState(undefined);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${searchedArtist}`)
  }

  return <div className="navBar">
    <h1>
    <Link style={{textDecoration: "none", color: "black"}}to={"/"}>ARTIFY</Link>
    </h1>
    <form onSubmit={handleSubmit}>

      <input type="text" onChange={(e) => setSearchedArtist(e.target.value)} ></input>
      <button disabled={searchedArtist === undefined}>Search</button>
    </form>
    <button type="button" onClick={()=> navigate("/filterSearch")}>Filtered Search</button>
    <ManageUser
      user={props.user}
      logIn={props.logIn}
      logOut={props.logOut}
      createUser={props.createUser}/>
  </div>
}
