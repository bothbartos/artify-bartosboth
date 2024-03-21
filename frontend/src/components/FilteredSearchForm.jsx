import { useState } from "react";

const FilteredSearchForm = ({ onSubmit }) => {
  
  const [title, setTitle] = useState("");
  const [mediumDisplay, setMediumDisplay] = useState("");
  const [artistTitle, setArtistTitle] = useState("");

  return (
    <div className="filterFormDiv">
      <form onSubmit={(e) => onSubmit( e,
    title,
    mediumDisplay,
    artistTitle)}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="medium_display">Medium:</label>
        <input
          type="text"
          name="medium_display"
          id="medium_display"
          value={mediumDisplay}
          onChange={(e) => setMediumDisplay(e.target.value)}
        />
        <label htmlFor="artist_title">Artist name:</label>
        <input
          type="text"
          name="artist_title"
          id="artist_title"
          value={artistTitle}
          onChange={(e) => setArtistTitle(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FilteredSearchForm;
