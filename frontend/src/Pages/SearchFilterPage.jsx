import { useNavigate } from "react-router-dom";
import FilteredSearchForm from "../components/FilteredSearchForm";

const SearchFilterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e, title, mediumDisplay, artistTitle) => {
    e.preventDefault();

    navigate(
      `/filtered?title=${title}&medium_display=${mediumDisplay}&artist_title=${artistTitle}`
    );
  };

  return <FilteredSearchForm onSubmit={handleSubmit} />;
};

export default SearchFilterPage;
