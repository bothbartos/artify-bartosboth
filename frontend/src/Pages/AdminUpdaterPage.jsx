import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminUpdaterPage = () => {
	const [artwork, setArtwork] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

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
	}, [id]);

	const handleChange = (fieldName, value) => {
		setArtwork({ ...artwork, [fieldName]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/arts/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(artwork),
			});
			const updatedArt = await response.json();
			console.log("Art updated successfully: ", updatedArt);
			navigate("/admin");
		} catch (error) {
			console.log(error);
		}
	};

	console.log(artwork);

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
				<h1>Update Art:</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="artist_title">Artist Name: </label>
					<input
						type="text"
						name="artist_title"
						id="artist_title"
						value={artwork && artwork.artist_title}
						onChange={(e) => handleChange("artist_title", e.target.value)}
					/>
					<br />

					<label htmlFor="title">Art Name: </label>
					<input
						type="text"
						name="title"
						id="title"
						value={artwork && artwork.title}
						onChange={(e) => handleChange("title", e.target.value)}
					/>
					<br />

					<label htmlFor="date_start">Date Start: </label>
					<input
						type="text"
						name="date_start"
						id="date_start"
						value={artwork && artwork.date_start}
						onChange={(e) => handleChange("date_start", e.target.value)}
					/>
					<br />

					<label htmlFor="date_end">Date End: </label>
					<input
						type="text"
						name="date_end"
						id="date_end"
						value={artwork && artwork.date_end}
						onChange={(e) => handleChange("date_end", e.target.value)}
					/>
					<br />

					<label htmlFor="medium_display">Medium: </label>
					<input
						type="text"
						name="medium_display"
						id="medium_display"
						value={artwork && artwork.medium_display}
						onChange={(e) => handleChange("medium_display", e.target.value)}
					/>
					<br />

					<label htmlFor="image_id">Image Id: </label>
					<input
						type="text"
						name="image_id"
						id="image_id"
						value={artwork && artwork.image_id}
						onChange={(e) => handleChange("image_id", e.target.value)}
					/>
					<br />

					<button type="submit">Update!</button>
				</form>
			</div>
		</>
	);
};

export default AdminUpdaterPage;
