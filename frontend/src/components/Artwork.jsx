import { useNavigate } from "react-router-dom";

const Artwork = ({ artwork }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/arts/${artwork._id}`)}
      className="artworkItem"
      data-content={
       ` ${artwork.title} by ${artwork.artist_title}`
      }
    >
      <div className="image-container">
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
          alt={artwork.title}
        />
        <h2>
          {artwork.title} by {artwork.artist_title}
        </h2>
      </div>
    </div>
  );
};

export default Artwork;
