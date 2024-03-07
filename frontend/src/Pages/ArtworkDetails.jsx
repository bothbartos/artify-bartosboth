import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

async function fetchArtwork(id) {
  try {
    const response = await fetch(`/api/arts/${id}`);
    const artwork = await response.json();
    return artwork;
  } catch (error) {
    console.error
  }
}

function deleteHTMLTags(artwork){
 return artwork.description.replace(/<\/?[^>]+(>|$)/g, "")
}

export default function ArtworkDetails(){

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    fetchArtwork(id)
    .then((artwork) => {
      setArtwork(artwork);
      setLoading(false)
    })
  });

  if(loading){
    return (
      <div className="loading">
        <h1>LOADING...</h1>
      </div>
    )
  }

  return (
    <div className="artworkDetails">
      <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} alt="art"></img>
      <h3>Title: {artwork.title}</h3>
      <h3 onClick={()=> navigate(`/artist/${artwork.artist_title}`)}>Artist name: {artwork.artist_title}</h3>
      <p>{artwork.date_start === artwork.date_end ? artwork.date_start : `${artwork.date_start} - ${artwork.date_end}`}</p>
      <p>{artwork.description ? deleteHTMLTags(artwork) : "No description."}</p>
      <p onClick={() => navigate(`/medium/${artwork.medium_display}`)}>Artwork medium: {artwork.medium_display}</p>
      <p onClick={() => navigate(`/type/${artwork.artwork_type_title}`)}>Artwork type: {artwork.artwork_type_title}</p>
    </div>
  )
}