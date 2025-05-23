import { useState } from "react";
import "../styles/Modal.css";


const EditBoardModal = ({ board, onClose, onUpdate }) => {
  const [title, setTitle] = useState(board.title);
  const [category, setCategory] = useState(board.category || "");
  const [stickerUrl, setStickerUrl] = useState(board.stickerUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...board,
      title,
      category,
      stickerUrl,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Board</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Board Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            value={category}
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            value={stickerUrl}
            placeholder="Sticker URL"
            onChange={(e) => setStickerUrl(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBoardModal;

