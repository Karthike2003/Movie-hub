
import { LuSearch } from "react-icons/lu";
import { BiMoviePlay } from "react-icons/bi";
import { IoMdHeart } from "react-icons/io";
import Movie from './Movie';
import '../styles/Navbar.css';
import '../styles/MovieList.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, fetchMovies } from '../Redux/searchSlice';

function Navbar() {
  const dispatch = useDispatch();
  const { searchQuery, searchResults, isLoading, error } = useSelector((state) => state.search);

  const handleInputChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(fetchMovies(searchQuery));
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-logo">
          <div className="navbar-left-logo-icon">
            <BiMoviePlay className="icon" />
          </div>
          <div className="navbar-left-logo-text">
            MOVIEHUB
          </div>
        </div>
        <div className="search-container">
          <div className="search-input-container">
            <div className="search-icon">
              <LuSearch />
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search movies and series"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-icon">
          <IoMdHeart className="heart" />
        </div>
        <div className="navbar-right-text">My Favourites</div>
      </div>
      <div className="search-results">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : searchResults.length > 0 ? (
          <ul className="movie-grid">
            {searchResults.map((result) => (
              <Movie key={result.id} movie={result} className="movie-card" />
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
