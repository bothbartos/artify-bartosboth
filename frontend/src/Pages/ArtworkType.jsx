import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Artwork from "../components/Artwork";

async function fetchArtworks(type, currentPage){
  try {
    const response = await fetch(`/api/filteredSearch/${currentPage}?artwork_type_title=${type}`);
    const artworks = await response.json();
    return artworks;
  } catch (error) {
    console.error(error);
  }
}

export default function ArtworkType(){
  const [loading, setLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  const { type } = useParams();

  useEffect(()=> {
    fetchArtworks(type, currentPage)
    .then((artworks) => {
      setArtworks(artworks);
      console.log(artworks);
      setLoading(false);
    })
  }, [type, currentPage]);

  const hidePrevButton = (pageNumber) => {
		return pageNumber < 1;
	};

  const hideNextButton = () => {
    return artworks.length < 20
  }

  console.log(hideNextButton());


  if(loading){
    return(
      <div className="artworkDiv">
        <h1>LOADING...</h1>
      </div>
    )
  }

  return (
    <div className="artworkDiv">
      {artworks.results.map((artwork) => (
       <Artwork key={artwork._id} artwork={artwork}/>
      ))}
      <div className="paginatonButtons">
						<button
							onClick={() => setCurrentPage(currentPage - 1)}
							style={{ display: hidePrevButton(currentPage - 1) ? "none" : "inline" }}
						>
							Previous Page
						</button>
						<button
							onClick={() => setCurrentPage(currentPage + 1)}
							style={{ display: hideNextButton() ? "none" : "inline" }}
						>
							Next Page
						</button>
					</div>
    </div>
  )
}