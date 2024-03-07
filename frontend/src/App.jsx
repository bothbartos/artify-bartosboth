import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./Pages/MainPage";
import ArtworkDetails from "./Pages/ArtworkDetails";
import ArtistArtworks from "./Pages/ArtistArtworks";
import ArtworksByMedium from "./Pages/ArtworksByMedium";
import ArtworkType from "./Pages/ArtworkType";
import Layout from "./Pages/Layout";
import ManageUser from "./components/ManageUser";

export default function App() {
  const [user, setUser] = useState(null);

  async function logIn(username) {
    const res = await fetch(`/api/users/${username}`);
    const user = await res.json();
    if (!res.ok) throw {message: 'user not found'};
    setUser(user);
  }

  async function createUser(userData) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    const user = await res.json();
    if (!res.ok) throw {message: 'username already in use'};
    setUser(user);
  }

  async function logOut() {
    if (user === null) throw {message: 'already logged out'};
    setUser(null);
  }

  const routes = {
    "/": <MainPage/>,
    "/arts/:id/": <ArtworkDetails/>,
    "/artist/:name/": <ArtistArtworks/>,
    "/medium/:medium/": <ArtworksByMedium/>,
    "/type/:type/": <ArtworkType/>,
    "/login/": <ManageUser user={user} logIn={logIn} createUser={createUser} logOut={logOut}/>,
  }
  return <BrowserRouter>
    <Layout/>
    <Routes>
      {Object.entries(routes).map(([path, element]) => <Route key={path} exact path={path} element={element}/>)}
    </Routes>
  </BrowserRouter>
}