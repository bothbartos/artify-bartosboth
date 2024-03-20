import { useState, useEffect } from "react";
import Artwork from "../components/Artwork";


const DisplayFavoritesPage = ({user}) => {
  const [artworks, setArtworks] = useState(user?.favorites);

  return (
    <div className="artworkDiv">
     { artworks.map((artwork)=>(
        <Artwork artwork={artwork} key={artwork._id}/>
  
      ))}
    </div>
  )
};

export default DisplayFavoritesPage;