import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBoardById } from "../services/boardService"; // You need to create this
import '../styles/BoardDetails.css';

const BoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const data = await getBoardById(boardId);
        setBoard(data);
      } catch (error) {
        console.error("Failed to fetch board:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [boardId]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!board) return <p className="notfound-text">Board not found.</p>;

  return (
    <div className="board-detail-container">
      <h1 className="board-title">{board.title}</h1>
      <p className="board-category">Category: {board.category || "Uncategorized"}</p>
      <p className="board-author">Created by: {board.author?.username || "Unknown"}</p>
      <p className="board-date">
        Created on: {new Date(board.createdAt).toLocaleDateString()}
      </p>
      {/* Add more details or nested card list here */}
    </div>
  );
};

export default BoardDetail;

