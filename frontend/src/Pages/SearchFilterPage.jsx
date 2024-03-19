import { useState, useEffect } from "react";
import Artwork from "../components/Artwork";
import FilteredSearchForm from "../components/FilteredSearchForm";

const fetchFiltered = async (url) => {
  const response = await fetch(url);
  const artworks = await response.json();
  return artworks;
};

const SearchFilterPage = () => {
  const [artworks, setArtworks] = useState([]);

  const [isTitleSearch, setIsTitleSearch] = useState(false);
  const [title, setTitle] = useState("");

  const [isMediumSearch, setIsMediumSearch] = useState(false);
  const [mediumDisplay, setMediumDisplay] = useState("");

  const [isArtistSearch, setIsArtistSearch] = useState(false);
  const [artistTitle, setArtistTitle] = useState("");

  const [isSearchForm, setIsSearchForm] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const searchParamsObj = {};
    if (isTitleSearch) searchParamsObj.title = title;
    if (isMediumSearch) searchParamsObj.medium_display = mediumDisplay;
    if (isArtistSearch) searchParamsObj.artist_title = artistTitle;
    const searchParams = new URLSearchParams(searchParamsObj).toString();


    const url = `/api/filteredSearch?${searchParams}`;
    const artworks = await fetchFiltered(url);
    setArtworks(artworks);
    setIsSearchForm(false)

  };
  console.log(mediumDisplay);
  console.log(artworks);

  return (
    isSearchForm ? (
     <FilteredSearchForm onSubmit={handleSubmit}
     isTitleSearch={isTitleSearch}
     setIsTitleSearch={setIsTitleSearch}
     isArtistSearch={isArtistSearch}
     setIsArtistSearch={setIsArtistSearch}
     isMediumSearch={isMediumSearch} setIsMediumSearch={setIsMediumSearch}
     title={title} setTitle={setTitle} setMediumDisplay={setMediumDisplay} artistTitle={artistTitle} setArtistTitle={setArtistTitle}/>
    ): (
    <div className="artworkDiv">
    {artworks.map((artwork) => (
        <Artwork artwork={artwork} key={artwork._id}/>
   ))}
      </div>)
  );
};

export default SearchFilterPage;