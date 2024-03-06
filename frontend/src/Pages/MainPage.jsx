import { useEffect, useState } from "react";
import Artwork from "../components/Artwork";

async function fetchByTitle(title){
  try {
    const response = await fetch(`/api/title/${title}`);
    const filterByTitle = await response.json();
    return filterByTitle;
  } catch (error) {
    console.error(error);
  }
}

const MainPage = () => {
	const [artworks, setArtworks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [titleFilterInput, setTitleFilterInput] = useState("");

	useEffect(() => {
		const fetchArtworks = async () => {
			setLoading(true);
			try {
				const response = await fetch(`/api/pages/${currentPage}?pageSize=12`);
				const data = await response.json();
				setArtworks(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchArtworks();
	}, [currentPage]);

  useEffect(()=>{
    fetchByTitle(titleFilterInput)
    .then((artworks)=> {
      setFilteredArtworks(artworks)
    })
  })
  function handleChange(e){
    setTitleFilterInput(e.target.value)

  }
  console.log(filteredArtworks);
  console.log();


	const hideButton = (pageNumber) => {
		return pageNumber < 1 || pageNumber > 10;
	};

	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
          <input type="text" name="title" id="filterByTitle" placeholder="Search by Title" onChange={(e)=> handleChange(e)}/>
					{!filteredArtworks ? 
            artworks.map((artwork) => (
            <Artwork artwork={artwork} key={artwork._id}/>
            )):
          filteredArtworks.map((artwork)=>(
            <Artwork artwork={artwork} key={artwork._id}/>
          ))}
					<div>
						<button
							onClick={() => setCurrentPage(currentPage - 1)}
							style={{ display: hideButton(currentPage - 1) ? "none" : "inline" }}
						>
							Previous
						</button>
						<button
							onClick={() => setCurrentPage(currentPage + 1)}
							style={{ display: hideButton(currentPage + 1) ? "none" : "inline" }}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default MainPage;
