import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

async function fetchArtwork(id) {
  try {
    const response = await fetch(`/api/arts/${id}`);
    const artwork = await response.json();
    return artwork;
  } catch (error) {
    console.error;
  }
}

async function postSavedArtwork(url, artworkId) {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ artworkId }),
    });
    const postedId = await response.json();
    return postedId;
  } catch (error) {
    console.error(error);
  }
}

function deleteHTMLTags(artwork) {
  return artwork.description.replace(/<\/?[^>]+(>|$)/g, "");
}

export default function ArtworkDetails({ user, updateUser }) {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Save to favorites");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtwork(id).then((artwork) => {
      setArtwork(artwork);
      if (user) {
        const favorites = user.favorites.map((favorite) => {
          return favorite._id;
        });
        setButtonText(
          favorites.includes(artwork._id) ? "Saved" : "Save to favorites"
        );
      } else {
        setButtonText("Save to favorites");
      }
      setLoading(false);
    });
  }, [id, user]);

  function handleSave(artworkId) {
    if (user) {
      if (buttonText === "Save to favorites") {
        postSavedArtwork(`/api/users/${user._id}/favorite`, artworkId).then(
          (res) => updateUser(res)
        );
        setButtonText("Saved");
      } else {
        postSavedArtwork(
          `/api/users/${user._id}/deleteFavorite`,
          artworkId
        ).then((res) => updateUser(res));
        setButtonText("Saved");
      }
    } else {
      alert("Please log in to save an artwork!");
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <h1>LOADING...</h1>
      </div>
    );
  }

  return (
    <div className="artworkDetails">
      <img
        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
        alt="art"
      ></img>
      <div className="details">
        <h3>Title: {artwork.title ? artwork.title : "No title"}</h3>
        <h3
          onClick={() => navigate(`/artist/${artwork.artist_title}`)}
          style={{ cursor: "pointer" }}
        >
          Artist name: {artwork.artist_title ? artwork.artist_title : "Unknown"}
        </h3>
        <p>
          {artwork.date_start === artwork.date_end
            ? artwork.date_start
            : `${artwork.date_start} - ${artwork.date_end}`}
        </p>
        <p>
          {artwork.description ? deleteHTMLTags(artwork) : "No description."}
        </p>
        <p
          onClick={() => navigate(`/medium/${artwork.medium_display}`)}
          style={{ cursor: "pointer" }}
        >
          Artwork medium: {artwork.medium_display}
        </p>
        <p
          onClick={() =>
            navigate(`/artwork_type/${artwork.artwork_type_title}`)
          }
          style={{ cursor: "pointer" }}
        >
          Artwork type: {artwork.artwork_type_title}
        </p>
        <button type="button" onClick={() => handleSave(artwork._id)}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
