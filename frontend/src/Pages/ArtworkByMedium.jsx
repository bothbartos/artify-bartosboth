import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Artwork from "../components/Artwork";

async function getArtsByMedium(medium, currentPage){
  try {
    const response = await fetch(`/api/filteredSearch/${currentPage}?medium_display=${medium}`);
    const artworks = await response.json();
    return artworks;
  } catch (error) {
    console.error(error);
  }
}

function ArtworksByMedium(){
  const [artworksByMedium, setArtworkByMedium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


  const {medium} = useParams();

  useEffect(() => {
    getArtsByMedium(medium, currentPage).then((artworks) => {
      setArtworkByMedium(artworks);
      setLoading(false);
    })
  }, [medium, currentPage]);

  const hideButton = (pageNumber) => {
		return pageNumber < 1 || pageNumber > (Math.ceil(artworksByMedium.length /20));
	};

  if(loading){
    return <div>
      <h1>LOADING...</h1>
    </div>
  }

  return <div className="artworkDiv">
    {artworksByMedium.map((artwork) => 
      <Artwork key={artwork._id} artwork={artwork}></Artwork>
    )}
    <div className="paginatonButtons">
						<button
							onClick={() => setCurrentPage(currentPage - 1)}
							style={{ display: hideButton(currentPage - 1) ? "none" : "inline" }}
						>
							Previous Page
						</button>
						<button
							onClick={() => setCurrentPage(currentPage + 1)}
							style={{ display: hideButton(currentPage + 1) ? "none" : "inline" }}
						>
							Next Page
						</button>
					</div>
  </div>


}
export default ArtworksByMedium;