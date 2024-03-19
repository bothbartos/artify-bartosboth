import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Artwork from "../components/Artwork";

async function fetchArtworks(name){
  try {
    const response = await fetch(`/api/arts?search=${name}`);
    const artworks = await response.json();
    return artworks;
  } catch (error) {
    console.error(error);
  }
}

export default function SearchResults() {
  const [loading, setLoading] = useState(true);
  const [artistsArtworks, setArtistsArtworks] = useState([]);

  const { search } = useParams();
  console.log(search);

  useEffect(()=> {
    fetchArtworks(search)
    .then((artworks) => {
      setArtistsArtworks(artworks);
      setLoading(false);
    })
  }, [search])

  if(loading){
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    )
  }

  return (
    <div className="artworkDiv">
      {artistsArtworks.map((artwork) => (
       <Artwork key={artwork._id} artwork={artwork}/>
      ))}
    </div>
  )

}