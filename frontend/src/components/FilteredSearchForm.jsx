const FilteredSearchForm = ({
  onSubmit,
  isTitleSearch,
  setIsTitleSearch,
  isArtistSearch,
  setIsArtistSearch,
  isMediumSearch, setIsMediumSearch,
  title, setTitle, mediumDisplay, setMediumDisplay, artistTitle, setArtistTitle
}) => {
  return (
    <div className="artworkDiv">
      <form onSubmit={(e) => onSubmit(e)}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FilteredSearchForm;