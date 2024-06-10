import { useState} from 'react';
import { LuSearch } from "react-icons/lu";
import { BiMoviePlay } from "react-icons/bi";

import { IoMdHeart } from "react-icons/io";
import Movie from './Movie';
import '../styles/Navbar.css';
import '../styles/MovieList.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const transformAPIData = (apiData) => {
    return apiData.map((item) => ({
      id: item.imdbID,
      banner_image: item.Poster,
      title: item.Title,
      year: item.Year,
      genre: item.Type === 'series' ? 'Series' : 'Movie', // Example transformation
      // Add more transformations as needed
    }));
  };
  
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?apikey=2f6af18e&s=${searchQuery}`);
      const data = await response.json();
      if (data.Response === 'True') {
        const transformedData = transformAPIData(data.Search);
        setSearchResults(transformedData);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
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
          <IoMdHeart  className="heart" />
        </div>
        <div className="navbar-right-text">My Favorites</div>
      </div>
      <div className="search-results">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p >Error: {error.message}</p>
        ) : searchResults.length > 0 ? (
          console.log("searchResults.....",searchResults),
          <ul className="movie-grid">
             
            {searchResults.map((result) => (
              <Movie key={result.imdbID} movie={result} className="movie-card" />
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
