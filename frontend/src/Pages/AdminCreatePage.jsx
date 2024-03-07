import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreatePage = () => {
	const [artwork, setArtwork] = useState(null);
	const navigate = useNavigate();

	const handleChange = (fieldName, value) => {
		setArtwork({ ...artwork, [fieldName]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/arts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(artwork),
			});
			const createdArt = await response.json();
			console.log("Art created successfully: ", createdArt);
			navigate("/admin");
		} catch (error) {}
	};

	return (
		<>
			<div>
				<h1>Create Art:</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="artist_title">Artist Name: </label>
					<input
						type="text"
						name="artist_title"
						id="artist_title"
						onChange={(e) => handleChange("artist_title", e.target.value)}
					/>
					<br />

					<label htmlFor="title">Art Name: </label>
					<input type="text" name="title" id="title" onChange={(e) => handleChange("title", e.target.value)} />
					<br />

					<label htmlFor="date_start">Date Start: </label>
					<input
						type="text"
						name="date_start"
						id="date_start"
						onChange={(e) => handleChange("date_start", e.target.value)}
					/>
					<br />

					<label htmlFor="date_end">Date End: </label>
					<input type="text" name="date_end" id="date_end" onChange={(e) => handleChange("date_end", e.target.value)} />
					<br />

					<label htmlFor="medium_display">Medium: </label>
					<input
						type="text"
						name="medium_display"
						id="medium_display"
						onChange={(e) => handleChange("medium_display", e.target.value)}
					/>
					<br />

					<label htmlFor="image_id">Image Id: </label>
					<input type="text" name="image_id" id="image_id" onChange={(e) => handleChange("image_id", e.target.value)} />
					<br />

					<button type="submit">Create!</button>
				</form>
			</div>
		</>
	);
};

export default AdminCreatePage;
