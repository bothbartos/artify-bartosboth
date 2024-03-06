import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AdminUpdaterPage = () => {
	const [artwork, setArtwork] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchArtworkData = async (id) => {
			try {
				const response = await fetch(`/api/arts/${id}`);
				const data = await response.json();
				setArtwork(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchArtworkData(id);
	}, []);

	console.log(id);

	const handleSubmit = () => {};

  const handleOnChange = () => {
    
  }

	if (!artwork) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="artistName">Artist Name: </label>
					<input type="text" name="artistName" id="artistName" value={artwork && artwork.artist_title} />
					<br />

					<label htmlFor="artName">Art Name: </label>
					<input type="text" name="artName" id="artName" value={artwork && artwork.title} />
					<br />

					<label htmlFor="dateStart">Date Start: </label>
					<input type="text" name="dateStart" id="dateStart" value={artwork && artwork.date_start} />
					<br />

					<label htmlFor="dateEnd">Date End: </label>
					<input type="text" name="dateEnd" id="dateEnd" value={artwork && artwork.date_end} />
					<br />

					<label htmlFor="medium">Medium: </label>
					<input type="text" name="medium" id="medium" value={artwork && artwork.medium_display} />
					<br />

					<label htmlFor="imageId">Image Id: </label>
					<input type="text" name="imageId" id="imageId" value={artwork && artwork.image_id} />
					<br />

					<button type="submit">Submit!</button>
				</form>
			</div>
		</>
	);
};

export default AdminUpdaterPage;
