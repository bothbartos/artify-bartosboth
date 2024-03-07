import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
	const [artworks, setArtworks] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

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
	
	useEffect(() => {
		fetchArtworks();
	}, []);

	const handleUpdate = (_id) => {
		navigate(`/arts/update/${_id}`);
	};

	const handleCreate = () => {
		navigate("/arts/create");
	};

	const handleDelete = async (id) => {
		try {
			const response = await fetch(`/api/arts/${id}`, {
				method: "DELETE",
			});
			const deletedArt = await response.json();
			console.log("(Art deleted successfully: ", deletedArt);
			fetchArtworks();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="adminPage">
			<nav>
				<h1>Admin Page</h1>
				<button onClick={handleCreate}>Add New Art</button>
			</nav>
			<table>
				<tbody>
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
									<button onClick={() => handleUpdate(artwork._id)}>Update 🆕</button>
									<button onClick={() => handleDelete(artwork._id)}>Delete 🗑️</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminPage;
