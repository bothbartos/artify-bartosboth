import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ArtworkDetails from "./Pages/ArtworkDetails.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Pages/MainPage.jsx";
import ArtistArtworks from "./Pages/ArtistArtworks.jsx";
import ArtworksByMedium from "./Pages/ArtworksByMedium.jsx";

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
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
