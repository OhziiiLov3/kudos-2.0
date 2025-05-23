import { useState, useEffect } from "react";
import "../styles/Home.css";

import Header from "../components/Header";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import BoardList from "../components/BoardList";
import Footer from "../components/Footer";
import { getAllBoards } from "../services/boardService";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

//   const filteredBoards = boards.filter((board) =>
//     board.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  return (
    <div className="homepage">
      <Header />
      <Banner />
      {/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
      <BoardList boards={boards} />
      <Footer />
    </div>
  );
};

export default Home;
