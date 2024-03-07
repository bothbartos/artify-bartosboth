import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Artwork from "../components/Artwork";

async function fetchArtworks(name){
  try {
    const response = await fetch(`/api/arts?artist=${name}`);
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
  }, [name])

  if(loading){
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    )
  }

  return (
    <div className="artworksDiv">
      {artistsArtworks.map((artwork) => (
       <Artwork key={artwork._id} artwork={artwork}/>
      ))}
    </div>
  )

}