import { useEffect, useState } from "react";
import Artwork from "../components/Artwork";

const MainPage = () => {
	const [artworks, setArtworks] = useState({results: []});
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);


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


	const hideButton = (pageNumber) => {
		return pageNumber < 1 || pageNumber > 10;
	};
  console.log(artworks);
	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="artworkDiv">
					{artworks.results.map((artwork) => (
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
