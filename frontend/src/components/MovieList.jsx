import { useEffect } from 'react';
import Movie from './Movie';
// import moviesData from '../data/movies.json';
import { fetchMovies } from '../Redux/moviesSlice';
import '../styles/MovieList.css';
import { useDispatch, useSelector } from 'react-redux';

function MovieList() {
  const dispatch = useDispatch();
  const { items: movies, isLoading, error } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="movie-list">
      {isLoading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p>Error fetching movies: {error}</p>
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
