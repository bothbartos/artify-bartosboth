import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
	const [artworks, setArtworks] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchArtworks = async () => {
			setLoading(true);
			try {
				const response = await fetch("/api/arts");
				const data = await response.json();
				setArtworks(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchArtworks();
	}, []);

	const handleUpdate = (_id) => {
		navigate(`/arts/update/${_id}`);
	};

	const handleDelete = (_id) => {};

	return (
		<table>
			<tr>
				<th>Artist Name</th>
				<th>Art Name</th>
				<th>Date Start</th>
				<th>Date End</th>
				<th>Medium</th>
				<th>Image Id</th>
			</tr>
			{artworks &&
				artworks.map((artwork) => (
					<tr key={artwork._id}>
						<td>{artwork.artist_title}</td>
						<td>{artwork.title}</td>
						<td>{artwork.date_start}</td>
						<td>{artwork.date_end}</td>
						<td>{artwork.medium_display}</td>
						<td>{artwork.image_id}</td>
						<td>
							<button onClick={() => handleUpdate(artwork._id)}>Update</button>
							<button onClick={() => handleDelete(artwork._id)}>Delete</button>
						</td>
					</tr>
				))}
		</table>
	);
};

export default AdminPage;
