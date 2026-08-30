import React from "react";

const NavBar = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Research<span>Mate</span>
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">My Research</a>
          <a href="#">History</a>
        </div>

        <button className="profile-button">Profile</button>
      </nav>
    </div>
  );
};

export default NavBar;
