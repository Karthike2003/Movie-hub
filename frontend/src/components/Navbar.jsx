
import '../styles/Navbar.css'; // Import your custom CSS file

function Navbar() {
 return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-logo">
          <div className="navbar-left-logo-icon"></div>
          <div className="navbar-left-logo-text">
            MOVIEHUB
            </div>
        </div>
        <div className="search-container">  <div className="search-input-container">  <div className="search-icon"></div>  <input type="text" className="search-input" placeholder="Search movies and series" />  </div>
</div>

      </div>

      <div className="navbar-right">
        <div className="navbar-right-icon"></div>
        <div className="navbar-right-text">Myfavourites</div>
      </div>
    </nav>
  );
}

export default Navbar;
