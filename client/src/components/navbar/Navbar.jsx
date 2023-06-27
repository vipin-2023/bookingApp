import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./navbar.css";
function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="linkHome">
          <span className="logo">Stay.com</span>
        </Link>

        {user?user.username:(<div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>)}
      </div>
    </div>
  );
}

export default Navbar;
