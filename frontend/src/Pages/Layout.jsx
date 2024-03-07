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
    <Link to={"/"}>ARTIFY</Link>
    <form onSubmit={handleSubmit}>
      <select name="" id="" defaultValue="" onChange={(e)=>setDropdownSelection(e.target.value)}>
        <option value="" disabled>Select Search Filter</option>
        <option value="artist">Search by Artist</option>
        <option value="medium">Search by Medium</option>
        <option value="artworktype">Search by Artwork</option>
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
