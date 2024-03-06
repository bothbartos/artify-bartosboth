import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

async function getArtsByMedium(medium){
  try {
    const response = await fetch(`/api/medium/${medium}`);
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

  return <div>
    {artworksByMedium.map((artwork) => {
      return <h1 key={artwork._id}>{artwork.title}</h1>
    })}
  </div>


}
export default ArtworksByMedium;