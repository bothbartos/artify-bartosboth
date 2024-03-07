import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Artwork from "../components/Artwork";

async function getArtsByMedium(medium){
  try {
    const response = await fetch(`/api/arts?medium=${medium}`);
    const artworks = await response.json();
    return artworks;
  } catch (error) {
    console.error(error);
  }
}

function ArtworksByMedium(){
  const [artworksByMedium, setArtworkByMedium] = useState(null);
  const [loading, setLoading] = useState(true);

  const {medium} = useParams();

  useEffect(() => {
    getArtsByMedium(medium).then((artworks) => {
      setArtworkByMedium(artworks);
      setLoading(false);
    })
  }, [medium]);

  if(loading){
    return <div>
      <h1>LOADING...</h1>
    </div>
  }

  return <div className="artworkDiv">
    {artworksByMedium.map((artwork) => 
      <Artwork key={artwork._id} artwork={artwork}></Artwork>
    )}
  </div>


}
export default ArtworksByMedium;