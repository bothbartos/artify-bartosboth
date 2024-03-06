import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ArtworkDetails from "./Pages/ArtworkDetails.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Pages/MainPage.jsx";
import ArtistArtworks from "./Pages/ArtistArtworks.jsx";
import ArtworksByMedium from "./Pages/ArtworksByMedium.jsx";
import ArtworkType from "./Pages/ArtworkType.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import AdminUpdaterPage from "./Pages/AdminUpdaterPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
  {
    path: "/arts/:id",
    element: <ArtworkDetails />
  },
  {
    path: "/artist/:name",
    element: <ArtistArtworks />
  }, 
  { path: "/medium/:medium",
    element: <ArtworksByMedium />
  },
  {
    path: "/type/:type",
    element: <ArtworkType/>
  },
  {
    path: "/admin",
    element: <AdminPage />
  },
  {
    path: "/arts/update/:id",
    element: <AdminUpdaterPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
