import React, {useState, useEffect} from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import './Navbar.css';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from "../../../firebase";


const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const listen = onAuthStateChanged(auth, (user)=>{
      if(user){
        setCurrentUser(user);
      }else{
        setCurrentUser(null);
      }
    });
    return ()=>{
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
        navigate('/login'); // navigate to the login page after signing out
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <h1>CO-CODE</h1>
      </div>
      <ul className="app__navbar-links">
        <li><Link to='/'>Home</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#footer">Contact</a></li>
      </ul>
      <div className="app__navbar-login">
        {currentUser ? (
          <Link onClick={userSignOut}>Sign Out</Link>
        ) : (
          <>
            <Link to='/login' className="p__opensans">Log In / Sign Up</Link>
          </>
        )}
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
              <li><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
