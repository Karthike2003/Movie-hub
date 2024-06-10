
import PropTypes from 'prop-types';
import '../styles/MovieList.css';
import { IoMdHeart } from "react-icons/io";

function Movie({ movie }) {
  return (
    console.log("movie",movie),
    <li key={movie.id} className="movie-card">
      <div className='movie-image-wrapper'>
        <img
          src={movie.banner_image}
          alt={movie.title} 
          className="movie-image"
        />
        <div className="favorite-icon"> 
            <IoMdHeart  className="heart1" />
        </div>  
      </div>
      <div className="movie-info">
        <p className='movie-year'>{movie.year}</p>
        <h2 className='movie-title'>{movie.title}</h2>
      </div>
      <div className='movie-genre'>{movie.genre}</div>
    </li>
  );
}

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    banner_image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
};

export default Movie;
