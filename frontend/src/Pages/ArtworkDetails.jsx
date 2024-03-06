import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

async function fetchArtwork(id) {
  try {
    const response = await fetch(`/api/arts/${id}`);
    const artwork = await response.json();
    return artwork;
  } catch (error) {
    console.error
  }
}

function deleteParagraphTag(artwork){
 return artwork.description.slice(3,-5);
}

export default function ArtworkDetails(props){

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { artworkID } = useParams();
  //const artworkID = "65e82a4093503122cad10135"
  useEffect(()=>{
    fetchArtwork(artworkID)
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
      <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}></img>
      <h3>Title: {artwork.title}</h3>
      <h3>Artist name: {artwork.artist_title}</h3>
      <p>{artwork.date_start === artwork.date_end ? artwork.date_start : `${artwork.date_start} - ${artwork.date_end}`}</p>
      <p>{artwork.description ? deleteParagraphTag(artwork) : "No description."}</p>
      <p>Artwork medium: {artwork.medium_display}</p>
      <p>Artwork type: {artwork.artwork_type_title}</p>
    </div>
  )

}