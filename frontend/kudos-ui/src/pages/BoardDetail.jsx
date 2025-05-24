import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBoardById } from "../services/boardService";
import { getCardsByBoardId } from "../services/cardService";
import { createCard } from "../services/cardService";
import "../styles/BoardDetails.css";
import Card from "../components/Card";
import CardModal from "../components/CardModal";

const BoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBoardAndCards = async () => {
      try {
        const fetchedBoard = await getBoardById(boardId);
        const fetchedCards = await getCardsByBoardId(boardId);
        setBoard(fetchedBoard);
        setCards(fetchedCards);
      } catch (error) {
        console.error("Failed to fetch board or cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoardAndCards();
  }, [boardId]);

  if (loading) return <p>Loading...</p>;
  if (!board) return <p>Board not found.</p>;

  const handleCreateCard = async (cardData) => {
    try {
      const newCard = await createCard({
        ...cardData,
        board_id: board.board_id,
      });
      setCards((prev) => [...prev, newCard]);
      setShowModal(false);
    } catch (err) {
      console.error("Error creating card:", err);
    }
  };

  return (
    <div className="board-detail-container">
      <h1>{board.title}</h1>
      <p className="board-category">Category: {board.category}</p>
      <p className="board-author">Created by: {board.author?.username}</p>

      <div className="board-cards-section">
        <button onClick={() => setShowModal(true)} className="create-card-btn">
          ➕ New Card
        </button>
        <CardModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateCard}
        />
        {cards.length ? (
          <div className="card-grid">
            {cards.map((card) => (
              <Card
                key={card.card_id}
                card={card}
                onCardDelete={(deletedId) =>
                  setCards((prev) =>
                    prev.filter((c) => c.card_id !== deletedId)
                  )
                }
                onCardUpdate={(updatedCard) =>
                  setCards((prev) =>
                    prev.map((c) =>
                      c.card_id === updatedCard.card_id ? updatedCard : c
                    )
                  )
                }
              />
            ))}
          </div>
        ) : (
          <p>No cards found for this board.</p>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
