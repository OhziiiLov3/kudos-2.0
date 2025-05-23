import '../styles/BoardList.css';
import BoardCard from './BoardCard';

const BoardList = ({ boards }) => {
  if (!boards.length) {
    return <p className="boardlist-empty">No boards found.</p>;
  }

  return (
    <div className="boardlist-container">
      {boards.map((board) => (
        <BoardCard key={board.board_id} board={board} />
      ))}
    </div>
  );
};

export default BoardList;