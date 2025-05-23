import { FiEdit, FiTrash } from "react-icons/fi";

import '../styles/BoardCard.css';


const BoardCard = ({ board, currentUser, onEdit, onDelete }) => {
    const isAuthor = board.author?.user_id === currentUser?.user_id;

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(board);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this board?")) {
      onDelete(board.board_id);
    }
  }

  return (
   <div
      className="board-card"
      onClick={() => window.location.href = `/boards/${board.board_id}`}
    >
      <div className="board-image">
        <img src={board.stickerUrl || '/placeholder.gif'} alt="Board sticker" />
      </div>
      <div className="board-content">
        <h3>{board.title || 'Untitled Board'}</h3>
        <p className="board-category">{board.category || 'Uncategorized'}</p>
        <p className="board-author">Created by: {board.author?.username || 'Unknown'}</p>
        <p className="board-date">
          {new Date(board.createdAt).toLocaleDateString()}
        </p>
      </div>

      {isAuthor && (
        <div className="card-actions">
          <FiEdit className="icon" onClick={handleEdit} />
          <FiTrash className="icon" onClick={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default BoardCard;
