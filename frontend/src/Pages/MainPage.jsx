import { useEffect, useState } from "react";

const MainPage = () => {
	const [artworks, setArtworks] = useState([]);
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

	return (
		<>
			<h1>Artify</h1>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					{artworks.map((artwork) => (
						<div key={artwork._id}>
							<h2>
								{artwork.title} by {artwork.artist_title}
							</h2>
							<img
								src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
								alt={artwork.title}
							/>
						</div>
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
