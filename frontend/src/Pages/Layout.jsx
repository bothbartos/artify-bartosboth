import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";


export default function Layout() {
  const [searchedArtist, setSearchedArtist] = useState(undefined);
  const [dropdownSelection, setDropdownSelection] = useState(undefined)


  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/${dropdownSelection}/${searchedArtist}`)
  }
console.log(dropdownSelection);
  return (
    <>
      <nav className="navBar">
        <ul>
          <h1>
            <Link to={"/"}>ARTIFY</Link>
          </h1>
          <form onSubmit={handleSubmit}>
            <select name="" id="" onChange={(e)=>setDropdownSelection(e.target.value)}>
              <option value="" disabled selected>Select Search Filter</option>
              <option value="artist">Search by Artist</option>
              <option value="medium">Search by Medium</option>
              <option value="artworktype">Search by Artwork</option>
            </select>
            <input type="text" onChange={(e) => setSearchedArtist(e.target.value)}></input>
            <button>Search</button>
          </form>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
