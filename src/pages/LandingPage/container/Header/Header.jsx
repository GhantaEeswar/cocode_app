import React from 'react';

import './Header.css';
import { useNavigate } from "react-router-dom";

 
const Header = () => {
  const navigate = useNavigate();

  const handleNavigateToHomePage = () => {
    navigate("/home");
  };

return(
  <div className="app__header app__wrapper " id="home">
    <div className="app__wrapper_info">
      <h1 className="app__header-h1">Place for Developers to Colab and Code</h1>
      <p className="p__opensans" style={{ margin: '2rem 0'}}>An online code editor for interviews, troubleshooting, teaching & more…</p>
      <button className="buttons" onClick={handleNavigateToHomePage}>Get Started</button>
    </div>

    <div className="app__wrapper_img">
       <img src='/image/head1.png' alt="header_img" />
    </div>
  </div>
);
};

export default Header;
