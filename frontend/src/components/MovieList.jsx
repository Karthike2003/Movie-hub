import { useState, useEffect } from 'react';
import moviesData from '../data/movies.json';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/MovieList.css';
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        setMovies(moviesData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderMovies = () => {
    if (isLoading) {
      return <p>Loading movies...</p>;
    }

    if (error) {
      return <p>Error fetching movies: {error.message}</p>;
    }

    return (
      <ul className="movie-grid">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <div className='movie-image-wrapper'>
              <img
                src={movie.banner_image}
                alt={movie.title} 
                className="movie-image"
              />
              <div className="favorite-icon"> 
                {/* <FontAwesomeIcon icon="fa-regular fa-heart" /> */}
              </div>  
            </div>
            <div className="movie-info">
              <p className='movie-year'>{movie.year}</p>
              <h2 className='movie-title'>{movie.title}</h2>
            </div>
            <div className='movie-genre'>{movie.genre}</div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {renderMovies()}
    </div>
  );
};

export default MovieList;
