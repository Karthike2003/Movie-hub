import { FaPlayCircle } from "react-icons/fa";
import '../styles/Hero.css'; 

function Hero() {
    return (
        <div className="hero">
          <div className="hero-image-container">
            <img src="/spidy.jpg" alt="hero" className="hero-image" />
            <div className="hero-overlay-orange">
              <p className='para'>
              Spider-Man: Across the Spider-Verse now zipping into the theater-verse, is the long-awaited follow-up to 2018's "Spider-Man: Into the Spider-Verse," a revelatory thrill ride that deservedly won the Oscar for animation.
              </p>
            </div>
            <div className="hero-overlay-white-top">
              <h1 className='heading'>
                Spider-Man:<br />
                Into the Spider-Verse
              </h1>
            </div>
            <div className="hero-overlay-white-bottom">
            <a href="https://www.youtube.com/watch?v=g4Hbz2jLxvQ"className="invisible-anchor">
            </a>
            <FaPlayCircle className="playbutton"/>
            <h3 className='watch'>Watch Now</h3>
            </div>
          </div>
        </div>
      );
    }

export default Hero;
