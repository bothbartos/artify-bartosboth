import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";


export default function Layout() {
  const [searchedArtist, setSearchedArtist] = useState(undefined);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/artist/${searchedArtist}`)
  }

  return (
    <div className="navDiv">
      <nav className="navBar">
        <ul>
          <li>
            <Link to={"/"}>ARTIFY</Link>
          </li>
          <form onSubmit={handleSubmit}>
            <label>Search by Artist:</label>
            <input type="text" onChange={(e) => setSearchedArtist(e.target.value)}></input>
            <button>Search</button>
          </form>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
