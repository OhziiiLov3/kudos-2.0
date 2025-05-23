import '../styles/BoardList.css';

const BoardList = ({ boards }) => {
  if (!boards.length) {
    return <p className="boardlist-empty">No boards found.</p>;
  }

  return (
    <div className="boardlist-container">
      {boards.map((board) => (
        <div
          key={board.id}
          className="boardlist-card"
          onClick={() => window.location.href = `/boards/${board.id}`}
        >
          <h3>{board.name}</h3>
          <p>{board.description || 'No description'}</p>
        </div>
      ))}
    </div>
  );
};

export default BoardList;