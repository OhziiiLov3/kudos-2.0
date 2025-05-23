
import '../styles/BoardCard.css';


const BoardCard = ({ board }) => {
  return (
    <div
      className="board-card"
      onClick={() => window.location.href = `/boards/${board.board_id}`}
    >
      <div className="board-image">
        <img
          src={board.stickerUrl || '/placeholder.gif'}
          alt="Board sticker"
        />
      </div>
      <div className="board-content">
        <h3>{board.title || 'Untitled Board'}</h3>
        <p className="board-category">{board.category || 'Uncategorized'}</p>
        <p className="board-author">Created by: {board.author?.username || 'Unknown'}</p>
        <p className="board-date">
          {new Date(board.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BoardCard;
