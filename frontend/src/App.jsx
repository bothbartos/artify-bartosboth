import { useAppContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ArtworkDetails from "./Pages/ArtworkDetails";
import ArtistArtworks from "./Pages/ArtistArtworks";
import ArtworksByMedium from "./Pages/ArtworksByMedium";
import ArtworkType from "./Pages/ArtworkType";
import Layout from "./Pages/Layout";
import AdminPage from "./Pages/AdminPage";
import AdminUpdaterPage from "./Pages/AdminUpdaterPage";
import AdminCreatePage from "./Pages/AdminCreatePage";

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

  async function updateUser(updatedUser){
    setUser(updatedUser);
  }

  return (
    <BrowserRouter>
      <Layout user={user} logIn={logIn} logOut={logOut} createUser={createUser} />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/arts/:id/" element={<ArtworkDetails user={user} updateUser={updateUser}/>} />
        <Route exact path="/artist/:name/" element={<ArtistArtworks />} />
        <Route exact path="/medium/:medium/" element={<ArtworksByMedium />} />
        <Route exact path="/artwork/:type/" element={<ArtworkType />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/arts/update/:id" element={<AdminUpdaterPage />} />
        <Route exact path="/arts/create" element={<AdminCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
