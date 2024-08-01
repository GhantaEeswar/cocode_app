import React from 'react';

import Slider from './container/Slider/Slider';
import Navbar from './Navbar/Navbar';

import Header from './container/Header/Header';

import '../../App.css';

const LandingPage = () => (
  <div>
    <Navbar />
    <Header />
    <Slider />

  </div>
);

export default LandingPage;