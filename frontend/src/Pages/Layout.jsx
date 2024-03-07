import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";


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
  </div>
}
