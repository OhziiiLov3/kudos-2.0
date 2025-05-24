import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
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
   <Link to={`/boards/${board.board_id}`} className="board-card-link">
      <div className="board-card">
        <div className="board-image">
          <img src={board.stickerUrl || "/placeholder.gif"} alt="Board sticker" />
        </div>
        <div className="board-content">
          <h3>{board.title || "Untitled Board"}</h3>
          <p className="board-category">{board.category || "Uncategorized"}</p>
          <p className="board-author">Created by: {board.author?.username || "Unknown"}</p>
          <p className="board-date">{new Date(board.createdAt).toLocaleDateString()}</p>
        </div>
        {board.author?.user_id === currentUser?.user_id && (
          <div className="card-actions">
            <FiEdit
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(board);
              }}
            />
            <FiTrash
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm("Are you sure you want to delete this board?")) {
                  onDelete(board.board_id);
                }
              }}
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default BoardCard;
