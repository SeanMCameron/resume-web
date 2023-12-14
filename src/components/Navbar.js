import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/" className="nav_content">
        Home
      </Link>
      <Link to="/Dashboard" className="nav_content">
        Dashboard
      </Link>
      <Link to="/About" className="nav_content">
        About
      </Link>
      <Link to="/Contact" className="nav_content">
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
