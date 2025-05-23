import { useState, useEffect } from "react";
import "../styles/Home.css";

import Header from "../components/Header";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import BoardList from "../components/BoardList";
import CreateBoardModal from "../components/CreateBoardModal";
import EditBoardModal from "../components/EditBoardModal";
import Footer from "../components/Footer";

import {
  getAllBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} from "../services/boardService";

const categories = ["All", "Recent", "Celebration", "Thank you", "Inspiration"];

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editBoard, setEditBoard] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getAllBoards();
        setBoards(data);
      } catch (error) {
        console.error("Failed to fetch boards:", error);
      }
    };
    fetchBoards();
  }, []);

  const handleCreateBoard = async (boardData) => {
    try {
      const newBoard = await createBoard(boardData);
      setBoards((prev) => [...prev, newBoard]);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      setBoards((prev) => prev.filter((b) => b.board_id !== boardId));
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  const handleUpdateBoard = async (boardData) => {
    try {
      const updatedBoard = await updateBoard(boardData.board_id, boardData);
      setBoards((prev) =>
        prev.map((b) => (b.board_id === updatedBoard.board_id ? updatedBoard : b))
      );
      setEditBoard(null);
    } catch (error) {
      console.error("Failed to update board:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

const filteredBoards = boards.filter((board) => {
  const category = (board.category || "").trim().toLowerCase();
  const selected = selectedCategory.trim().toLowerCase();

  if (
    selected !== "all" &&
    selected !== "recent" &&
    category !== selected
  ) {
    return false;
  }

  if (searchTerm.trim() !== "") {
    return board.title.toLowerCase().includes(searchTerm.toLowerCase());
  }

  return true;
});


  const displayedBoards =
    selectedCategory === "Recent"
      ? [...boards]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6)
      : filteredBoards;

  return (
    <div className="homepage">
      <Header onCreateBoardClick={() => setShowModal(true)} />
      <Banner />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <BoardList
        boards={displayedBoards}
        currentUser={user}
        onEdit={(board) => setEditBoard(board)}
        onDelete={handleDeleteBoard}
      />

      <Footer />

      {showModal && (
        <CreateBoardModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateBoard}
        />
      )}

      {editBoard && (
        <EditBoardModal
          board={editBoard}
          onClose={() => setEditBoard(null)}
          onUpdate={handleUpdateBoard}
        />
      )}
    </div>
  );
};

export default Home;

