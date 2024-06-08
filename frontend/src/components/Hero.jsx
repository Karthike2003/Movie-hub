
import '../styles/Hero.css'; // Import the custom CSS file

function Hero() {
    return (
        <div className="hero">
          <div className="hero-image-container">
            <img src="/spiderman.jpg" alt="hero" className="hero-image" />
            <div className="hero-overlay-orange"></div>
            <div className="hero-overlay-white-top"></div>
            <div className="hero-overlay-white-bottom"></div>
          </div>
        </div>
      );
    }

export default Hero;
