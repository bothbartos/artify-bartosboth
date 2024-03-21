import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ArtworkDetails from "./Pages/ArtworkDetails";
import Layout from "./Pages/Layout";
import AdminPage from "./Pages/AdminPage";
import AdminUpdaterPage from "./Pages/AdminUpdaterPage";
import AdminCreatePage from "./Pages/AdminCreatePage";
import SearchResults from "./Pages/SearchResults";
import SearchFilterPage from "./Pages/SearchFilterPage";
import ArtistArtworks from "./Pages/ArtistArtworks";
import ArtworkType from "./Pages/ArtworkType";
import ArtworksByMedium from "./Pages/ArtworkByMedium";
import FilteredArtworks from "./Pages/FilteredArtworks";
import DisplayFavoritesPage from "./Pages/DisplayFavoritesPage";

export default function App() {
  const [user, setUser] = useState(null);

  async function logIn(username) {
    if (username == "") throw { message: "Please enter your username" };
    const res = await fetch(`/api/users/${username}`);
    const user = await res.json();
    if (!res.ok) throw { message: "User not found" };
    setUser(user);
  }

  async function createUser(userData) {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const user = await res.json();
    if (!res.ok) throw { message: "Username already in use" };
    setUser(user);
  }

  async function logOut() {
    if (user === null) throw { message: "Already logged out" };
    setUser(null);
  }

  async function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  return (
    <BrowserRouter>
      <Layout user={user} logIn={logIn} logOut={logOut} createUser={createUser} />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route
          exact
          path="/arts/:id/"
          element={<ArtworkDetails user={user} updateUser={updateUser} />}
        />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/arts/update/:id" element={<AdminUpdaterPage />} />
        <Route exact path="/arts/create" element={<AdminCreatePage />} />
        <Route exact path="/search/:search" element={<SearchResults />} />
        <Route exact path="/filterSearch/" element={<SearchFilterPage />} />
        <Route exact path="/artist/:name" element={<ArtistArtworks/>}/>
      <Route exact path="/artwork_type/:type" element={<ArtworkType/>}/>
      <Route exact path="/medium/:medium" element={<ArtworksByMedium/>}/>
      <Route exact path="/filtered" element={<FilteredArtworks/>}/>
      <Route exact path="/favorites" element={<DisplayFavoritesPage user={user}/>}/>
    </Routes>
    </BrowserRouter>
  );
}
