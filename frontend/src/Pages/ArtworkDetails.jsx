import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "../components/Comments";

async function fetchArtwork(id) {
  try {
    const response = await fetch(`/api/arts/${id}`);
    const artwork = await response.json();
    return artwork;
  } catch (error) {
    console.error;
  }
}

async function postSavedArtwork(userId, artworkId){
  try {
    const response = await fetch(`/api/users/${userId}/favorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ artworkId }),
    })
    const postedId = await response.json()
    return postedId;
  } catch (error) {
    console.error(error);
  }
}

function deleteHTMLTags(artwork) {
  return artwork.description.replace(/<\/?[^>]+(>|$)/g, "");
}



export default function ArtworkDetails({user}) {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      fetchArtwork(id).then((artwork) => {
        setArtwork(artwork);
        setLoading(false);
      });
    }
  }, [id, loading]);

  function handleSave(artworkId){
    if(user){
      postSavedArtwork(user._id, artworkId).then(() => alert('added to favorites'));
    } else {
      alert("Please log in to save an artwork!")
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
        <h3 onClick={() => navigate(`/artist/${artwork.artist_title}`)} style={{cursor:"pointer"}}>
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
        <p onClick={() => navigate(`/medium/${artwork.medium_display}`)} style={{cursor: "pointer"}}>
          Artwork medium: {artwork.medium_display}
        </p>
        <p onClick={() => navigate(`/artwork/${artwork.artwork_type_title}`)} style={{cursor: "pointer"}}>
          Artwork type: {artwork.artwork_type_title}
        </p>
        <button type="button" onClick={() => handleSave(artwork._id)}>Save to favorites</button>
      </div>
      <Comments userId={user?._id} artwork={artwork} refresh={() => setLoading(true)}></Comments>
    </div>
  );
}
