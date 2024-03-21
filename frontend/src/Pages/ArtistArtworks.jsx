import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Artwork from "../components/Artwork";

async function fetchArtworks(name, currentPage){
  try {
    const response = await fetch(`/api/filteredSearch/${currentPage}?artist_title=${name}`);
    const artworks = await response.json();
    return artworks;
  } catch (error) {
    console.error(error);
  }
}

export default function ArtistArtworks() {
  const [loading, setLoading] = useState(true);
  const [artistsArtworks, setArtistsArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  const { name } = useParams();

  useEffect(()=> {
    fetchArtworks(name, currentPage)
    .then((artworks) => {
      setArtistsArtworks(artworks);
      setLoading(false);
    })
  }, [name, currentPage])

  console.log(Math.ceil(artistsArtworks.length /20));

  const hideButton = (pageNumber) => {
		return pageNumber < 1 || pageNumber > (Math.ceil(artistsArtworks.length /20));
    
	};

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
  )

}