import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

async function fetchArtworks(name){
  try {
    const response = await fetch(`/api/artist/${name}`);
    const artworks = await response.json();
    return artworks;
  } catch (error) {
    console.error(error);
  }
}

export default function ArtistArtworks() {
  const [loading, setLoading] = useState(true);
  const [artistsArtworks, setArtistsArtworks] = useState([]);

  const { name } = useParams();

  useEffect(()=> {
    fetchArtworks(name)
    .then((artworks) => {
      setArtistsArtworks(artworks);
      setLoading(false);
    })
  })

  if(loading){
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    )
  }

  return (
    <div>
      {artistsArtworks.map((artwork) => (
        <h1 key={artwork._id}>{artwork.title}</h1>
      ))}
    </div>
  )

}