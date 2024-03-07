import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ManageUser from "../components/ManageUser";


export default function Layout(props) {
  const [searchedArtist, setSearchedArtist] = useState(undefined);
  const [dropdownSelection, setDropdownSelection] = useState(undefined)


  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/${dropdownSelection}/${searchedArtist}`)
  }

  return <div className="navBar">
    <h1>
    <Link style={{textDecoration: "none", color: "black"}}to={"/"}>ARTIFY</Link>
    </h1>
    <form onSubmit={handleSubmit}>
      <select name="" id="" onChange={(e)=>setDropdownSelection(e.target.value)}>
        <option value="" disabled selected>Select Search Filter</option>
        <option value="artist">Search by Artist</option>
        <option value="medium">Search by Medium</option>
        <option value="artwork">Search by Artwork Type</option>
      </select>
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
