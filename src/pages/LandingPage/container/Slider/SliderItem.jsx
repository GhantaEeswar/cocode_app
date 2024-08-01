import React from 'react';
import './Slider.css';
import { useNavigate } from "react-router-dom";

const SliderItem = ({
  image,
  author,
  title,
  topic,
  description,
  buttons,
}) => {
  const navigate = useNavigate();

  const handleNavigateToHomePage = () => {
    navigate("/home");
  };
  return (
    <div className="item">
      <img src={image} alt="" />
      <div className="content">
        <div className="author">{author}</div>
        <div className="title">{title}</div>
        <div className="topic">{topic}</div>
        <div className="des">{description}</div>
        <div className="buttons">    
            <button onClick={handleNavigateToHomePage}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;