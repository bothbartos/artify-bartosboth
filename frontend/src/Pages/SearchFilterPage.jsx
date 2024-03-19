import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const fetchFiltered = async (url) => {
  const response = await fetch(url);
  const artworks = await response.json();
  return artworks;
};

const SearchFilterPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [isTitleSearch, setIsTitleSearch] = useState(false);
  const [isMediumSearch, setIsMediumSearch] = useState(false);
  const [isArtistSearch, setIsArtistSearch] = useState(false);
  const [title, setTitle] = useState("");
  const [mediumDisplay, setMediumDisplay] = useState("");
  const [artistTitle, setArtistTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const searchParamsObj = {};
    if (isTitleSearch) searchParamsObj.title = title;
    if (isMediumSearch) searchParamsObj.medium_display = mediumDisplay;
    if (isArtistSearch) searchParamsObj.artist_title = artistTitle;
    const searchParams = new URLSearchParams(searchParamsObj).toString();


    const url = `/api/filteredSearch?${searchParams}`;
    const artworks = await fetchFiltered(url)
    setArtworks(artworks);
    console.log(artworks);

  };

  return (
    <div className="artworkDiv">
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="title">Title:</label>
        <input
          type="checkbox"
          name="title"
          id="title"
          value={isTitleSearch}
          onChange={() => setIsTitleSearch(!isTitleSearch)}
        />
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="medium_display">Medium:</label>
        <input
          type="checkbox"
          name="medium_display"
          id="medium_display"
          value={isMediumSearch}
          onChange={() => setIsMediumSearch(!isMediumSearch)}
        />
        <input
          type="text"
          name="medium_display"
          id="medium_display"
          value={mediumDisplay}
          onChange={(e) => setMediumDisplay(e.target.value)}
        />
        <label htmlFor="artist_title">Artist name:</label>
        <input
          type="checkbox"
          name="artist_title"
          id="artist_title"
          value={isArtistSearch}
          onChange={() => setIsArtistSearch(!isArtistSearch)}
        />
        <input
          type="text"
          name="artist_title"
          id="artist_title"
          value={artistTitle}
          onChange={(e) => setArtistTitle(e.target.value)}
        />
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
};

export default SearchFilterPage