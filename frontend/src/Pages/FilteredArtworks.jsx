import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Artwork from "../components/Artwork";

const fetchFiltered = async (
  currentPage,
  title,
  mediumDisplay,
  artistTitle
) => {
  const searchParams = new URLSearchParams({
    title,
    medium_display: mediumDisplay,
    artist_title: artistTitle,
  });

  console.log(searchParams.toString());

  const response = await fetch(
    `/api/filteredSearch/${currentPage}?${searchParams}`
  );
  const artworks = await response.json();
  return artworks;
};

const FilteredArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");
  const mediumDisplay = searchParams.get("medium_display");
  const artistTitle = searchParams.get("artist_title");

  useEffect(() => {
    async function fetchArtworks(
      currentPage,
      title,
      mediumDisplay,
      artistTitle
    ) {
      const artworks = await fetchFiltered(
        currentPage,
        title,
        mediumDisplay,
        artistTitle
      );
      setArtworks(artworks);
    }
    fetchArtworks(currentPage, title, mediumDisplay, artistTitle);
  }, [currentPage, title, mediumDisplay, artistTitle]);

  console.log(artworks);

  const hidePrevButton = (pageNumber) => {
    return pageNumber < 1;
  };

  const hideNextButton = () => {
    return artworks.length < 20;
  };

  return (
    <>
      <div className="artworkDiv">
        {artworks.map((artwork) => (
          <Artwork artwork={artwork} key={artwork._id} />
        ))}
      </div>
      <div className="paginatonButtons">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          style={{
            display: hidePrevButton(currentPage - 1) ? "none" : "inline",
          }}
        >
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{
            display: hideNextButton(currentPage + 1) ? "none" : "inline",
          }}
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default FilteredArtworks;
