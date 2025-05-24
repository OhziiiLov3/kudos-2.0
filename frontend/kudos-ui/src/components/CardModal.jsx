import { useState } from "react";
import "../styles/CardModal.css"; // We’ll define basic styles here

const CardModal = ({ show, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [gifQuery, setGifQuery] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState("");

   const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

  const fetchGifs = async () => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifQuery}&limit=6`
      );
      const data = await res.json();
      setGifResults(data.data);
    } catch (err) {
      console.error("Failed to fetch GIFs:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !message || !selectedGif) return alert("Fill all required fields.");
    onCreate({
      title,
      message,
      gifUrl: selectedGif,
    });
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Card</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Message *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="gif-search-section">
            <input
              placeholder="Search Giphy *"
              value={gifQuery}
              onChange={(e) => setGifQuery(e.target.value)}
            />
            <button type="button" onClick={fetchGifs}>
              Search
            </button>
          </div>
          <div className="gif-grid">
            {gifResults.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt="gif"
                className={selectedGif === gif.images.fixed_height.url ? "selected" : ""}
                onClick={() => setSelectedGif(gif.images.fixed_height.url)}
              />
            ))}
          </div>
          {selectedGif && (
            <div className="selected-preview">
              <p>Selected GIF:</p>
              <img src={selectedGif} alt="selected gif" />
            </div>
          )}
          <div className="modal-actions">
            <button type="submit">Create Card</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardModal;
