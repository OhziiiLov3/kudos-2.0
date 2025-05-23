import { useState, useEffect } from "react";
import "../styles/Home.css";

import Header from "../components/Header";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import BoardList from "../components/BoardList";
import CreateBoardModal from "../components/CreateBoardModal";
import Footer from "../components/Footer";
import { getAllBoards, createBoard } from "../services/boardService";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="homepage">
      <Header onCreateBoardClick={() => setShowModal(true)} />
      <Banner />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BoardList boards={boards} />
      <Footer />
         {showModal && (
        <CreateBoardModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateBoard}
        />
      )}
    </div>
  );
};

export default Home;
