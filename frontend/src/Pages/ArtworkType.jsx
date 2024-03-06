import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Artwork from "../components/Artwork";

async function fetchArtworks(type){
  try {
    const response = await fetch(`/api/artworktype/${type}`);
    const artworks = await response.json();
    return artworks;
  } catch (error) {
    console.error(error);
  }
}

export default function ArtworkType(){
  const [loading, setLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);

  const { type } = useParams();

  useEffect(()=> {
    fetchArtworks(type)
    .then((artworks) => {
      setArtworks(artworks);
      setLoading(false);
    })
  });

  if(loading){
    return(
      <div>
        <h1>LOADING...</h1>
      </div>
    )
  }

  return (
    <div>
      {artworks.map((artwork) => (
       <Artwork key={artwork._id} artwork={artwork}/>
      ))}
    </div>
  )
}