import { useState } from "react";
import { deleteCard, updateCard } from "../services/cardService";
import { FaTrash, FaThumbsUp, FaEdit } from "react-icons/fa";
import "../styles/Card.css";

const Card = ({ card, onCardDelete, onCardUpdate }) => {
  const [upvotes, setUpvotes] = useState(card.upvotes || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(card.message);
  const [editGifUrl, setEditGifUrl] = useState(card.gifUrl);
  const [gifQuery, setGifQuery] = useState("");
  const [gifResults, setGifResults] = useState([]);

  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

  const handleDelete = async () => {
    try {
      await deleteCard(card.card_id);
      onCardDelete(card.card_id);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleUpvote = async () => {
    try {
      const updated = await updateCard(card.card_id, {
        upvotes: upvotes + 1,
      });
      setUpvotes(updated.upvotes);
      onCardUpdate(updated);
    } catch (error) {
      console.error("Error upvoting card:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const updated = await updateCard(card.card_id, {
        message: editMessage,
        gifUrl: editGifUrl,
      });
      setIsEditing(false);
      onCardUpdate(updated);
    } catch (error) {
      console.error("Error editing card:", error);
    }
  };

  const searchGifs = async () => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifQuery}&limit=6`
      );
      const data = await res.json();
      setGifResults(data.data);
    } catch (err) {
      console.error("Giphy search failed:", err);
    }
  };

  return (
    <div className="card-tile">
      <img src={editGifUrl} alt="GIF" className="card-gif" />
      {isEditing ? (
        <div>
          <textarea
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            className="edit-textarea"
          />
          <input
            type="text"
            value={gifQuery}
            onChange={(e) => setGifQuery(e.target.value)}
            placeholder="Search GIFs"
          />
          <button onClick={searchGifs}>Search</button>
          <div className="gif-selection">
            {gifResults.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt="gif option"
                onClick={() => setEditGifUrl(gif.images.fixed_height.url)}
                className="gif-option"
              />
            ))}
          </div>
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <>
          <p>{card.message}</p>
          <div className="card-footer">
            <span>{upvotes} Upvotes</span>
            <div className="card-actions">
              <FaThumbsUp onClick={handleUpvote} />
              <FaEdit onClick={() => setIsEditing(true)} />
              <FaTrash onClick={handleDelete} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;

