import { useState, useEffect } from 'react';
import Movie from './Movie';
import moviesData from '../data/movies.json';
import '../styles/MovieList.css';

function MovieList() {
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

  return (
    <div className="movie-list">
      {isLoading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p hidden>Error fetching movies: {error.message}</p>
      ) : (
        <ul className="movie-grid">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
