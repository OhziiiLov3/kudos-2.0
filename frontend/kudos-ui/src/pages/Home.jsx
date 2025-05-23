import { useState, useEffect} from "react";
import "../styles/Home.css";

import Header from "../components/Header";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import BoardList from "../components/BoardList";
import Footer from "../components/Footer";

const Home = () => {
const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



    useEffect(() => {
    const fetchBoards = async () => {
      const data = [
        { id: '1', name: 'Project Alpha', description: 'Team collaboration board' },
        { id: '2', name: 'Personal', description: 'My personal boards' },
        { id: '3', name: 'Kudos Team', description: 'Official team boards' },
      ];
      setBoards(data);
    };
    fetchBoards();
  }, []);


    const filteredBoards = boards.filter(board =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage">
      <Header />
      <Banner />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BoardList boards={filteredBoards} />
      <Footer />
    </div>
  );
};

export default Home;
