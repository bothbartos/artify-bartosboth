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
		<div>
			<h1>Artify</h1>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					{artworks.map((artwork) => (
						<div key={artwork._id}>
							<h2>{artwork.title}</h2>
						</div>
					))}
					<button
						onClick={() => setCurrentPage(currentPage - 1)}
						style={{ display: hideButton(currentPage - 1) ? "none" : "block" }}
					>
						Previous
					</button>
					<button
						onClick={() => setCurrentPage(currentPage + 1)}
						style={{ display: hideButton(currentPage + 1) ? "none" : "block" }}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default MainPage;
