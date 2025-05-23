
import '../styles/SearchBar.css'


const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return(
        <div className="searchbar-container">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search boards..."
      className="searchbar-input"
    />
  </div>
  )
}
 
export default SearchBar;