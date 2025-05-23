import '../styles/BoardList.css';
import BoardCard from './BoardCard';

const BoardList = ({ boards, currentUser, onEdit, onDelete }) => {
  if (!boards.length) {
    return <p className="boardlist-empty">No boards found.</p>;
  }

  return (
    <div className="boardlist-container">
      {boards.map((board) => (
        <BoardCard key={board.board_id} board={board} currentUser={currentUser} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </div>
  );
};

export default BoardList;