import { useState } from "react";
import Artwork from "../components/Artwork";


const DisplayFavoritesPage = ({user}) => {
  const [artworks] = useState(user?.favorites);

  return (
    <div className="artworkDiv">
     { artworks.map((artwork)=>(
        <Artwork artwork={artwork} key={artwork._id}/>
  
      ))}
    </div>
  )
};

export default DisplayFavoritesPage;